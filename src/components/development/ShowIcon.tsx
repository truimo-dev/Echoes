'use client'

import {Icon} from '@/components/ui/icon';

function ShowIcon(props: {
    name: string;
}) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.name)
    }

    return (
        <button className="text-center space-y-2 p-4 border hover:border-sky-300" onClick={copyToClipboard}>
            <p>
                <Icon name={props.name} className="text-xl"/>
            </p>
            <p>{props.name}</p>
        </button>
    )
}

export default ShowIcon;
