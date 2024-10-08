import { iconfont } from '@/fonts';
import clsx from 'clsx';

interface IconProps {
    className?: string;
    name: string;
}

function Icon(props: IconProps) {
    return (
        <i className={clsx('icon', iconfont.className, `icon-${props.name}`, props.className)}></i>
    )
}

export {
    Icon
}
