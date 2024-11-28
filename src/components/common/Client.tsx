'use client'

import {useEffect, useState} from 'react'
import {Link} from '@/components/ui/link'

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
            <p className="text-amber-600 dark:text-amber-400">This domain will be deprecated soon, please visit <Link href="https://www.qxm.me/" target="_self">QXM.ME</Link>.</p>
            <script dangerouslySetInnerHTML={{__html: autoRedirectScript}}></script>
        </div>
    )
}
