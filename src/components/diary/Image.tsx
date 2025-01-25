import {useEffect, useRef} from 'react'
import mediumZoom from 'medium-zoom'

interface ImageProps {
    className?: string
    src: string
    alt: string
}

function Image(props: ImageProps) {
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
    );
}

export default Image;
