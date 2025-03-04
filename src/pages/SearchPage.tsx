import { useEffect, useState } from 'react'
import SearchForm from '@/components/SearchForm'
import { Dog, SearchDogsParams } from '@/types'
import { fetchDogs, searchDogs } from '@/services/api'
import DogCard from '@/components/DogCard'

export default function SearchPage() {
    const [dogs, setDogs] = useState<Dog[]>([])
    const [searchParams, setSearchParams] = useState<SearchDogsParams>({ breeds: [], zipCodes: [] })

    useEffect(() => {
        searchDogs(searchParams)
            .then(response => fetchDogs(response.resultIds).then(setDogs))
    }, [searchParams])

    return (
        <>
            <SearchForm onChange={setSearchParams} />
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { dogs.map(dog => <DogCard key={dog.id} dog={dog} />) }
            </section>
        </>
    )
}