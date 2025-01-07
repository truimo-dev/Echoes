import type { APIContext, MiddlewareNext } from 'astro';
/*
import {geolocation, waitUntil} from '@vercel/functions';
import {kvKeys} from '@/constant/kv';
import {redis} from '@/libs/redis';

import { VERCEL_ENV } from 'astro:env/server';
*/

export function onRequest(context: APIContext, next: MiddlewareNext): Promise<Response> | Response | Promise<void> | void {
    
    /* const geo = geolocation(context.request);

    if (geo !== null && VERCEL_ENV === 'production') {
        waitUntil(
            redis.set(kvKeys.currentVisitor, {
                country: geo.country,
                city: geo.city,
                flag: geo.flag,
            })
        );
    } */

    return next();
}
