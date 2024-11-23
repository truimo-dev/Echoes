'use client';

import {useEffect} from 'react';

export default function GlobalError({ error }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="grid justify-items-end h-screen place-content-center px-4 gap-2">
            <p className="uppercase tracking-widest">Service issues occurred</p>
            <p>
                <button className="btn" onClick={() => location.reload()}>Retry</button>
            </p>
        </div>
    );
}
