import { fetchBreeds } from "@/services/api"
import { useEffect, useState } from "react"

function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

type Props = {
    onChange: (breeds: string[]) => void
}

export default function BreedFilter({ onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [breeds, setBreeds] = useState<string[]>([])
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])

    useEffect(() => {
        fetchBreeds().then(setBreeds)
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addSelectedBreed(searchTerm)
        setSearchTerm('')
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault()
            addSelectedBreed(searchTerm)
            setSearchTerm('')
        }
    }

    const addSelectedBreed = (breed: string) => {
        if (breeds.includes(toTitleCase(breed))) {
            const newBreeds = [...new Set([...selectedBreeds, toTitleCase(breed)])]
            setSelectedBreeds(newBreeds)
            onChange(newBreeds)
        }
    }

    const removeSelectedBreed = (breed: string) => {
        const newBreeds = selectedBreeds.filter(b => b !== breed)
        setSelectedBreeds(newBreeds)
        onChange(newBreeds)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className="join">
                    <label className="input join-item">
                        Breed(s)
                        <input
                            type="text"
                            list="breeds" 
                            value={searchTerm} 
                            placeholder="Eskimo Dog, Pomeranian"
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress} />
                        <datalist id="breeds">
                            { breeds.map(breed =>
                                <option key={breed} value={breed} />) }
                        </datalist>
                    </label>
                    <button type="submit" className="btn join-item">Add</button>
                </fieldset>
            </form>
            <section className="mt-2">
                {selectedBreeds.map(breed =>
                    <button key={breed} className="badge badge-primary mr-1 hover:scale-105 transition-transform" onClick={() => removeSelectedBreed(breed)}>
                        &times; {breed}
                    </button>)}
            </section>
        </>
    )
}