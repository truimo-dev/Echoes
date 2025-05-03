import type { CollectionEntry } from 'astro:content'

interface Post extends CollectionEntry<'blog'> {
}

export type {
    Post
}
