
import { Dog } from '@/types'

type Props = {
    dog: Dog
}

export default function DogCard({ dog }: Props) {
    return (
        <article className="shadow-xl card">
            <figure>
                <img src={dog.img} alt={dog.name} className="h-48 w-full object-cover" />
            </figure>
            <section className="card-body">
                <h2 className="card-title">{dog.name}</h2>
                <p className="text-sm text-gray-500">Breed: {dog.breed}</p>
                <p className="text-sm text-gray-500">Age: {dog.age} { dog.age === 1  ? 'year' : 'years' }</p>
                <p className="text-sm text-gray-500">Location: {dog.zip_code}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Favorite</button>
                </div>
            </section>
        </article>
    )
}