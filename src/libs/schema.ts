import { z } from 'zod'

const imageSchema = z.object({
    name: z.string().default('图片'),
    src: z.string(),
})

export {
    imageSchema
}
