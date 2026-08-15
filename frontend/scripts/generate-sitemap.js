/**
 * Sitemap Generator Script
 * Fetches product data from the API and writes an XML sitemap
 * including both static routes and product detail pages.
 */

import fs from 'fs';
import path from 'path';

// Base site URL used to construct full sitemap links
const BASE_URL = 'https://aromaspicies.com';
// Product API endpoint used to fetch dynamic product routes
const API_URL = 'https://aroma-spices.onrender.com/api/products';

// Static website routes that should always be included in the sitemap
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
];

/**
 * Convert route metadata into a sitemap <url> entry.
 * @param {Object} route - Route metadata
 * @param {string} route.path - Route path portion
 * @param {string} route.priority - Sitemap priority
 * @param {string} route.changefreq - Sitemap change frequency
 * @returns {string} XML snippet for the route
 */
const toUrl = ({ path: routePath, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${routePath}</loc>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`;

// Product list loaded from remote API, fallback to empty array on error
let products = [];

try {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Invalid products response');
  }

  products = data.data;
} catch (err) {
  console.warn(`⚠️ Could not fetch products: ${err.message}`);
  console.warn('⚠️ Generating sitemap with static pages only.');
}

/**
 * Convert API product entries into sitemap URLs.
 * Uses slug if available, otherwise derives a slug from the product name.
 */
const productUrls = products.map((p) => {
  const slug = p.slug || p.name?.toLowerCase().replaceAll(' ', '-');
  return toUrl({
    path: `/product/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  });
});

// Build the full sitemap XML document
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(toUrl).join('')}
${productUrls.join('')}
</urlset>`;

const out = path.resolve('public/sitemap.xml');

// Write sitemap to public directory so Vite can serve it statically
fs.writeFileSync(out, sitemap, 'utf8');

console.log(`✅ sitemap.xml generated — ${products.length} products`);
