import { useState, useEffect, useCallback } from 'react'
import { tasksAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'

const FILTERS = ['ALL', 'TODO', 'IN_PROGRESS', 'DONE']
const PRIORITIES = ['ALL', 'HIGH', 'MEDIUM', 'LOW']

const priorityColor = { HIGH: 'text-red-400', MEDIUM: 'text-amber-400', LOW: 'text-slate-400' }
const statusColor = { TODO: 'bg-slate-700', IN_PROGRESS: 'bg-blue-900/50 border-blue-700', DONE: 'bg-emerald-900/30 border-emerald-800' }

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [priority, setPriority] = useState('ALL')
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    try {
      const params = {}
      if (filter !== 'ALL') params.status = filter
      if (priority !== 'ALL') params.priority = priority
      const { data } = await tasksAPI.getAll(params)
      setTasks(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [filter, priority])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const handleDelete = async (id) => {
    await tasksAPI.delete(id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleEdit = (task) => {
    setEditTask(task)
    setShowModal(true)
  }

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'DONE').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    high: tasks.filter(t => t.priority === 'HIGH').length,
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-emerald-400 tracking-widest text-sm">TASKFLOW</span>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm">{user?.name}</span>
          <button onClick={logout} className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors">
            LOGOUT
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'TOTAL', value: stats.total },
            { label: 'IN PROGRESS', value: stats.inProgress },
            { label: 'DONE', value: stats.done },
            { label: 'HIGH PRIORITY', value: stats.high },
          ].map(s => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-light text-white">{s.value}</div>
              <div className="text-xs font-mono text-slate-500 mt-1 tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors ${
                  filter === f ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
            <div className="w-px bg-slate-800 mx-1" />
            {PRIORITIES.slice(1).map(p => (
              <button
                key={p}
                onClick={() => setPriority(priority === p ? 'ALL' : p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-colors ${
                  priority === p ? `${priorityColor[p]} bg-slate-800` : 'bg-slate-900 text-slate-500 hover:text-white border border-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setEditTask(null); setShowModal(true) }}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + New Task
          </button>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="text-center text-slate-500 py-20 font-mono text-sm">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-slate-600 text-5xl mb-4">◻</div>
            <p className="text-slate-500">No tasks yet. Create your first one.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={async (id, status) => {
                  await tasksAPI.update(id, { status })
                  fetchTasks()
                }}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <TaskModal
          task={editTask}
          onClose={() => setShowModal(false)}
          onSave={() => { setShowModal(false); fetchTasks() }}
        />
      )}
    </div>
  )
}
