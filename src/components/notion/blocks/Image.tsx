import type {ParentProps} from 'solid-js'
import {onCleanup, onMount, Show} from 'solid-js'
import clsx from 'clsx'
import mediumZoom from 'medium-zoom'
import RichText from '@/components/notion/blocks/RichText'
import {Block} from '@/components/notion/blocks/Block'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

import styles from './Image.module.css'

function Image(props: ParentProps<{
    block: BlockObjectResponse
}>) {
    if ('image' !== props.block.type) {
        return null
    }

    const img = props.block.image
    const url = img.type === 'external' ? img.external.url : img.file.url
    const alt = img.caption.map((block) => block.plain_text).join('')

    return (
        <Block>
            <figure class="max-w-full w-fit mx-auto">
                <Img src={url} alt={alt}
                     class={clsx('block max-w-full w-fit object-cover', styles.img)}
                />
                <Show when={img.caption.length > 0}>
                    <figcaption class="py-1 text-right break-words text-neutral-500 text-sm">
                        <RichText rich_text={img.caption}/>
                    </figcaption>
                </Show>
            </figure>
        </Block>
    )
}

interface ImgProps {
    src: string
    alt: string
    class?: string
}

function Img(props: ImgProps) {
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
        <img src={props.src} alt={props.alt} class={props.class} ref={imgRef}
             loading='lazy' referrerPolicy='no-referrer'
        />
    )
}

export default Image
