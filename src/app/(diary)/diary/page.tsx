import {Icon} from '@/components/common/Icon';
import type {Metadata} from 'next';

export const metadata: Metadata = {
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
