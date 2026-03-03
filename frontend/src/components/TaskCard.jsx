const statusBadge = {
  TODO: 'bg-slate-700 text-slate-300',
  IN_PROGRESS: 'bg-blue-900/50 text-blue-300 border border-blue-800',
  DONE: 'bg-emerald-900/30 text-emerald-400 border border-emerald-800',
}
const priorityDot = { HIGH: 'bg-red-400', MEDIUM: 'bg-amber-400', LOW: 'bg-slate-500' }

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const nextStatus = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 group hover:border-slate-700 transition-colors">
      {/* Priority dot */}
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot[task.priority]}`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className={`text-white ${task.status === 'DONE' ? 'line-through text-slate-500' : ''}`}>
            {task.title}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${statusBadge[task.status]}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
        {task.description && (
          <p className="text-slate-500 text-sm mt-0.5 truncate">{task.description}</p>
        )}
        {task.dueDate && (
          <span className="text-xs font-mono text-slate-600 mt-1 block">Due {task.dueDate}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onStatusChange(task.id, nextStatus[task.status])}
          className="text-xs font-mono text-slate-400 hover:text-emerald-400 px-2 py-1 rounded border border-slate-700 hover:border-emerald-700 transition-colors"
        >
          {task.status === 'DONE' ? 'UNDO' : 'NEXT'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded border border-slate-700 hover:border-slate-500 transition-colors"
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs font-mono text-slate-600 hover:text-red-400 px-2 py-1 rounded border border-slate-800 hover:border-red-900 transition-colors"
        >
          DEL
        </button>
      </div>
    </div>
  )
}
