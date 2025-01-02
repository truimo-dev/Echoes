import type {NextRequest} from 'next/server';
import {queryDiaryCached} from '@/libs/notion';

type Params = Promise<{ slug: string }>

interface Args {
    params: Params
}

export async function GET(_request: NextRequest, {params}: Args) {
    const {slug} = await params;

    const item = await queryDiaryCached(slug);

    return Response.json(item);
}
