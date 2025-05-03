import { getCollection } from 'astro:content'
import _ from 'lodash'

export async function getSortedPosts() {
    const posts = await getCollection('blog')
    return _.orderBy(posts, ['data.time'], ['desc'])
}
