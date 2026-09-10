import { buildUrl, post } from '../../../../shared/http/api-client'
import type { LoginCredentials, LoginResponse } from '../../domain/models/user.model'

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return post<LoginResponse>(buildUrl('/auth/login'), credentials)
}
