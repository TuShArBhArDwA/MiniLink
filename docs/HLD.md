# High-Level Design (HLD) - MiniLink

## 1. System Overview

MiniLink is a full-stack link-in-bio platform that allows users to create stunning, personalized landing pages. It features real-time analytics, unlimited link management, and custom themes, all backed by a high-performance architecture.

```mermaid
graph TD
    User((User)) -->|Browser| Cloudflare[Vercel Edge Network]
    
    subgraph "Frontend Layer (Next.js 14)"
        Cloudflare --> Static[Static Pages (ISR)]
        Cloudflare --> Server[Server Components (RSC)]
    end

    subgraph "Backend Layer (Serverless)"
        Server --> API[API Routes]
        API --> Auth[Clerk Auth]
    end

    subgraph "Data Layer"
        API --> DB[(Supabase PostgreSQL)]
        API --> Images[Cloudinary CDN]
    end

    Static -->|Hydration| Client[Client Components]
    Client -->|Interactions| API
```

## 2. Core Components

### 2.1 Frontend
- **Next.js 14 App Router**: Leveraging React Server Components for performance.
- **Tailwind CSS**: Rapid, utility-first styling with custom themes.
- **Framer Motion**: Smooth, high-fidelity animations (Laptop preview, Analytics graph).
- **dnd-kit**: Accessible drag-and-drop for link reordering.

### 2.2 Backend
- **Next.js API Routes**: Serverless functions handling business logic.
- **Prisma ORM**: Type-safe database interactions.
- **Clerk**: Managed authentication (Social login, MFA, Session management).

### 2.3 Data Storage
- **PostgreSQL (Supabase/Neon)**: Relational data for users, links, and analytics events.
- **Cloudinary**: Optimized image storage and delivery.

## 3. Key Workflows

### 3.1 Link Management
1. User logs in (Clerk).
2. Dashboard fetches links via `GET /api/links`.
3. User adds/edits link -> `POST/PUT` request.
4. Updates persist to PostgreSQL via Prisma.
5. Reordering triggers `PATCH` to update `order` fields in bulk.

### 3.2 Public Profile Access
1. Visitor navigates to `minilink.app/[username]`.
2. Next.js fetches user profile & links (ISR/SSR).
3. Page renders with user's selected theme.
4. **Analytics**: Link clicks trigger asynchronous `POST` to track engagement.

## 4. Security & Scalability

- **Auth**: Fully managed by Clerk (SOC2). No sensitive passwords stored locally.
- **Edge Caching**: Public profiles cached at the edge for sub-second load times.
- **Database**: Connection pooling enabled for serverless scaling.
- **Validation**: Zod schemas ensure data integrity on all API inputs.

---

**MiniLink** - Built for Creators.
