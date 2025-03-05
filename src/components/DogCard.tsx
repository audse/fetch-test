import { useState } from 'react'
import { Dog } from '@/types'
import { Card, Image, Modal, Button, ActionIcon } from '@mantine/core'
import { HeartIcon, LocationIcon } from '@/components/Icons'
import { useFavorites } from '@/context/FavoritesContext'

interface Props {
    dog: Dog
}

export default function DogCard({ dog }: Props) {
    const [opened, setOpened] = useState(false)
    const { isFavorited, toggleFavorite } = useFavorites()

    const Heart = () => <HeartIcon fill={isFavorited(dog) ? 'currentColor' : 'none'} strokeWidth={1.5} />
    
    const onClickAddToFavorites = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(dog)
    }

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={() => setOpened(false)} 
                title={<h3 className="text-xl font-bold">{dog.name}</h3>}
                fullScreen>
                <div className="flex flex-col md:flex-row gap-4">
                    <img src={dog.img} alt={dog.name} className="w-full md:w-1/2 max-h-[90vh] object-cover rounded-2xl" />
                    <div className="flex flex-1 flex-col gap-2 w-full md:w-1/2 bg-white rounded-2xl p-4 h-fit">
                        <p className="text-2xl font-bold">{dog.name}</p>
                        <p className="flex items-center gap-1 text-gray-500 text-sm mb-4"><LocationIcon /> {dog.zip_code}</p>
                        <p><strong>Breed:</strong> {dog.breed}</p>
                        <p><strong>Age:</strong> {dog.age} {dog.age === 1 ? 'year' : 'years'} old</p>
                        <Button 
                            leftSection={<Heart />}
                            variant="outline"
                            color="pink"
                            className="max-w-fit mt-4"
                            onClick={() => toggleFavorite(dog)}>{ isFavorited(dog) ? 'Remove from' : 'Add to' } favorites</Button>
                    </div>
                </div>
            </Modal>

            <Card shadow="lg" padding="lg" className="hover:scale-105 transition-transform cursor-pointer rounded-3xl" onClick={() => setOpened(true)}>
                <Card.Section className="mb-4">
                    <Image src={dog.img} alt={dog.name} className="h-56 w-full object-cover" />
                </Card.Section>
                <strong>{dog.name}</strong>
                <p className="text-sm text-gray-500">{dog.breed}, {dog.age} {dog.age === 1 ? 'year' : 'years'} old</p>
                <Card.Section className="text-right p-4 pt-0">
                    <ActionIcon variant="subtle" color="pink" onClick={onClickAddToFavorites}><Heart /></ActionIcon>
                </Card.Section>
            </Card>
        </>
    )
}
