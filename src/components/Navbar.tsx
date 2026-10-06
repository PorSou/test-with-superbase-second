'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-pink-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-pink-600 flex items-center space-x-2 group">
              <span className="bg-pink-100 text-pink-600 p-2 rounded-2xl text-base shadow-sm group-hover:scale-110 transition">🌸</span>
              <span className="tracking-wide font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">SuperCutie</span>
            </Link>
            <div className="hidden md:flex space-x-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  pathname === '/'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                    : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                ✨ Home
              </Link>
              <Link
                href="/users"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  pathname === '/users'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                    : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                💖 Super Users
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/users"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-pink-200 transition transform hover:-translate-y-0.5 flex items-center space-x-1.5"
            >
              <span>✨</span>
              <span>Manage Supers</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
