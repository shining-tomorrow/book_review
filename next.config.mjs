/** @type {import('next').NextConfig} */
/** https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
