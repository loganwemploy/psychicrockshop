/**
 * Dynamic sitemap for SEO.
 * Served at /sitemap.xml. Uses NEXT_PUBLIC_SITE_URL or falls back to production domain.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { getBlogPosts } from "./blog/_data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmission007.org";

/** Static routes with SEO hints: priority and changeFrequency */
const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "about-us", priority: 0.9, changeFrequency: "monthly" },
  { path: "how-you-can-help", priority: 0.9, changeFrequency: "monthly" },
  { path: "learn-where-to-start", priority: 0.9, changeFrequency: "monthly" },
  { path: "photogallery", priority: 0.8, changeFrequency: "weekly" },
  { path: "blog", priority: 0.8, changeFrequency: "weekly" },
];

export default async function sitemap() {
  const base = BASE_URL.replace(/\/$/, "");
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt).toISOString() : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
