import { useAuth } from '@/context/AuthContext'
import { Button } from '@mantine/core'

export default function Nav() {
    const { isAuthenticated, logout } = useAuth()
    
    return (
        <nav className="flex p-2 items-center justify-between">
            <Button component="a" href="/" variant="subtle" size="compact-lg">PawPal</Button>
            { isAuthenticated
                ? <Button onClick={logout} variant="transparent">Logout</Button>
                :  <Button component="a" href="/login" variant="transparent">Login</Button> }
        </nav>
    )
}