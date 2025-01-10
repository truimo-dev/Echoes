import type {BlockResponse} from '@/libs/notion';
import NotSupported from '@/components/notion/blocks/NotSupported';
import Paragraph from '@/components/notion/blocks/Paragraph';
import Image from '@/components/notion/blocks/Image.tsx';

interface RenderProps {
    block: BlockResponse
}

function Render({block}: RenderProps) {
    if ('type' in block) {
        switch (block.type) {
        case 'paragraph':
            return (
                <Paragraph block={block}/>
            )
        case 'image':
            return (
                <Image block={block} />
            )
        }
    }

    return <NotSupported/>
}

export default Render;
