# MedFlow

**Clinical Triage & Shift Management Dashboard**

A production-grade frontend application for managing emergency department patient triage, nurse shift scheduling, and real-time bed availability. Built with React, TypeScript, and Tailwind CSS.

> Built by a registered nurse turned software engineer — combining clinical domain expertise with modern frontend engineering.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State (Client) | Zustand |
| State (Server) | TanStack Query |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Tables | TanStack Table |
| Testing | Vitest + React Testing Library + Playwright |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| Code Quality | ESLint + Prettier + Husky + lint-staged |

## Features

### Triage Queue
- Real-time patient queue sorted by clinical priority (Australasian Triage Scale)
- Colour-coded severity badges (Resuscitation → Non-Urgent)
- Patient cards with chief complaint, wait time, and nurse assignment
- Drag-and-drop reordering for charge nurses
- Search and filter by status, priority, and assigned nurse

### Shift Management
- Weekly calendar view with Early, Late, and Night shifts
- Conflict detection for double-booked nurses
- Understaffed ward warnings

### Dashboard Analytics
- Key metrics: average wait time, patients seen, bed occupancy, staffing ratio
- Trend charts for wait times and patient volume
- Triage category distribution

### Role-Based Access
- Three roles: Nurse, Charge Nurse, Admin
- Permission-based UI rendering
- Route-level protection

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
git clone git@github.com:eskersaeed/medflow.git
cd medflow
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
```

## Project Structure
```
src/
├── components/
│   ├── ui/          # Reusable UI primitives (Badge, Button, Card)
│   └── layout/      # Layout components (Sidebar, Header, MainLayout)
├── features/
│   ├── triage/      # Triage queue feature
│   ├── scheduling/  # Shift management feature
│   ├── dashboard/   # Analytics dashboard feature
│   └── auth/        # Authentication and roles
├── hooks/           # Shared custom hooks
├── lib/             # Utilities and config
├── mocks/           # MSW mock handlers and data
├── styles/          # Global styles
└── types/           # Shared TypeScript types
```

## Development Workflow

- **Git:** Conventional Commits (`feat:`, `fix:`, `chore:`)
- **Pre-commit:** Husky + lint-staged (auto-format and lint on every commit)
- **Branching:** Feature branches → PR → squash merge to main

## Roadmap

- [x] Project scaffolding and tooling
- [x] Core UI components (Badge, Button, Card)
- [x] Layout with sidebar navigation and routing
- [ ] State management (Zustand + TanStack Query)
- [ ] Mock API with MSW
- [ ] Triage queue with filtering and sorting
- [ ] Patient detail panel
- [ ] Shift scheduling calendar
- [ ] Dashboard analytics with charts
- [ ] Role-based access control
- [ ] Comprehensive testing suite
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Production deployment on Vercel

## License

MIT
