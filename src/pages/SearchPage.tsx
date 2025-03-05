import { useEffect, useState } from 'react'
import { Dog, DogSearchResponse, SearchDogsParams } from '@/types'
import { fetchDogs, searchDogs, searchDogsFromUrl } from '@/services/api'
import SearchForm from '@/components/SearchForm'
import DogCard from '@/components/DogCard'
import { Button, Collapse, Container, Skeleton } from '@mantine/core'
import PageHeader from '@/components/PageHeader'
import { FilterIcon } from '@/components/Icons'

export default function SearchPage() {
    const [isSearching, setIsSearching] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[]>([])
    const [searchParams, setSearchParams] = useState<SearchDogsParams>({ breeds: [], zipCodes: [] })
    const [prevUrl, setPrevUrl] = useState<string|undefined>(undefined)
    const [nextUrl, setNextUrl] = useState<string|undefined>(undefined)
    const [total, setTotal] = useState<number|undefined>(undefined)
    const [filtersOpened, setFiltersOpened] = useState<boolean>(false)

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
        setDogs([])
        searchDogs(searchParams).then(handleSearchResponse)
    }, [searchParams])

    const goToPrevPage = () => {
        if (prevUrl) {
            setIsSearching(true)
            setDogs([])
            searchDogsFromUrl(prevUrl).then(handleSearchResponse)
        }
    }

    const goToNextPage = () => {
        if (nextUrl) {
            setIsSearching(true)
            setDogs([])
            searchDogsFromUrl(nextUrl).then(handleSearchResponse)
        }
    }

    const PaginationButtons = () => (
        <div className="flex items-center justify-center">
            <Button.Group className="my-4">
                <Button onClick={goToPrevPage} disabled={prevUrl === undefined} size="compact-sm">Prev</Button>
                <Button onClick={goToNextPage} disabled={nextUrl === undefined} size="compact-sm">Next</Button>
            </Button.Group>
        </div>
    )

    return (
        <>
            <PageHeader title="Adoptable dogs" />
            <Container>
                <section className="flex flex-row gap-4 justify-between items-center">
                    <Button 
                        // variant="default"
                        // styles={{ 'root': { border: 'none' } }}
                        onClick={() => setFiltersOpened(!filtersOpened)}
                        leftSection={<FilterIcon />}>
                        Filters
                    </Button>
                    <p className="mx-4 text-sm text-center text-gray-500">{total} dogs found</p>
                </section>
                <Collapse in={filtersOpened}>
                    <SearchForm onChange={setSearchParams} />
                </Collapse>
                <PaginationButtons />
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    { isSearching && new Array(18).fill(true).map((_, i) => <Skeleton key={i} height={329.59} />)}
                    { dogs.map(dog => <DogCard key={dog.id} dog={dog} />) }
                </section>
                <PaginationButtons />
            </Container>
        </>
    )
}