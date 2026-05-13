import {withPayload} from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "storage.googleapis.com" },
            { protocol: "https", hostname: "www.ratp.fr" },
        ],
    },
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