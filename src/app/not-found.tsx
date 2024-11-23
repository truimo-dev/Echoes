import {Link} from '@/components/ui/link';

export default function NotFound() {
    return (
        <div className="grid justify-items-end h-screen place-content-center px-4 gap-2">
            <p className="uppercase tracking-widest">404 | Not Found</p>
            <p>
                <Link href="/">Go Back Home</Link>
            </p>
        </div>
    );
}
