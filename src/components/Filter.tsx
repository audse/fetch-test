import { useEffect, useState } from 'react'

type Props = {
    label: string
    placeholder: string
    fetchOptions?: () => Promise<string[]> // Optional API fetching
    validateInput?: (value: string) => boolean // Optional validation function
    datalistId?: string // Allows setting a custom datalist ID
    className?: string // Optional custom class
    onChange: (values: string[]) => void
}

export default function Filter({ label, placeholder, fetchOptions, validateInput, datalistId, className, onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [options, setOptions] = useState<string[]>([])
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    useEffect(() => {
        if (fetchOptions) {
            fetchOptions().then(setOptions)
        }
    }, [fetchOptions])

    const formatValue = (value: string) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase()) // Title case formatting
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addSelectedValue(searchTerm)
        setSearchTerm('')
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault()
            addSelectedValue(searchTerm)
            setSearchTerm('')
        }
    }

    const addSelectedValue = (value: string) => {
        const formattedValue = formatValue(value)

        if (validateInput && !validateInput(formattedValue)) {
            return // Reject invalid input
        }

        if (!fetchOptions || options.includes(formattedValue)) {
            const newValues = [...new Set([...selectedValues, formattedValue])]
            setSelectedValues(newValues)
            onChange(newValues)
        }
    }

    const removeSelectedValue = (value: string) => {
        const newValues = selectedValues.filter(v => v !== value)
        setSelectedValues(newValues)
        onChange(newValues)
    }

    const clearAll = () => {
        setSelectedValues([])
        onChange([])
    }

    return (
        <section className={className}>
            <form onSubmit={handleSubmit} className="join">
                <label className="input join-item" htmlFor={datalistId}>
                    {label}
                    <input
                        id={datalistId}
                        type="text"
                        list={fetchOptions ? datalistId : undefined}
                        value={searchTerm}
                        placeholder={placeholder}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    {fetchOptions && datalistId && (
                        <datalist id={datalistId}>
                            {options.map(option => (
                                <option key={option} value={option} />
                            ))}
                        </datalist>
                    )}
                </label>
                <button type="submit" className="btn join-item">Add</button>
            </form>
            {selectedValues.length > 0 && (
                <div className="mt-2 flex gap-2">
                    {selectedValues.map(value => (
                        <button key={value} className="badge badge-primary hover:scale-105 transition-transform" onClick={() => removeSelectedValue(value)}>
                            &times; {value}
                        </button>
                    ))}
                    <button onClick={clearAll} className="btn btn-ghost btn-xs">&times; Clear All</button>
                </div>
            )}
        </section>
    )
}
