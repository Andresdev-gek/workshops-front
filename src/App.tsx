import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './shared/auth-context/AuthContext'
import { queryClient } from './shared/query/query-client'
import { AppRouter } from './shared/router/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
