// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'
import solidJs from '@astrojs/solid-js'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import { rehypeImageWrapper } from './src/libs/rehype-plugin.js'


// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss()
        ],
    },
    site: 'https://www.qxm.me',
    integrations: [solidJs(), mdx(), sitemap()],
    compressHTML: true,
    output: 'server',
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            defaultColor: false,
            wrap: false,
        },
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['math'],
        },
        rehypePlugins: [rehypeImageWrapper],
    },
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
            CAMO_KEY: envField.string({
                context: 'server',
                access: 'secret',
            }),
        }
    },
    adapter: vercel({
        edgeMiddleware: true,
        isr: {
            bypassToken: '87c151e1-94ab-466b-809a-5d007ed88f9f',
            exclude: [
                '/api/views',
            ]
        },
        imageService: true,
        imagesConfig: {
            sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
            domains: [],
        }
    }),
});
