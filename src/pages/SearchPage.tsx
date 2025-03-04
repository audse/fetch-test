import { useEffect, useState } from 'react'
import { Dog, DogSearchResponse, SearchDogsParams } from '@/types'
import { fetchDogs, searchDogs, searchDogsFromUrl } from '@/services/api'
import SearchForm from '@/components/SearchForm'
import DogCard from '@/components/DogCard'

export default function SearchPage() {
    const [dogs, setDogs] = useState<Dog[]>([])
    const [searchParams, setSearchParams] = useState<SearchDogsParams>({ breeds: [], zipCodes: [] })
    const [prevUrl, setPrevUrl] = useState<string|undefined>(undefined)
    const [nextUrl, setNextUrl] = useState<string|undefined>(undefined)

    const handleSearchResponse = (response: DogSearchResponse) => {
        setNextUrl(response.next)
        setPrevUrl(response.prev)
        fetchDogs(response.resultIds).then(setDogs)
    }

    useEffect(() => {
        searchDogs(searchParams).then(handleSearchResponse)
    }, [searchParams])

    const goToPrevPage = () => {
        if (prevUrl) searchDogsFromUrl(prevUrl).then(handleSearchResponse)
    }

    const goToNextPage = () => {
        if (nextUrl) searchDogsFromUrl(nextUrl).then(handleSearchResponse)
    }

    const PaginationButtons = () => (
        <div className="join flex flex-row justify-center">
            <button className="join-item btn w-24" onClick={goToPrevPage} disabled={prevUrl === undefined}>Previous</button>
            <button className="join-item btn w-24" onClick={goToNextPage} disabled={nextUrl === undefined}>Next</button>
        </div>
    )

    return (
        <>
            <SearchForm onChange={setSearchParams} />
            <PaginationButtons />
            <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { dogs.map(dog => <DogCard key={dog.id} dog={dog} />) }
            </section>
            <PaginationButtons />
        </>
    )
}