import { TagsInput } from '@mantine/core'
import { useEffect, useState } from 'react'

type Props = {
    label: string
    placeholder: string
    fetchOptions?: () => Promise<string[]> // Optional API fetching
    validateInput?: (value: string) => boolean // Optional validation function
    className?: string // Optional custom class
    onChange?: (values: string[]) => void
}

export default function Filter({ label, placeholder, fetchOptions, validateInput, className, onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [options, setOptions] = useState<string[]>([])

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

    return (
        <TagsInput
            placeholder={placeholder}
            className={className}
            label={label}
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            data={options}
            onChange={values => onChange?.(values.map(formatValue).filter(validateInput ?? (() => true)))}
            clearable
            variant="filled"
            splitChars={[',']}
            styles={{
                pill: {
                    backgroundColor: 'var(--mantine-primary-color-6)',
                    color: 'var(--mantine-primary-color-contrast)'
                },
                inputField: { outline: 'none', boxShadow: 'none' }
            }} />
    )
}
