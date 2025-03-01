import { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const RequireUnauth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) return <p>Checking authentication...</p>

  return !isAuthenticated ? children : <Navigate to="/" replace />
}

export default RequireUnauth
