import { categories, tools } from "@/lib/tools-registry";
import { formulas } from "@/lib/formulas"; // force rebuild
import { ToolCard } from "@/components/ToolCard";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryIcon } from '@/components/IconRenderer';
import DynamicCalculator from "@/components/calculators/DynamicCalculator";
import StubCalculator from "@/components/calculators/StubCalculator";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return {};

  return {
    title: `${tool.name} - Free Online Calculator`,
    description: tool.description,
  };
}

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

function CalculatorSkeleton() {
  return <div className="space-y-4 w-full max-w-2xl mx-auto p-6"><Skeleton className="h-[400px] w-full rounded-xl" /></div>;
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) {
    notFound();
  }

  const category = categories.find((c) => c.slug === tool.category);
  if (!category) {
    notFound();
  }
  
  // Find related tools (either explicitly defined or from same category)
  let relatedTools = [];
  if (tool.relatedTools && tool.relatedTools.length > 0) {
    relatedTools = tools.filter(t => tool.relatedTools!.includes(t.slug));
  } else {
    relatedTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
  }

  // Determine which component to render
  let BespokeComponent: React.ComponentType | null = null;
  
  if (!formulas[tool.slug]) {
    // try to load a bespoke component, and fallback to Stub if it fails
    BespokeComponent = dynamic(
      () => import(`@/components/calculators/${tool.category}/${tool.component}`).catch(() => {
        return function Fallback() { return <StubCalculator toolName={tool.name} />; };
      }),
      { 
        loading: () => <CalculatorSkeleton />,
        ssr: false 
      }
    );
  }

  // Dynamic Text Setup
  const isGenerator = tool.slug.includes("generator");
  const isStarter = tool.slug.includes("stopwatch") || tool.slug.includes("timer");
  const isRoller = tool.slug.includes("dice");
  const isFlipper = tool.slug.includes("coin");
  const isSpinner = tool.slug.includes("lottery") || tool.slug.includes("spinner");
  
  let actionVerb = "Calculate";
  if (isGenerator) actionVerb = "Generate";
  else if (isStarter) actionVerb = "Start";
  else if (isRoller) actionVerb = "Roll";
  else if (isFlipper) actionVerb = "Flip";
  else if (isSpinner) actionVerb = "Spin";

  let aboutGoal = "make a quick calculation";
  if (isGenerator) aboutGoal = "generate what you need efficiently";
  else if (isStarter) aboutGoal = "track time accurately";
  else if (isRoller) aboutGoal = "roll virtual dice";
  else if (isFlipper) aboutGoal = "flip a virtual coin";
  else if (isSpinner) aboutGoal = "draw random numbers";

  let howToUseInstruction = `Simply enter your values or select your preferences in the fields above. The results will update automatically or when you press the "${actionVerb}" button.`;
  if (isStarter || isRoller || isFlipper || isSpinner) {
    howToUseInstruction = `Simply interact with the tool above and press the "${actionVerb}" button to begin.`;
  }

  // Generate JSON-LD for FAQs
  const jsonLd = tool.seoContent?.faqs && tool.seoContent.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.seoContent.faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${category?.slug}`}>{category?.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{tool.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground flex items-center gap-4">
          <span className="p-3 bg-primary/10 text-primary rounded-2xl">
            <CategoryIcon name={category?.icon || 'calculator'} className="w-8 h-8" />
          </span>
          {tool.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl">{tool.description}</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {/* Main Calculator Area */}
        <div className="flex-1 min-w-0 w-full">
          <div className="mb-12">
            {formulas[tool.slug] ? (
              <DynamicCalculator slug={tool.slug} />
            ) : BespokeComponent ? (
              <BespokeComponent />
            ) : null}
          </div>

          {/* Formula / Explanation Section (Static for now, could be dynamic per tool later) */}
          <div className="prose prose-slate dark:prose-invert max-w-none bg-background/50 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] border border-foreground/20 shadow-xl">
            <h3 className="text-2xl font-bold flex items-center gap-3 mt-0">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              About {tool.name}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {tool.seoContent?.about || `This ${tool.name.toLowerCase()} is designed to provide quick, accurate, and reliable results. Whether you're a student, professional, or just need to ${aboutGoal}, our tool is here to help.`}
            </p>
            {/* AdSense placeholder */}
            <div className="w-full h-32 bg-muted/20 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center text-muted-foreground text-sm my-10">
              <span className="text-2xl mb-2">📢</span>
              Advertisement Placeholder
            </div>
            <h4 className="text-xl font-bold mt-8">How to use</h4>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {tool.seoContent?.howToUse || howToUseInstruction}
            </p>
            
            {tool.seoContent?.faqs && tool.seoContent.faqs.length > 0 && (
              <div className="mt-12">
                <h4 className="text-2xl font-bold mb-6">Frequently Asked Questions</h4>
                <div className="space-y-4">
                  {tool.seoContent.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-background/40 p-6 rounded-2xl border border-foreground/10">
                      <h5 className="text-lg font-bold text-foreground mb-2">{faq.q}</h5>
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[350px] flex-shrink-0 sticky top-8">
          <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-foreground/20 shadow-2xl">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-primary"></span>
              Related Tools
            </h3>
            <div className="space-y-4">
              {relatedTools.map((rt) => (
                <ToolCard key={rt.slug} tool={rt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
