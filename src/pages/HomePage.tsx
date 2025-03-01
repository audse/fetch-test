import BreedFilter from '@/components/BreedFilter'
import ZipCodeInput from '@/components/ZipInput'

export default function HomePage() {
    return (
        <>
            <p>Welcome home!</p>
            <BreedFilter onChange={() => {}} />
            <ZipCodeInput onChange={() => {}} />
        </>
    )
}