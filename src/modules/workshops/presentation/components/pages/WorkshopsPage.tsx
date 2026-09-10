import { LogOut } from 'lucide-react'
import { Button } from '../../../../../shared/components/atoms/Button'
import { useAuth } from '../../../../../shared/auth-context/useAuth'
import { EnrollModal } from '../organisms/EnrollModal'
import { WorkshopsTabs } from '../organisms/WorkshopsTabs'
import { useWorkshopsViewModel } from '../../viewmodels/use-workshops-view-model'

export function WorkshopsPage() {
  const { logout } = useAuth()
  const {
    activeTab,
    setActiveTab,
    allWorkshops,
    myWorkshops,
    isLoadingAll,
    isLoadingMine,
    errorAll,
    errorMine,
    selectedWorkshop,
    isModalOpen,
    openModal,
    closeModal,
    enrollStatus,
    enrollError,
    dismissEnrollError,
    enroll,
  } = useWorkshopsViewModel()

  return (
    <div className="flex-1 flex flex-col bg-pearl dark:bg-pearl-dark">
      <header className="glass mx-2 sm:mx-4 mt-2 sm:mt-4 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <h1 className="text-lg sm:text-xl font-semibold text-pearl-dark dark:text-pearl">
          Reservas de talleres
        </h1>
        <Button variant="secondary" onClick={logout} className="gap-2">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </Button>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <WorkshopsTabs
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            allWorkshops={allWorkshops}
            myWorkshops={myWorkshops}
            isLoadingAll={isLoadingAll}
            isLoadingMine={isLoadingMine}
            errorAll={errorAll}
            errorMine={errorMine}
            onWorkshopClick={openModal}
          />
        </div>
      </main>

      <EnrollModal
        workshop={selectedWorkshop}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={enroll}
        status={enrollStatus}
        error={enrollError}
        onDismissError={dismissEnrollError}
      />
    </div>
  )
}
