import { useEffect, useState } from 'react'
import SearchForm from '@/components/SearchForm'
import { Dog } from '@/types'
import { fetchDogs } from '@/services/api'
import DogCard from '@/components/DogCard'

export default function HomePage() {
    const [dogIds, setDogIds] = useState<string[]>([])
    const [dogs, setDogs] = useState<Dog[]>([])

    useEffect(() => {
        fetchDogs(dogIds).then(setDogs)
    }, [dogIds])

    useEffect(() => {
        console.log(dogs)
    }, [dogs])

    return (
        <>
            <p>Welcome home!</p>
            <SearchForm onChange={setDogIds} />
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { dogs.map(dog => <DogCard key={dog.id} dog={dog} />) }
            </section>
        </>
    )
}