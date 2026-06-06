import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MathCalc",
  description: "Learn more about MathCalc, your trusted destination for essential free online calculators and tools.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          About <span className="text-primary">MathCalc</span>
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p>
            Welcome to MathCalc, the premier destination for fast, reliable, and completely free online calculators. Our platform is structured as a fully-featured multipage application, ensuring that whether you need to calculate a mortgage or convert metric units, you get lightning-fast speeds and dedicated, highly-optimized tools.
          </p>
          <h2>Our Mission</h2>
          <p>
            We built MathCalc to solve a simple problem: the internet is full of cluttered, slow, and ad-heavy calculators. Our mission is to provide an expansive suite of essential calculators—spanning Finance, Health, Mathematics, and Conversions—all housed within a beautiful, modern, and privacy-first interface.
          </p>
          <h2>Why Choose MathCalc?</h2>
          <ul>
            <li><strong>Speed:</strong> Powered by modern web technologies, our calculators run client-side for instantaneous results.</li>
            <li><strong>Privacy:</strong> We don&apos;t store your sensitive calculations. What you calculate in your browser stays in your browser.</li>
            <li><strong>Accuracy:</strong> Our formulas are thoroughly tested against industry standards to ensure maximum precision.</li>
          </ul>
          <h2>Get in Touch</h2>
          <p>
            Our library of tools is constantly expanding. If you have a specific calculator you would like to see added, please don&apos;t hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>!
          </p>
        </div>
      </div>
    </div>
  );
}
