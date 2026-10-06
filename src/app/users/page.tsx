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
          fetchUsers()
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
          fetchUsers()
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
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this super? 🥺')) return

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      const json = await res.json()
      if (json.success) {
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
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100 text-slate-700 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center sm:text-left bg-white/80 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-lg shadow-pink-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              💖 Super Table Management
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mt-2">
              Super Dashboard ✨
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Store and manage your supers in Supabase with love
            </p>
          </div>
          <div className="bg-pink-50 border border-pink-200 px-5 py-3 rounded-2xl text-center shadow-sm">
            <span className="text-xs text-pink-500 font-semibold uppercase block">Total Supers</span>
            <span className="text-2xl font-black text-pink-600">{users.length}</span>
          </div>
        </header>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl shadow-sm font-medium flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Section */}
        <section className="bg-white/90 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-xl shadow-pink-100">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xl">🌸</span>
            <h2 className="text-xl font-bold text-slate-800">
              {editingId ? 'Edit Super Information ✏️' : 'Add New Super 💖'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Super Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cutie Pie"
                className="w-full bg-pink-50/55 border border-pink-200 rounded-2xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Super Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="super@cute.com"
                required
                className="w-full bg-pink-50/55 border border-pink-200 rounded-2xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md shadow-pink-200 transition transform hover:-translate-y-0.5 flex items-center space-x-1.5"
              >
                <span>{editingId ? '💾' : '✨'}</span>
                <span>{editingId ? 'Update Super' : 'Create Super'}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-2xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Users List Section */}
        <section className="bg-white/90 backdrop-blur-md border border-pink-200 p-8 rounded-3xl shadow-xl shadow-pink-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-xl">📋</span>
              <h2 className="text-xl font-bold text-slate-800">Super Records</h2>
            </div>
            <button
              onClick={fetchUsers}
              className="text-xs bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold px-3.5 py-1.5 rounded-full transition flex items-center space-x-1"
            >
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 font-medium">
              Loading your lovely supers... ✨
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium bg-pink-50/40 rounded-2xl border border-pink-100">
              🌸 No supers found yet. Create your first super above!
            </div>
          ) : (
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
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-pink-50/50 transition">
                      <td className="py-4 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-pink-400 inline-block"></span>
                        <span>{user.name || 'Cutie without name 🌟'}</span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">{user.email}</td>
                      <td className="py-4 px-4 text-slate-400 text-xs font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-pink-600 hover:text-pink-700 font-semibold text-xs px-3 py-1.5 bg-pink-50 hover:bg-pink-100 rounded-xl border border-pink-200 transition shadow-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-rose-600 hover:text-rose-700 font-semibold text-xs px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition shadow-sm"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
