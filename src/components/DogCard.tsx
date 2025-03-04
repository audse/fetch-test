import { useState } from 'react'
import { Dog } from '@/types'
import { Card, Image, Modal, Button, ActionIcon } from '@mantine/core'
import { HeartIcon } from './Icons'

interface Props {
    dog: Dog
}

export default function DogCard({ dog }: Props) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={() => setOpened(false)} 
                title={<h3 className="text-xl font-bold">{dog.name}</h3>}
                fullScreen>
                <div className="flex flex-col md:flex-row gap-4">
                    <img src={dog.img} alt={dog.name} className="w-full md:w-1/2 max-h-[90vh] object-cover rounded" />
                    <div className="flex flex-1 flex-col gap-2 w-full md:w-1/2">
                        <p className="text-2xl font-bold">{dog.name}</p>
                        <p><strong>Breed:</strong> {dog.breed}</p>
                        <p><strong>Age:</strong> {dog.age} {dog.age === 1 ? 'year' : 'years'} old</p>
                        <p><strong>Location:</strong> {dog.zip_code}</p>
                        <Button 
                            leftSection={<HeartIcon fill="none" strokeWidth={1.5} />}
                            variant="outline" 
                            color="pink"
                            className="max-w-fit">Add to favorites</Button>
                    </div>
                </div>
            </Modal>

            <Card shadow="lg" padding="lg" className="hover:scale-105 transition-transform cursor-pointer" onClick={() => setOpened(true)}>
                <Card.Section className="mb-4">
                    <Image src={dog.img} alt={dog.name} className="h-56 w-full object-cover" />
                </Card.Section>
                <strong>{dog.name}</strong>
                <p className="text-sm text-gray-500">{dog.breed}, {dog.age} {dog.age === 1 ? 'year' : 'years'} old</p>
                <Card.Section className="text-right py-2 px-4">
                    <ActionIcon variant="subtle" color="pink">
                        <HeartIcon fill="none" strokeWidth={1.5} />
                    </ActionIcon>
                </Card.Section>
            </Card>
        </>
    )
}
