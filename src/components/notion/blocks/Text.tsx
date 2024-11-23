import {clsxm} from '@/libs/helper'

import type {TextRichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import {getAnnotationsClass} from '@/components/notion/helper';

export default function Text({text}: {
    text: TextRichTextItemResponse
}) {
    const rich = getAnnotationsClass(text.annotations)

    if (text.text.link) {
        return (
            <a className={clsxm('underline', rich)} href={text.text.link.url}
               rel="noreferrer" target="_blank">{text.text.content}</a>
        )
    }

    return (
        <span className={rich}>{text.text.content}</span>
    )
}
