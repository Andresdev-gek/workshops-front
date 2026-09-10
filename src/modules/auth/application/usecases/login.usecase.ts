import type { LoginCredentials, LoginResponse } from '../../domain/models/user.model'
import { login as loginService } from '../../infrastructure/services/auth.service'

export async function loginUseCase(credentials: LoginCredentials): Promise<LoginResponse> {
  return loginService(credentials)
}
