/**
 * Dynamic robots.txt for SEO.
 * Served at /robots.txt. Allows crawling and points to the sitemap.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmission007.org";

export default function robots() {
  const base = BASE_URL.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: [] },
    sitemap: `${base}/sitemap.xml`,
  };
}
