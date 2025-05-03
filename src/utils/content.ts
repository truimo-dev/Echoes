import { getCollection } from 'astro:content'
import _ from 'lodash'

export async function getSortedPosts() {
    const posts = await getCollection('blog')
    return _.orderBy(posts, ['data.time'], ['desc'])
}

export async function getSortedDiary() {
    const diary = await getCollection('diary')
    return _.orderBy(diary, ['data.time'], ['desc'])
}
