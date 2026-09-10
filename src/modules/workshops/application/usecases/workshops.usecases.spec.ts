import { describe, expect, it, vi } from 'vitest'
import { enrollInWorkshopUseCase } from './enroll-in-workshop.usecase'
import { listAllWorkshopsUseCase } from './list-all-workshops.usecase'
import { listMyWorkshopsUseCase } from './list-my-workshops.usecase'

const mockGetAllWorkshops = vi.fn()
const mockGetMyWorkshops = vi.fn()
const mockEnrollInWorkshop = vi.fn()

vi.mock('../../infrastructure/services/workshops.service', () => ({
  getAllWorkshops: () => mockGetAllWorkshops(),
  getMyWorkshops: () => mockGetMyWorkshops(),
  enrollInWorkshop: (...args: unknown[]) => mockEnrollInWorkshop(...args),
}))

describe('workshop use cases', () => {
  it('listAllWorkshopsUseCase returns all workshops from the service', async () => {
    const expected = [{ id: '1', name: 'Taller A' }]
    mockGetAllWorkshops.mockResolvedValue(expected)

    const result = await listAllWorkshopsUseCase()

    expect(mockGetAllWorkshops).toHaveBeenCalled()
    expect(result).toEqual(expected)
  })

  it('listMyWorkshopsUseCase returns my workshops from the service', async () => {
    const expected = [{ id: '2', name: 'Taller B' }]
    mockGetMyWorkshops.mockResolvedValue(expected)

    const result = await listMyWorkshopsUseCase()

    expect(mockGetMyWorkshops).toHaveBeenCalled()
    expect(result).toEqual(expected)
  })

  it('enrollInWorkshopUseCase enrolls with the given workshop id', async () => {
    const workshopId = 'workshop-123'
    const expected = { id: 'reservation-1', workshopId }
    mockEnrollInWorkshop.mockResolvedValue(expected)

    const result = await enrollInWorkshopUseCase(workshopId)

    expect(mockEnrollInWorkshop).toHaveBeenCalledWith(workshopId)
    expect(result).toEqual(expected)
  })
})
