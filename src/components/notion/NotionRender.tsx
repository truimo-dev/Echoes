import {queryBlockList} from '@/libs/notion';
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

async function NotionPreview({id}: NotionRenderProps) {
    const response = await queryBlockList({block_id: id});

    return (
        <div>
            {response.results.map((res) => (
                <Render key={res.id} block={res}/>
            ))}
        </div>
    )
}


export {
    NotionPreview
}
