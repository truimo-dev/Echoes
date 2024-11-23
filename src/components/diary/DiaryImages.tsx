import type {DiaryImage} from '@/libs/notion';
import Image from './Image';

interface DiaryImagesProps {
    images: DiaryImage[]
}

function DiaryImages({ images }: DiaryImagesProps) {
    let imagesChildren = null
    if (images.length > 0) {
        if (images.length === 1) {
            const image = images[0]
            imagesChildren = (
                <div className="w-full md:w-[80%]">
                    <figure className="relative w-full">
                        <Image className="max-w-full object-cover rounded-[4px]"
                             src={image.url} alt={image.name}/>
                    </figure>
                </div>
            )
        } else {
            if (images.length % 2 === 0) {
                imagesChildren = (
                    <div className="w-11/12 md:w-[60%] grid grid-cols-2 gap-1">
                        {images.map((image, index) => {
                            return (
                                <figure className="relative w-full aspect-square" key={index}>
                                    <Image className="h-full max-w-full object-cover rounded-[4px]"
                                         src={image.url} alt={image.name}/>
                                </figure>
                            )
                        })}
                    </div>
                )
            } else {
                imagesChildren = (
                    <div className="w-11/12 md:w-[60%] grid grid-cols-3 gap-1">
                        {images.map((image, index) => {
                            return (
                                <figure className="relative w-full aspect-square" key={index}>
                                    <Image className="h-full max-w-full object-cover rounded-[4px]"
                                         src={image.url} alt={image.name}/>
                                </figure>
                            )
                        })}
                    </div>
                )
            }
        }
        return (
            <div className="my-3 w-auto">
                {imagesChildren}
            </div>
        )
    }
    return null
}


export default DiaryImages
