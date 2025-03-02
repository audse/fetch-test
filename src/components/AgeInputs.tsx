type Props = {
    onChangeMin?: (ageMin: number | undefined) => void
    onChangeMax?: (ageMax: number | undefined) => void
}

export default function AgeInputs({ onChangeMin, onChangeMax }: Props) {
    const handleChangeMin = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const newValue = isNaN(event.target.valueAsNumber) ? undefined : event.target.valueAsNumber
        if (onChangeMin) onChangeMin(newValue)
    }

    const handleChangeMax = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const newValue = isNaN(event.target.valueAsNumber) ? undefined : event.target.valueAsNumber
        if (onChangeMax) onChangeMax(newValue)
    }

    return (
        <fieldset className="flex gap-4">
            <label className="input">
                Minimum Age
                <input type="number" placeholder="1" onChange={handleChangeMin} />
            </label>
            <label className="input">
                Maximum Age
                <input type="number" placeholder="15" onChange={handleChangeMax} />
            </label>
        </fieldset>
    )
}