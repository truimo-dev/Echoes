import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'MJ12bot',
                disallow: '/'
            }, {
                userAgent: 'SemrushBot',
                disallow: '/'
            }, {
                userAgent: 'dotbot',
                disallow: '/'
            }, {
                userAgent: 'SMTBot',
                disallow: '/'
            }, {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/development/'
                ],
            },
        ],
    }
}
