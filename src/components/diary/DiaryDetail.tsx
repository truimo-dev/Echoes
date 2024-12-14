import {Suspense} from 'react'
import DiaryImages from '@/components/diary/DiaryImages'
import {NotionPreview} from '@/components/notion/NotionRender'
import {Icon} from '@/components/ui/icon'
import type {DiaryItem} from '@/libs/notion'

interface DiaryDetailProps {
    diary: DiaryItem;
}

function DiaryDetail({diary}: DiaryDetailProps) {
    if ('words' === diary.type) {
        return (
            <article>
                <Suspense>
                    <DiaryImages className="my-3" images={diary.images}/>
                </Suspense>
                <Suspense>
                    <NotionPreview id={diary.id}/>
                </Suspense>
                <p className="text-gray-800 text-xs text-right dark:text-gray-300">
                    <Icon name='time'/>
                    <span>&nbsp;</span>
                    <time dateTime={diary.date.toString()}>{diary.date.format('YYYY-MM-DD')}</time>
                </p>
            </article>
        )
    }

    return null
}

export default DiaryDetail;
