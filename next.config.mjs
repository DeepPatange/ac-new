/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  images: {
    /* images.unsplash.com is called out explicitly because every remote photo
       on the site comes from it — next/image will only resize + re-encode a
       remote file whose host is listed here. The wildcard stays for anything
       else that gets added later. */
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "**" },
    ],
    /* AVIF first, WebP as the fallback — roughly a quarter smaller than WebP
       alone on photographic content, which is nearly all of it here. */
    formats: ["image/avif", "image/webp"],
    /* The remote photos never change, so keep the optimised variants for a year
       instead of re-fetching the origin every 60s (the default). */
    minimumCacheTTL: 31536000,
  },
  /* Long-lived caching for the heavy static hero scene + product renders so the
     browser serves them from cache instead of re-downloading on every visit.
     Note: these filenames are fixed, so if you ever swap an asset, rename it (or
     hard-refresh) to bust the cache. */
  /* The Gallery page was replaced by Partners & Testimonials. The "-2" links
     are from the design preview, which now lives at the normal URLs. */
  async redirects() {
    const preview = ["about-us", "products", "services", "industries-served", "app", "career", "partners", "contact-us", "blog"];
    return [
      { source: "/gallery", destination: "/partners", permanent: true },
      { source: "/home-2", destination: "/", permanent: false },
      ...preview.map((r) => ({ source: `/${r}-2`, destination: `/${r}`, permanent: false })),
      { source: "/blog-2/:slug", destination: "/blog/:slug", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/spline/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/products/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
