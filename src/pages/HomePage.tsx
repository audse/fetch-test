import { useEffect, useState } from 'react'
import SearchForm from '@/components/SearchForm'
import { Dog } from '@/types'
import { fetchDogs } from '@/services/api'

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
            { dogs.map(dog => <div>
                {dog.name}
                {dog.breed}
                {dog.age}
            </div>)}
        </>
    )
}