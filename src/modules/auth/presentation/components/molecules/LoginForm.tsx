import { useState, type FormEvent } from 'react'
import { Button } from '../../../../../shared/components/atoms/Button'
import { ErrorBanner } from '../../../../../shared/components/molecules/ErrorBanner'
import { FormField } from '../../../../../shared/components/molecules/FormField'
import type { LoginCredentials } from '../../../domain/models/user.model'
import type { LoginStatus } from '../../viewmodels/use-login-view-model'

interface LoginFormProps {
  status: LoginStatus
  errorMessage: string | null
  onSubmit: (credentials: LoginCredentials) => void
}

export function LoginForm({ status, errorMessage, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLoading = status === 'loading'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (isLoading) return
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <FormField
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <FormField
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Iniciar sesión
      </Button>
    </form>
  )
}
