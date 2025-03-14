import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SearchPage from '@/pages/SearchPage'
import FavoritesPage from '@/pages/FavoritesPage'
import MatchPage from '@/pages/MatchPage'
import { AuthProvider } from '@/context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import RequireAuth from '@/components/RequireAuth'
import RequireUnauth from '@/components/RequireUnauth'
import Nav from '@/components/Nav'

import './App.css'

const theme = createTheme({
    /** Put your mantine theme override here */
    primaryColor: 'sky',

    defaultRadius: '0.5rem',

    // Use colors from TailwindCSS
    colors: {
        red: ['#fdf2f2', '#fde8e8', '#fbd5d5', '#f8b4b4', '#f98080', '#f05252', '#e02424', '#c81e1e', '#9b1c1c', '#771d1d'],
        orange: ['#fffaf0', '#feebc8', '#fbd38d', '#f6ad55', '#ed8936', '#dd6b20', '#c05621', '#9c4221', '#7b341e', '#652b19'],
        amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
        yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
        lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314'],
        green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
        emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
        teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
        cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
        sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
        blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
        indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'],
        violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
        purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87'],
        fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75'],
        pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843'],
        rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337'],
        gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827'],
        stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917'],
        neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717'],
        zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b'],
        slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a']
    }
})

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<HomePage />} />
            <Route path="login" element={<RequireUnauth><LoginPage /></RequireUnauth>} />
            <Route path="search" element={<RequireAuth><SearchPage /></RequireAuth>} />
            <Route path="faves" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
            <Route path="match" element={<RequireAuth><MatchPage /></RequireAuth>} />
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
                    <div className="flex-1"></div>
                    <footer className="text-center text-sky-600 font-medium text-sm py-12">
                        &copy; PawPal 2025.
                    </footer>
                </FavoritesProvider>
            </AuthProvider>
        </MantineProvider>
    )
}

export default App
