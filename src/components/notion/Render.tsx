// @ts-nocheck
import type {Component} from 'solid-js';
import {Match, Switch, Show} from 'solid-js';
import type {BlockResponse} from '@/libs/notion';
import NotSupported from '@/components/notion/blocks/NotSupported';
import Paragraph from '@/components/notion/blocks/Paragraph';
import Image from '@/components/notion/blocks/Image';

interface RenderProps {
    block: BlockResponse;
}

const Render: Component<RenderProps> = (props) => {
    return (
        <Show when={'type' in props.block} fallback={<NotSupported/>}>
            <Switch fallback={<NotSupported/>}>
                <Match when={'paragraph' === props.block.type}>
                    <Paragraph block={props.block}/>
                </Match>
                <Match when={'image' === props.block.type}>
                    <Image block={props.block}/>
                </Match>
            </Switch>
        </Show>
    );
};

export default Render;
