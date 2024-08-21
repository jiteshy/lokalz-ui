/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  eslint: { // TO-DO - Fix lint errors
    ignoreDuringBuilds: true,
  },
};
