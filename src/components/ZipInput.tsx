import { useState } from 'react'

type Props = {
    onChange: (zipCodes: string[]) => void
}

export default function ZipCodeInput ({ onChange }: Props) {
    const [inputValue, setInputValue] = useState('')
    const [zipCodes, setZipCodes] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addZipCodes(inputValue)
        setInputValue('')
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',') {
            e.preventDefault()
            addZipCodes(inputValue)
        }
    }

    const addZipCodes = (value: string) => {
        const newZipCodes = value
            .split(',')
            .map((zip) => zip.trim())
            .filter((zip) => zip.length > 0 && /^\d{5}$/.test(zip)) // Ensures valid 5-digit ZIP codes

        if (newZipCodes.length > 0) {
            const updatedZipCodes = [...new Set([...zipCodes, ...newZipCodes])] // Remove duplicates
            setZipCodes(updatedZipCodes)
            onChange(updatedZipCodes)
            setInputValue('')
        }
    }

    const removeZipCode = (zip: string) => {
        const updatedZipCodes = zipCodes.filter((z) => z !== zip)
        setZipCodes(updatedZipCodes)
        onChange(updatedZipCodes)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset className="join">
                    <label className="input join-item">
                        ZIP Code(s)
                        <input
                            type="text"
                            placeholder="12345, 67890"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={() => addZipCodes(inputValue)} />
                    </label>
                    <button type="submit" className="btn join-item">Add</button>
                </fieldset>
            </form>
            <section className="mt-2">
                {zipCodes.map((zip) => (
                    <button key={zip} className="badge badge-primary mr-1 hover:scale-105 transition-transform" onClick={() => removeZipCode(zip)}>
                        &times; {zip}
                    </button>
                ))}
            </section>
        </>
    )
}