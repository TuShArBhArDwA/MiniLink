# 🚀 MiniLink SaaS Strategy & Pricing Plan

## Current State

MiniLink is a **link-in-bio platform** built with Next.js 14, Prisma, Clerk Auth, and Tailwind CSS. Currently all features are free and unlimited:

| Current Feature | Details |
|---|---|
| Unlimited Links | Drag-and-drop reordering, icon picker |
| Analytics | Real-time page views, click tracking, dynamic charts |
| 12+ Themes | Ocean, Neon, Monochrome, Earthy, etc. |
| Custom Theme Builder | Pick exact gradient, text, card colors |
| Profile Page | Avatar, bio, social links |
| Share Modal | QR codes, social sharing |
| Viral Promo Footer | "Powered by MiniLink" badge on profiles |

---

## Proposed Tier Structure

### 🆓 Free Tier — *$0/month*

> **Goal:** Attract users, drive organic growth via the promo badge. Keep it useful enough that people stay.

| Feature | Limit |
|---|---|
| Links | **Up to 5 links** |
| Themes | 3 basic themes (Default, Light, Dark) |
| Custom Theme Builder | ❌ Not included |
| Analytics | Last **7 days** only, basic stats (total views/clicks) |
| Profile Avatar | ✅ |
| Bio | ✅ (max 150 chars) |
| MiniLink Branding | ✅ **"Powered by MiniLink"** badge always shown |
| Custom Username | ✅ (`minilink.app/username`) |
| QR Code | ✅ Basic QR code |
| Link Scheduling | ❌ |
| Priority Links (pinned) | ❌ |
| Custom OG Image / SEO | ❌ |
| Email Collection | ❌ |

---

### ⭐ Pro Tier — *$5/month* (or $48/year → save 20%)

> **Goal:** The power-user tier. Creators, influencers, freelancers who need more control and insights.

| Feature | Details |
|---|---|
| Links | **Unlimited links** |
| Themes | **All 12+ premium themes** |
| Custom Theme Builder | ✅ Full access to custom gradients, colors, glassmorphism |
| Analytics | **30-day** history, click-through rates, top links, referrer data |
| Analytics Charts | Line charts, bar charts, trend indicators |
| Bio | ✅ Extended (500 chars) |
| MiniLink Branding | ✅ **Removable** — hide "Powered by MiniLink" |
| Link Thumbnails | ✅ Custom thumbnails per link |
| Link Scheduling | ✅ Set start/end dates for links |
| Priority/Pinned Links | ✅ Pin important links to the top |
| Social Icons Bar | ✅ Dedicated row of social media icons |
| Custom OG Image | ✅ Control how your page looks when shared |
| Animated Avatars | ✅ GIF avatar support |
| Email Collection | ❌ |
| Custom Domain | ❌ |
| Sensitive Content Warning | ✅ |

---

### 💎 Business Tier — *$15/month* (or $144/year → save 20%)

> **Goal:** Businesses, brands, agencies managing their online presence professionally.

| Feature | Details |
|---|---|
| Everything in Pro | ✅ |
| Analytics | **Lifetime** history, geographic data, device breakdown, UTM tracking |
| Analytics Export | ✅ Download CSV/PDF reports |
| Email Collection | ✅ Collect visitor emails with embedded signup form |
| Custom Domain | ✅ Use your own domain (`links.yourbrand.com`) |
| Team Members | ✅ Up to 3 collaborators |
| Multiple Profiles | ✅ Up to 5 profiles under one account |
| Verified Badge | ✅ Blue checkmark on profile |
| Priority Support | ✅ Email support with 24h response |
| Custom CSS | ✅ Inject your own CSS for full control |
| A/B Testing Links | ✅ Test different link titles/thumbnails |
| Webhook Integrations | ✅ Zapier, Webhooks for click events |
| Password-Protected Pages | ✅ |
| API Access | ✅ RESTful API for programmatic link management |

---

## Revenue Projection

| Metric | Conservative | Moderate | Optimistic |
|---|---|---|---|
| Monthly Signups | 500 | 2,000 | 5,000 |
| Free → Pro Conversion | 3% | 5% | 8% |
| Pro → Business Conversion | 1% | 2% | 4% |
| Monthly Revenue (Month 6) | ~$300 | ~$1,500 | ~$6,000 |
| Annual Revenue (Year 1) | ~$2,400 | ~$12,000 | ~$50,000+ |

---

## Premium Features — Implementation Priority

Features ranked by **impact × effort** — do high-impact, low-effort ones first:

### 🟢 Phase 1 — Launch MVP (2-3 weeks)

