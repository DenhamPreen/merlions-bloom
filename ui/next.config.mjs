/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.prod.website-files.com',
            port: '',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
