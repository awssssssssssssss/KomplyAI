/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['avatars.githubusercontent.com'],
    },
    env: {
        NEXT_PUBLIC_APP_NAME: 'X-Komply-AI',
    },
};

module.exports = nextConfig;
