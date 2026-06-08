import { stateSalesTaxData } from "@/lib/state-sales-tax-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import StateSalesTaxCalculator from "@/components/calculators/finance/StateSalesTaxCalculator";

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateData = stateSalesTaxData.find((s) => s.slug === params.state);
  if (!stateData) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realcalculatortools.com';

  return {
    title: `${stateData.name} Sales Tax Calculator ${new Date().getFullYear()} — ${stateData.combinedRate}% Combined Rate`,
    description: `Calculate ${stateData.name} sales tax instantly. State rate: ${stateData.stateTaxRate}%. Average combined rate: ${stateData.combinedRate}%. Free, accurate, and updated for ${new Date().getFullYear()}.`,
    openGraph: {
      title: `${stateData.name} Sales Tax Calculator — ${stateData.combinedRate}% Rate`,
      description: `Free ${stateData.name} sales tax calculator. Combined rate: ${stateData.combinedRate}%. Includes state (${stateData.stateTaxRate}%) and average local taxes.`,
      type: "website",
      locale: "en_US",
    },
    alternates: {
      canonical: `${baseUrl}/tools/sales-tax-calculator/${stateData.slug}`,
    },
  };
}

export function generateStaticParams() {
  return stateSalesTaxData.map((s) => ({ state: s.slug }));
}

export default function StateSalesTaxPage({ params }: { params: { state: string } }) {
  const stateData = stateSalesTaxData.find((s) => s.slug === params.state);
  if (!stateData) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the sales tax rate in ${stateData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The state sales tax rate in ${stateData.name} is ${stateData.stateTaxRate}%. Including average local taxes, the combined rate is ${stateData.combinedRate}%.`
        }
      },
      {
        "@type": "Question",
        name: `Does ${stateData.name} have a sales tax?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: stateData.combinedRate === 0
            ? `No, ${stateData.name} has no sales tax at any level — state or local.`
            : `Yes, ${stateData.name} has a state sales tax of ${stateData.stateTaxRate}%. With local taxes, the average combined rate is ${stateData.combinedRate}%.`
        }
      },
      {
        "@type": "Question",
        name: `What are the special sales tax rules in ${stateData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: stateData.specialNotes
        }
      }
    ]
  };

  // Get other states for quick navigation
  const otherStates = stateSalesTaxData
    .filter(s => s.slug !== stateData.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tools/sales-tax-calculator">Sales Tax Calculator</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{stateData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl font-black text-primary/20 dark:text-primary/30 tabular-nums leading-none">
            {stateData.abbreviation}
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {stateData.name} Sales Tax Calculator {new Date().getFullYear()}
            </h1>
          </div>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl">
          {stateData.description}
        </p>
      </div>

      {/* Rate Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">State Rate</p>
          <p className="text-3xl font-black text-primary">{stateData.stateTaxRate}%</p>
        </div>
        <div className="p-5 rounded-2xl bg-muted/30 border border-foreground/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Avg Local</p>
          <p className="text-3xl font-black text-foreground">{stateData.avgLocalRate}%</p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Combined Avg</p>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{stateData.combinedRate}%</p>
        </div>
        <div className="p-5 rounded-2xl bg-muted/30 border border-foreground/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">System</p>
          <p className="text-sm font-bold text-foreground leading-tight mt-1">{stateData.taxationType}</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {/* Calculator */}
        <div className="flex-1 min-w-0 w-full">
          <div className="mb-12">
            <StateSalesTaxCalculator
              stateName={stateData.name}
              stateRate={stateData.stateTaxRate}
              combinedRate={stateData.combinedRate}
            />
          </div>

          {/* Detailed Info Section */}
          <div className="prose prose-slate dark:prose-invert max-w-none bg-background/50 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] border border-foreground/20 shadow-xl">
            <h2 className="text-2xl font-bold flex items-center gap-3 mt-0">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              {stateData.name} Sales Tax Details
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {stateData.description}
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 my-6 not-prose">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span> Important Notes for {stateData.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{stateData.specialNotes}</p>
            </div>

            {/* FAQ Section */}
            <h3 className="text-xl font-bold mt-8">Frequently Asked Questions</h3>
            <div className="space-y-4 not-prose">
              <div className="bg-background/40 p-6 rounded-2xl border border-foreground/10">
                <h4 className="text-lg font-bold text-foreground mb-2">What is the {stateData.name} sales tax rate?</h4>
                <p className="text-muted-foreground">
                  The {stateData.name} state sales tax rate is <strong className="text-foreground">{stateData.stateTaxRate}%</strong>. 
                  When you include the average local and county sales taxes of {stateData.avgLocalRate}%, 
                  the average combined rate is <strong className="text-foreground">{stateData.combinedRate}%</strong>.
                  Actual local rates vary — check your specific city or county for exact rates.
                </p>
              </div>
              <div className="bg-background/40 p-6 rounded-2xl border border-foreground/10">
                <h4 className="text-lg font-bold text-foreground mb-2">How do I calculate {stateData.name} sales tax?</h4>
                <p className="text-muted-foreground">
                  Multiply the purchase price by the applicable combined tax rate. For example, on a $100 purchase at the average {stateData.name} rate of {stateData.combinedRate}%, 
                  the tax would be ${(100 * stateData.combinedRate / 100).toFixed(2)}, making the total ${(100 + 100 * stateData.combinedRate / 100).toFixed(2)}.
                  Use our calculator above for instant results.
                </p>
              </div>
              <div className="bg-background/40 p-6 rounded-2xl border border-foreground/10">
                <h4 className="text-lg font-bold text-foreground mb-2">Is {stateData.name} an origin or destination-based sales tax state?</h4>
                <p className="text-muted-foreground">
                  {stateData.name} uses a <strong className="text-foreground">{stateData.taxationType}</strong> approach.{" "}
                  {stateData.taxationType === "Destination-based"
                    ? "This means the sales tax rate is based on where the buyer (destination) is located, which matters especially for online sales."
                    : stateData.taxationType === "Origin-based"
                    ? "This means the sales tax rate is based on where the seller (origin) is located, which can simplify compliance for in-state businesses."
                    : "Check with your tax professional for specifics on how this affects your purchases or business."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[320px] flex-shrink-0 space-y-6">
          {/* All States */}
          <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-foreground/20 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-primary"></span>
              Other States
            </h3>
            <div className="space-y-2">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/tools/sales-tax-calculator/${s.slug}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-primary/10 border border-foreground/10 hover:border-primary/30 transition-all duration-200 group"
                >
                  <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {s.name}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground tabular-nums">
                    {s.combinedRate}%
                  </span>
                </Link>
              ))}
              <Link
                href="/tools/sales-tax-calculator"
                className="flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors mt-2"
              >
                View All 50 States →
              </Link>
            </div>
          </div>

          {/* Related Tools */}
          <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-foreground/20 shadow-2xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-primary"></span>
              Related Tools
            </h3>
            <div className="space-y-3">
              {[
                { href: "/tools/discount-calculator", name: "Discount Calculator", desc: "Find the best deal" },
                { href: "/tools/tip-calculator", name: "Tip Calculator", desc: "Calculate restaurant tips" },
                { href: "/tools/mortgage-calculator", name: "Mortgage Calculator", desc: "Estimate home payments" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex flex-col p-4 rounded-xl bg-muted/30 hover:bg-primary/10 border border-foreground/10 hover:border-primary/30 transition-all duration-200 group"
                >
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
                  <span className="text-xs text-muted-foreground">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
