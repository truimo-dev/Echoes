import {queryDiaryCached} from '@/libs/notion';

type Params = Promise<{ slug: string }>

export async function GET(params: Params) {
    const { slug } = await params;

    const item = await queryDiaryCached(slug);

    return Response.json(item);
}
