import Image from 'next/image';
import Link from "next/link";

export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <header className="font-normal static top-8">
                <div className="m-8 text-center">
                    <Image src="/avatar.jpg" alt="avatar" height="96" width="96" className="rounded-full w-24 h-24 inline"></Image>
                    <h1 className="text-2xl font-bold mx-auto my-5">XiaoMo Qian</h1>
                    <p>Meeting you is the best of the best.</p>
                </div>
            </header>
            <main className="grid grid-cols-1 gap-y-2 mx-auto max-w-4/5 lg:w-1/2">
                <p>Hello, I&#39;m QianXiaoMo. Nice to meet you.</p>
                <p>Full stack engineer / 2024 Graduate.</p>
                <p>-</p>
                <p>My slogan:</p>
                <ol className="list-inside list-disc text-sm font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">Read widely and travel extensively.</li>
                    <li className="mb-2">Realize that the past cannot be changed, but know that the future can be pursued.</li>
                    <li>Talk is cheap, show me the code.</li>
                </ol>
                <p>-</p>
                <p>Contact:</p>
                <p>Email: <a href="mailto:i@truimo.com">i@truimo.com</a></p>
            </main>
            <footer>
                <div className="m-8 text-center">
                    <p>Copyright &copy; 2024 <Link href="https://github.com/Truimo" target="_blank" className="hover:underline active:underline">浅小沫</Link>. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
