/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // Match all paths under images.pexels.com
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Match all paths under images.pexels.com
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**", // Match all paths under res.cloudinary.com
      },
    ],
  },
};

export default nextConfig;
