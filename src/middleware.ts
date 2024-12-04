import {waitUntil} from '@vercel/functions';
import {NextRequest, NextResponse} from 'next/server';
import {geolocation} from '@vercel/functions';
import {env} from '~/env.mjs';
import {kvKeys} from '@/constant/kv';
import {redis} from '@/libs/redis';

const isProd = process.env.NODE_ENV === 'production'

const cspHeader = isProd ? `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://shp.qpic.cn blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
` : `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://shp.qpic.cn blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

function middleware(request: NextRequest) {
    const csp = cspHeader.replace(/\s{2,}/g, ' ').trim()

    const response = NextResponse.next()
    response.headers.set('Content-Security-Policy', csp)

    const geo = geolocation(request)
    if (geo !== null && env.VERCEL_ENV === 'production') {
        waitUntil(redis.set(kvKeys.currentVisitor, {
            country: geo.country,
            city: geo.city,
            flag: geo.flag,
        }))
    }

    return response
}

export default middleware;
