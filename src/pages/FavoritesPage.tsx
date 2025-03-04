import DogCard from '@/components/DogCard'
import { Container } from '@mantine/core'
import { useFavorites } from '@/context/FavoritesContext'

export default function FavoritesPage() {
    const { favorites } = useFavorites()

    return (
        <Container>
            <h1 className="text-xl font-bold mb-4">Your favorites</h1>
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                { favorites.map(dog => <DogCard key={dog.id} dog={dog} />) }
            </section>
        </Container>
    )
}