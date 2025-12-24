import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅⬅⬅ تمت الإضافة هنا
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flower.elevateegy.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.nouralsabahco.com',
        port: '',
        pathname: '/storage/ProductMedia/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.nouralsabahco.com',
        port: '',
        pathname: '/storage/ProductMedia/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.nouralsabahco.com',
        port: '',
        pathname: '/storage/categories/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
