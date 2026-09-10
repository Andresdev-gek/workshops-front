import {
  enrollInWorkshop,
  getAllWorkshops,
  getMyWorkshops,
} from './workshops.service'

const baseUrl = 'http://localhost:3000/api'

describe('workshops.service', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', baseUrl)
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('calls GET /workshops', async () => {
    const expected = [{ id: '1', name: 'Taller A' }]
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => expected,
    } as Response)

    const result = await getAllWorkshops()

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/workshops`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(expected)
  })

  it('calls GET /workshops/mine', async () => {
    const expected = [{ id: '2', name: 'Taller B' }]
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => expected,
    } as Response)

    const result = await getMyWorkshops()

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/workshops/mine`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    expect(result).toEqual(expected)
  })

  it('calls POST /workshops/:id/reservations', async () => {
    const workshopId = 'workshop-123'
    const expected = { id: 'reservation-1', workshopId }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => expected,
    } as Response)

    const result = await enrollInWorkshop(workshopId)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/workshops/${workshopId}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(result).toEqual(expected)
  })
})
