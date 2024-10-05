import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <nav className="mx-auto max-w-4/5 lg:w-1/2">
                <div className="my-4 text-xl space-x-6">
                    <Link href="/" className="font-bold">M.</Link>
                    <span className="space-x-4">
                        <Link href="/diary" className="text-base">Diary</Link>
                        <Link href="/#" className="text-base">Friends</Link>
                        <Link href="https://github.com/Truimo" target="_blank" className="text-base">Github</Link>
                    </span>
                </div>
            </nav>
            <header className="font-normal static top-8">
                <div className="m-8 text-center">
                    <Image src="/avatar.jpg" alt="avatar" height="96" width="96" className="rounded-full w-24 h-24 inline"></Image>
                    <h1 className="text-2xl font-bold mx-auto my-5">Xiaomo Qian</h1>
                    <p>Meeting you is the best of the best.</p>
                </div>
            </header>
            <main className="mx-auto max-w-4/5 lg:w-1/2">
                <div className="grid grid-cols-1 gap-y-2 ">
                    <p>Hello, I&#39;m <span className="text-primary">QianXiaomo</span>. Nice to meet you!</p>
                    <p>Full stack engineer.</p>
                    <p className="invisible">-</p>
                    <p>My slogan:</p>
                    <ol className="list-inside list-disc text-sm font-[family-name:var(--font-geist-mono)]">
                        <li className="mb-2">Read widely and travel extensively.</li>
                        <li className="mb-2">Realize that the past cannot be changed, but know that the future can be
                            pursued.
                        </li>
                        <li>Talk is cheap, show me the code.</li>
                    </ol>
                    <p className="invisible">-</p>
                    <p>Contact:</p>
                    <p>Email: <Link href="mailto:i@truimo.com">i@truimo.com</Link></p>
                </div>
            </main>
            <footer>
                <div className="m-8 text-center">
                    <p>Copyright &copy; 2024 <Link href="https://github.com/Truimo" target="_blank">Truimo</Link>. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
