import {Suspense} from 'react';
import type {DiaryItem} from '@/libs/notion';
import {NotionPreview} from '@/components/notion/NotionRender';
import DiaryImages from '@/components/diary/DiaryImages';
import {Icon} from "@/components/ui/icon";
import {Link} from "@/components/ui/link";

interface DiaryCardProps {
    diary: DiaryItem;
}

function DiaryCard({diary}: DiaryCardProps) {
    if ('words' === diary.type) {
        return (
            <article className="border rounded-xl p-3.5 w-[fit-content] max-w-full">
                <Suspense>
                    <DiaryImages images={diary.images}/>
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
