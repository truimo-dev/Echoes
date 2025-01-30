import type {Component} from 'solid-js'

interface NotSupportedProps {
    inline?: boolean
}

const NotSupported: Component<NotSupportedProps> = (props) => {
    if (props.inline) {
        return <span class="text-red-600">Not Supported Span.</span>
    }

    return <div class="text-red-600">Not Supported Block.</div>
}

export default NotSupported
