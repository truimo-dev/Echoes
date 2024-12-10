import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {queryDiaryCached, queryDiaryListCached} from '@/libs/notion'
import DiaryDetail from '@/components/diary/DiaryDetail'

type Params = Promise<{ slug: string }>

export const experimental_ppr = true
export const dynamicParams = true

export async function generateStaticParams() {
    const response = await queryDiaryListCached()
    return response.filter((diary) => {
        // todo only words support
        return diary.type === 'words'
    }).map((diary) => ({
        slug: diary.name,
    }))
}

export const generateMetadata = async (props: {
    params: Params
}): Promise<Metadata> => {
    const {slug} = await props.params
    const diary = await queryDiaryCached(slug)

    if (null === diary) {
        return {}
    }

    const title = `Diary #${diary.title.length > 0 ? diary.title : diary.name}`

    return {
        title,
        description: 'There are my diary.',
        alternates: {
            canonical: `https://www.qxm.me/diary/${slug}`,
        }
    }
}

export default async function Page(props: {
    params: Params
}) {
    const params = await props.params
    const diary = await queryDiaryCached(params.slug)

    if (null === diary) {
        return notFound()
    }

    const title = `Diary #${diary.title.length > 0 ? diary.title : diary.name}`

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mx-4">
                <p className="text-2xl font-bold">{title}</p>
            </div>
            <div className="select-none mx-4">
                <DiaryDetail diary={diary}/>
            </div>
        </div>
    )
}
