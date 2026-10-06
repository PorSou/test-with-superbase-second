import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100 text-slate-700 p-8 font-sans min-h-[calc(100vh-4rem)]">
      <main className="flex flex-col items-center max-w-xl text-center space-y-8 bg-white/90 backdrop-blur-md border border-pink-200 p-10 rounded-3xl shadow-xl shadow-pink-100">
        <div className="space-y-4">
          <span className="bg-pink-100 text-pink-600 border border-pink-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center space-x-1">
            <span>✨</span>
            <span>Supercutie Next.js App</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-800">
            Welcome to <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">Super Manager</span> 💖
          </h1>
          <p className="text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Manage your super records with love! Built with Next.js, Prisma, and Supabase featuring a gorgeous pastel UI.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
          <Link
            href="/users"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-pink-200 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>💖</span>
            <span>Open Super List</span>
            <span>→</span>
          </Link>
          <Link
            href="/users"
            className="bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-600 font-semibold px-8 py-3.5 rounded-full shadow-sm transition flex items-center justify-center space-x-1.5"
          >
            <span>✨</span>
            <span>Add New Super</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
