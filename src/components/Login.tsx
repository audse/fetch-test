import { Button, Input, TextInput } from "@mantine/core"

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
        <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Name" variant="filled" className="max-w-64" />
            <TextInput type="email" label="Email" variant="filled" className="max-w-64" />
            <Button type="submit">Login</Button>
        </form>
    )
}