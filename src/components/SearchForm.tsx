import { useState } from 'react'
import BreedFilter from '@/components/BreedFilter'
import ZipCodeFilter from '@/components/ZipCodeFilter'
import AgeInputs from '@/components/AgeInputs'
import { searchDogs } from '@/services/api'

type Props = {
    onChange: (dogIds: string[]) => void
}

export default function SearchForm({ onChange }: Props) {
    const [breeds, setBreeds] = useState<string[]>([])
    const [zipCodes, setZipCodes] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<number | undefined>(undefined)
    const [ageMax, setAgeMax] = useState<number | undefined>(undefined)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        try {
            const results = await searchDogs(breeds, zipCodes, ageMin, ageMax)
            onChange(results.resultIds)
            console.log('Search results:', results)
        } catch (error) {
            console.error('Error searching for dogs:', error)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <BreedFilter onChange={setBreeds} />
            <ZipCodeFilter onChange={setZipCodes} />
            <AgeInputs  onChangeMin={setAgeMin} onChangeMax={setAgeMax} />
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    )
}
