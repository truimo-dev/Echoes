import type {BlockResponse} from '@/libs/notion';
import Paragraph from '@/components/notion/blocks/Paragraph';
import NotSupported from '@/components/notion/blocks/NotSupported';

interface NotionRenderProps {
    id: string;
}

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
        }
    }

    return <NotSupported/>
}

export default Render;
