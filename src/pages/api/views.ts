import type {APIRoute} from 'astro'
import { VERCEL_ENV } from 'astro:env/server'
import { redis } from '@/libs/redis'
import { kvKeys } from '@/constant/kv'


export const GET: APIRoute = async ({ request }) => {
    let views: number = 261101

    if (null === request.headers.get('referer')) {
        views = -1
    } else if (VERCEL_ENV === 'production') {
        views = await redis.incr(kvKeys.totalPageViews)
    }

    return Response.json({
        views: views
    }, {
        headers: {
            'Cache-Control': 'no-store'
        }
    })
}
