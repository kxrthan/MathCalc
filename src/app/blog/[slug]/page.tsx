import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import DynamicCalculator from "@/components/calculators/DynamicCalculator";
import { ShareButtons } from "@/components/blog/ShareButtons";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realcalculatortools.com';
    
    return {
      title: `${post.metadata.title} | MathCalc Blog`,
      description: post.metadata.excerpt,
      alternates: {
        canonical: `${baseUrl}/blog/${post.slug}`,
      },
      openGraph: {
        title: post.metadata.title,
        description: post.metadata.excerpt,
        type: "article",
        publishedTime: post.metadata.date,
        authors: [post.metadata.author],
      }
    };
  } catch {
    return {};
  }
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, "") }));
}

import { ImageProps } from "next/image";

// Map custom components to be used inside MDX files
const components = {
  Calculator: ({ slug }: { slug: string }) => (
    <div className="my-10 p-6 bg-background rounded-3xl border shadow-xl not-prose">
      <DynamicCalculator slug={slug} />
    </div>
  ),
  Image: ({ alt, ...props }: ImageProps) => <Image alt={alt || ""} {...props} />,
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realcalculatortools.com';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.metadata.title,
    "description": post.metadata.excerpt,
    "author": {
      "@type": "Person",
      "name": post.metadata.author
    },
    "datePublished": post.metadata.date,
    "url": `${baseUrl}/blog/${post.slug}`
  };

  return (
    <main className="w-full pb-16 pt-8 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className="w-full max-w-[800px] mx-auto px-4 sm:px-6">
        <header className="mb-10">
          <h1 className="text-4xl md:text-[42px] font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.metadata.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
              {post.metadata.author.charAt(0)}
            </div>
            <div>
              <p className="text-foreground font-medium">{post.metadata.author}</p>
              <p className="text-muted-foreground text-sm">
                {format(new Date(post.metadata.date), 'MMM d, yyyy')} · 5 min read
              </p>
            </div>
          </div>
        </header>

        <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none w-full">
          <MDXRemote source={post.content} components={components} />
        </div>

        <ShareButtons url={`${baseUrl}/blog/${post.slug}`} title={post.metadata.title} />
      </article>

      <div className="text-center mt-16 max-w-[800px] mx-auto px-4 sm:px-6">
        <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all articles
        </Link>
      </div>
    </main>
  );
}
