/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    unoptimized: true
  },
  output: "export",
  eslint: { // TO-DO - Fix lint errors
    ignoreDuringBuilds: true,
  },
};
