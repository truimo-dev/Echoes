import NextImage from 'next/image'
import {getImageInfo} from '@/libs/notion';

interface ImageProps {
    className?: string;
    src: string;
    alt: string;
}

async function Image(props: ImageProps) {
    const info = await getImageInfo(props.src);

    return (
        <NextImage className={props.className} src={props.src} alt={props.alt}
                   width={info.width} height={info.height} placeholder='blur' blurDataURL={info.blur} unoptimized
        />
    )
}

export default Image
