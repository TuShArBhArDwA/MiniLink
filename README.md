<div align="center">
  <img src="https://via.placeholder.com/120x120/8B5CF6/ffffff?text=M" alt="MiniLink Logo" width="120" />
  
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

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **Unlimited Links** | Add as many links as you want with drag-drop reordering |
| 📊 **Real-Time Analytics** | Track views, clicks, and engagement with beautiful charts |
| 🎨 **6 Custom Themes** | From minimal to neon cyberpunk — express your style |
| 🌓 **Dark/Light Mode** | Seamless theme switching for comfort |
| 🔐 **Multiple Auth Options** | Google, GitHub, Twitter, or Email sign-in |
| 📱 **Fully Responsive** | Looks perfect on any device |
| ⚡ **Lightning Fast** | Edge-optimized with ISR caching |
| 🔓 **Open Source** | MIT licensed — contribute and customize |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- [Supabase](https://supabase.com) account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/minilink.git
cd minilink

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

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

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

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js v5 |
| **Deployment** | Vercel |

---

## 📖 Documentation

- [High-Level Design (HLD)](docs/HLD.md)
- [Low-Level Design (LLD)](docs/LLD.md)
- [Contributing Guide](CONTRIBUTING.md)

---

## 🤝 Contributing

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

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <br />
  <p>Made With 💙 By <a href="https://www.linkedin.com/in/bhardwajtushar2004/"><strong>Tushar Bhardwaj</strong></a></p>
  <br />
  <a href="https://github.com/yourusername/minilink">⭐ Star this repo if you found it helpful!</a>
</div>
