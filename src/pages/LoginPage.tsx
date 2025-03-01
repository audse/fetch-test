import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '@/components/Login'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
    const [loginError, setLoginError] = useState<string|null>(null)
    const { setIsAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (name: string, email: string) => {
        const response = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
            credentials: 'include'
        })

        if (response.ok) {
            setLoginError(null)
            setIsAuthenticated(true)
            navigate('/')
        }
        else setLoginError('Unable to login. Please try again.')
    }

    return (
        <>
            <Login onSubmit={handleSubmit} />
            {loginError && 
                <aside role="alert" className="alert alert-error alert-outline w-fit mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {loginError}
                </aside>}
        </>
    )
}