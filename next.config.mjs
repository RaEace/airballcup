/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: './dist', // Changes the build output directory to `./dist/`.
    basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Changes the base path to `/app`.
    images: { unoptimized: true },
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

export default nextConfig;