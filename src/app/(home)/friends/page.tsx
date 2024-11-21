import Link from 'next/link';
import {CamoImage} from '@/components/common/Image';
import {friends} from '@/constant/friends';
import type {Metadata} from 'next';
import type {FriendItem} from '@/constant/friends';

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
            <CamoImage src={it.icon} alt={it.description} className="inline-block h-14 w-14 aspect-square rounded-xl"/>
            <p>{it.title}</p>
        </Link>
    )
}

export default function Friends() {
    return (
        <div className="mx-auto max-w-3xl">
            <section className="mx-4">
                <h1 className="text-2xl font-bold">Friends</h1>
                <h3>You can visit my friends&#39; websites. <Link className="underline" href="https://github.com/Truimo/me?tab=readme-ov-file#become-friends-with-me" target="_blank">Become friends</Link> with me.</h3>
                <div className="space-x-6 my-4">
                    {friends.map((item) => (
                        <Friend it={item} key={item.href}/>
                    ))}
                </div>
            </section>
        </div>
    )
}
