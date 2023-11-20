/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/invite",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
