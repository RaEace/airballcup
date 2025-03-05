import {withPayload} from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "./dist",
    basePath: '', // Changes the base path to `/app`.
    images: { unoptimized: false },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                type: 'asset/source',
            }
        )
        return config
    },
}

export default withPayload(nextConfig);