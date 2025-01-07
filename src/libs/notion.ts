import {cache} from 'react';
import {waitUntil} from '@vercel/functions';
import {getPlaiceholder} from 'plaiceholder';
import sizeOf from 'image-size';
import {Client, isFullPageOrDatabase} from '@notionhq/client';
import {redis, sha1} from './redis';
import type {
    BlockObjectResponse,
    ListBlockChildrenParameters, ListBlockChildrenResponse,
    PageObjectResponse, PartialBlockObjectResponse,
    QueryDatabaseParameters,
    QueryDatabaseResponse, RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

import { NOTION_KEY, NOTION_DIARY_DATABASE_ID, NOTION_IMAGES_DATABASE_ID } from 'astro:env/server';

const notion = new Client({auth: NOTION_KEY})

interface QueryLimit {
    start?: string
    size?: number
}

interface ListQuery {
    limit?: QueryLimit
}

interface Tag {
    name: string
    color: string
}

export interface DiaryItem {
    id: string,
    name: string,
    date: string,
    title: string,
    type: string,
    tags: Tag[],
    images: DiaryImage[],
}

export interface DiaryImage {
    name: string,
    url: string,
    blur?: string,
    size?: {
        width: number,
        height: number,
    }
}

async function queryDiaryList(query?: ListQuery): Promise<DiaryItem[]> {
    const dbQuery: QueryDatabaseParameters = {
        database_id: NOTION_DIARY_DATABASE_ID,
        filter: {and: [{property: 'Published', checkbox: {equals: true}}]},
        sorts: [{property: 'Date', direction: 'descending'}],
    }

    if (query?.limit) {
        dbQuery.start_cursor = query.limit.start
        dbQuery.page_size = query.limit.size
    }

    const response: QueryDatabaseResponse = await notion.databases.query(dbQuery)

    const list: DiaryItem[] = []

    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                list.push(getDiaryFromQuery(page))
            }
        }
    }

    return list
}

const queryDiaryListCached = async (query?: ListQuery) => {
    const hash = sha1(query);
    const key: string = `queryDiaryList:${hash}`;
    const value = await redis.get(key);
    if (null === value) {
        const newValue = await queryDiaryList(query);
        redis.set(key, newValue, { ex: 86400 });
        return newValue;
    }
    return value;
}

async function queryDiary(slug: string): Promise<DiaryItem | null> {
    const dbQuery: QueryDatabaseParameters = {
        database_id: NOTION_DIARY_DATABASE_ID,
        filter: {
            and: [
                {property: 'Published', checkbox: {equals: true}},
                {property: 'Name', rich_text: {equals: slug}}
            ]
        },
        page_size: 1,
    }

    const response: QueryDatabaseResponse = await notion.databases.query(dbQuery)

    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                return getDiaryFromQuery(page)
            }
        }
    }

    return null
}

const queryDiaryCached = async (slug: string) => {
    const hash = sha1(slug);
    const key: string = `queryDiary:${hash}`;
    const value = await redis.get(key);
    if (null === value) {
        const newValue = await queryDiary(slug);
        redis.set(key, newValue, { ex: 86400 });
        return newValue;
    }
    return value;
}

function getDiaryFromQuery(page: PageObjectResponse): DiaryItem {
    const properties = page.properties

    const date: string = properties.Date.type === 'date' && properties.Date.date ? properties.Date.date.start : '2024-11-23';

    const diary: DiaryItem = {
        id: page.id,
        name: '',
        title: '',
        date: date,
        images: [],
        type: '',
        tags: [],
    }

    if (properties.Name.type === 'title') {
        diary.name = getStringProperty(properties.Name.title)
    }

    if (properties.Title.type === 'rich_text') {
        diary.title = getStringProperty(properties.Title.rich_text)
    }

    if (properties.Images.type === 'files') {
        diary.images = getImagesProperty(properties.Images.files)
    }

    if (properties.Type.type === 'select' && properties.Type.select) {
        diary.type = properties.Type.select.name
    }

    if (properties.Tags.type === 'multi_select') {
        diary.tags = properties.Tags.multi_select
    }

    return diary
}

type Files = Array<{
    file: {
        url: string
        expiry_time: string
    }
    name: string
    type?: 'file'
} | {
    external: {
        url: string
    }
    name: string
    type?: 'external'
}>

