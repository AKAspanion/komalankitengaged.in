/** @type {import('next').NextConfig} */
const nextConfig = {
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
