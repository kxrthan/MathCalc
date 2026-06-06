"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");
  const [compounds, setCompounds] = useState("12");
  
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compounds);

    if (p > 0 && r >= 0 && t > 0 && n > 0) {
      const amount = p * Math.pow((1 + r / n), n * t);
      setResult(amount);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="principal">Initial Investment ($)</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time Period (Years)</Label>
          <Input id="time" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compounds">Compound Frequency (Per Year)</Label>
          <Input id="compounds" type="number" value={compounds} onChange={(e) => setCompounds(e.target.value)} />
        </div>
      </div>
      
      <Button className="w-full" size="lg" onClick={calculate}>Calculate Returns</Button>

      {result !== null && (
        <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20 text-center flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Total Future Value</p>
          <p className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="w-full max-w-xs grid grid-cols-2 gap-4 text-sm bg-background p-4 rounded-lg border">
             <div className="flex flex-col items-center">
                <span className="text-muted-foreground">Principal</span>
                <span className="font-semibold">${parseFloat(principal).toLocaleString()}</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-semibold text-green-600">${(result - parseFloat(principal)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
