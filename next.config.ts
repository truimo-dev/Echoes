import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        ppr: 'incremental',
        reactCompiler: {
            compilationMode: 'annotation',
        },
        after: true,
    }
};

export default nextConfig;
