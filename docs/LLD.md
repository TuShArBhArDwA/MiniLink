# Low-Level Design (LLD) - MiniLink

## 1. Database Schema

### 1.1 Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│      User        │       │      Link        │       │      Click       │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id (PK)          │───┐   │ id (PK)          │───┐   │ id (PK)          │
│ email (UNIQUE)   │   │   │ title            │   │   │ createdAt        │
│ username (UNIQUE)│   │   │ url              │   │   │ userAgent        │
│ name             │   │   │ icon             │   │   │ referer          │
│ bio              │   │   │ order            │   │   │ country          │
│ avatar           │   │   │ isActive         │   └──→│ linkId (FK)      │
│ theme            │   │   │ clicks           │       └──────────────────┘
│ password         │   │   │ createdAt        │
│ createdAt        │   │   │ updatedAt        │       ┌──────────────────┐
│ updatedAt        │   └──→│ userId (FK)      │       │    PageView      │
└──────────────────┘       └──────────────────┘       ├──────────────────┤
         │                                            │ id (PK)          │
         │         ┌──────────────────┐               │ createdAt        │
         │         │     Account      │               │ userAgent        │
         │         ├──────────────────┤               │ referer          │
         │         │ id (PK)          │               │ country          │
         ├────────→│ userId (FK)      │               │ userId (FK)      │←┐
         │         │ provider         │               └──────────────────┘ │
         │         │ providerAccountId│                                    │
         │         │ access_token     │                                    │
         │         │ refresh_token    │                                    │
         │         └──────────────────┘                                    │
         │                                                                 │
         └─────────────────────────────────────────────────────────────────┘
```

### 1.2 Table Definitions

#### User Table
```sql
CREATE TABLE "User" (
    id            TEXT PRIMARY KEY DEFAULT cuid(),
    email         TEXT UNIQUE NOT NULL,
    username      TEXT UNIQUE,
    name          TEXT,
    bio           TEXT,
    avatar        TEXT,
    theme         TEXT DEFAULT 'default',
    password      TEXT,
    "emailVerified" TIMESTAMP,
    "createdAt"   TIMESTAMP DEFAULT NOW(),
    "updatedAt"   TIMESTAMP
);

CREATE INDEX idx_user_username ON "User"(username);
CREATE INDEX idx_user_email ON "User"(email);
```

#### Link Table
```sql
CREATE TABLE "Link" (
    id        TEXT PRIMARY KEY DEFAULT cuid(),
    title     TEXT NOT NULL,
    url       TEXT NOT NULL,
    icon      TEXT,
    "order"   INTEGER NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    clicks    INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP,
    "userId"  TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE INDEX idx_link_userId_order ON "Link"("userId", "order");
CREATE INDEX idx_link_userId ON "Link"("userId");
```

## 2. API Endpoints

### 2.1 Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handler |

### 2.2 Link APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/links` | Get all user links |
| POST | `/api/links` | Create new link |
| PATCH | `/api/links` | Reorder links (bulk) |
| GET | `/api/links/[id]` | Get single link |
| PUT | `/api/links/[id]` | Update link |
| DELETE | `/api/links/[id]` | Delete link |

### 2.3 User APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update profile |

### 2.4 Analytics APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/track/[linkId]` | Record link click |

## 3. Component Architecture

### 3.1 Directory Structure
```
src/
├── app/
│   ├── (auth)/                 # Auth route group
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/            # Dashboard route group
│   │   └── dashboard/
│   │       ├── page.tsx        # Dashboard home
│   │       ├── links/page.tsx  # Link management
│   │       ├── appearance/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── [username]/page.tsx     # Public profile (dynamic)
│   ├── api/                    # API routes
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── dashboard/              # Dashboard components
│   │   ├── dashboard-nav.tsx
│   │   ├── copy-button.tsx
│   │   ├── icon-picker.tsx
│   │   └── analytics-charts.tsx
│   ├── ui/                     # Reusable UI
│   │   └── toaster.tsx
│   └── providers.tsx           # Context providers
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── prisma.ts               # Prisma client
│   └── utils.ts                # Utility functions
└── types/
    └── next-auth.d.ts          # Type extensions
```

### 3.2 Key Components

#### Dashboard Navigation
```typescript
interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    username?: string | null;
    image?: string | null;
  };
}
```

#### Link Management
```typescript
interface Link {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  order: number;
  isActive: boolean;
  clicks: number;
}
```

## 4. State Management

### 4.1 Server State
- **Prisma Client** - Database queries via server components
- **Server Actions** - Form mutations

### 4.2 Client State
- **useState** - Local component state
- **useSession** - Authentication state (NextAuth)
- **Context API** - Toast notifications

## 5. Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────────┐     ┌──────────────┐
  │  User    │────▶│  Login Page  │────▶│   NextAuth   │
  └──────────┘     └──────────────┘     └──────┬───────┘
                                               │
                   ┌───────────────────────────┼───────────────────┐
                   │                           │                   │
                   ▼                           ▼                   ▼
          ┌───────────────┐          ┌───────────────┐    ┌───────────────┐
          │    Google     │          │    GitHub     │    │  Credentials  │
          │    OAuth      │          │    OAuth      │    │   (Email)     │
          └───────┬───────┘          └───────┬───────┘    └───────┬───────┘
                  │                          │                    │
                  └──────────────────────────┼────────────────────┘
                                             │
                                             ▼
                                    ┌───────────────┐
                                    │  JWT Session  │
                                    │   Created     │
                                    └───────┬───────┘
                                            │
                                            ▼
                                    ┌───────────────┐
                                    │   Dashboard   │
                                    │   Redirect    │
                                    └───────────────┘
```

## 6. Theme System

### 6.1 Available Themes
| Theme | CSS Class | Description |
|-------|-----------|-------------|
| Default | `.theme-default` | Clean light gray |
| Dark | `.theme-dark` | Dark mode |
| Gradient | `.theme-gradient` | Purple gradient |
| Glass | `.theme-glass` | Glassmorphism |
| Neon | `.theme-neon` | Cyberpunk green |
| Minimal | `.theme-minimal` | Black & white |

### 6.2 Theme CSS Variables
```css
.theme-[name] {
  --theme-bg: /* background gradient */;
  --theme-card: /* card background */;
  --theme-text: /* text color */;
  --theme-link-bg: /* link button bg */;
  --theme-link-border: /* link border */;
  --theme-link-hover: /* link hover bg */;
}
```

## 7. Performance Optimizations

| Area | Optimization |
|------|--------------|
| **Database** | Indexed columns, denormalized click counts |
| **Images** | Cloudinary CDN, automatic format conversion |
| **Rendering** | React Server Components, ISR caching |
| **Bundle** | Tree shaking, code splitting |
| **Fonts** | next/font optimization |

---

Made With 💙 By [Tushar Bhardwaj](https://www.linkedin.com/in/bhardwajtushar2004/)
