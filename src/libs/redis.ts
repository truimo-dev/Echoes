import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';

import { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } from 'astro:env/server';

export const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter, that allows 30 requests per 10 seconds
export const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '10 s'),
    analytics: true,
});
