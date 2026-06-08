import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MathCalc - Free Online Calculators for Math, Finance & More",
  description: "A curated collection of precise, fast, and free online calculators for math, finance, health, and everyday needs. Used by millions in the US.",
  openGraph: {
    title: "MathCalc - Free Online Calculators",
    description: "Precise, fast, and free online calculators for math, finance, health, and everyday needs.",
    type: "website",
    locale: "en_US",
    siteName: "MathCalc",
  },
  twitter: {
    card: "summary_large_image",
    title: "MathCalc - Free Online Calculators",
    description: "Precise, fast, and free online calculators for math, finance, health, and everyday needs.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
