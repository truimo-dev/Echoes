import {Suspense} from 'react';
import clsx from 'clsx';
import type {DiaryItem} from '@/libs/notion';
import {NotionPreview} from '@/components/notion/NotionRender';
import DiaryImages from '@/components/diary/DiaryImages';
import {Icon} from "@/components/ui/icon";
import {Link} from "@/components/ui/link";
import styles from './DiaryCard.module.css';


interface DiaryCardProps {
    diary: DiaryItem;
}

function DiaryCard({diary}: DiaryCardProps) {
    if ('words' === diary.type) {
        return (
            <article className={clsx('rounded-xl p-3.5 bg-zinc-600/5 dark:bg-zinc-500/20', styles.article)}>
                <Suspense>
                    <DiaryImages className="mb-3" images={diary.images}/>
                </Suspense>
                <Suspense>
                    <NotionPreview id={diary.id}/>
                </Suspense>
                <div className="flex items-center justify-between">
                    <div className="text-gray-800 text-xs text-left dark:text-gray-300">
                        <p><Link href={`/diary/${diary.name}`}>Read More.</Link></p>
                    </div>
                    <div>
                        <p className="text-gray-800 text-xs text-right dark:text-gray-300">
                            <Icon name='time'/>
                            <span>&nbsp;</span>
                            <time dateTime={diary.date.toString()}>{diary.date.format('YYYY-MM-DD')}</time>
                        </p>
                    </div>
                </div>
            </article>
        )
    }

    return null
}

export default DiaryCard
