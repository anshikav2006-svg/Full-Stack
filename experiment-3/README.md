# 🌸 Post Organizer

A modern, frontend-only "girly coded but professional" post management app built with **React 19, TypeScript, Vite, Tailwind CSS**, and **Feature-Sliced Design (FSD)**.

No backend — authentication, roles, and posts are all simulated with mock data and `localStorage`.

## ✨ Features

- Mock login (name + role, no password) — Admin / Collaborator / Viewer
- Role-based access control across the whole app
- 50 auto-generated mock posts on first load
- Create / edit / delete posts (React Hook Form + Zod validation)
- Drag-and-drop image upload, stored as Base64 in `localStorage`
- Live search, category/status/author filters, 5 sort modes
- Post details with related posts, likes & views tracking
- Admin dashboard with animated stat cards + charts
- Favorites/bookmarks, dark mode, fully responsive (drawer sidebar on mobile)
- Pastel/glassmorphism UI with Framer Motion animations throughout

## 🧱 Architecture (Feature-Sliced Design)

```
src/
  app/        # providers, router, redux store, global styles
  pages/      # route-level screens (Home, Dashboard, Login, PostDetails, NotFound)
  widgets/    # composed UI blocks (Navbar, Sidebar, PostGrid, PostTable, Statistics, RoleBadge)
  features/   # user-facing actions (create/edit/delete/upload/view/search/filter/sort-post, change-role)
  entities/   # core business models (post, user) with their Redux slices + UI
  shared/     # reusable components, hooks, lib, types, constants, utils
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL. On first launch you'll land on the login screen — enter any name, pick a role, and continue.

## 🔑 Roles

| Role         | Create | Edit        | Delete | Upload | Dashboard | Manage Users |
|--------------|:------:|:-----------:|:------:|:------:|:---------:|:------------:|
| Admin        |   ✅   |     ✅      |   ✅   |   ✅   |    ✅     |      ✅       |
| Collaborator |   ✅   | own posts   |   ❌   |   ✅   |    ❌     |      ❌       |
| Viewer       |   ❌   |     ❌      |   ❌   |   ❌   |    ❌     |      ❌       |

## 🛠 Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## 💾 Persistence

Everything lives in `localStorage` under the `post-organizer:*` keys: current user/role, all posts (including uploaded cover images as Base64), theme, filters, and favorites — so your data survives a page refresh.
