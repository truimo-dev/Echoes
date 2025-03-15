import type {APIRoute} from 'astro';

export const GET: APIRoute = async ({params, request}) => {
    // console.log(params, request);
    const url = new URL(request.url)
    const start = url.searchParams.get('start')

    return new Response(
        JSON.stringify({
            message: "This was a GET!",
            start: start
        })
    )
}
