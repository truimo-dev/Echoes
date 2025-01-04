declare module 'astro:env/server' {
	export const VERCEL_ENV: string | undefined;	
	export const UPSTASH_REDIS_REST_TOKEN: string;	
	export const UPSTASH_REDIS_REST_URL: string;	
	export const NOTION_KEY: string;	
	export const NOTION_DIARY_DATABASE_ID: string;	
	export const NOTION_IMAGES_DATABASE_ID: string;	
}