import { SortParams } from '@/types'

type Props = {
    initialBy?: SortParams['by']
    initialDir?: SortParams['dir']
    onChangeBy?: (by: SortParams['by']) => void
    onChangeDir?: (dir: SortParams['dir']) => void
}

export default function SortBy(props: Props) {
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value as SortParams['by']
        props.onChangeBy?.(newSortBy || undefined)
    }

    const handleDirChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortDir = event.target.value as SortParams['dir']
        props.onChangeDir?.(newSortDir || undefined)
    }

    return (
        <div className="flex gap-2 items-center">
            <select className="select select-bordered" defaultValue={props.initialBy} onChange={handleSortChange}>
                <option value="">Sort by...</option>
                <option value="breed">Breed</option>
                <option value="age">Age</option>
                <option value="name">Name</option>
            </select>
            <select className="select select-bordered" defaultValue={props.initialDir} onChange={handleDirChange}>
                <option value="">Direction...</option>
                <option value="asc">▲ Ascending</option>
                <option value="desc">▼ Descending</option>
            </select>
        </div>
    )
}
