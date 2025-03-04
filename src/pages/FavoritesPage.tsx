import DogCard from '@/components/DogCard'
import { Container } from '@mantine/core'
import { useFavorites } from '@/context/FavoritesContext'
import PageHeader from '@/components/PageHeader'

export default function FavoritesPage() {
    const { favorites } = useFavorites()

    return (
        <>
            <PageHeader title="Your favorites" />
            <Container className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                { favorites.map(dog => <DogCard key={dog.id} dog={dog} />) }
            </Container>
        </>
    )
}