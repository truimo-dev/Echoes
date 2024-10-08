import Link from 'next/link';
import {Container, Footer, Nav, Header} from '@/components/layout/Home';
import {geistMono} from '@/fonts';

export default function Home() {
    return (
        <Container>
            <Nav/>
            <Header/>
            <main className="mx-auto max-w-4/5 lg:w-1/2">
                <div className="grid grid-cols-1 gap-y-2 ">
                    <p>Hello, I&#39;m <span className="text-primary">QianXiaomo</span>. Nice to meet you!</p>
                    <p>Full stack engineer.</p>
                    <p className="invisible">-</p>
                    <p>My slogan:</p>
                    <ol className={`list-inside list-disc text-sm ${geistMono.className}`}>
                        <li className="mb-2">Read widely and travel extensively.</li>
                        <li className="mb-2">Realize that the past cannot be changed, but know that the future can be
                            pursued.
                        </li>
                        <li>Talk is cheap, show me the code.</li>
                    </ol>
                    <p className="invisible">-</p>
                    <p>Contact:</p>
                    <p>Email: <Link href="mailto:hi@xdm.me">hi@xdm.me</Link></p>
                </div>
            </main>
            <Footer/>
        </Container>
    );
}
