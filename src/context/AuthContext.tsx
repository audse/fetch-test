import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean | null
  setIsAuthenticated: (value: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    const checkAuth = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/dogs/breeds', {
                method: 'GET',
                credentials: 'include',
            })
            setIsAuthenticated(response.ok)
        } catch (error) {
            console.error('Error checking authentication:', error)
            setIsAuthenticated(false)
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
            if (response.ok) setIsAuthenticated(false)
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
