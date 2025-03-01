import BreedFilter from '@/components/BreedFilter'
import ZipCodeFilter from '@/components/ZipCodeFilter'

export default function HomePage() {
    return (
        <>
            <p>Welcome home!</p>
            <BreedFilter onChange={() => {}} />
            <ZipCodeFilter onChange={() => {}} />
        </>
    )
}