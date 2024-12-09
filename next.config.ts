import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        ppr: 'incremental',
        reactCompiler: {
            compilationMode: 'annotation',
        },
        dynamicIO: true,
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
