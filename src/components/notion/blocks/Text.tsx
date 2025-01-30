import {clsxm} from '@/libs/helper'
import type {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import {getAnnotationsClass} from '@/components/notion/helper'

export default function Text(props: {
    text: TextRichTextItemResponse
}) {
    const rich = getAnnotationsClass(props.text.annotations)

    if (props.text.text.link) {
        return (
            <a class={clsxm('underline', rich)}
               href={props.text.text.link.url}
               rel="noreferrer" target="_blank"
            >{props.text.text.content}</a>
        )
    }

    return (
        <span class={rich}>{props.text.text.content}</span>
    )
}
