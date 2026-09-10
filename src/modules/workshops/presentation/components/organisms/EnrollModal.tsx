import { Button } from '../../../../../shared/components/atoms/Button'
import { ErrorBanner } from '../../../../../shared/components/molecules/ErrorBanner'
import { Modal } from '../../../../../shared/components/organisms/Modal'
import { EnrolledBadge } from '../atoms/EnrolledBadge'
import type { Workshop } from '../../../domain/models/workshop.model'

interface EnrollModalProps {
  workshop: Workshop | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  status: 'idle' | 'loading' | 'error'
  error: string | null
  onDismissError: () => void
}

export function EnrollModal({
  workshop,
  isOpen,
  onClose,
  onConfirm,
  status,
  error,
  onDismissError,
}: EnrollModalProps) {
  if (!workshop) return null

  const isEnrolled = workshop.isEnrolled

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEnrolled ? 'Detalles del taller' : workshop.name}
      className={isEnrolled ? 'border-2 border-green-400' : undefined}
      footer={
        isEnrolled ? (
          <Button onClick={onClose} className="w-full sm:w-auto">
            Cerrar
          </Button>
        ) : (
          <>
            <Button variant="muted" onClick={onClose} disabled={status === 'loading'} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button onClick={onConfirm} isLoading={status === 'loading'} className="w-full sm:w-auto">
              Inscribirme
            </Button>
          </>
        )
      }
    >
      <div className="flex flex-col gap-4">
        {isEnrolled && (
          <div className="flex justify-end">
            <EnrolledBadge />
          </div>
        )}

        <img
          src={workshop.imageUrl}
          alt={workshop.name}
          className="w-full aspect-video object-cover rounded-2xl"
        />

        <div className="flex flex-col gap-1 text-sm text-black/70 dark:text-white/70">
          <span className="font-medium text-pearl-dark dark:text-pearl">{workshop.name}</span>
          <p className="text-pearl-dark dark:text-pearl">{workshop.description}</p>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <span>Capacidad total: {workshop.capacity}</span>
          <span>Cupos disponibles: {workshop.availableSlots}</span>
        </div>

        {error && <ErrorBanner message={error} onDismiss={onDismissError} />}
      </div>
    </Modal>
  )
}
