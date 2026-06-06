import { categories, tools } from "@/lib/tools-registry";
import { ToolCard } from "@/components/ToolCard";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { CategoryIcon } from "@/components/IconRenderer";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: `${category.name} Calculators & Tools - MathCalc`,
    description: `Free online ${category.name.toLowerCase()} calculators and tools. ${tools.filter(t => t.category === category.slug).length} tools available.`,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.category === category.slug);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center space-x-4 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <CategoryIcon name={category.icon} className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{category.name} Calculators</h1>
          <p className="text-muted-foreground mt-2">{categoryTools.length} tools available in this category.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
      
      {categoryTools.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
          <p className="text-muted-foreground">Tools for this category are coming soon!</p>
        </div>
      )}
    </div>
  );
}
