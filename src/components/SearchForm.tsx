import { useEffect, useState } from 'react'
import BreedFilter from '@/components/BreedFilter'
import ZipCodeFilter from '@/components/ZipCodeFilter'
import AgeInputs from '@/components/AgeInputs'
import { searchDogs } from '@/services/api'
import SortBy from './SortBy'
import { SortParams } from '@/types'

type Props = {
    onChange: (dogIds: string[]) => void
}

export default function SearchForm({ onChange }: Props) {
    const [breeds, setBreeds] = useState<string[]>([])
    const [zipCodes, setZipCodes] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<number | undefined>(undefined)
    const [ageMax, setAgeMax] = useState<number | undefined>(undefined)
    const [sortBy, setSortBy] = useState<SortParams['by']>(undefined)
    const [sortDir, setSortDir] = useState<SortParams['dir']>('asc')

    const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        
        try {
            const results = await searchDogs(breeds, zipCodes, ageMin, ageMax, sortBy, sortDir)
            onChange(results.resultIds)
            console.log('Search results:', results)
        } catch (error) {
            console.error('Error searching for dogs:', error)
        }
    }

    useEffect(() => {
        handleSubmit()
    }, [breeds, zipCodes, ageMin, ageMax, sortBy, sortDir])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <BreedFilter onChange={setBreeds} />
            <ZipCodeFilter onChange={setZipCodes} />
            <AgeInputs  onChangeMin={setAgeMin} onChangeMax={setAgeMax} />
            <SortBy initialBy='breed' initialDir='asc' onChangeBy={setSortBy} onChangeDir={setSortDir} />
        </form>
    )
}
