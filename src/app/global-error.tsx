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
            <h1 className="uppercase tracking-widest text-gray-600 dark:text-gray-200">Service issues occurred</h1>
            <p className="text-gray-500 dark:text-gray-300">
                <button className="btn" onClick={() => location.reload()}>Retry</button>
            </p>
        </div>
    );
}
