import { defineCollection, z } from 'astro:content'
import { file } from 'astro/loaders'
import { v5 as uuidv5 } from 'uuid'

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


export const collections = {
    excerpts
}
