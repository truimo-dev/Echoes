import {Icon} from '@/components/ui/icon';
import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Diary',
    description: 'There are my diary.',
    alternates: {
        canonical: 'https://www.qxm.me/diary',
    }
}

export default function Page() {
    return (
        <div className="">
            Waiting for develop... <Icon name='edit' />
        </div>
    );
}
