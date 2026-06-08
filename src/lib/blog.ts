import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  author: string;
}

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    metadata: data as BlogPostMetadata,
    content,
  };
}

export function getAllPosts(): { slug: string; metadata: BlogPostMetadata }[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      return {
        slug: post.slug,
        metadata: post.metadata,
      };
    })
    .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1));

  return posts;
}
