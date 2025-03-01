type Props = {
    onSubmit(name: string, email: string): void
}

export default function Login({ onSubmit }: Props) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            0: { value: string }
            1: { value: string }
        }
        onSubmit(target[0].value, target[1].value)
    }

    return (
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
            <label className="input">
                Name
                <input type="name" />
            </label>
            <label className="input">
                Email
                <input type="email" />
            </label>
            <button className="btn w-fit" type="submit">
                Login
            </button>
        </form>
    )
}