import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ApiClientError } from '../../../../shared/http/api-client'
import { queryClient } from '../../../../shared/query/query-client'
import type { Workshop, WorkshopTab } from '../../domain/models/workshop.model'
import { enrollInWorkshopUseCase } from '../../application/usecases/enroll-in-workshop.usecase'
import { listAllWorkshopsUseCase } from '../../application/usecases/list-all-workshops.usecase'
import { listMyWorkshopsUseCase } from '../../application/usecases/list-my-workshops.usecase'

export interface UseWorkshopsViewModelReturn {
  activeTab: WorkshopTab
  setActiveTab: (tab: WorkshopTab) => void
  allWorkshops: Workshop[] | undefined
  myWorkshops: Workshop[] | undefined
  isLoadingAll: boolean
  isLoadingMine: boolean
  errorAll: Error | null
  errorMine: Error | null
  selectedWorkshop: Workshop | null
  isModalOpen: boolean
  openModal: (workshop: Workshop) => void
  closeModal: () => void
  enrollStatus: 'idle' | 'loading' | 'error'
  enrollError: string | null
  dismissEnrollError: () => void
  enroll: () => void
}

export function useWorkshopsViewModel(): UseWorkshopsViewModelReturn {
  const [activeTab, setActiveTab] = useState<WorkshopTab>('all')
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [enrollError, setEnrollError] = useState<string | null>(null)

  const allQuery = useQuery({
    queryKey: ['workshops'],
    queryFn: listAllWorkshopsUseCase,
  })

  const mineQuery = useQuery({
    queryKey: ['workshops:mine'],
    queryFn: listMyWorkshopsUseCase,
    enabled: activeTab === 'mine',
  })

  const enrollMutation = useMutation({
    mutationFn: enrollInWorkshopUseCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] })
      queryClient.invalidateQueries({ queryKey: ['workshops:mine'] })
      setEnrollError(null)
      setSelectedWorkshop(null)
    },
    onError: (error: unknown) => {
      if (error instanceof ApiClientError) {
        setEnrollError(error.message)
      } else {
        setEnrollError('No se pudo completar la reserva. Inténtalo de nuevo.')
      }
      queryClient.invalidateQueries({ queryKey: ['workshops'] })
      queryClient.invalidateQueries({ queryKey: ['workshops:mine'] })
    },
  })

  const openModal = (workshop: Workshop) => {
    if (workshop.isFull && !workshop.isEnrolled) return
    setSelectedWorkshop(workshop)
    setEnrollError(null)
  }

  const closeModal = () => {
    setSelectedWorkshop(null)
    setEnrollError(null)
  }

  const dismissEnrollError = () => setEnrollError(null)

  const enroll = () => {
    if (!selectedWorkshop) return
    enrollMutation.mutate(selectedWorkshop.id)
  }

  return {
    activeTab,
    setActiveTab,
    allWorkshops: allQuery.data,
    myWorkshops: mineQuery.data,
    isLoadingAll: allQuery.isLoading,
    isLoadingMine: mineQuery.isLoading,
    errorAll: allQuery.error,
    errorMine: mineQuery.error,
    selectedWorkshop,
    isModalOpen: selectedWorkshop !== null,
    openModal,
    closeModal,
    enrollStatus: (enrollMutation.status === 'pending'
      ? 'loading'
      : enrollMutation.status === 'success'
        ? 'idle'
        : enrollMutation.status) as 'idle' | 'loading' | 'error',
    enrollError,
    dismissEnrollError,
    enroll,
  }
}
