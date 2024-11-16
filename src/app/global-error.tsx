'use client';

import {useEffect} from 'react';
import {Text} from '@radix-ui/themes';

export default function GlobalError({ error }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="grid justify-items-end h-screen place-content-center px-4 gap-2">
            <Text as="p" className="uppercase tracking-widest">Service issues occurred</Text>
            <Text as="p">
                <button className="btn" onClick={() => location.reload()}>Retry</button>
            </Text>
        </div>
    );
}
