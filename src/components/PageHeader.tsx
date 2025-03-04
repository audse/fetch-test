import { Container } from '@mantine/core'
import { JSX } from 'react'

type Props = {
    title: string
    children?: JSX.Element
}

export default function PageHeader(props: Props) {
    return (
        <header className="bg-gray-200 p-12 mb-8">
            <Container>
                <h1 className="text-2xl font-bold">{props.title}</h1>
                {props.children}
            </Container>
        </header>
    )
}