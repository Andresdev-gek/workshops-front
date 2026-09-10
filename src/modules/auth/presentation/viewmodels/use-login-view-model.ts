import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiClientError } from '../../../../shared/http/api-client'
import { useAuth } from '../../../../shared/auth-context/useAuth'
import { loginUseCase } from '../../application/usecases/login.usecase'
import type { LoginCredentials } from '../../domain/models/user.model'

export type LoginStatus = 'idle' | 'loading' | 'error'

export interface UseLoginViewModelReturn {
  status: LoginStatus
  errorMessage: string | null
  login: (credentials: LoginCredentials) => Promise<void>
}

export function useLoginViewModel(): UseLoginViewModelReturn {
  const [status, setStatus] = useState<LoginStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login: setToken } = useAuth()
  const navigate = useNavigate()

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setStatus('loading')
    setErrorMessage(null)

    try {
      const response = await loginUseCase(credentials)
      setToken(response.accessToken)
      navigate('/workshops', { replace: true })
      setStatus('idle')
    } catch (error) {
      setStatus('error')
      if (error instanceof ApiClientError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Error inesperado. Inténtalo de nuevo.')
      }
    }
  }

  return { status, errorMessage, login }
}
