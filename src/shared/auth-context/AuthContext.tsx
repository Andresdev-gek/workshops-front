import { createContext, useCallback, useState } from 'react'
import { configureApiClient } from '../http/api-client'
import { queryClient } from '../query/query-client'

export interface AuthContextValue {
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const logout = useCallback(() => {
    setAccessToken(null)
    queryClient.removeQueries({ queryKey: ['workshops'] })
    queryClient.removeQueries({ queryKey: ['workshops:mine'] })
  }, [])

  const login = useCallback((token: string) => {
    setAccessToken(token)
  }, [])

  configureApiClient({
    getToken: () => accessToken,
    onUnauthorized: () => {
      logout()
      window.location.replace('/login')
    },
  })

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
