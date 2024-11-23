import {z} from 'zod'

/**
 * Specify server-side environment variables schema here.
 */
const server = z.object({
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).default('development'),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    NOTION_KEY: z.string().min(1),
    NOTION_DIARY_DATABASE_ID: z.string().min(1),
    NOTION_IMAGES_DATABASE_ID: z.string().min(1),
});

const client = z.object({
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    VERCEL_ENV: process.env.VERCEL_ENV,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NOTION_KEY: process.env.NOTION_KEY,
    NOTION_DIARY_DATABASE_ID: process.env.NOTION_DIARY_DATABASE_ID,
    NOTION_IMAGES_DATABASE_ID: process.env.NOTION_IMAGES_DATABASE_ID,
}

// Don't touch the part below
// --------------------------

const merged = server.merge(client)

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (!!process.env.SKIP_ENV_VALIDATION === false) {
    const isServer = typeof window === 'undefined'

    const parsed = /** @type {MergedSafeParseReturn} */ (
        isServer
            ? merged.safeParse(processEnv) // on server we can validate all env vars
            : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
    )

    if (parsed.success === false) {
        console.error(
            '❌ Invalid environment variables:',
            parsed.error.flatten().fieldErrors
        )
        throw new Error('Invalid environment variables')
    }

    env = new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== 'string') return undefined
            // Throw a descriptive error if a server-side env var is accessed on the client
            // Otherwise it would just be returning `undefined` and be annoying to debug
            if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
                throw new Error(
                    process.env.NODE_ENV === 'production'
                        ? '❌ Attempted to access a server-side environment variable on the client'
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`
                )
            return target[/** @type {keyof typeof target} */ (prop)]
        },
    })
}

export {env}
