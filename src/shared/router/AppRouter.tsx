import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../../modules/auth/presentation/components/pages/LoginPage'
import { WorkshopsPage } from '../../modules/workshops/presentation/components/pages/WorkshopsPage'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/workshops"
        element={
          <ProtectedRoute>
            <WorkshopsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}
