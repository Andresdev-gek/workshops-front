import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render as rtlRender, renderHook as rtlRenderHook } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../shared/auth-context/AuthContext'

function AllTheProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export function render(ui: React.ReactElement) {
  return rtlRender(ui, { wrapper: AllTheProviders })
}

export function renderHook<T>(hook: () => T) {
  return rtlRenderHook(hook, { wrapper: AllTheProviders })
}
