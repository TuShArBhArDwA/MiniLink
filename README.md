<div align="center">
  
  # MiniLink
  
  **Your Link-in-Bio Platform — Open Source & Free**
  
  Create your personalized link page in seconds. Share everything that matters with one simple URL.

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Unlimited Links** | Add as many links as you want with drag-drop reordering |
| **Real-Time Analytics** | Track views, clicks, and engagement with beautiful charts |
| **6 Custom Themes** | From minimal to neon cyberpunk — express your style |
| **Dark/Light Mode** | Seamless theme switching for comfort |
| **Clerk Authentication** | Secure and easy sign-in with Email, Google, etc. |
| **Cloudinary Integration** | Fast and optimized image uploads for profiles |
| **Premium UI** | Animated interfaces, glassmorphism effects, and dynamic gradients |
| **Fully Responsive** | Looks perfect on any device |
| **Lightning Fast** | Edge-optimized with ISR caching |
| **Open Source** | MIT licensed — contribute and customize |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- [Supabase](https://supabase.com) account (free tier)
- [Clerk](https://clerk.com) account (for auth)
- [Cloudinary](https://cloudinary.com) account (for images)

### Installation

```bash
# Clone the repository
git clone https://github.com/TuShArBhArDwA/MiniLink.git
cd MiniLink

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 

---

## Project Structure

```
minilink/
├── docs/                   # Documentation
│   ├── HLD.md              # High-Level Design
│   └── LLD.md              # Low-Level Design
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Login/Register pages
│   │   ├── (dashboard)/    # Protected dashboard
│   │   ├── [username]/     # Public profiles
│   │   └── api/            # API routes
│   ├── components/         # React components
│   └── lib/                # Utilities
├── .env.example            # Environment template
└── README.md
```

---

## Environment Variables

Create a `.env.local` file:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **Auth** | Clerk |
| **Images** | Cloudinary |
| **Deployment** | Vercel |

---

## Documentation

- [High-Level Design (HLD)](docs/HLD.md)
- [Low-Level Design (LLD)](docs/LLD.md)
- [Contributing Guide](CONTRIBUTING.md)

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'feat: add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

---

## Sponsor

If you find this helpful, consider supporting me:

- **Sponsor Me:** [Buy Me a Coffee!](https://github.com/sponsors/TuShArBhArDwA)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Connect with me

If you’d like to connect, feel free to reach out — [Click here](https://linktr.ee/codewithtusharbhardwaj)
