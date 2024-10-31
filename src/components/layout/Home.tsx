import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type {ElementType, PropsWithChildren} from 'react';
import clsx from 'clsx';
import {geistSans} from '@/fonts';
import {Component} from '@/components/common/Component';
import {Icon} from '@/components/common/Icon';
import {LastVisitorInfo, TotalPageViews} from "@/components/common/Footer";

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
            <div className="my-4 text-xl space-x-6">
                <Link href="/" className="font-bold">M.</Link>
                <span className="space-x-4">
                    <Link href="/diary" className="text-base">Diary</Link>
                    <Link href="/#" className="text-base">Posts</Link>
                    <Link href="/friends" className="text-base">Friends</Link>
                    <Link href="https://github.com/Truimo" target="_blank" className="text-base">Github&nbsp;<Icon name="link1"/></Link>
                </span>
            </div>
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
                    <React.Suspense>
                        <TotalPageViews/>
                    </React.Suspense>
                    <span>&nbsp;</span>
                    <React.Suspense>
                        <LastVisitorInfo/>
                    </React.Suspense>
                </p>
            </div>
        </footer>
    )
}
