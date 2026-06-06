import Link from 'next/link';
import { SearchBar } from '../SearchBar';
import { Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { StandardCalculator } from '../StandardCalculator';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">MathCalc</span>
          </Link>
          <div className="hidden md:flex">
            <SearchBar />
          </div>
        </div>
        
        <nav className="flex items-center space-x-2">
          <Link href="/category/math">
            <Button variant="ghost" className="hidden sm:inline-flex">Math</Button>
          </Link>
          <Link href="/category/finance">
            <Button variant="ghost" className="hidden sm:inline-flex">Finance</Button>
          </Link>
          <Link href="/category/health">
            <Button variant="ghost" className="hidden sm:inline-flex">Health</Button>
          </Link>
          <Link href="/#categories">
            <Button variant="default">All Tools</Button>
          </Link>
          <Popover>
            <PopoverTrigger className="w-10 h-10 rounded-full border border-primary/20 hover:bg-primary/10 flex items-center justify-center bg-background transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Calculator className="h-5 w-5 text-primary" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none shadow-none bg-transparent" align="end" sideOffset={12}>
              <StandardCalculator />
            </PopoverContent>
          </Popover>
          <ThemeToggle />
        </nav>
      </div>
      <div className="container mx-auto px-4 pb-3 md:hidden">
         <SearchBar />
      </div>
    </header>
  );
}
