import { useEffect, useState } from 'react'
import { Dog, DogSearchResponse, SearchDogsParams } from '@/types'
import { fetchDogs, searchDogs, searchDogsFromUrl } from '@/services/api'
import SearchForm from '@/components/SearchForm'
import DogCard from '@/components/DogCard'
import { Button, Container, Skeleton } from '@mantine/core'
import PageHeader from '@/components/PageHeader'

export default function SearchPage() {
    const [isSearching, setIsSearching] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[]>([])
    const [searchParams, setSearchParams] = useState<SearchDogsParams>({ breeds: [], zipCodes: [] })
    const [prevUrl, setPrevUrl] = useState<string|undefined>(undefined)
    const [nextUrl, setNextUrl] = useState<string|undefined>(undefined)
    const [total, setTotal] = useState<number|undefined>(undefined)

    const handleSearchResponse = (response: DogSearchResponse) => {
        setNextUrl(response.next)
        setPrevUrl(response.prev)
        setTotal(response.total)
        fetchDogs(response.resultIds).then(val => {
            setDogs(val)
            setIsSearching(false)
        }).catch(() => {
            setIsSearching(false)
        })
    }

    useEffect(() => {
        setIsSearching(true)
        searchDogs(searchParams).then(handleSearchResponse)
    }, [searchParams])

    const goToPrevPage = () => {
        if (prevUrl) {
            setIsSearching(true)
            searchDogsFromUrl(prevUrl).then(handleSearchResponse)
        }
    }

    const goToNextPage = () => {
        if (nextUrl) {
            setIsSearching(true)
            searchDogsFromUrl(nextUrl).then(handleSearchResponse)
        }
    }

    const PaginationButtons = () => (
        <div className="flex items-center justify-center">
            <Button.Group className="my-4">
                <Button onClick={goToPrevPage} disabled={prevUrl === undefined}>Prev</Button>
                <Button onClick={goToNextPage} disabled={nextUrl === undefined}>Next</Button>
            </Button.Group>
        </div>
    )

    return (
        <>
            <PageHeader title="Adoptable dogs" />
            <Container>
                
                <SearchForm onChange={setSearchParams} />
                <PaginationButtons />
                <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    { isSearching && new Array(8).fill(true).map((_, i) => <Skeleton key={i} height={329.59} />)}
                    { dogs.map(dog => <DogCard key={dog.id} dog={dog} />) }
                </section>
                <p className="mx-4 text-sm text-center text-gray-500">{total} results.</p>
                <PaginationButtons />
            </Container>
        </>
    )
}