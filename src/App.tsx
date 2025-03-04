import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SearchPage from '@/pages/SearchPage'
import { AuthProvider } from '@/context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import RequireAuth from '@/components/RequireAuth'
import RequireUnauth from '@/components/RequireUnauth'
import Nav from '@/components/Nav'

import './App.css'

const theme = createTheme({
  /** Put your mantine theme override here */
})

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
        <MantineProvider theme={theme}>
            <AuthProvider>
                <FavoritesProvider>
                    <Nav />
                    <RouterProvider router={router} />
                    <footer></footer>
                </FavoritesProvider>
            </AuthProvider>
        </MantineProvider>
    )
}

export default App
