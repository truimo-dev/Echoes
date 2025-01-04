interface ImageProps {
    className?: string
    src: string
    alt: string
}

function Image(props: ImageProps) {
    return (
        <img className={props.className} referrerPolicy='no-referrer' src={props.src} alt={props.alt} />
    );
}

export default Image;
