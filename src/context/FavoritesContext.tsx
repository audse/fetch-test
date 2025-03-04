import { createContext, useContext, useEffect, useState } from 'react'
import { Dog } from '@/types'

interface FavoritesContextType {
    favorites: Dog[]
    addFavorite: (dog: Dog) => void
    removeFavorite: (dog: Dog) => void
    toggleFavorite: (dog: Dog) => void
    isFavorited: (dog: Dog) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Dog[]>(() => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) return JSON.parse(storedFavorites)
        return []
    })

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const isFavorited = (dog: Dog) => favorites.some(fav => fav.id === dog.id)
    const addFavorite = (dog: Dog) => !isFavorited(dog) && setFavorites(prev => [...prev, dog])
    const removeFavorite = ({ id }: Dog) => setFavorites(prev => prev.filter(dog => dog.id !== id))
    const toggleFavorite = (dog: Dog) => isFavorited(dog) ? removeFavorite(dog) : addFavorite(dog)

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorited }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext)
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider')
    }
    return context
}
