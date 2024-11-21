import NextLink from 'next/link';
import clsx from 'clsx';
import type {HTMLAttributeAnchorTarget, PropsWithChildren} from 'react';
import styles from './Link.module.css'

interface LinkProps {
    href: string;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
}


function Link(props: PropsWithChildren<LinkProps>) {
    return (
        <NextLink className={clsx(styles['link'], props.className)} href={props.href} target={props.target}>
            {props.children}
        </NextLink>
    )
}

export {
    Link
}
