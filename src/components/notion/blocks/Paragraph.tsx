import type {BlockRenderProps} from '@/components/notion/helper'
import {Show} from 'solid-js'
import RichText from '@/components/notion/blocks/RichText'
import {InlineBlock} from '@/components/notion/blocks/Block'
import NotSupported from '@/components/notion/blocks/NotSupported'

function Paragraph(props: BlockRenderProps) {
    const isParagraph = () => {
        if (props.block.type === 'paragraph') {
            return props.block.paragraph
        }
        return undefined
    }

    return (
        <Show when={isParagraph()} fallback={<NotSupported/>}>
            {(paragraph) => (
                <InlineBlock color={paragraph().color}>
                    <RichText rich_text={paragraph().rich_text}/>
                </InlineBlock>
            )}
        </Show>
    )
}

export default Paragraph
