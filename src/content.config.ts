import type {Loader, LoaderContext} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';
import {queryDiaryListCached} from '@/libs/notion';

const diarySchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    title: z.string(),
    type: z.string(),
    tags: z.array(z.object({
        name: z.string(),
        color: z.string(),
    })),
    images: z.array(z.object({
        name: z.string(),
        url: z.string(),
        blur: z.string().optional(),
        size: z.object({
            width: z.number(),
            height: z.number(),
        }).optional(),
    })),
});

function diaryLoader(): Loader {
    return {
        name: 'diary',
        schema: diarySchema,
        async load({store, logger, parseData}: LoaderContext) {
            logger.info('Loading diary');
            store.clear();

            const posts = await queryDiaryListCached();

            for (const post of posts) {
                const data = await parseData({
                    id: post.id,
                    data: post,
                });

                store.set({
                    id: data.id,
                    data,
                });
            }
        },
    }
}

const diary = defineCollection({
    loader: diaryLoader(),
    schema: diarySchema,
});

export const collections = {diary};
