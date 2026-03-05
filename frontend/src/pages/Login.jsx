import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { ArrowRight } from 'lucide-react'

const DEMO_USER = { email: 'demo@taskflow.com', password: 'demo1234', name: 'Demo User', avatarColor: '#10b981' }

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await authAPI.login(form)
      login({ name: data.name, email: data.email, role: data.role }, data.token)
      navigate('/dashboard')
    } catch { setError('Invalid credentials') }
    finally { setLoading(false) }
  }

  const loginAsDemo = async () => {
    setLoading(true); setError('')
    try {
      const { data } = await authAPI.login({ email: DEMO_USER.email, password: DEMO_USER.password })
      login({ name: data.name, email: data.email, role: data.role }, data.token)
      navigate('/dashboard')
    } catch { setError('Demo account unavailable') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <div className="font-mono text-emerald-400 text-sm tracking-widest mb-2">TASKFLOW</div>
          <h1 className="text-3xl font-light text-white">Welcome back</h1>
          <p className="text-slate-400 mt-1">Sign in to manage your tasks</p>
        </div>

        {/* Demo button */}
        <div className="mb-6">
          <p className="text-xs text-slate-500 mb-2 font-mono tracking-wider">QUICK ACCESS</p>
          <button onClick={loginAsDemo} disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 rounded-xl transition-all text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ backgroundColor: DEMO_USER.avatarColor }}>
              D
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200">Demo User</p>
              <p className="text-xs text-slate-500">{DEMO_USER.email}</p>
            </div>
            <ArrowRight size={14} className="text-slate-500" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-600 font-mono">or sign in manually</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2 tracking-wider">EMAIL</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2 tracking-wider">PASSWORD</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••" required />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          No account?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300">Create one</Link>
        </p>
      </div>
    </div>
  )
}