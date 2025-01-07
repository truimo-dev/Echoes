import type { APIContext, MiddlewareNext } from 'astro';
import {geolocation, waitUntil} from '@vercel/functions';
import {kvKeys} from '@/constant/kv';
import {redis} from '@/libs/redis';

import { VERCEL_ENV } from 'astro:env/server';

export function onRequest(context: APIContext, next: MiddlewareNext): Promise<Response> | Response | Promise<void> | void {
    
    const { pathname } = context.url, geo = geolocation(context.request);
    
    if (geo !== null && VERCEL_ENV === 'production' && pathname !== '/_server-islands/FooterInfo') {
        waitUntil(
            redis.set(kvKeys.currentVisitor, {
                country: geo.country,
                city: geo.city,
                flag: geo.flag,
            })
        );
    }

    return next();
}
