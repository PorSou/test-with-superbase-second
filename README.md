# Supercutie Next.js App with Supabase & Prisma

A full-stack Next.js application featuring a cute pastel UI, Supabase backend database (`super` table), and Prisma ORM.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` or `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://oywcsfdorgokqsjvdkcn.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_Zaaqjke5mnGyvkPNkYN_0w_LAwbunCD
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Zaaqjke5mnGyvkPNkYN_0w_LAwbunCD
   DATABASE_URL="postgresql://postgres.oywcsfdorgokqsjvdkcn:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.oywcsfdorgokqsjvdkcn:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy on Vercel

1. Import your GitHub repository (`test-with-superbase-second`) into [Vercel](https://vercel.com).
2. Configure the following **Environment Variables** in your Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (and/or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `DATABASE_URL` (Supabase transaction pooler connection string, port 6543)
   - `DIRECT_URL` (Supabase direct connection string, port 5432)
3. Deploy! Vercel will automatically run `prisma generate` (`postinstall`) and build your application.
