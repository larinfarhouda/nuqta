/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ["localhost", "res.cloudinary.com", "images.unsplash.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
      unoptimized: true,
    },
    experimental: {
      // This is experimental but can be enabled if needed
      // optimizeCss: true,
      // scrollRestoration: true,
    },
  }
  
  module.exports = nextConfig