import { Spinner } from '../../../../../shared/components/atoms/Spinner'
import { Tabs } from '../../../../../shared/components/organisms/Tabs'
import { EmptyState } from '../../../../../shared/components/molecules/EmptyState'
import { ErrorBanner } from '../../../../../shared/components/molecules/ErrorBanner'
import { WorkshopCard } from '../molecules/WorkshopCard'
import type { Workshop, WorkshopTab } from '../../../domain/models/workshop.model'

interface WorkshopsTabsProps {
  activeTab: WorkshopTab
  onChangeTab: (tab: WorkshopTab) => void
  allWorkshops: Workshop[] | undefined
  myWorkshops: Workshop[] | undefined
  isLoadingAll: boolean
  isLoadingMine: boolean
  errorAll: Error | null
  errorMine: Error | null
  onWorkshopClick: (workshop: Workshop) => void
}

const tabs = [
  { id: 'all', label: 'Todos los talleres' },
  { id: 'mine', label: 'Mis talleres' },
]

export function WorkshopsTabs({
  activeTab,
  onChangeTab,
  allWorkshops,
  myWorkshops,
  isLoadingAll,
  isLoadingMine,
  errorAll,
  errorMine,
  onWorkshopClick,
}: WorkshopsTabsProps) {
  const isAll = activeTab === 'all'
  const workshops = isAll ? allWorkshops : myWorkshops
  const isLoading = isAll ? isLoadingAll : isLoadingMine
  const error = isAll ? errorAll : errorMine

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => onChangeTab(tabId as WorkshopTab)}
      />

      {error && (
        <ErrorBanner
          message={error instanceof Error ? error.message : 'No se pudieron cargar los talleres.'}
        />
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {!isLoading && !error && (
        <>
          {workshops && workshops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workshops.map((workshop) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  onClick={onWorkshopClick}
                  showEnrolledBadge={isAll}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title={isAll ? 'No hay talleres disponibles' : 'Todavía no tienes reservas'}
              description={
                isAll
                  ? 'No hay talleres para mostrar en este momento.'
                  : 'Explora el catálogo y reserva tu primer taller.'
              }
            />
          )}
        </>
      )}
    </div>
  )
}
