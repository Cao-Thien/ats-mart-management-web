/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false, // set false to run react-beautiful-dnd
  webpack: config => {
    config.resolve.fallback = { fs: false };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/petarain.ats/**',
      },

      // https://ats-demo.petarainsoft.com:8300/api

      {
        protocol: 'https',
        hostname: 'ats-demo.petarainsoft.com',
        port: '8300',
        pathname: '/public/uploads/**',
      },

      // https://www.cspay.co.kr:8300/api

      {
        protocol: 'https',
        hostname: 'cspay.co.kr',
        port: '8300',
        pathname: '/public/uploads/**',
      },

      // https://ats-demo.petarainsoft.com:8300/tmp/uploads/files-1716448204051-225805335.png
    ],
  },

  // output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

export default nextConfig;
