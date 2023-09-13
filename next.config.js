/** @type {import('next').NextConfig} */
const nextConfig = { 

  images: {
    domains: [
      'lh3.googleusercontent.com', 
      'res.cloudinary.com', 
      'task.com',
      "liem-nextjs-ecommerce.s3.amazonaws.com",
      "https://liem-nextjs-ecommerce.s3.amazonaws.com",
      "localhost"
    ],
    remotePatterns: [
      {
          protocol: "https",
          hostname: 
            "avatars.githubusercontent.com"
      },
    ],
  },

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  },
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }}

module.exports = nextConfig
