import Filter from '@/components/Filter'

export default function ZipCodeFilter({ onChange }: { onChange?: (zipCodes: string[]) => void }) {
    return (
        <Filter 
            label="ZIP Code(s)"
            placeholder="12345, 67890"
            validateInput={(value) => /^\d{5}$/.test(value)} // Ensures 5-digit ZIP codes
            onChange={onChange}
        />
    )
}
