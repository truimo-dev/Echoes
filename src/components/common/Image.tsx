'use client';

import {useEffect, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
// import clsx from 'clsx';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

function base64ToBlob(data: string, contentType: string = 'application/octet-stream'): Blob {
    const byteArray = Uint8Array.from(atob(data), byte => byte.charCodeAt(0));
    return new Blob([byteArray], {type: contentType});
}

interface CamoImageProps {
    src: string
    alt: string
    className?: string
}

interface CamoData {
    type: string
    content: string
}

interface CamoBody {
    src: string
}

function getCamoOnline(body: CamoBody): Promise<CamoData> {
    return fetch('/api/camo', {
        method: 'POST',
        body: JSON.stringify(body),
    }).then((response: Response) => {
        const headers = response.headers;
        const type: string = headers.has('X-Content-Type') ? headers.get('X-Content-Type')! : 'application/octet-stream';
        return new Promise<CamoData>((resolve, reject) => {
            response.text().then((data: string) => {
                const res = {type, content: data};
                if ('sessionStorage' in window) {
                    window.sessionStorage.setItem(`camo_${body.src}`, JSON.stringify(res));
                }
                resolve(res);
            }).catch(reject);
        });
    });
}

function getCamoCache(body: CamoBody): Promise<CamoData> {
    return new Promise((resolve, reject) => {
        if ('sessionStorage' in window) {
            const item = window.sessionStorage.getItem(`camo_${body.src}`);
            if (item) {
                try {
                    resolve(JSON.parse(item));
                } catch (e) {
                    reject(e);
                }
            } else {
                reject(new Error('No Camo cache'));
            }
        } else {
            reject(new Error('No session storage'));
        }
    });
}

function getObjectURL(data: CamoData): string {
    const blob = base64ToBlob(data.content, data.type);
    return  URL.createObjectURL(blob);
}

export function CamoImage({ src, alt, className }: CamoImageProps) {
    const [url, setUrl] = useState<string>(transparentImage);

    useEffect(() => {
        const data = { src };

        getCamoCache(data).catch(() => {
            return getCamoOnline(data)
        }).then((data: CamoData) => {
            setUrl(getObjectURL(data));
        }).catch((error) => {
            console.error(error);
        });

        return () => {
            URL.revokeObjectURL(url);
        }
    }, [src])

    return (
        <img src={url} alt={alt} className={className}></img>
    )
}
