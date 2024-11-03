import type {PropsWithChildren} from 'react';
// import clsx from 'clsx';
import Link from 'next/link';
import {geistSans} from '@/fonts';
import {Block} from '@/components/layout/Home';

function Nav() {
    return (
        <Block className={geistSans.className} as='nav'>
            <div className="py-4 text-xl space-x-6">
                <Link href="/" className="font-bold">M.</Link>
                <span className="space-x-4">
                    <Link href="/diary" className="text-base">Diary</Link>
                    <Link href="/#" className="text-base">Posts</Link>
                </span>
            </div>
        </Block>
    )
}

function Header() {
    return (
        <header className="">
            <Nav/>
        </header>
    )
}


function Footer() {
    return (
        <footer>
        </footer>
    )
}

function Main(props: PropsWithChildren) {
    return (
        <main>
            {props.children}
        </main>
    )
}

export {
    Nav, Header, Footer, Main
}
