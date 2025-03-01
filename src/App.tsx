import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'

import './App.css'
import { AuthProvider } from '@/context/AuthContext'
import RequireAuth from '@/components/RequireAuth'
import RequireUnauth from '@/components/RequireUnauth'
import Nav from '@/components/Nav'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<RequireAuth><HomePage /></RequireAuth>} />
            <Route path="login" element={<RequireUnauth><LoginPage /></RequireUnauth>} />
        </>
    )
)

function App() {
    return (
        <>
            <AuthProvider>
                <Nav />
                <header>
                    <h1>PawPal</h1>
                </header>
                <main>
                    <RouterProvider router={router} />
                </main>
                <footer></footer>
            </AuthProvider>
        </>
    )
}

export default App
