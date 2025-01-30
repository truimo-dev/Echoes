import type {ParentComponent} from 'solid-js'
import {clsxm} from '@/libs/helper'
import {getAnnotationsColor} from '@/components/notion/helper'

type BlockProps = {
    class?: string
    color?: string
}

const InlineBlock: ParentComponent<BlockProps> = (props) => {
    const colorClass = props.color ? getAnnotationsColor(props.color) : null

    return (
        <p class={clsxm('py-1 leading-normal break-words', colorClass, props.class)}>
            {props.children}
        </p>
    )
}

const Block: ParentComponent<BlockProps> = (props) => {
    const colorClass = props.color ? getAnnotationsColor(props.color) : null

    return (
        <div class={clsxm('py-1 leading-normal', colorClass, props.class)}>
            {props.children}
        </div>
    )
}

export {InlineBlock, Block}
