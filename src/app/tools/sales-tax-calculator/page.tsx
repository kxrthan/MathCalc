import { stateSalesTaxData } from "@/lib/state-sales-tax-data";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DynamicCalculator from "@/components/calculators/DynamicCalculator";

export const metadata: Metadata = {
  title: `Sales Tax Calculator by State ${new Date().getFullYear()} — All 50 US States`,
  description: `Free sales tax calculator for all 50 US states. Find your state's exact rate — state tax, local tax, and combined average. Updated for ${new Date().getFullYear()}.`,
  openGraph: {
    title: `Sales Tax Calculator by State — All 50 US States`,
    description: `Find sales tax rates for all 50 US states instantly. Includes state rates, local averages, and a free interactive calculator.`,
    type: "website",
    locale: "en_US",
  },
};

const noSalesTaxStates = stateSalesTaxData.filter(s => s.combinedRate === 0);
const highTaxStates = [...stateSalesTaxData].sort((a, b) => b.combinedRate - a.combinedRate).slice(0, 5);
const lowTaxStates = [...stateSalesTaxData].filter(s => s.combinedRate > 0).sort((a, b) => a.combinedRate - b.combinedRate).slice(0, 5);

export default function SalesTaxHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sales Tax Calculator by State",
    description: "Free sales tax calculator for all 50 US states with state rates, local averages, and interactive calculators.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.realcalculatortools.com'}/tools/sales-tax-calculator`,
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Sales Tax Calculator</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          Sales Tax Calculator by State {new Date().getFullYear()}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl">
          Instantly calculate sales tax for any US purchase. Select your state below for the exact combined rate, or use our quick calculator for any percentage.
        </p>
      </div>

      {/* Quick Calculator */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-2 h-8 rounded-full bg-primary"></span>
          Quick Sales Tax Calculator
        </h2>
        <DynamicCalculator slug="sales-tax-calculator" />
      </div>

      {/* State Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-2 h-8 rounded-full bg-primary"></span>
          All 50 States — Click for State-Specific Calculator
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {stateSalesTaxData.map((state) => (
            <Link
              key={state.slug}
              href={`/tools/sales-tax-calculator/${state.slug}`}
              className="group flex flex-col p-4 rounded-2xl border border-foreground/15 bg-background/50 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 text-center"
            >
              <span className="text-2xl font-black text-primary/30 group-hover:text-primary/60 transition-colors mb-1">
                {state.abbreviation}
              </span>
              <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                {state.name}
              </span>
              <span className={`text-xs font-bold mt-1 ${state.combinedRate === 0 ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                {state.combinedRate === 0 ? 'No Tax' : `${state.combinedRate}%`}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Facts Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* No Sales Tax States */}
        <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-emerald-500/20 shadow-xl">
          <h3 className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400">🎉 No Sales Tax States</h3>
          <div className="space-y-2">
            {noSalesTaxStates.map(s => (
              <Link key={s.slug} href={`/tools/sales-tax-calculator/${s.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors">
                <span className="font-medium text-sm">{s.name}</span>
                <span className="text-xs font-bold text-emerald-500">0.00%</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Highest Tax States */}
        <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-red-500/20 shadow-xl">
          <h3 className="font-bold text-lg mb-4 text-red-500">📈 Highest Combined Rates</h3>
          <div className="space-y-2">
            {highTaxStates.map(s => (
              <Link key={s.slug} href={`/tools/sales-tax-calculator/${s.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors">
                <span className="font-medium text-sm">{s.name}</span>
                <span className="text-xs font-bold text-red-500">{s.combinedRate}%</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Lowest Tax States */}
        <div className="bg-background/60 backdrop-blur-xl p-6 rounded-[2rem] border border-blue-500/20 shadow-xl">
          <h3 className="font-bold text-lg mb-4 text-blue-500">📉 Lowest Combined Rates</h3>
          <div className="space-y-2">
            {lowTaxStates.map(s => (
              <Link key={s.slug} href={`/tools/sales-tax-calculator/${s.slug}`} className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                <span className="font-medium text-sm">{s.name}</span>
                <span className="text-xs font-bold text-blue-500">{s.combinedRate}%</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Informational content for SEO */}
      <div className="prose prose-slate dark:prose-invert max-w-none bg-background/50 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] border border-foreground/20 shadow-xl">
        <h2 className="flex items-center gap-3 mt-0">
          <span className="w-2 h-8 rounded-full bg-primary not-prose"></span>
          US Sales Tax Explained
        </h2>
        <p>
          Sales tax in the United States is administered at the state and local level — there is no federal sales tax. 
          As of {new Date().getFullYear()}, 45 states and the District of Columbia levy a statewide sales tax, while 
          5 states (Alaska, Delaware, Montana, New Hampshire, and Oregon) have no statewide sales tax.
        </p>
        <h3>How Sales Tax Works</h3>
        <p>
          When you buy a taxable item at retail, the seller collects sales tax at the point of sale and remits it to 
          the state (and local) governments. The rate you pay is the combined total of the state rate plus any applicable 
          county, city, or special district taxes — which can add up significantly.
        </p>
        <h3>Origin vs. Destination-Based States</h3>
        <p>
          States use different systems to determine which rate applies. In <strong>destination-based</strong> states, 
          the rate is determined by where the buyer receives the goods. In <strong>origin-based</strong> states, 
          the rate is based on where the seller is located. This distinction matters most for remote or online sales.
        </p>
        <h3>Common Exemptions</h3>
        <p>
          Most states exempt <strong>groceries</strong> (unprepared food), <strong>prescription drugs</strong>, and 
          <strong>medical equipment</strong>. Some states also exempt clothing (New York, Minnesota, Pennsylvania). 
          Always check your specific state&apos;s rules, as exemptions vary significantly.
        </p>
      </div>
    </div>
  );
}
