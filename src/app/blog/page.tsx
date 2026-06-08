import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Metadata } from "next";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "MathCalc Blog – Financial & Math Insights",
  description: "Read our latest articles on personal finance, math, calculations, and how to get the most out of our free tools.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          MathCalc <span className="text-primary">Blog</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, guides, and tutorials to help you master your finances and make complex calculations simple.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="group block h-full bg-card hover:bg-accent/50 border border-border hover:border-primary/50 transition-all duration-300 rounded-[2rem] p-8 shadow-sm hover:shadow-xl">
              <p className="text-sm text-primary font-semibold mb-3">
                {format(new Date(post.metadata.date), 'MMMM d, yyyy')}
              </p>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.metadata.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {post.metadata.excerpt}
              </p>
              <div className="mt-6 flex items-center text-primary font-medium">
                Read Article
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
