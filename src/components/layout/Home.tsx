import {Suspense} from 'react';
import type {ElementType, PropsWithChildren} from 'react';
import clsx from 'clsx';
import {geistSans} from '@/fonts';
import {Component} from '@/components/common/Component';
import {LastVisitorInfo, TotalPageViews} from '@/components/common/Footer';
import {Link} from '@/components/ui/link';
import {GitHubIcon} from '@/assets';

type BlockProps = PropsWithChildren<{
    className?: string;
    as?: ElementType;
}>

export function Block(props: BlockProps) {
    return (
        <Component as={props.as} className={clsx('mx-auto max-w-4/5 lg:w-1/2', props.className)}>
            {props.children}
        </Component>
    );
}

export function Container({children, className}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <div className={clsx(geistSans.className, className)}>{children}</div>
    )
}

export function Content({children, className}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <Block className={className}>{children}</Block>
    )
}

function Header() {
    return (
        <header>
            <div className="mx-auto space-x-6 py-4 px-8 max-w-7xl">
                <Link href="/" className="font-bold text-xl">M.</Link>
                <span className="space-x-4">
                    <Link href="/diary">Diary</Link>
                    <Link href="#">Posts</Link>
                    <Link href="/friends">Friends</Link>
                    <Link href="https://github.com/Truimo" target="_blank">
                        <GitHubIcon/>&nbsp;Github
                    </Link>
                </span>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer>
            <div className="mx-auto py-4 px-8 max-w-7xl">
                <p><Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"
                         rel="noopener noreferrer">CC BY-NC-SA 4.0</Link></p>
                <p>Copyright &copy; 2024 <Link href="https://github.com/Truimo" target="_blank">Truimo</Link>. All
                    Rights Reserved.</p>
                <p>
                    <Suspense>
                        <TotalPageViews/>
                    </Suspense>
                    <span>&nbsp;</span>
                    <Suspense>
                        <LastVisitorInfo/>
                    </Suspense>
                </p>
            </div>
        </footer>
    )
}

export function Home(props: PropsWithChildren) {
    return (
        <>
            <Header/>
            <main className="fill-content mx-4">
                {props.children}
            </main>
            <Footer/>
        </>
    )
}
