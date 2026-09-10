import { act, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '../../../../shared/http/api-client'
import { renderHook } from '../../../../test/test-utils'
import { useLoginViewModel } from './use-login-view-model'

const mockLoginUseCase = vi.fn()
const mockNavigate = vi.fn()

vi.mock('../../application/usecases/login.usecase', () => ({
  loginUseCase: (...args: unknown[]) => mockLoginUseCase(...args),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('useLoginViewModel', () => {
  it('starts in idle status and transitions to loading while logging in', async () => {
    mockLoginUseCase.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ accessToken: 'token' }), 50)),
    )

    const { result } = renderHook(() => useLoginViewModel())

    expect(result.current.status).toBe('idle')

    act(() => {
      result.current.login({ email: 'test@example.com', password: 'Password123!' })
    })

    expect(result.current.status).toBe('loading')

    await waitFor(() => expect(result.current.status).toBe('idle'))
  })

  it('sets error status when login fails', async () => {
    mockLoginUseCase.mockRejectedValue(
      new ApiClientError('Credenciales inválidas', 401, 'INVALID_CREDENTIALS', '/api/auth/login', '2026-09-10T14:32:10.000Z'),
    )

    const { result } = renderHook(() => useLoginViewModel())

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'wrong' })
    })

    expect(result.current.status).toBe('error')
    expect(result.current.errorMessage).toBe('Credenciales inválidas')
  })
})
