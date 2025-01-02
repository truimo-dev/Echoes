import type {PropsWithChildren} from 'react';
import {ReactQueryProvider} from '@/providers/react-query-provider';

export default async function DiaryLayout(props: PropsWithChildren) {
    return (
        <ReactQueryProvider>
            {props.children}
        </ReactQueryProvider>
    )
}
