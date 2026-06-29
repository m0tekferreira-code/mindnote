import { Trash2 } from 'lucide-react'
import type { Thought } from '../lib/storage'

interface Props {
  thought: Thought
  onDelete: (id: string) => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  if (isToday) return `Hoje, ${time}`

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  if (isYesterday) return `Ontem, ${time}`

  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) + `, ${time}`
}

export function ThoughtCard({ thought, onDelete }: Props) {
  return (
    <div className="animate-fade_in bg-white border border-border rounded-2xl px-4 py-4 flex gap-3 items-start">
      <div className="flex-1 min-w-0">
        <p className="text-ink font-body text-sm leading-relaxed break-words">{thought.text}</p>
        <p className="text-muted text-xs font-body mt-2">{formatDate(thought.createdAt)}</p>
      </div>
      <button
        onClick={() => onDelete(thought.id)}
        className="mt-0.5 p-2 rounded-xl text-muted hover:text-red-500 hover:bg-red-50 transition-colors active:scale-90 flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
