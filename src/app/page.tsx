import { SearchBar } from "@/components/SearchBar";
import { categories, tools } from "@/lib/tools-registry";
import { CategoryCard } from "@/components/CategoryCard";
import { ToolCard } from "@/components/ToolCard";

export default function Home() {
  const popularSlugs = [
    "sip-calculator",
    "emi-calculator",
    "simple-interest-calculator",
    "bmi-calculator",
    "miles-to-km",
    "cm-to-inches",
    "inches-to-cm",
    "area-of-circle",
  ];
  
  const popularTools = popularSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter((t): t is typeof tools[0] => t !== undefined)
    .slice(0, 8);
    
  if (popularTools.length < 8) {
      const remaining = 8 - popularTools.length;
      popularTools.push(...tools.filter(t => !popularSlugs.includes(t.slug)).slice(0, remaining));
  }

  return (
    <div className="flex flex-col items-center relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 inset-x-0 h-[600px] overflow-hidden -z-10 pointer-events-none flex justify-center">
        <div className="absolute -top-[200px] w-[800px] md:w-[1200px] h-[400px] md:h-[600px] rounded-[100%] bg-primary/40 blur-[100px] md:blur-[140px] opacity-70 mix-blend-screen dark:bg-primary/50"></div>
        <div className="absolute -top-[100px] w-[500px] md:w-[800px] h-[300px] md:h-[400px] rounded-[100%] bg-white/40 blur-[80px] opacity-40 mix-blend-overlay dark:bg-white/10"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full pt-28 pb-20 md:pt-40 md:pb-32 flex flex-col items-center text-center px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-foreground !leading-tight">
          Innovating <span className="text-primary">Calculations.</span><br />
          Building Today.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl font-medium">
          Empowering your daily tasks with next-gen mathematical tools and specialized calculators. Fast, precise, and beautifully designed.
        </p>
        <div className="w-full flex justify-center scale-100 md:scale-110 shadow-2xl rounded-lg">
          <SearchBar />
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-3 max-w-3xl">
          {categories.slice(0, 6).map((c) => (
            <a key={c.slug} href={`/category/${c.slug}`} className="px-5 py-2.5 rounded-full bg-background/50 backdrop-blur-sm border border-foreground/20 text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all shadow-sm">
              {c.name}
            </a>
          ))}
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="w-full py-16 md:py-24 container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Most Popular Tools</h2>
          <p className="text-primary mt-3 font-medium">We don&apos;t just calculate; we deliver results that work.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Category Grid Section */}
      <section id="categories" className="w-full py-16 md:py-24 border-t border-primary/10 bg-gradient-to-b from-background to-primary/5 z-10 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground mt-3 font-medium">Explore how we&apos;ve categorized tools to help you innovate.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const count = tools.filter(t => t.category === category.slug).length;
              return <CategoryCard key={category.slug} category={category} count={count} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
