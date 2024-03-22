/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "salt.tikicdn.com",
      },
    ],
  },
};

export default nextConfig;
