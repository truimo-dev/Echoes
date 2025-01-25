import {useEffect, useRef} from 'react'
import clsx from 'clsx'
import mediumZoom from 'medium-zoom'
import RichText from '@/components/notion/blocks/RichText'
import {Block} from '@/components/notion/blocks/Block'
import type {PropsWithChildren} from 'react'
import type {BlockObjectResponse} from '@notionhq/client/build/src/api-endpoints'

import styles from './Image.module.css'

function Image({block, children}: PropsWithChildren<{
    block: BlockObjectResponse
}>) {
    if ('image' !== block.type) {
        return null
    }
    const img = block.image
    const url = img.type === 'external' ? img.external.url : img.file.url

    const alt = img.caption.map((block) => block.plain_text).join('')

    return (
        <Block>
            <figure className="max-w-full w-fit mx-auto">
                <Img src={url} alt={alt} className={clsx('block max-w-full w-fit object-cover', styles.img)} />
                {img.caption.length > 0 && (
                    <figcaption className="py-1 text-right break-words text-neutral-500 text-sm">
                        <RichText rich_text={img.caption}/>
                    </figcaption>
                )}
            </figure>
        </Block>
    )
}

interface ImgProps {
    src: string
    alt: string
    className?: string
}

function Img(props: ImgProps) {
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const zoom = mediumZoom(imgRef.current ?? void 0, {
            background: 'var(--background)',
        });

        return () => {
            zoom.detach();
        }
    }, [imgRef.current]);

    return (
        <img src={props.src} alt={props.alt} className={props.className}
             ref={imgRef} loading='lazy' referrerPolicy='no-referrer' />
    )
}

export default Image
