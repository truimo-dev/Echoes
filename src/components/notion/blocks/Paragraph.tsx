import type {BlockRenderProps} from '@/components/notion/helper'
import RichText from '@/components/notion/blocks/RichText'
import {InlineBlock} from '@/components/notion/blocks/Block'
import NotSupported from '@/components/notion/blocks/NotSupported'


function Paragraph({block}: BlockRenderProps) {
    if ('paragraph' !== block.type) {
        return <NotSupported />
    }

    const paragraph = block.paragraph

    return (
        <InlineBlock color={paragraph.color}>
            <RichText rich_text={paragraph.rich_text}/>
        </InlineBlock>
    )
}

export default Paragraph
