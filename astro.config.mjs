// @ts-check
import {defineConfig, envField} from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind({
            nesting: true,
        }),
        react(),
    ],
    compressHTML: true,
    output: 'server',
    env: {
        schema: {
            VERCEL_ENV: envField.string({
                context: 'server',
                access: 'public',
                optional: true,
            }),
            UPSTASH_REDIS_REST_TOKEN: envField.string({
                context: 'server',
                access: 'secret',
            }),
            UPSTASH_REDIS_REST_URL: envField.string({
                context: 'server',
                access: 'public',
                default: 'https://example.upstash.io'
            }),
            NOTION_KEY: envField.string({
                context: 'server',
                access: 'secret',
            }),
            NOTION_DIARY_DATABASE_ID: envField.string({
                context: 'server',
                access: 'public',
            }),
            NOTION_IMAGES_DATABASE_ID: envField.string({
                context: 'server',
                access: 'public',
            }),
        }
    },
    adapter: vercel({
        edgeMiddleware: true,
        imageService: true,
        isr: true,
    }),
});
