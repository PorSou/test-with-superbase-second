'use client'

import { useState, useEffect, FormEvent } from 'react'

interface User {
  id: string
  name: string | null
  email: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // View state: 'list' or 'create'
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/users')
      const json = await res.json()
      if (json.success) {
        setUsers(json.data)
      } else {
        setError(json.error || 'Failed to fetch supers')
      }
    } catch (err) {
      setError('Network error while fetching supers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (!email) {
      setError('Email is required')
      return
    }

    try {
      if (editingId) {
        // Update user
        const res = await fetch(`/api/users/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        })
        const json = await res.json()
        if (json.success) {
          setEditingId(null)
          setName('')
          setEmail('')
          setSuccessMsg('Super updated successfully! 🎉')
          fetchUsers()
          setActiveTab('list')
        } else {
          setError(json.error || 'Failed to update super')
        }
      } else {
        // Create user
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        })
        const json = await res.json()
        if (json.success) {
          setName('')
          setEmail('')
          setSuccessMsg('New super created successfully! ✨')
          fetchUsers()
          setActiveTab('list')
        } else {
          setError(json.error || 'Failed to create super')
        }
      }
    } catch (err) {
      setError('Network error during submission')
    }
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setName(user.name || '')
    setEmail(user.email)
    setActiveTab('create')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this super? 🥺')) return

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      const json = await res.json()
      if (json.success) {
        setSuccessMsg('Super deleted successfully! 🗑️')
        fetchUsers()
      } else {
        setError(json.error || 'Failed to delete super')
      }
    } catch (err) {
      setError('Network error while deleting super')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setName('')
    setEmail('')
    setActiveTab('list')
  }

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100 text-slate-700 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header with View Switcher Tabs */}
        <header className="bg-white/95 backdrop-blur-md border border-pink-200 p-6 rounded-3xl shadow-xl shadow-pink-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              💖 Super Management
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 mt-2">
              Super Dashboard ✨
            </h1>
          </div>

          {/* View Switcher Tabs */}
          <div className="flex bg-pink-50/80 p-1.5 rounded-full border border-pink-200 shadow-inner">
            <button
              onClick={() => { setActiveTab('list'); setEditingId(null); setName(''); setEmail(''); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'list'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <span>📋</span>
              <span>Super List</span>
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">{users.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab('create'); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200 scale-105'
                  : 'text-slate-600 hover:text-pink-600'
              }`}
            >
              <span>✨</span>
              <span>{editingId ? 'Edit Super' : 'Create Super'}</span>
            </button>
          </div>
        </header>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl shadow-sm font-medium flex items-center space-x-2 animate-in fade-in">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl shadow-sm font-medium flex items-center space-x-2 animate-in fade-in">
            <span>✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* CREATE / EDIT VIEW */}
        {activeTab === 'create' && (
          <section className="bg-white/95 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-xl shadow-pink-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-2xl">🌸</span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">
                  {editingId ? 'Edit Super Information ✏️' : 'Create New Super 💖'}
                </h2>
                <p className="text-sm text-slate-400">Fill in the details below to store your super</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Super Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cutie Pie"
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-2xl px-5 py-3.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Super Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="super@cute.com"
                  required
                  className="w-full bg-pink-50/50 border border-pink-200 rounded-2xl px-5 py-3.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-pink-200 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <span>{editingId ? '💾' : '✨'}</span>
                  <span>{editingId ? 'Update Super' : 'Save Super'}</span>
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-8 py-3.5 rounded-2xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* LIST VIEW WITH PAGINATION */}
        {activeTab === 'list' && (
          <section className="bg-white/95 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-xl shadow-pink-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Super Records List</h2>
                  <p className="text-sm text-slate-400">Viewing all registered supers from Supabase</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchUsers}
                  className="text-xs bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold px-4 py-2 rounded-full transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>🔄</span>
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className="text-xs bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-4 py-2 rounded-full transition shadow-md shadow-pink-200 flex items-center space-x-1"
                >
                  <span>+</span>
                  <span>Add New</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-16 text-slate-400 font-semibold animate-pulse">
                Loading your lovely supers... ✨
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-16 text-slate-500 font-medium bg-pink-50/50 rounded-2xl border border-pink-100 space-y-3">
                <p className="text-lg">🌸 No supers found yet.</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow transition"
                >
                  Create Your First Super ✨
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-pink-100 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4 font-bold">Name</th>
                        <th className="py-3 px-4 font-bold">Email</th>
                        <th className="py-3 px-4 font-bold">Created At</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50 text-sm">
                      {currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-pink-50/60 transition">
                          <td className="py-4 px-4 font-bold text-slate-800 flex items-center space-x-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block shadow-sm"></span>
                            <span>{user.name || 'Cutie without name 🌟'}</span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 font-medium">{user.email}</td>
                          <td className="py-4 px-4 text-slate-400 text-xs font-semibold">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-pink-600 hover:text-pink-700 font-bold text-xs px-3.5 py-1.5 bg-pink-50 hover:bg-pink-100 rounded-xl border border-pink-200 transition shadow-sm"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-rose-600 hover:text-rose-700 font-bold text-xs px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition shadow-sm"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                    <span className="text-xs text-slate-500 font-medium">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, users.length)} of {users.length} supers
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        ← Previous
                      </button>
                      <span className="text-xs font-bold text-slate-600 px-3 py-1 bg-white border border-pink-200 rounded-xl">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
