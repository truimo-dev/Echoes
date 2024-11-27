import type {Metadata} from 'next';
import {queryDiaryList} from '@/libs/notion';
import DiaryList from '@/components/diary/DiaryList';

export const metadata: Metadata = {
    title: 'Diary',
    description: 'There are my diary.',
    alternates: {
        canonical: 'https://www.qxm.me/diary',
    }
}

// export const experimental_ppr = true

export default async function Page() {
    const list = await queryDiaryList();

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mx-4">
                <p className="text-2xl font-bold">Latest Posts💫</p>
            </div>
            <div className="select-none mx-4 mt-4">
                    <DiaryList list={list}/>
            </div>
        </div>
    );
}
