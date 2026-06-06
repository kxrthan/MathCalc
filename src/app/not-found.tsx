import Link from 'next/link';
import { Calculator, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-40"></div>
      </div>

      <div className="max-w-lg w-full flex flex-col items-center relative z-10 mt-8">
        <div className="bg-primary/10 p-8 rounded-full mb-8">
          <Calculator className="w-20 h-20 text-primary" />
        </div>
        
        <h1 className="text-8xl font-black mb-4 tracking-tighter text-foreground">404</h1>
        <h2 className="text-3xl font-bold mb-6 text-foreground">Page Not Found</h2>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          It seems you&apos;ve calculated a path that doesn&apos;t exist. The tool or page you are looking for has been moved or deleted.
        </p>
        
        <Link 
          href="/" 
          className="flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20"
        >
          <Home className="w-6 h-6" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
