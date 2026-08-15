/**
 * SEO Metadata Composable
 * Manages Open Graph tags, Twitter cards, and structured JSON-LD data
 * Uses @vueuse/head for server-friendly meta tag management
 */

import { useHead } from '@vueuse/head';

const DEFAULT_IMAGE = 'https://aromaspicies.com/images/og-default.jpg';
const SITE_NAME = 'Aroma Spices';

/**
 * SEO setup composable
 * @param {Object} options - SEO metadata options
 * @param {string} options.title - Page title (appended with site name)
 * @param {string} options.description - Meta description
 * @param {string} options.image - Open Graph image URL
 * @param {string} options.url - Canonical URL
 * @param {string} options.type - Open Graph type (default: 'website')
 * @param {Object} options.jsonLd - Structured JSON-LD data
 * @returns {void}
 */
export const useSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  jsonLd,
} = {}) => {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Pure Indian Spices`;

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image || DEFAULT_IMAGE },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image || DEFAULT_IMAGE },
    ],
    script: jsonLd
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify(jsonLd),
          },
        ]
      : [],
  });
};
