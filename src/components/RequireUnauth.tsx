import { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Container } from '@mantine/core'
import PageHeader from '@/components/PageHeader'

const RequireUnauth = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated === null) return <>
        <PageHeader title="..." />
        <Container>
            <p className="text-gray-500">Checking authentication...</p>
        </Container>
    </>

    return !isAuthenticated ? children : <Navigate to="/" replace />
}

export default RequireUnauth
