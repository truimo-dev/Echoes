import NextLink from 'next/link';
import {Text, Link} from '@radix-ui/themes';

export default function NotFound() {
    return (
        <div className="grid justify-items-end h-screen place-content-center px-4 gap-2">
            <Text as="p" className="uppercase tracking-widest">404 | Not Found</Text>
            <Text as="p">
                <Link asChild={true} href="#" color="gray">
                    <NextLink href="/">Go Back Home</NextLink>
                </Link>
            </Text>
        </div>
    );
}
