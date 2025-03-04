import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SearchPage from '@/pages/SearchPage'
import { AuthProvider } from '@/context/AuthContext'
import RequireAuth from '@/components/RequireAuth'
import RequireUnauth from '@/components/RequireUnauth'
import Nav from '@/components/Nav'

import './App.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<HomePage />} />
            <Route path="login" element={<RequireUnauth><LoginPage /></RequireUnauth>} />
            <Route path="search" element={<RequireAuth><SearchPage /></RequireAuth>} />
        </>
    )
)

function App() {
    return (
        <>
            <AuthProvider>
                <Nav />
                <main>
                    <RouterProvider router={router} />
                </main>
                <footer></footer>
            </AuthProvider>
        </>
    )
}

export default App
