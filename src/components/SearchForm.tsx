import { useEffect, useState } from 'react'
import { SearchDogsParams, SortParams } from '@/types'
import Filter from './Filter'
import { fetchBreeds } from '@/services/api'

type Props = {
    onChange: (searchParams: SearchDogsParams) => void
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
        onChange({ breeds, zipCodes, ageMin, ageMax, sortBy, sortDir })
    }

    const handleNumberChange = (method: (param: number | undefined) => void) => ((event: React.ChangeEvent<HTMLInputElement>) => method(isNaN(event.target.valueAsNumber) ? undefined : event.target.valueAsNumber))

    const handleChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as SortParams['by'] || undefined)
    }

    const handleChangeDir = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortDir(event.target.value as SortParams['dir'] || undefined)
    }

    useEffect(() => {
        handleSubmit()
    }, [breeds, zipCodes, ageMin, ageMax, sortBy, sortDir])

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Breed Input */}
            <Filter
                label="Breed(s)"
                placeholder="Golden Retriever, Chihuahua"
                fetchOptions={fetchBreeds}
                onChange={setBreeds}
                datalistId="breeds" />

            {/* Zip Code Input */}
            <Filter 
                label="ZIP Code(s)"
                placeholder="12345, 67890"
                validateInput={(value) => /^\d{5}$/.test(value)} // Ensures 5-digit ZIP codes
                onChange={setZipCodes} />
            
            {/* Age Inputs */}
            <fieldset className="flex gap-2">
                <label className="input">
                    Minimum Age
                    <input type="number" placeholder="1" onChange={handleNumberChange(setAgeMin)} />
                </label>
                <label className="input">
                    Maximum Age
                    <input type="number" placeholder="15" onChange={handleNumberChange(setAgeMax)} />
                </label>
            </fieldset>

            {/* Sorting */}
            <fieldset className="flex gap-2">
                <select className="select select-bordered" value={sortBy} onChange={handleChangeSortBy}>
                    <option value="">Sort by...</option>
                    <option value="breed">Breed</option>
                    <option value="age">Age</option>
                    <option value="name">Name</option>
                </select>
                <select className="select select-bordered" value={sortDir} onChange={handleChangeDir}>
                    <option value="">Direction...</option>
                    <option value="asc">▲ Ascending</option>
                    <option value="desc">▼ Descending</option>
                </select>
            </fieldset>
        </form>
    )
}
