# Development Notes & Continuation Guide (`CLAUDE.md`)

*Last updated: October 6, 2026*

## Summary of Work Completed Today
1. **Supabase Integration & Configuration**:
   - Configured Supabase project `oywcsfdorgokqsjvdkcn` (Region: `ap-southeast-1`) with database URL and direct URL.
2. **Database Schema & CRUD Migration**:
   - Updated Prisma model to `Super` mapping to the database table `"super"`.
   - Updated all CRUD API endpoints (`/api/users` and `/api/users/[id]`) to use `db.super`.
3. **Cute Pastel UI Redesign & Navbar**:
   - Redesigned the home page, super users management dashboard, and navbar (with search bar and FlyonUI profile avatar dropdown) into a cute pastel pink/purple theme (`bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100`) with rounded cards and pill buttons.
4. **View Switcher & Pagination**:
   - Added view tabs (Super List vs Create/Edit Super) and pagination (5 supers per page) to the users page.
5. **CI/CD Pipeline (GitHub Actions)**:
   - Added `.github/workflows/ci.yml` to automatically run linting, Prisma generation, and Next.js builds on every push to `main`.
6. **Vercel Deployment**:
   - Configured `postinstall` script and `.vercelignore`, successfully deploying and verifying the app on Vercel.

## Project Architecture & Stack
- **Framework**: Next.js App Router (`src/app/`)
- **Database / ORM**: PostgreSQL hosted on **Supabase** (`super` table) via Prisma ORM (`src/lib/db.ts`)
- **Supabase Client**: `@supabase/supabase-js` client initialized at (`src/lib/supabase.ts`)
- **Styling**: Tailwind CSS v4 with Cute Pastel Theme & FlyonUI Navbar
- **CI/CD**: GitHub Actions workflow (`.github/workflows/ci.yml`)

---

## How to Test & Continue
1. **Run Database Push**:
   ```bash
   npx prisma db push
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **App URL**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
