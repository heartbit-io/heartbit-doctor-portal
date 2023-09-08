/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    path: "/",
  },
  gifs: {
    path: "/",
  },
};
module.exports = nextConfig;
