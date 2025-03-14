import { useFavorites } from '@/context/FavoritesContext'
import { match } from '@/services/api'
import { Dog } from '@/types'
import { Button, Container } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function MatchPage() {
    const { favorites } = useFavorites()

    const [dog, setDog] = useState<Dog|null>(null)
    
    useEffect(() => {
        const favoriteIds = favorites.map(fave => fave.id)
        match(favoriteIds).then(m => {
            if (m === null) setDog(null)
            else setDog(favorites.find(fave => fave.id === m.match) ?? null)
        })
    }, [])

    return (
        <>
            <main className="bg-sky-600 w-screen h-screen">
                <Container className="py-24 flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-2xl font-bold text-white">It's a match!</h1>
                    <p className="text-sky-200 text-center mb-2">You’ve found your perfect pup! This dog is ready to bring <br />joy, love, and endless tail wags into your life.</p>
                    { dog && <>
                        <img src={dog.img} alt={dog.name} className="w-full md:w-1/2 max-h-[80vh] object-cover rounded-xl" />
                        <p className="text-xl text-white mb-8">{dog.name}</p>
                        <Button variant="default" styles={{ root: { border: 'none' } }} size="compact-lg">Set up a meet & greet with {dog.name}</Button>
                    </> }
                </Container>
            </main>
        </>
    )
}