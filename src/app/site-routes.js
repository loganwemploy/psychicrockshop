/**
 * Single source of truth for main site routes.
 * Used by the sitemap and the footer so structure stays in sync for SEO.
 */

export const STATIC_ROUTES = [
  { path: "", label: "Home", priority: 1.0, changeFrequency: "weekly" },
  { path: "about-us", label: "About Us", priority: 0.9, changeFrequency: "monthly" },
  { path: "how-you-can-help", label: "How You Can Help", priority: 0.9, changeFrequency: "monthly" },
  { path: "learn-where-to-start", label: "Learn Where to Start", priority: 0.9, changeFrequency: "monthly" },
  { path: "photogallery", label: "Photo Gallery", priority: 0.8, changeFrequency: "weekly" },
  { path: "blog", label: "Blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "shop", label: "Shop", priority: 0.8, changeFrequency: "weekly" },
];
