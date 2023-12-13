/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "play.pokemonshowdown.com",
        port: "",
        pathname: "/sprites/**",
      },
    ],
  },
};

module.exports = nextConfig;
