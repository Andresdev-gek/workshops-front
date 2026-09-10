import { EnrolledBadge } from '../atoms/EnrolledBadge'
import { LowAvailabilityBadge } from '../atoms/LowAvailabilityBadge'
import type { Workshop } from '../../../domain/models/workshop.model'

interface WorkshopCardProps {
  workshop: Workshop
  onClick: (workshop: Workshop) => void
  showEnrolledBadge?: boolean
}

export function WorkshopCard({ workshop, onClick, showEnrolledBadge = true }: WorkshopCardProps) {
  const isClickable = !workshop.isFull || workshop.isEnrolled

  return (
    <article
      onClick={() => isClickable && onClick(workshop)}
      className={`relative flex flex-col overflow-hidden glass p-0 transition-transform ${
        isClickable ? 'cursor-pointer hover:scale-[1.01]' : 'opacity-70'
      } ${workshop.isEnrolled ? 'ring-2 ring-inset ring-green-400' : ''}`}
      aria-disabled={!isClickable}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={workshop.imageUrl}
          alt={workshop.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative flex flex-col gap-2 p-3 sm:p-4 text-left flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-pearl-dark dark:text-pearl line-clamp-1">
          {workshop.name}
        </h3>

        <div className="flex flex-col gap-1 text-xs text-black/70 dark:text-white/70">
          <span>Capacidad total: {workshop.capacity}</span>
          <span>Cupos disponibles: {workshop.availableSlots}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {workshop.isFull && !workshop.isEnrolled && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30">
              Agotado
            </span>
          )}
          {workshop.isLowAvailability && !workshop.isFull && !workshop.isEnrolled && <LowAvailabilityBadge />}
        </div>

        {showEnrolledBadge && workshop.isEnrolled && (
          <div className="absolute right-3 bottom-3">
            <EnrolledBadge />
          </div>
        )}
      </div>
    </article>
  )
}
