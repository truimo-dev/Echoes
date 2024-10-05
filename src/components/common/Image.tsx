'use client';

import {useEffect, useState} from 'react';
// import clsx from 'clsx';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

interface CamoImageProps {
    src: string
    alt: string
    className?: string
}

export function CamoImage({ src, alt, className }: CamoImageProps) {
    const [url, setUrl] = useState<string>(transparentImage);

    useEffect(() => {
        const data = { src }
        fetch('/api/camo', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response: Response) => response.text()).then((data: string) => {
            const buffer = Buffer.from(data, 'base64');
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            setUrl(url);
        })

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [])

    return (
        <img src={url} alt={alt} className={className}></img>
    )
}
