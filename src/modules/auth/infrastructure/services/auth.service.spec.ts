import { ApiClientError } from '../../../../shared/http/api-client'
import { login } from './auth.service'

const baseUrl = 'http://localhost:3000/api'

describe('auth.service', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', baseUrl)
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('calls POST /auth/login with the credentials and returns the response', async () => {
    const credentials = { email: 'test@example.com', password: 'Password123!' }
    const expectedResponse = {
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => expectedResponse,
    } as Response)

    const result = await login(credentials)

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    expect(result).toEqual(expectedResponse)
  })

  it('throws an ApiClientError when the response is not ok', async () => {
    const credentials = { email: 'test@example.com', password: 'wrong' }
    const errorResponse = {
      statusCode: 401,
      error: 'INVALID_CREDENTIALS',
      message: 'Correo o contraseña incorrectos.',
      path: '/api/auth/login',
      timestamp: '2026-09-10T14:32:10.000Z',
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => errorResponse,
    } as Response)

    await expect(login(credentials)).rejects.toBeInstanceOf(ApiClientError)
  })
})
