import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import { slugify } from '@/utils/slugify';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const pages = await getCollection('pages');

  // Get unique tags and categories
  const tags = new Set<string>();
  const categories = new Set<string>();
  posts.forEach((post) => {
    categories.add(post.data.category);
    post.data.tags.forEach((tag) => tags.add(tag));
  });

  const site = siteConfig.url;

  const urls = [
    // Homepage
    { loc: site, priority: '1.0', changefreq: 'weekly' },
    // Posts
    ...posts.map((post) => ({
      loc: `${site}/posts/${post.slug}/`,
      lastmod: post.data.date.toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'monthly'
    })),
    // Pages
    ...pages.map((page) => ({
      loc: `${site}/pages/${page.slug}/`,
      priority: '0.7',
      changefreq: 'monthly'
    })),
    // Categories
    { loc: `${site}/categories/`, priority: '0.5', changefreq: 'weekly' },
    ...Array.from(categories).map((cat) => ({
      loc: `${site}/category/${slugify(cat)}/`,
      priority: '0.5',
      changefreq: 'weekly'
    })),
    // Tags
    { loc: `${site}/tags/`, priority: '0.5', changefreq: 'weekly' },
    ...Array.from(tags).map((tag) => ({
      loc: `${site}/tag/${slugify(tag)}/`,
      priority: '0.5',
      changefreq: 'weekly'
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
