import Image from 'next/image';
import {geistMono} from '@/fonts';
import {Link} from '@/components/ui/link';
import type {Metadata} from 'next';
import {PropsWithChildren} from 'react';

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://www.qxm.me',
    }
}

function Header() {
    return (
        <header className="font-normal">
            <div className="flex items-end gap-x-4">
                <div className="shrink-0">
                    <Image src="/avatar.jpg" alt="avatar" height="96" width="96"
                           className="rounded-full w-24 h-24 aspect-square" priority></Image>
                </div>
                <div>
                    <h1 className="text-2xl font-bold my-2">Xiaomo Qian</h1>
                    <p>Meeting you is the best of the best.</p>
                </div>
            </div>
        </header>
    )
}

function Section(props: PropsWithChildren) {
    return (
        <section className="grid grid-cols-1 gap-y-2">
            {props.children}
        </section>
    )
}

export default function Home() {
    return (
        <div className="mx-auto max-w-3xl">
            <article className="space-y-4">
                <Header/>
                <div className="space-y-10 mx-4">
                    <Section>
                        <p>Hi.</p>
                        <p>My name is QianXiaomo (<span className="text-primary">QXM</span>, for short). I’m a software
                            developer.</p>
                    </Section>
                    <Section>
                        <p>My slogan:</p>
                        <ol className={`list-inside list-disc text-sm ${geistMono.className}`}>
                            <li className="mb-2">Read widely and travel extensively.</li>
                            <li className="mb-2">Realize that the past cannot be changed, but know that the future can
                                be
                                pursued.
                            </li>
                            <li>Talk is cheap, show me the code.</li>
                        </ol>
                    </Section>
                    <Section>
                        <p>Contact:</p>
                        <p>Email: <Link href="mailto:hi@xdm.me">hi@qxm.me</Link></p>
                    </Section>
                </div>
            </article>
        </div>
    );
}
