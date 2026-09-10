import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 px-4 text-center text-black/60 dark:text-white/60">
      <Inbox className="w-12 h-12 opacity-50" />
      <p className="text-lg font-medium text-pearl-dark dark:text-pearl">{title}</p>
      {description && <p className="text-sm max-w-xs">{description}</p>}
    </div>
  )
}
