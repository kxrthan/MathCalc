import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tool } from '@/types/tool';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="block h-full group outline-none">
      <Card className="relative h-full bg-background/50 backdrop-blur-md border border-foreground/20 ring-0 overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 rounded-[1.5rem] group focus-visible:ring-2 focus-visible:ring-primary">
        {/* Animated Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <CardHeader className="relative z-10 p-6">
          <CardTitle className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex justify-between items-start gap-4">
            {tool.name}
            <span className="text-primary/0 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-3 text-sm text-muted-foreground/80 leading-relaxed font-medium">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
