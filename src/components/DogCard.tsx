
import { Dog } from '@/types'
import { Card, Image } from '@mantine/core'

type Props = {
    dog: Dog
}

export default function DogCard({ dog }: Props) {
    return (
        <Card shadow="lg" padding="lg" className="hover:scale-105 transition-transform">
            <Card.Section className="mb-4">
                <Image src={dog.img} alt={dog.name} className="h-48 w-full object-cover" />
            </Card.Section>
            <strong>{dog.name}</strong>
            <p className="text-sm text-gray-500">{dog.breed}, {dog.age} { dog.age === 1  ? 'year' : 'years' } old</p>
        </Card>
    )
}