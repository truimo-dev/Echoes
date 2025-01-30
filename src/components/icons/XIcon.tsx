import type {Component} from 'solid-js'
import {splitProps} from 'solid-js'
import type {IconProps} from './index'

export const XIcon: Component<IconProps> = (props) => {
    const [local, others] = splitProps(props, ['class'])

    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class={local.class}
            {...others}
        >
            <path
                d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    )
}
