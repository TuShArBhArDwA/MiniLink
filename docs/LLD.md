# Low-Level Design (LLD) - MiniLink

## 1. Database Schema (Prisma)

### Models

#### `User`
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (PK) | Clerk User ID (Mapped) |
| `email` | String | Unique email |
| `username` | String | Unique public handle |
| `theme` | String | Selected theme ID (default, glass, neon, etc.) |
| `links` | Relation | One-to-Many with Link |

#### `Link`
| Field | Type | Description |
|-------|------|-------------|
| `id` | String (PK) | CUID |
| `userId` | String (FK) | Owner ID |
| `title` | String | Display text |
| `url` | String | Destination URL |
| `icon` | String? | Lucide icon name or custom image URL |
| `order` | Int | Sorting order |
| `isActive` | Boolean | Visibility toggle |
| `clicks` | Int | Click counter |

#### `Click` / `PageView`
- Timestamped events for analytics generation.

## 2. API Routes

### Link Management
All routes are protected (require Clerk Auth).

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/links` | `GET` | Fetch all links for current user (Sorted by order) |
| `/api/links` | `POST` | Create a new link (Auto-appends to end of list) |
| `/api/links` | `PATCH` | Bulk reorder links (Receives array of `{id, order}`) |
| `/api/links/[id]` | `PUT` | Update link details (Title, URL, Icon, Active status) |
| `/api/links/[id]` | `DELETE` | Permanently remove a link |

### User Profile
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/user/profile` | `PATCH` | Update profile info (Bio, Avatar, Theme) |

### Analytics
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/track/[linkId]` | `POST` | Record a click event (Public access allowed) |

## 3. Component Architecture

### Dashboard (`/dashboard`)
- **`LinksPage`**: Main management interface.
  - `SortableLinkItem`: Individual card with drag handle, icon preview, and actions.
  - `IconPicker`: Modal/Popover to select Lucide icons or upload custom ones.
- **`AppearancePage`**: Theme selector with live mobile preview.
- **`AnalyticsPage`**: Charts (Recharts) showing views/clicks over time.

### Public Profile (`/[username]`)
- **`UserLink`**: Styled button component based on active theme.
- **`ThemeWrapper`**: Injects theme-specific CSS variables (colors, fonts, backgrounds).

## 4. Key Algorithms

### 4.1 Reordering
Uses `dnd-kit`'s `SortableContext`.
- **Frontend**: Optimistic UI update using `arrayMove`.
- **Backend**: `PATCH /api/links` accepts the new order. To optimize, we can transactionally update all affected rows, or just the moved item's new index (shifting others). Currently implements bulk update for consistency.

### 4.2 Analytics Graph
- **Dynamic Growth**: The graph uses an SVG path interpolation that updates in real-time as the `clicks` counter increases, creating a "living" dashboard effect.

## 5. Directory Structure
```
src/
├── app/
│   ├── api/links/      # Link CRUD
│   ├── (dashboard)/    # Admin UI
│   └── [username]/     # Public UI
├── components/
│   ├── ui/             # Shadcn/Radix Primitives
│   └── dashboard/      # Feature-specific components
└── lib/
    ├── prisma.ts       # DB Client
    └── utils.ts        # CN helper
```
