import { useAuth } from '@/context/AuthContext'
import { useFavorites } from '@/context/FavoritesContext'
import { Button, Indicator } from '@mantine/core'

export default function Nav() {
    const { isAuthenticated, logout } = useAuth()
    const { favorites } = useFavorites()
    
    return (
        <nav className="flex flex-row p-4 items-center justify-between">
            <Button component="a" href="/" variant="subtle" size="compact-lg">PawPal</Button>
            <section className="flex flex-row w-fit gap-4">
                <Indicator label={favorites.length} size={14}>
                    <Button component="a" href="/faves" variant="transparent" size="compact-sm">Favorites</Button>
                </Indicator>
                { isAuthenticated
                    ? <Button onClick={logout} variant="transparent" size="compact-sm">Logout</Button>
                    :  <Button component="a" href="/login" variant="transparent" size="compact-sm">Login</Button> }
            </section>
        </nav>
    )
}