'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center relative overflow-hidden">
          {/* Decorative background gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/10 via-background to-background opacity-40"></div>
          </div>

          <div className="max-w-2xl w-full flex flex-col items-center relative z-10 mt-8">
            <div className="bg-destructive/10 p-8 rounded-full mb-8">
              <AlertTriangle className="w-20 h-20 text-destructive" />
            </div>
            
            <h1 className="text-8xl font-black mb-4 tracking-tighter text-destructive">500</h1>
            <h2 className="text-5xl font-black mb-6 tracking-tighter text-destructive">Critical Error</h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
              Even calculators make mistakes sometimes. We&apos;ve encountered an unexpected system error at the root level.
            </p>

            <div className="bg-background/40 border border-border/50 p-6 rounded-2xl text-left mb-12 w-full overflow-hidden shadow-sm backdrop-blur-sm">
              <p className="font-mono text-sm text-muted-foreground line-clamp-3">{error.message || "A fatal application error occurred."}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button
                className="flex items-center justify-center gap-3 px-10 py-5 bg-destructive text-destructive-foreground text-lg font-bold rounded-full hover:bg-destructive/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-destructive/20"
                onClick={() => reset()}
              >
                <RotateCcw className="w-6 h-6" />
                Try again
              </button>
              <a 
                href="/" 
                className="flex items-center justify-center gap-3 px-10 py-5 bg-secondary text-secondary-foreground text-lg font-bold rounded-full hover:bg-secondary/80 hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/5"
              >
                <Home className="w-6 h-6" />
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
