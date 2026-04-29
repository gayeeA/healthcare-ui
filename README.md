# HealthCare Pro - B2B Healthcare Dashboard

[![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Production-ready B2B healthcare dashboard built with modern React 19, TypeScript, Tailwind CSS v4, Firebase Auth, and Recharts.

## ✨ Features

- 🔐 Firebase Authentication (Email/Password) with protected routes
- 📊 Interactive Dashboard with stat cards, recent activity feed
- 📈 Fully responsive Recharts analytics with tooltips, gradients, filters
- 👥 Patients management with search, filter, pagination, grid/list toggle
- 🌙 Dark mode with localStorage persistence
- 📱 Fully responsive design (mobile-first)
- ⚡ Smooth animations with Framer Motion
- 🔔 Toast notifications system
- 💾 Service Worker for offline support + welcome notification
- 🧹 Loading skeletons, empty states, error handling

## 🛠 Tech Stack

| Category | Tech |
|----------|------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| UI | Custom shadcn-like primitives |
| Charts | Recharts |
| Auth | Firebase Auth |
| Icons | Lucide React |
| Animations | Framer Motion |
| TypeScript | Full type safety |
| PWA | Service Worker |

## 🚀 Quick Start

1. **Clone & Install**
```bash
git clone <repo>
cd healthcare-ui
npm install
```

2. **Firebase Setup** (optional for demo)
```
Copy `.env.example` to `.env`
Add your Firebase config (apiKey, authDomain, projectId, etc.)
```

3. **Development**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

**Demo Login:**
- Email: `demo@healthcare.com`
- Password: `password123`

4. **Build & Preview**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives
│   ├── Layout.tsx    # App layout + Navbar
│   └── ...
├── hooks/            # Custom hooks (auth, dark mode, toast)
├── pages/            # Route pages
├── services/         # Mock data
├── types/            # TypeScript interfaces
└── lib/utils.ts      # cn() utility
```

## 🎨 Customization

- **Colors**: Edit `src/index.css` `@theme` section
- **Dark mode**: Toggle in Navbar, persists in localStorage
- **Mock data**: `src/services/mockData.ts`
- **Firebase**: Config in `.env`

## 📱 PWA Features

- Service Worker (offline support)
- Welcome notification on activation
- Installable on desktop/mobile

## 🔍 Demo Screenshots

*(Add screenshots of Dashboard, Analytics, Patients)*

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

⭐ **Star this repo if you found it useful!**

