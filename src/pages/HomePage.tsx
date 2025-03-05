import { Button, Container } from "@mantine/core";

import dogImageUrl from '@/assets/dog.png'

export default function HomePage() {
    const HowItWorksSection = (props: { number: number, heading: string, body: string }) => (
        <section className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-4">
            <div className="row-span-2 text-sky-300 opacity-40 text-5xl font-bold w-16 h-16 text-center">{props.number}.</div>
            <h3 className="text-lg text-sky-300 font-bold">{props.heading}</h3>
            <p className="max-w-prose text-lg">{props.body}</p>
        </section>
    )

    return (
        <>
            <header className="py-24 bg-white">
                <Container className="flex flex-col md:flex-row md:gap-8 items-center">
                    <img src={dogImageUrl} className="min-w-24 max-w-100" />
                    <section className="flex-1">
                        <h1 className="text-5xl my-8">
                            Find your<br />
                            <strong>new best friend.</strong>
                        </h1>
                        <Button component="a" href="/search" size="lg">Adopt</Button>
                    </section>
                </Container>
            </header>
            <main className="bg-sky-700 text-white py-36">
                <Container className="flex flex-col gap-8">
                    <h2 className="text-4xl font-bold mb-4 ml-20">How It Works</h2>
                    <HowItWorksSection 
                        number={1} 
                        heading="Discover Your Perfect Pup" 
                        body="Browse through a variety of lovable dogs looking for a home. Use our filters to find the perfect match based on breed, age, and location." />
                    <HowItWorksSection
                        number={2}
                        heading="Let the Magic Happen"
                        body="Our smart matching system helps connect you with dogs that fit your lifestyle and preferences. The more you explore, the better we can suggest your ideal furry companion." />
                    <HowItWorksSection
                        number={3}
                        heading="Meet & Greet"
                        body={`Found "the one"? Set up a meet-and-greet to see if it's a perfect fit! Whether virtual or in person, this step helps you and your new best friend get to know each other.`} />

                    <Button component="a" href="/search" size="lg" variant="default" className="w-fit max-w-fit ml-20 mt-8">Get Started</Button>
                </Container>
            </main>
        </>
    )
}