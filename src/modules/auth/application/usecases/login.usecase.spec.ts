import { describe, expect, it, vi } from 'vitest'
import { loginUseCase } from './login.usecase'

const mockLogin = vi.fn()

vi.mock('../../infrastructure/services/auth.service', () => ({
  login: (...args: unknown[]) => mockLogin(...args),
}))

describe('loginUseCase', () => {
  it('delegates to the auth service with the given credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'Password123!' }
    const expectedResponse = {
      accessToken: 'token',
      tokenType: 'Bearer',
      expiresIn: 3600,
    }
    mockLogin.mockResolvedValue(expectedResponse)

    const result = await loginUseCase(credentials)

    expect(mockLogin).toHaveBeenCalledWith(credentials)
    expect(result).toEqual(expectedResponse)
  })
})
