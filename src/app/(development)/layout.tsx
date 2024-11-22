import type {PropsWithChildren} from 'react';


export default function Layout(props: PropsWithChildren) {
    return (
        <div className="mx-auto max-w-3xl">
            {props.children}
        </div>
    )
}