> Gate existing features behind tiers. Minimum code changes.

1. **Link Limit Enforcement** (Free: 5 links) — Add check in link creation API
2. **Theme Gating** (Free: 3 themes, Pro: all) — Filter available themes by plan
3. **Analytics Time Gating** (Free: 7d, Pro: 30d, Business: lifetime) — Filter query by date range
4. **Branding Badge Control** (Pro+: removable) — Conditional render on public profile
5. **Bio Character Limit** (Free: 150, Pro: 500, Business: unlimited)
6. **Stripe Integration** — Payment processing, subscription management
7. **Plan Management UI** — Billing page in settings, upgrade prompts

### 🟡 Phase 2 — Pro Features (3-4 weeks)

> New features that differentiate Pro.

8. **Link Scheduling** — Add `startDate` / `endDate` fields to Link model
9. **Pinned/Priority Links** — Add `isPinned` field to Link model
10. **Social Icons Bar** — New component for dedicated social links
11. **Custom OG Image** — Add `ogImage` field to User model
12. **Link Thumbnails** — Add `thumbnail` field to Link model
13. **Animated Avatar Support** — Allow GIF uploads for Pro users
14. **Enhanced Analytics** — Click-through rates, top links ranking, referrer breakdown

### 🔴 Phase 3 — Business Features (4-6 weeks)

> High-value features for business tier.

15. **Custom Domain Support** — DNS verification, SSL, routing
16. **Email Collection Widget** — Embedded form on public profile
17. **Analytics Export** — CSV/PDF generation
18. **Team/Collaborator Access** — Multi-user model, role permissions
19. **Multiple Profiles** — One account → multiple link pages
20. **Custom CSS Injection** — Textarea in appearance settings
21. **API Access** — Public REST API with API keys
22. **Password-Protected Pages** — Access control on public profiles
23. **Webhook Integrations** — Event dispatch for clicks/views

---

## Tech Stack Additions Needed

| Need | Solution | Cost |
|---|---|---|
| Payments | **Stripe** (Checkout + Billing Portal) | 2.9% + 30¢ per transaction |
| Email | **Resend** or **SendGrid** for transactional emails | Free tier available |
| Custom Domains | **Vercel Domains API** or manual DNS | Included in hosting |
| File Storage | **Uploadthing** or **Cloudinary** for thumbnails/OG images | Free tier available |
| Analytics Export | **jspdf** + **papaparse** for PDF/CSV | Free (npm packages) |
| Rate Limiting | **Upstash Redis** | Free tier available |

---

## Monetization Levers

1. **Freemium Funnel** — Free tier drives signups, Pro/Business earns revenue
2. **Annual Discount** — 20% off encourages yearly commitment (lower churn)
3. **MiniLink Branding as Growth** — Free users show "Powered by MiniLink" → viral loop
4. **Upgrade Prompts** — Contextual CTAs when users hit limits ("You've used 5/5 links. Upgrade to Pro for unlimited!")
5. **Lifetime Deal** — Optional one-time $149 (Pro) or $399 (Business) for early adopters

---

## Competitive Positioning

| Feature | **MiniLink** | Linktree | Bento | Lnk.bio |
|---|---|---|---|---|
| **Free Links** | 5 | 5 | 6 | Unlimited |
| **Pro Price** | **$5/mo** | $5/mo | $8/mo | $0.99/mo |
| **Custom Themes** | 12+ | 8 | 5 | 3 |
| **Custom Theme Builder** | ✅ Pro | ❌ | ❌ | ❌ |
| **Real-time Analytics** | ✅ | Pro only | Pro only | ❌ |
| **Open Source** | ✅ | ❌ | ❌ | ❌ |
| **Custom Domain** | Business | Pro ($24/mo) | ❌ | ❌ |

> **MiniLink's edge:** Open-source credibility, competitive pricing, custom theme builder (unique), and a polished UX at a lower price point than Linktree's Pro.

---

## Implementation Roadmap

```
Phase 1: Gate Features + Stripe ──(2-3 weeks)──▶ 💰 Start Earning Revenue
                                                        │
Phase 2: Pro Features ────────────(3-4 weeks)──▶ 📈 Grow Pro Subscribers
                                                        │
Phase 3: Business Features ───────(4-6 weeks)──▶ 🏢 Enterprise Revenue
```

> **Start with Phase 1** — gate existing features behind Stripe subscriptions. This alone can generate revenue with minimal new code. The key additions are: **Stripe integration**, **plan enforcement middleware**, and a **billing/upgrade UI**.
