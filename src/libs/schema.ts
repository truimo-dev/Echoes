import { z } from 'zod'

const imageSchema = z.object({
    name: z.string().default('图片'),
    src: z.string(),
})

const tagSchema = z.object({
    name: z.string().default('不分类'),
    color: z.string().default('default'),
})

export {
    imageSchema, tagSchema
}
