import Link from 'next/link';
import {Container, Nav} from '@/components/layout/Home';
import {CamoImage} from '@/components/common/Image';
import {friends} from '@/constant/friends';
import type {FriendItem} from '@/constant/friends';
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Friends',
    description: 'There are friend Links.',
    alternates: {
        canonical: 'https://www.qxm.me/friends',
    }
};

function Friend({ it }: {
    it: FriendItem
}) {
    return (
        <Link href={it.href} title={it.title} target="_blank" className="text-center inline-block space-y-2">
            <CamoImage src={it.icon} alt={it.description} className="inline-block h-14 w-14 aspect-square rounded-full"/>
            <p>{it.title}</p>
        </Link>
    )
}

export default function Friends() {
    return (
        <Container>
            <Nav/>
            <main className="mx-auto max-w-4/5 lg:w-1/2">
                <div className="space-x-6 my-8">
                    {friends.map((item) => (
                        <Friend it={item} key={item.href}/>
                    ))}
                </div>
            </main>
        </Container>
    )
}
