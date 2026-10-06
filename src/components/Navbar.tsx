'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="border-b border-pink-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand + Nav Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="bg-gradient-to-tr from-pink-400 to-purple-400 text-white p-2.5 rounded-2xl text-lg shadow-md shadow-pink-200 group-hover:rotate-12 group-hover:scale-110 transition duration-300">
                🌸
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  SuperCutie 💖
                </span>
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest -mt-1">
                  Supabase & Prisma
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-2 bg-pink-50/60 p-1.5 rounded-full border border-pink-100 shadow-inner">
              <Link
                href="/"
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                  pathname === '/'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-white/80'
                }`}
              >
                <span>✨</span>
                <span>Home</span>
              </Link>
              <Link
                href="/users"
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                  pathname === '/users'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                    : 'text-slate-600 hover:text-pink-600 hover:bg-white/80'
                }`}
              >
                <span>💖</span>
                <span>Super Users</span>
              </Link>
            </div>
          </div>

          {/* Right Section: Search & FlyonUI Avatar Dropdown */}
          <div className="flex items-center space-x-4">
            
            {/* Search Input */}
            <div className="hidden lg:flex items-center bg-pink-50/60 border border-pink-200 rounded-full px-4 py-2 shadow-inner">
              <span className="text-pink-400 mr-2">🔍</span>
              <input
                type="search"
                placeholder="Search supers..."
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none w-36 sm:w-48"
              />
            </div>

            {/* Status Badge */}
            <div className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Connected</span>
            </div>

            {/* FlyonUI Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                className="flex items-center focus:outline-none group"
                aria-expanded={isDropdownOpen}
              >
                <div className="avatar ring-2 ring-pink-300 ring-offset-2 rounded-full transition group-hover:scale-105">
                  <div className="size-10 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-pink-200 rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center space-x-3 px-5 py-3 border-b border-pink-100">
                    <div className="avatar">
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-pink-100">
                        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-slate-800 text-sm font-bold">John Doe</h6>
                      <small className="text-pink-500 font-semibold text-xs">Admin 👑</small>
                    </div>
                  </div>
                  <div className="py-2 px-2 space-y-1">
                    <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition">
                      <span>👤</span>
                      <span>My Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition">
                      <span>⚙️</span>
                      <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition">
                      <span>💳</span>
                      <span>Billing</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition">
                      <span>❓</span>
                      <span>FAQs</span>
                    </a>
                  </div>
                  <div className="pt-2 px-3 border-t border-pink-100">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs py-2.5 px-4 rounded-2xl border border-rose-200 transition flex items-center justify-center space-x-2"
                    >
                      <span>🚪</span>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-2xl bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 transition focus:outline-none"
              >
                <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-pink-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition flex items-center space-x-2 ${
                pathname === '/'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <span>✨</span>
              <span>Home</span>
            </Link>
            <Link
              href="/users"
              onClick={() => setIsOpen(false)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition flex items-center space-x-2 ${
                pathname === '/users'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                  : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <span>💖</span>
              <span>Super Users</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
