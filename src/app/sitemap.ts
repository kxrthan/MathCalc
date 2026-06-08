import { MetadataRoute } from 'next';
import { categories, tools } from '@/lib/tools-registry';
import { getPostSlugs } from '@/lib/blog';
import { stateSalesTaxData } from '@/lib/state-sales-tax-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realcalculatortools.com';
  const LAST_UPDATED = new Date('2026-06-08');
  
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));
  
  const blogSlugs = getPostSlugs();
  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug.replace(/\.mdx$/, '')}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = ['/about', '/contact', '/privacy', '/terms', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  // State-level sales tax pages for programmatic SEO
  const stateSalesTaxUrls = stateSalesTaxData.map((state) => ({
    url: `${baseUrl}/tools/sales-tax-calculator/${state.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...staticUrls,
    ...categoryUrls,
    ...toolUrls,
    ...stateSalesTaxUrls,
    ...blogUrls,
  ];
}

