import { AlertCircle } from 'lucide-react'

interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-red-700 dark:text-red-400">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-sm font-medium hover:underline"
          aria-label="Descartar error"
        >
          Descartar
        </button>
      )}
    </div>
  )
}
