"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StateSalesTaxCalculatorProps {
  stateName: string;
  stateRate: number;
  combinedRate: number;
}

export default function StateSalesTaxCalculator({
  stateName,
  stateRate,
  combinedRate,
}: StateSalesTaxCalculatorProps) {
  const [price, setPrice] = useState("100");
  const [useRate, setUseRate] = useState<"state" | "combined">("combined");
  const [results, setResults] = useState<{
    taxRate: number;
    taxAmount: number;
    totalPrice: number;
  } | null>(null);

  const handleCalculate = () => {
    const priceNum = parseFloat(price) || 0;
    const rate = useRate === "state" ? stateRate : combinedRate;
    const taxAmount = priceNum * (rate / 100);
    setResults({
      taxRate: rate,
      taxAmount,
      totalPrice: priceNum + taxAmount,
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

        <div className="space-y-6">
          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-semibold tracking-wide text-foreground/80">
              Purchase Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-12 rounded-xl bg-background/50 border-foreground/20 focus:bg-background transition-colors"
            />
          </div>

          {/* Rate Toggle */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold tracking-wide text-foreground/80">
              Tax Rate to Apply
            </Label>
            <div className="flex p-1.5 bg-muted/50 rounded-xl border border-foreground/20">
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  useRate === "combined"
                    ? "bg-background shadow-md text-foreground scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
                onClick={() => setUseRate("combined")}
              >
                Combined ({combinedRate}%)
              </button>
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  useRate === "state"
                    ? "bg-background shadow-md text-foreground scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
                onClick={() => setUseRate("state")}
              >
                State Only ({stateRate}%)
              </button>
            </div>
          </div>

          <Button
            className="w-full h-14 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            onClick={handleCalculate}
          >
            Calculate {stateName} Tax
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-7 h-full">
        {results ? (
          <div className="p-6 md:p-8 space-y-6 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold border-b border-foreground/20 pb-4 flex items-center gap-2">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              {stateName} Tax Results
            </h3>

            {/* Primary Result */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Total Price (Tax Included)</p>
              <p className="text-5xl font-black text-primary">
                ${results.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-muted/30 border border-foreground/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Tax Amount</p>
                <p className="text-2xl font-black text-foreground">
                  ${results.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/30 border border-foreground/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Rate Applied</p>
                <p className="text-2xl font-black text-foreground">{results.taxRate}%</p>
              </div>
            </div>

            {/* Visual breakdown bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                <span>Purchase Price</span>
                <span>Tax ({results.taxRate}%)</span>
              </div>
              <div className="h-4 rounded-full bg-muted/30 overflow-hidden flex">
                <div
                  className="h-full bg-primary rounded-l-full transition-all duration-700"
                  style={{
                    width: `${(parseFloat(price) / results.totalPrice) * 100}%`,
                  }}
                />
                <div
                  className="h-full bg-amber-500 rounded-r-full transition-all duration-700"
                  style={{
                    width: `${(results.taxAmount / results.totalPrice) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  ${parseFloat(price).toFixed(2)}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  ${results.taxAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-foreground/20 rounded-[2rem] bg-background/60 backdrop-blur-xl shadow-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20">
              <span className="text-2xl">🧾</span>
            </div>
            <p className="text-xl font-medium text-foreground text-center">Calculate {stateName} Tax</p>
            <p className="text-muted-foreground text-center mt-2 max-w-sm font-medium">
              Enter a purchase price and click Calculate to see the exact {stateName} sales tax amount.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
