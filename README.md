<div align="center">
  
  # MiniLink
  
  **Your Premium Link-in-Bio Platform**
  
  Create a stunning, personalized link page in seconds. Share your world with a single URL.
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## 🚀 See It In Action

### 💻 Laptop Preview & Collapsing Animation
*Watch the magic happen: Social icons collapse into a single powerful link, previewed live on a sleek laptop mockup.*

![Laptop Preview Animation](https://github.com/TuShArBhArDwA/MiniLink/assets/demo-laptop.gif)
*(User Note: Please replace this link with your actual recorded GIF)*

### 📱 iPhone Preview
*Perfectly responsive on mobile devices.*

![iPhone Preview Animation](https://github.com/TuShArBhArDwA/MiniLink/assets/demo-phone.gif)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Unlimited Links** | Add as many links as you want with drag-and-drop reordering. Now with visual icon previews. |
| **Real-Time Analytics** | Track views and clicks live. Features a **dynamic glowing graph** that updates in real-time. |
| **6+ Custom Themes** | From minimal glassmorphism to neon cyberpunk — styled to impress. |
| **Lightning Fast** | Optimized for speed with edge caching and instant transitions. |
| **Secure & Open** | Built with enterprise-grade security (Clerk Auth) and fully open source. |
| **Fully Responsive** | Looks stunning on every screen, from big monitors to mobile phones. |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Database:** PostgreSQL (Supabase/Neon) via Prisma ORM
- **Auth:** Clerk
- **Icons:** Lucide React

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/TuShArBhArDwA/MiniLink.git
cd MiniLink
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### 3. Run It
```bash
npx prisma db push
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the magic! 🌟

---

## 📚 Documentation

Detailed design docs for developers:
- [High-Level Design (HLD)](docs/HLD.md)
- [Low-Level Design (LLD)](docs/LLD.md)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve MiniLink.

---

<div align="center">
  Made with 💙 by Tushar Bhardwaj
</div>
