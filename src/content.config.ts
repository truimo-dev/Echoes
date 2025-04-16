import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { v5 as uuidv5 } from 'uuid'
import { imageSchema } from '@/libs/schema'

const excerpts = defineCollection({
    loader: file('./data/excerpts.json', {
        parser: (text) => {
            const json = JSON.parse(text)
            return json.list.map((it: { content: string, id?: string }) => {
                it.id = uuidv5(it.content, json.uuid)
                return it
            })
        }
    }),
    schema: z.object({
        id: z.string(),
        content: z.string(),
        title: z.string().optional(),
        time: z.number().optional(),
    })
})


const diary = defineCollection({
    loader: glob({
        pattern: '*.md',
        base: './data/diary',
    }),
    schema: z.object({
        title: z.string(),
        images: z.array(imageSchema).default([]),
        time: z.coerce.date(),
    })
})


export const collections = {
    excerpts, diary
}
