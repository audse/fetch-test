import { useAuth } from '@/context/AuthContext'
import { useFavorites } from '@/context/FavoritesContext'
import { Button, Indicator, Skeleton } from '@mantine/core'

export default function Nav() {
    const { isAuthenticated, logout } = useAuth()
    const { favorites } = useFavorites()
    
    return (
        <nav className="flex flex-row p-4 gap-4 items-center justify-between">
            <Button component="a" href="/" variant="subtle" size="compact-lg">PawPal</Button>
            { isAuthenticated 
                ? <Button component="a" href="/search" variant="transparent" size="compact-sm">Adopt</Button>
                : <></> }
            <div className="flex-1" />
            { isAuthenticated 
                ? <Indicator label={favorites.length} size={14}>
                    <Button component="a" href="/faves" variant="transparent" size="compact-sm">Favorites</Button>
                </Indicator>
                : <></> }
            { isAuthenticated === null ? <Skeleton width={65} height={26} />
                : isAuthenticated ? <Button onClick={logout} variant="transparent" size="compact-sm">Logout</Button>
                :  <Button component="a" href="/login" variant="transparent" size="compact-sm">Login</Button> }
        </nav>
    )
}