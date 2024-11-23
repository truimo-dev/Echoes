import type {RichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import Text from '@/components/notion/blocks/Text'
import NotSupported from '@/components/notion/blocks/NotSupported'

export default function RichText({rich_text}: {
    rich_text: RichTextItemResponse[]
}) {
    return rich_text.map((text, idx) => {
        switch (text.type) {
        case 'text':
            return <Text key={idx} text={text}/>
        default:
            return <NotSupported key={idx} inline/>
        }
    })
}

