import { GlassPanel } from '../../../../../shared/components/atoms/GlassPanel'
import { useLoginViewModel } from '../../viewmodels/use-login-view-model'
import { LoginForm } from '../molecules/LoginForm'

export function LoginPage() {
  const { status, errorMessage, login } = useLoginViewModel()

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-pearl dark:bg-pearl-dark">
      <GlassPanel className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-pearl-dark dark:text-pearl">
            Reservas de talleres
          </h1>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            Inicia sesión con tu cuenta
          </p>
        </div>

        <LoginForm status={status} errorMessage={errorMessage} onSubmit={login} />
      </GlassPanel>
    </div>
  )
}
