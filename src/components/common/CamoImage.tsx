import type {Component} from 'solid-js';
import {createSignal, onCleanup, onMount} from 'solid-js';

const transparentImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function base64ToBlob(data: string, contentType: string = 'application/octet-stream'): Blob {
    const byteArray = Uint8Array.from(atob(data), byte => byte.charCodeAt(0));
    return new Blob([byteArray], {type: contentType});
}

interface CamoImageProps {
    src: string;
    alt: string;
    class?: string;
}

interface CamoData {
    type: string;
    content: string;
}

interface CamoBody {
    src: string;
}

async function getCamoOnline(body: CamoBody): Promise<CamoData> {
    const response = await fetch('/api/camo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });

    const headers = response.headers;
    const type = headers.get('X-Content-Type') || 'application/octet-stream';
    const content = await response.text();

    const data = {type, content};

    if ('localStorage' in window) {
        window.localStorage.setItem(`camo_${body.src}`, JSON.stringify(data));
    }

    return data;
}

function getCamoCache(body: CamoBody): Promise<CamoData> {
    return new Promise((resolve, reject) => {
        if ('localStorage' in window) {
            const item = window.localStorage.getItem(`camo_${body.src}`);
            if (item) {
                try {
                    const cached = JSON.parse(item);
                    resolve(cached);
                } catch (e) {
                    window.localStorage.removeItem(`camo_${body.src}`);
                }
            }
        }
        reject(new Error('No valid cache found'));
    });
}

function getObjectURL(data: CamoData): string {
    const blob = base64ToBlob(data.content, data.type);
    return URL.createObjectURL(blob);
}

const CamoImage: Component<CamoImageProps> = (props) => {
    const [url, setUrl] = createSignal<string>(transparentImage);

    onMount(() => {
        const data = {src: props.src};

        getCamoCache(data)
            .catch(() => getCamoOnline(data))
            .then((data: CamoData) => {
                const objectUrl = getObjectURL(data);
                setUrl(objectUrl);
            })
            .catch((error) => {
                console.error('Failed to load image:', error);
            });
    });

    onCleanup(() => {
        const currentUrl = url();
        if (transparentImage !== currentUrl) {
            URL.revokeObjectURL(currentUrl);
        }
    });

    return (
        <img src={url()} alt={props.alt} class={props.class}
             loading="lazy" referrerPolicy="no-referrer"
        />
    );
};

export default CamoImage;
