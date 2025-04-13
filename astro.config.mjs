// @ts-check
import {defineConfig, envField} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss()
        ],
    },
    integrations: [
        solidJs()
    ],
    compressHTML: true,
    output: 'server',
    env: {
        schema: {
            VERCEL_ENV: envField.string({
                context: 'server',
                access: 'public',
                default: 'development',
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
            CAMO_KEY: envField.string({
                context: 'server',
                access: 'secret',
            }),
        }
    },
    adapter: vercel({
        edgeMiddleware: true,
        isr: true,
        imageService: true,
        imagesConfig: {
            sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
            domains: [],
        }
    }),
});
