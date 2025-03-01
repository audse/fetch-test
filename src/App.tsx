import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route index element={<Home />} />
    )
)

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
