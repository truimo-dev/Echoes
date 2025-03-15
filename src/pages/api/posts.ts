import type {APIRoute} from 'astro';

export const GET: APIRoute = ({params, request}) => {
    // console.log(params, request);

    return new Response(
        JSON.stringify({
            message: "This was a GET!"
        })
    )
}
