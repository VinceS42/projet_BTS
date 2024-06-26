/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.unsplash.com", "res.cloudinary.com", "lh3.googleusercontent.com", "hdsuwflzlalsilyekern.supabase.co", "images.remotePatterns"],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
