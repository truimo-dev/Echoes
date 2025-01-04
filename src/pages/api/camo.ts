import {ipAddress} from '@vercel/functions';
import {rateLimit} from '@/libs/redis';

// export const prerender = false;

const emptyB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYA';

function isImage(contentType: string | null): boolean {
    if (contentType === null) {
        throw new Error('Content-Type is null')
    }
    return contentType.startsWith('image/')
}

async function camoImage(imageUrl: string) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/octet-stream',
        'X-Content-Type': 'application/octet-stream',
        'Cache-Control': 'public, max-age=604800, immutable'
    }

    try {
        const url = new URL(imageUrl)
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Referer': url.origin
            },
            cache: 'force-cache',
        })
        const buffer = await res.arrayBuffer()
        const contentType = res.headers.get('Content-Type')
        if (isImage(contentType)) {
            const b64Img = Buffer.from(buffer).toString('base64')
            headers['Content-Type'] = 'text/plain'
            headers['Content-Length'] = b64Img.length.toString()
            headers['X-Content-Type'] = contentType!

            return new Response(b64Img, {
                headers: headers
            })
        } else {
            throw new Error('Not an image')
        }
    } catch (e) {
        console.error(e)

        return new Response(emptyB64, {
            headers: {
                'X-Content-Type': 'image/png',
                'Content-Type': 'text/plain',
                'Content-Length': emptyB64.length.toString()
            }
        })
    }
}

export async function POST({ request } : {
    request: Request
}) {
    const { src } = await request.json(), ip = ipAddress(request);

    const { success } = await rateLimit.limit(`camo_${ip ?? ''}`)
    if (!success) {
        return Response.json({error: 'Rate limit exceeded'}, {status: 429})
    }

    if (typeof src === 'string') {
        return camoImage(src)
    }

    return Response.json({error: 'No params provided'}, {status: 400})
}
