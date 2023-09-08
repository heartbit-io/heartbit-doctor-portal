/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    reactStrictMode: true,
  },
  images: {
    path: "/",
  },
  gifs: {
    path: "/",
  },
};
module.exports = nextConfig;
