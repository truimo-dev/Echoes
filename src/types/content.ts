import type { CollectionEntry } from 'astro:content'

interface Post extends CollectionEntry<'blog'> {
}

interface Diary extends CollectionEntry<'diary'> {
}

export type {
    Post, Diary
}
