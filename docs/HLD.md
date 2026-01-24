# High-Level Design (HLD) - MiniLink

## 1. System Overview

MiniLink is a full-stack link-in-bio platform that allows users to create personalized pages containing their important links. Each user gets a unique URL (e.g., `minilink.app/username`) that they can share across social media platforms.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MINILINK ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────────┘

                                    ┌──────────────┐
                                    │    Users     │
                                    │  (Browser)   │
                                    └──────┬───────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │    Vercel Edge CDN     │
                              │  (Global Distribution) │
                              └────────────┬───────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
           ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
           │ Static Pages  │      │  API Routes   │      │ Public Pages  │
           │  (ISR Cached) │      │   (Dynamic)   │      │  (SSR + ISR)  │
           └───────────────┘      └───────┬───────┘      └───────────────┘
                                          │
                              ┌───────────┴───────────┐
                              │                       │
                              ▼                       ▼
                    ┌─────────────────┐     ┌─────────────────┐
                    │    Supabase     │     │   Cloudinary    │
                    │   (PostgreSQL)  │     │    (Images)     │
                    └─────────────────┘     └─────────────────┘
```

## 2. Core Components

### 2.1 Frontend (Next.js 14)
- **App Router** - Modern React Server Components
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Consistent iconography
- **dnd-kit** - Drag and drop functionality

### 2.2 Backend (Next.js API Routes)
- **Server Actions** - Form handling
- **API Routes** - RESTful endpoints
- **Middleware** - Route protection

### 2.3 Database (Supabase PostgreSQL)
- **Prisma ORM** - Type-safe database access
- **Connection Pooling** - Serverless optimization
- **Row-Level Security** - Data protection

### 2.4 Authentication (Clerk)
- **Managed Auth** - Handles login, sessions, and security
- **Multi-Factor Auth** - Built-in security
- **User Management** - Dashboard for user control

## 3. Data Flow

### 3.1 User Registration Flow
```
User → Clerk Sign Up → Clerk Redirect → MiniLink Dashboard → Lazy Sync to Database
```

### 3.2 Public Profile View Flow
```
Visitor → /username → SSR Fetch → Prisma Query → Record PageView → Render Profile
```

### 3.3 Link Click Tracking Flow
```
Visitor → Click Link → POST /api/track → Increment Counter → Redirect to URL
```

## 4. Scalability Considerations

| Component | Strategy |
|-----------|----------|
| **Database** | Connection pooling via Supabase, indexed queries |
| **Caching** | ISR for public profiles, edge caching |
| **Images** | Cloudinary CDN with automatic optimization |
| **Auth** | Offloaded to Clerk (scales independently) |
| **API** | Edge functions, serverless auto-scaling |

## 5. Security Measures

- **Authentication** - Clerk (SOC2 Compliant)
- **Authorization** - Clerk Middleware
- **Data Validation** - Zod schemas
- **SQL Injection** - Prisma parameterized queries
- **XSS Prevention** - React automatic escaping
- **CSRF Protection** - Built-in framework protections

## 6. Third-Party Integrations

| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL database hosting |
| **Cloudinary** | Image upload and CDN |
| **Vercel** | Hosting and deployment |
| **Clerk** | Authentication & User Management |

---

Made With 💙 By [Tushar Bhardwaj](https://www.linkedin.com/in/bhardwajtushar2004/)
