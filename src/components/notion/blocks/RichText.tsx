// @ts-nocheck
import type {RichTextItemResponse} from '@notionhq/client/build/src/api-endpoints'
import {For, Switch, Match} from 'solid-js'
import Text from '@/components/notion/blocks/Text'
import NotSupported from '@/components/notion/blocks/NotSupported'

export default function RichText(props: {
    rich_text: RichTextItemResponse[]
}) {
    return (
        <For each={props.rich_text}>
            {(text) => (
                <Switch fallback={<NotSupported inline/>}>
                    <Match when={'text' === text.type}>
                        <Text text={text}/>
                    </Match>
                </Switch>
            )}
        </For>
    )
}
