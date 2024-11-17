import {Suspense} from 'react';
import Image from 'next/image';
import type {ElementType, PropsWithChildren} from 'react';
import clsx from 'clsx';
import {geistSans} from '@/fonts';
import {Component} from '@/components/common/Component';
import {LastVisitorInfo, TotalPageViews} from '@/components/common/Footer';
import {GitHubLogoIcon} from '@radix-ui/react-icons';
import {Link} from '@/components/ui/Link';
import {Box, Text} from '@radix-ui/themes';

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

export function Nav() {
    return (
        <Block as='nav'>
            <Box py="4" className="space-x-6">
                <Link href="/">
                    <Text size="5" weight="bold">M.</Text>
                </Link>
                <span className="space-x-4">
                    <Link href="/diary">Diary</Link>
                    <Link href="/#">Posts</Link>
                    <Link href="/friends">Friends</Link>
                    <Link href="https://github.com/Truimo" target="_blank">
                        <GitHubLogoIcon />&nbsp;Github
                    </Link>
                </span>
            </Box>
        </Block>
    )
}

export function Header() {
    return (
        <header className="font-normal static top-8">
            <Block className="my-8">
                <div className="flex items-end gap-x-4">
                    <div className="shrink-0">
                        <Image src="/avatar.jpg" alt="avatar" height="96" width="96" className="rounded-full w-24 h-24 aspect-square"></Image>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold my-2">Xiaomo Qian</h1>
                        <p>Meeting you is the best of the best.</p>
                    </div>
                </div>
            </Block>
        </header>
    )
}

export async function Footer() {
    return (
        <footer>
            <div className="m-8 text-center">
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
