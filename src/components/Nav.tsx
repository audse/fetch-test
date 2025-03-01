import { useAuth } from '@/context/AuthContext'

export default function Nav() {
    const { isAuthenticated, logout } = useAuth()
    
    return (
        <nav className="navbar bg-base-300">
            <section className="flex-1">
                <a href="/" className="btn btn-ghost text-xl">PawPal</a>
            </section>
            <section className="flex-none">
                { isAuthenticated
                    ? <button onClick={logout} className="btn btn-ghost">Logout</button>
                    : <a href="/login" className="btn btn-ghost">Login</a> }
            </section>
        </nav>
    )
}