function getImagesProperty(files: Files): DiaryImage[] {
    return files.map((file) => {
        return {
            name: file.name,
            url: file.type === 'file' ? file.file.url : file.type === 'external' ? file.external.url : '',
        }
    })
}

function getStringProperty(arr: Array<RichTextItemResponse>): string {
    return arr.map((res: RichTextItemResponse) => {
        return res.plain_text
    }).join('')
}

interface BlockListQuery {
    block_id: string
    limit?: QueryLimit
}

export type BlockResponse = PartialBlockObjectResponse | BlockObjectResponse

function queryBlockList(query: BlockListQuery): Promise<ListBlockChildrenResponse> {
    const dbQuery: ListBlockChildrenParameters = {
        block_id: query.block_id,
        page_size: 20,
    }

    if (query?.limit) {
        dbQuery.start_cursor = query.limit.start
        dbQuery.page_size = query.limit.size
    }

    return notion.blocks.children.list(dbQuery)
}

const queryBlockListCached = async (query: BlockListQuery) => {
    const hash = sha1(query);
    const key: string = `queryBlockList:${hash}`;
    const value = await redis.get(key);
    if (null === value) {
        const newValue = await queryBlockList(query);
        redis.set(key, newValue, { ex: 86400 });
        return newValue;
    }
    return value;
}

interface ImageInfo {
    blur: string
    width: number
    height: number
    type: string
    href: string
}

function getImageInfoFromQuery(page: PageObjectResponse): ImageInfo {
    const properties = page.properties

    const info: ImageInfo = {
        href: '',
        width: 0,
        height: 0,
        type: '',
        blur: ''
    }

    if (properties.Src.type === 'title') {
        info.href = getStringProperty(properties.Src.title)
    }

    if (properties.Width.type === 'number' && properties.Width.number) {
        info.width = properties.Width.number
    }

    if (properties.Height.type === 'number' && properties.Height.number) {
        info.height = properties.Height.number
    }

    if (properties.Type.type === 'rich_text') {
        info.type = getStringProperty(properties.Type.rich_text)
    }

    if (properties.Blur.type === 'rich_text') {
        info.blur = getStringProperty(properties.Blur.rich_text)
    }

    return info
}

async function queryImageInfo(href: string): Promise<ImageInfo | null> {
    const dbQuery: QueryDatabaseParameters = {
        database_id: NOTION_IMAGES_DATABASE_ID,
        filter: {and: [{property: 'Src', title: {equals: href}}]},
        page_size: 1,
    }

    const response: QueryDatabaseResponse = await notion.databases.query(dbQuery)

    if ('list' === response.object) {
        for (const page of response.results) {
            if (isFullPageOrDatabase(page) && 'page' === page.object) {
                return getImageInfoFromQuery(page)
            }
        }
    }

    return null
}

const queryImageInfoCached = cache(queryImageInfo)

async function fetchImageInfo(href: string): Promise<ImageInfo> {
    const info: ImageInfo = {
        href: href,
        width: 0,
        height: 0,
        type: '',
        blur: ''
    }

    const url = new URL(href)
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Referer': url.origin
        },
    })

    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { base64 } = await getPlaiceholder(buffer, {
        size: 10,
    })

    info.blur = base64

    const size = sizeOf(buffer)

    if (size.width) {
        info.width = size.width
    }

    if (size.height) {
        info.height = size.height
    }

    if (size.type) {
        info.type = size.type
    }

    return info
}

async function insertImageInfo(info: ImageInfo) {
    await notion.pages.create({
        parent: {
            database_id: NOTION_IMAGES_DATABASE_ID,
        },
        properties: {
            Src: {
                type: 'title',
                title: [{
                    text: { content: info.href }
                }]
            },
            Width: {
                type: 'number',
                number: info.width,
            },
            Height: {
                type: 'number',
                number: info.height,
            },
            Type: {
                type: 'rich_text',
                rich_text: [{
                    text: { content: info.type }
                }]
            },
            Blur: {
                type: 'rich_text',
                rich_text: [{
                    text: { content: info.blur }
                }]
            },
        }
    })
}

async function getImageInfo(href: string): Promise<ImageInfo> {
    const query = await queryImageInfoCached(href)

    if (query) {
        return query
    }

    const info = await fetchImageInfo(href)

    waitUntil(insertImageInfo(info))

    return info
}

export {
    queryDiaryList, queryBlockList, getImageInfo, queryDiary,
    queryDiaryCached, queryDiaryListCached, queryBlockListCached,
}
