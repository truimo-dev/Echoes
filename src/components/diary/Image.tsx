import type {Component} from 'solid-js'
import {onCleanup, onMount} from 'solid-js'
import mediumZoom from 'medium-zoom'

interface ImageProps {
    class?: string
    src: string
    alt: string
}

const Image: Component<ImageProps> = (props) => {
    let imgRef: HTMLImageElement | undefined = undefined,
        zoom: ReturnType<typeof mediumZoom> | undefined = undefined;

    onMount(() => {
        if (imgRef) {
            zoom = mediumZoom(imgRef, {
                background: 'var(--background)',
            })
        }
    })

    onCleanup(() => {
        zoom?.detach()
    })

    return (
        <img ref={imgRef} src={props.src} alt={props.alt}
             class={props.class} loading='lazy' referrerPolicy='no-referrer'/>
    );
}

export default Image;
