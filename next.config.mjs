/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/tools/emi-calculator', destination: '/tools/loan-payment-calculator', permanent: true },
      { source: '/tools/sip-calculator', destination: '/tools/investment-calculator', permanent: true },
    ];
  },
};

export default nextConfig;
