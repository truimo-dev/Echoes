import {useMemo} from 'react';
import styles from '@/components/ui/icon/IconFont.module.css'
import ShowIcon from '@/components/development/ShowIcon';
import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Icons Library',
};

export default function Page() {
    const icons: string[] = useMemo(() => {
        const icons: string[] = [], noUse: string[] = ['icon-default', 'icon'];

        for (const key in styles) {
            if (noUse.indexOf(key) !== -1) {
                continue
            }

            icons.push(key.slice(5))
        }

        return icons;
    }, [])

    return (
        <section>
            <h1 className="text-2xl pt-4">Icons Library</h1>
            <p>Click Copy Name.</p>
            <div className="grid md:grid-cols-6 grid-cols-3 py-4">
                {icons.map((name: string) => {
                    return (
                        <ShowIcon name={name} key={name}/>
                    )
                })}
            </div>
        </section>
    )
}

