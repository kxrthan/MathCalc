"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PercentageCalculator() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result1, setResult1] = useState<string | null>(null);

  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [result2, setResult2] = useState<string | null>(null);

  const calc1 = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setResult1(((v1 / 100) * v2).toString());
    }
  };

  const calc2 = () => {
    const v3 = parseFloat(val3);
    const v4 = parseFloat(val4);
    if (!isNaN(v3) && !isNaN(v4) && v4 !== 0) {
      setResult2(((v3 / v4) * 100).toString() + "%");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-12">
      {/* Type 1 */}
      <div className="space-y-4 p-6 bg-muted/20 rounded-xl border">
        <h3 className="font-semibold text-lg">What is X % of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-medium">What is</span>
          <Input className="w-24 text-center" type="number" placeholder="%" value={val1} onChange={e => setVal1(e.target.value)} />
          <span className="font-medium">% of</span>
          <Input className="w-32 text-center" type="number" placeholder="value" value={val2} onChange={e => setVal2(e.target.value)} />
          <span className="font-medium">?</span>
        </div>
        <Button onClick={calc1}>Calculate</Button>
        {result1 && (
          <div className="mt-4 p-4 bg-primary/10 text-primary font-bold text-xl rounded-lg text-center">
            Result: {result1}
          </div>
        )}
      </div>

      {/* Type 2 */}
      <div className="space-y-4 p-6 bg-muted/20 rounded-xl border">
        <h3 className="font-semibold text-lg">X is what percent of Y?</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input className="w-32 text-center" type="number" placeholder="value" value={val3} onChange={e => setVal3(e.target.value)} />
          <span className="font-medium">is what percent of</span>
          <Input className="w-32 text-center" type="number" placeholder="value" value={val4} onChange={e => setVal4(e.target.value)} />
          <span className="font-medium">?</span>
        </div>
        <Button onClick={calc2}>Calculate</Button>
        {result2 && (
          <div className="mt-4 p-4 bg-primary/10 text-primary font-bold text-xl rounded-lg text-center">
            Result: {result2}
          </div>
        )}
      </div>
    </div>
  );
}
