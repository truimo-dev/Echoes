import type {NextRequest} from 'next/server';
import {queryDiaryListCached} from '@/libs/notion';

interface QueryLimit {
    start?: string
    size?: number
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get('cursor');

    const limit: QueryLimit = {
        size: 10,
    };

    if (cursor && cursor.length > 0) {
        limit.start = cursor;
    }

    const list = await queryDiaryListCached({ limit });

    return Response.json(list);
}
