import {useMemo} from 'react';
import clsx from 'clsx';
import {iconfont} from '@/fonts';
import styles from './IconFont.module.css'

interface IconProps {
    className?: string;
    name: string;
}

function Icon(props: IconProps) {
    const iconClass: string = useMemo(() => {
        const name: string = `icon-${props.name}`

        if (name in styles) {
            return styles[name]
        }

        return styles['icon-default']
    }, [props.name])

    return (
        <i className={clsx('select-none', styles.icon, iconfont.className, iconClass, props.className)}></i>
    )
}

export {
    Icon
}
