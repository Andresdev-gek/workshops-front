import { act, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '../../../../test/test-utils'
import { useWorkshopsViewModel } from './use-workshops-view-model'

const workshop = {
  id: '1',
  name: 'Git Fundamentals',
  description: 'Git',
  imageUrl: 'https://example.com/git.png',
  capacity: 10,
  availableSlots: 5,
  isFull: false,
  isLowAvailability: false,
  isEnrolled: false,
}

const mockListAll = vi.fn()
const mockListMine = vi.fn()
const mockEnroll = vi.fn()

vi.mock('../../application/usecases/list-all-workshops.usecase', () => ({
  listAllWorkshopsUseCase: () => mockListAll(),
}))

vi.mock('../../application/usecases/list-my-workshops.usecase', () => ({
  listMyWorkshopsUseCase: () => mockListMine(),
}))

vi.mock('../../application/usecases/enroll-in-workshop.usecase', () => ({
  enrollInWorkshopUseCase: (...args: unknown[]) => mockEnroll(...args),
}))

describe('useWorkshopsViewModel', () => {
  it('loads all workshops on mount', async () => {
    mockListAll.mockResolvedValue([workshop])
    mockListMine.mockResolvedValue([])

    const { result } = renderHook(() => useWorkshopsViewModel())

    expect(result.current.isLoadingAll).toBe(true)

    await waitFor(() => expect(result.current.allWorkshops).toEqual([workshop]))
  })

  it('opens the modal for an available workshop', () => {
    mockListAll.mockResolvedValue([workshop])
    mockListMine.mockResolvedValue([])

    const { result } = renderHook(() => useWorkshopsViewModel())

    act(() => {
      result.current.openModal(workshop)
    })

    expect(result.current.isModalOpen).toBe(true)
    expect(result.current.selectedWorkshop).toEqual(workshop)
  })

  it('does not open the modal for a full workshop that is not enrolled', () => {
    mockListAll.mockResolvedValue([workshop])
    mockListMine.mockResolvedValue([])

    const { result } = renderHook(() => useWorkshopsViewModel())

    act(() => {
      result.current.openModal({ ...workshop, isFull: true, availableSlots: 0 })
    })

    expect(result.current.isModalOpen).toBe(false)
  })
})
