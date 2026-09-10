import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, footer, className = '' }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === overlayRef.current) {
          onClose()
        }
      }}
      role="presentation"
    >
      <div className={`w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-[var(--radius-app)] sm:rounded-[var(--radius-app)] relative flex flex-col gap-4 bg-white dark:bg-pearl-dark p-6 shadow-xl border ${className || 'border-black/5 dark:border-white/10'}`}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-pearl-dark dark:text-pearl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-pearl-dark dark:text-pearl"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-black/70 dark:text-white/70">{children}</div>

        {footer && <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">{footer}</div>}
      </div>
    </div>
  )
}
