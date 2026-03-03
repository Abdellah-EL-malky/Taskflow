import { useState } from 'react'
import { tasksAPI } from '../services/api'

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'TODO',
    priority: task?.priority || 'MEDIUM',
    dueDate: task?.dueDate || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (task) {
        await tasksAPI.update(task.id, form)
      } else {
        await tasksAPI.create(form)
      }
      onSave()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-light text-xl">
            {task ? 'Edit task' : 'New task'}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 tracking-wider">TITLE</label>
            <input
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 tracking-wider">DESCRIPTION</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 tracking-wider">STATUS</label>
              <select
                value={form.status}
                onChange={e => setForm({...form, status: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                <option>TODO</option>
                <option>IN_PROGRESS</option>
                <option>DONE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 tracking-wider">PRIORITY</label>
              <select
                value={form.priority}
                onChange={e => setForm({...form, priority: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 tracking-wider">DUE DATE</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={e => setForm({...form, dueDate: e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-700 text-slate-400 py-2.5 rounded-lg hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
