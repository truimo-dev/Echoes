import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        ppr: 'incremental',
        reactCompiler: {
            compilationMode: 'annotation',
        },
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
