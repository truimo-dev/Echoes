import crypto from 'node:crypto'
import { Buffer } from 'node:buffer'
import { CAMO_KEY } from 'astro:env/server'

export function generateCamoUrl(imageUrl: string): string {
    const hmac = crypto.createHmac('sha1', CAMO_KEY)
    hmac.update(imageUrl)
    const hash = hmac.digest('hex')
    const hex = Buffer.from(imageUrl).toString('hex')
    return `/api/camo/${hash}/${hex}`
}

export function verifyCamoUrl(imageUrl: string, providedHash: string): boolean {
    const hmac = crypto.createHmac('sha1', CAMO_KEY)
    hmac.update(imageUrl)
    const expectedHash = hmac.digest('hex')
    return expectedHash === providedHash
}
