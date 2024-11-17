import NextLink from 'next/link';
import {Link as LinkUi} from '@radix-ui/themes';
import type {HTMLAttributeAnchorTarget, PropsWithChildren} from 'react';

interface LinkProps {
    href: string;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
}

function Link(props: PropsWithChildren<LinkProps>) {
    return (
        <LinkUi href="#" className={props.className} color="gray" highContrast asChild={true}>
            <NextLink href={props.href} target={props.target}>{props.children}</NextLink>
        </LinkUi>
    )
}

export {
    Link
}
