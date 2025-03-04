import { Button, Container } from "@mantine/core";

export default function HomePage() {
    return (
        <>
            <header className="py-24 bg-gray-200">
                <Container>
                    <h1 className="text-5xl my-6">Find your new best friend.</h1>
                    <Button component="a" href="/search" size="lg">Adopt</Button>
                </Container>
            </header>
            <main></main>
        </>
    )
}