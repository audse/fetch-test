import { fetchBreeds } from '@/services/api'
import Filter from '@/components/Filter'

export default function BreedFilter({ onChange }: { onChange?: (breeds: string[]) => void }) {
    return (
        <Filter 
            label="Breed(s)"
            placeholder="Golden Retriever, Chihuahua"
            fetchOptions={fetchBreeds}
            onChange={onChange}
            datalistId="breeds"
        />
    )
}
