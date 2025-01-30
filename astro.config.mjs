// @ts-check
import {defineConfig, envField} from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind({
            nesting: true,
        }),
        solidJs()
    ],
    compressHTML: true,
    i18n: {
        defaultLocale: "en",
        locales: ["en", "zh-cn"],
        routing: {
            prefixDefaultLocale: false,
        },
    },
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
        }
    },
    adapter: vercel({
        edgeMiddleware: true,
        imageService: true,
        imagesConfig: {
            sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
            domains: [],
        },
        isr: true,
    }),
});
