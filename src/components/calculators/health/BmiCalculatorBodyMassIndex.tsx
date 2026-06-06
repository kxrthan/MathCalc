"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const calculatedBmi = w / (h * h);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) setCategory("Underweight");
      else if (calculatedBmi < 24.9) setCategory("Normal weight");
      else if (calculatedBmi < 29.9) setCategory("Overweight");
      else setCategory("Obesity");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            placeholder="e.g. 70" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input 
            id="height" 
            type="number" 
            placeholder="e.g. 175" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
          />
        </div>
      </div>
      
      <Button className="w-full" size="lg" onClick={calculateBMI}>Calculate BMI</Button>

      {bmi !== null && (
        <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground mb-2">Your Body Mass Index is</p>
          <p className="text-4xl font-bold text-primary mb-2">{bmi.toFixed(1)}</p>
          <p className="text-lg font-medium">{category}</p>
        </div>
      )}
    </div>
  );
}
