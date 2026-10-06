# Project Folder Structure & Architecture

This Next.js project is configured for **Full-Stack development (Frontend + Backend)** using the Next.js **App Router**, with **Prisma ORM** for database connection.

## Directory Layout (`src/`)

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, and API Route Handlers)
│   ├── api/
│   │   └── users/        # Backend API endpoint (/api/users - GET & POST)
│   │       └── route.ts
│   ├── layout.tsx        # Root layout with global providers and styles
│   ├── page.tsx          # Home page (Frontend)
│   └── globals.css       # Global Tailwind CSS imports
│
├── features/             # Domain-specific feature modules
│   ├── auth/             # Authentication feature (components, hooks, services, types)
│   └── dashboard/        # Dashboard feature (components, hooks, services, types)
│
├── components/           # Shared global UI components
│   └── ui/               # Reusable UI primitives (Buttons, Modals, Cards, etc.)
│
├── lib/                  # Shared helper utilities & Database client
│   ├── db.ts             # Prisma client singleton instance
│   └── utils.ts          # Helper functions (e.g. tailwind merge)
│
├── hooks/                # Global/shared React hooks
├── types/                # Global TypeScript type definitions
└── services/             # Global/shared API client services

prisma/
└── schema.prisma         # Prisma ORM database schema (PostgreSQL)
```

## Database Connection & Backend
- **ORM**: Prisma (`src/lib/db.ts`)
- **Backend APIs**: Built directly into Next.js via Route Handlers under `src/app/api/` and Server Actions.
- **Environment**: Configured via `.env` / `.env.example` (`DATABASE_URL`).
