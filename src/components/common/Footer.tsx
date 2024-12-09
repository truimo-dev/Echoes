import {after} from 'next/server';
import {kvKeys} from '@/constant/kv';
import {redis} from '@/libs/redis';
import {env} from '~/env.mjs';
import {Icon} from '@/components/ui/icon';

async function TotalPageViews() {
    console.log('TotalPageViews Rendered');

    let views: number
    if (env.VERCEL_ENV === 'production') {
        views = await redis.incr(kvKeys.totalPageViews)
    } else {
        views = 241101
    }

    return (
        <span><Icon name="friend"/>&nbsp;Total page views&nbsp;{views}</span>
    )
}

interface VisitorGeolocation {
    country: string
    city?: string
    flag: string
}

async function LastVisitorInfo() {
    let lastVisitor: VisitorGeolocation | undefined = undefined
    if (env.VERCEL_ENV === 'production') {
        const [lv, cv] = await redis.mget<VisitorGeolocation[]>(
            kvKeys.lastVisitor,
            kvKeys.currentVisitor
        )
        lastVisitor = lv

        after(redis.set(kvKeys.lastVisitor, cv))
    }

    if (!lastVisitor) {
        lastVisitor = {
            country: 'US',
            city: 'New York',
            flag: '🇺🇸',
        }
    }

    return (
        <span>
            <span><Icon name="favor"/>&nbsp;Recent visitors have come from {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}&nbsp;</span>
            <span className="font-medium">{lastVisitor.flag}</span>
        </span>
    )
}

export {
    TotalPageViews, LastVisitorInfo
}
