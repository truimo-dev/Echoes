'use client'

import {useEffect, useState} from 'react'
import NextLink from 'next/link';
import {Callout, Link} from '@radix-ui/themes';
import {InfoCircledIcon} from '@radix-ui/react-icons';

function useHostname(): string {
    const [hostname, setHostname] = useState<string>('')

    useEffect(() => {
        if (typeof window === 'object') {
            setHostname(window.location.hostname)
        }
    }, [])

    return hostname
}

// const styles: CSSProperties = {
//     borderBottom: '0.5px solid #bababa33'
// }

const autoRedirectScript: string = `setTimeout(function () { window.open('https://www.qxm.me' + window.location.pathname, '_self') }, 2e3)`;

export function DeprecatedDomain() {
    const h = useHostname()

    if (!h.endsWith('xdm.me')) {
        return null
    }

    return (
        <div className="mx-auto pt-4 max-w-4/5 lg:w-1/2 text-center">
            <Callout.Root color="orange" variant="surface">
                <Callout.Icon>
                    <InfoCircledIcon/>
                </Callout.Icon>
                <Callout.Text>
                    This domain will be deprecated soon, please visit <Link asChild={true} href="#">
                    <NextLink href="https://www.qxm.me/" target="_self">QXM.ME</NextLink>
                </Link>.
                </Callout.Text>
            </Callout.Root>
            <script dangerouslySetInnerHTML={{__html: autoRedirectScript}}></script>
        </div>
    )
}
