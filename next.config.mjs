/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        scrollRestoration: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;