import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Category } from '@/types/tool';
import { CategoryIcon } from './IconRenderer';

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link href={`/category/${category.slug}`} className="block h-full group">
      <Card className="h-full bg-background/50 backdrop-blur-xl border border-foreground/20 ring-0 transition-all duration-500 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 rounded-[1.5rem] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardHeader className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
            <CategoryIcon name={category.icon} className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{category.name}</CardTitle>
            <CardDescription className="mt-1">{count} Tools</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
