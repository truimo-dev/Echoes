import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        reactCompiler: {
            compilationMode: 'annotation',
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shp.qpic.cn',
            },
        ],
    },
};

export default nextConfig;
