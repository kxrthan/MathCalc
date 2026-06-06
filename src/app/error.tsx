'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/10 via-background to-background opacity-40"></div>
      </div>

      <div className="max-w-2xl w-full flex flex-col items-center relative z-10 mt-8">
        <div className="bg-destructive/10 p-8 rounded-full mb-8">
          <AlertTriangle className="w-20 h-20 text-destructive" />
        </div>
        
        <h2 className="text-5xl font-black mb-6 tracking-tighter text-destructive">Something went wrong!</h2>
        
        <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
          Even calculators make mistakes sometimes. We&apos;ve encountered an unexpected system error.
        </p>

        <div className="bg-background/40 border border-border/50 p-6 rounded-2xl text-left mb-12 w-full overflow-hidden shadow-sm backdrop-blur-sm">
          <p className="font-mono text-sm text-muted-foreground line-clamp-3">{error.message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button
            className="flex items-center justify-center gap-3 px-10 py-5 bg-destructive text-destructive-foreground text-lg font-bold rounded-full hover:bg-destructive/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-destructive/20"
            onClick={() => reset()}
          >
            <RotateCcw className="w-6 h-6" />
            Try again
          </button>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-3 px-10 py-5 bg-secondary text-secondary-foreground text-lg font-bold rounded-full hover:bg-secondary/80 hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/5"
          >
            <Home className="w-6 h-6" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
