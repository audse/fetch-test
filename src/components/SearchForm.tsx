import { useEffect, useState } from 'react'
import { SearchDogsParams, SortParams } from '@/types'
import Filter from './Filter'
import { fetchBreeds } from '@/services/api'
import { NumberInput, Select } from '@mantine/core'

type Props = {
    onChange: (searchParams: SearchDogsParams) => void
}

const SortByOptions = [
    { value: 'breed', label: 'Breed' },
    { value: 'age', label: 'Age' },
    { value: 'name', label: 'Name' }
]

const SortDirOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
]

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

    const handleChangeSortBy = (value: string | null) =>
        setSortBy(value === null ? undefined : value as SortParams['by'])

    const handleChangeSortDir = (value: string | null) =>
        setSortDir(value === null ? 'asc' : value as SortParams['dir'])

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
                onChange={setBreeds} />

            {/* Zip Code Input */}
            <Filter 
                label="ZIP Code(s)"
                placeholder="12345, 67890"
                validateInput={value => /^\d{5}$/.test(value)} // Ensures 5-digit ZIP codes
                onChange={setZipCodes} />
            
            {/* Age Inputs */}
            <fieldset className="flex gap-2">
                <NumberInput
                    label="Minimum Age"
                    placeholder="1"
                    variant="filled"
                    onChange={val => setAgeMin(val === '' ? undefined : Number.parseInt(val.toString()))} />
                <NumberInput
                    label="Maximum Age"
                    placeholder="15"
                    variant="filled"
                    onChange={val => setAgeMax(val === '' ? undefined : Number.parseInt(val.toString()))} />
            </fieldset>

            {/* Sorting */}
            <fieldset className="flex gap-2 items-end">
                <Select 
                    label="Sort By"
                    placeholder="Sort by..."
                    value={sortBy} 
                    onChange={handleChangeSortBy}
                    data={SortByOptions}
                    variant="filled"
                    checkIconPosition="right" />
                <Select 
                    placeholder="Direction..."
                    value={sortDir} 
                    onChange={handleChangeSortDir}
                    data={SortDirOptions}
                    variant="filled"
                    checkIconPosition="right" />
            </fieldset>
        </form>
    )
}
