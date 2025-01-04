interface ImageProps {
    className?: string
    src: string
    alt: string
}

function Image(props: ImageProps) {
    return (
        <img className={props.className} src={props.src} alt={props.alt}
             referrerPolicy='no-referrer' loading='lazy' />
    );
}

export default Image;
