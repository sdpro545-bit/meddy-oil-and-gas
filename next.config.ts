import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/services/drilling-support",
        destination: "/services/oil-field-services#drilling-and-engineering",
        permanent: true,
      },
      {
        source: "/services/wireline-intervention",
        destination: "/services/oil-field-services#wireline-slickline-well-testing",
        permanent: true,
      },
      {
        source: "/services/engineering-services",
        destination: "/services/oil-field-services#drilling-and-engineering",
        permanent: true,
      },
      {
        source: "/services/procurement-supply",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/pipeline-facilities",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
