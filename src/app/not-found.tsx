import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="grid justify-items-end h-screen place-content-center px-4 gap-2">
            <h1 className="uppercase tracking-widest text-gray-600 dark:text-gray-200">404 | Not Found</h1>
            <p className="text-gray-500 dark:text-gray-300">
                <Link href="/">Go Back Home</Link>
            </p>
        </div>
    );
}
