/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true, // This means the redirect is permanent (308 status code)
      },
    ];
  },
};

export default nextConfig;
