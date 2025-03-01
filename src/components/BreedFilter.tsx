import { fetchBreeds } from "@/services/api"
import { useEffect, useState } from "react"

export default function BreedFilter() {
    const [searchTerm, setSearchTerm] = useState('')
    const [breeds, setBreeds] = useState<string[]>([])
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])

    useEffect(() => {
        fetchBreeds().then(setBreeds)
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            0: { value: string }
        }
        if (selectedBreeds.includes(target[0].value)) return
        if (!breeds.includes(target[0].value)) return
        setSelectedBreeds([...selectedBreeds, target[0].value])
        setSearchTerm('')
    }

    const removeSelectedBreed = (breed: string) => {
        setSelectedBreeds(selectedBreeds.filter(b => b !== breed))
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className="join">
                    <label className="input">
                        Search by breed...
                        <input type="text" list="breeds" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <datalist id="breeds">
                            { breeds.map(breed =>
                                <option key={breed} value={breed} />) }
                        </datalist>
                    </label>
                    <button type="submit" className="btn">Add</button>
                </fieldset>
            </form>
            <section>
                {selectedBreeds.map(breed =>
                    <button key={breed} className="badge mr-1 hover:scale-105 transition-transform" onClick={() => removeSelectedBreed(breed)}>
                        &times; {breed}
                    </button>)}
            </section>
        </>
    )
}