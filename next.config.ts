import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        ppr: 'incremental',
        reactCompiler: {
            compilationMode: 'annotation',
        },
        after: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: 'shp.qpic.cn',
            },
        ],
    },
};

export default nextConfig;
