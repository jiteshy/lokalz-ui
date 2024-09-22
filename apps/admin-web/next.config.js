/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smb-lokalz-dev.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "**",
      }
    ],
  },
  eslint: { // TO-DO - Fix lint errors
    ignoreDuringBuilds: true,
  },
};
