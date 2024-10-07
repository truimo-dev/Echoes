'use client';

import {useEffect, useState} from 'react';
// import clsx from 'clsx';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

function base64ToBlob(data: string, contentType: string = 'application/octet-stream'): Blob {
    const bytes = atob(data);
    const byteLen = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
        byteLen[i] = bytes.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteLen);
    return new Blob([byteArray], {type: contentType});
}

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
        }).then((response: Response) => {
            const headers = response.headers;
            const type: string = headers.has('X-Content-Type') ? headers.get('X-Content-Type')! : 'application/octet-stream';
            return new Promise<{
                type: string,
                content: string,
            }>((resolve, reject) => {
                response.text().then((data: string) => {
                    resolve({
                        type, content: data,
                    })
                }).catch(reject)
            })
        }).then((data: {
            type: string,
            content: string
        }) => {
            const blob = base64ToBlob(data.content, data.type)
            const url = URL.createObjectURL(blob);
            setUrl(url);
        })

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [src])

    return (
        <img src={url} alt={alt} className={className}></img>
    )
}
