import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-transparent bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MathCalc</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your trusted destination for essential free online calculators and tools. Fast, accurate, and easy to use.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Top Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/math" className="hover:text-primary">Math Calculators</Link></li>
              <li><Link href="/category/finance" className="hover:text-primary">Financial Calculators</Link></li>
              <li><Link href="/category/health" className="hover:text-primary">Health & Fitness</Link></li>
              <li><Link href="/category/percent" className="hover:text-primary">Percentage Calculators</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/bmi-calculator" className="hover:text-primary">BMI Calculator</Link></li>
              <li><Link href="/tools/compound-interest" className="hover:text-primary">Compound Interest</Link></li>
              <li><Link href="/tools/percentage" className="hover:text-primary">Percentage Calculator</Link></li>
              <li><Link href="/tools/loan" className="hover:text-primary">Loan Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MathCalc. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Made for everyday calculations.</p>
        </div>
      </div>
    </footer>
  );
}
