"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  };

  const handleNum = (num: string) => {
    if (waitingForNewNumber) {
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDot = () => {
    if (waitingForNewNumber) {
      setDisplay("0.");
      setWaitingForNewNumber(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOp = (op: string) => {
    const currentNum = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentNum);
      setEquation(`${currentNum} ${op}`);
    } else if (operation) {
      const result = calculate(prevValue, currentNum, operation);
      setDisplay(String(result));
      setPrevValue(result);
      setEquation(`${result} ${op}`);
    }

    setOperation(op);
    setWaitingForNewNumber(true);
  };

  const handleEqual = () => {
    if (prevValue === null || !operation || waitingForNewNumber) return;

    const currentNum = parseFloat(display);
    const result = calculate(prevValue, currentNum, operation);

    setDisplay(String(result));
    setEquation(`${prevValue} ${operation} ${currentNum} =`);
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewNumber(false);
  };
  
  const handleBackspace = () => {
    if (waitingForNewNumber) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  return (
    <div className="w-full flex justify-center items-start">
      <div className="w-full max-w-sm relative p-6 md:p-8 space-y-6 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group">
         {/* Subtle animated background gradient */}
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
         
         <div className="relative z-10 flex flex-col space-y-6">
            
            {/* Screen */}
            <div className="w-full bg-background/80 border border-foreground/10 rounded-2xl p-4 flex flex-col items-end justify-between min-h-[120px] shadow-inner">
               <div className="text-muted-foreground/80 h-6 text-sm font-medium tracking-wider">
                 {equation}
               </div>
               <div className="text-5xl font-black tracking-tighter tabular-nums overflow-hidden text-right w-full text-foreground truncate">
                 {display === "NaN" ? "Error" : display}
               </div>
            </div>
            
            {/* Keypad */}
            <div className="grid grid-cols-4 gap-3">
               <Button onClick={handleClear} variant="outline" className="col-span-2 h-14 text-lg font-bold rounded-xl border-foreground/20 text-destructive hover:text-destructive hover:bg-destructive/10">C</Button>
               <Button onClick={handleBackspace} variant="outline" className="col-span-1 h-14 text-lg font-bold rounded-xl border-foreground/20 text-orange-500 hover:text-orange-500 hover:bg-orange-500/10">⌫</Button>
               <Button onClick={() => handleOp("÷")} variant="default" className="col-span-1 h-14 text-2xl font-bold rounded-xl shadow-lg shadow-primary/25">÷</Button>
               
               <Button onClick={() => handleNum("7")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">7</Button>
               <Button onClick={() => handleNum("8")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">8</Button>
               <Button onClick={() => handleNum("9")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">9</Button>
               <Button onClick={() => handleOp("×")} variant="default" className="h-14 text-2xl font-bold rounded-xl shadow-lg shadow-primary/25">×</Button>
               
               <Button onClick={() => handleNum("4")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">4</Button>
               <Button onClick={() => handleNum("5")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">5</Button>
               <Button onClick={() => handleNum("6")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">6</Button>
               <Button onClick={() => handleOp("-")} variant="default" className="h-14 text-2xl font-bold rounded-xl shadow-lg shadow-primary/25">−</Button>
               
               <Button onClick={() => handleNum("1")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">1</Button>
               <Button onClick={() => handleNum("2")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">2</Button>
               <Button onClick={() => handleNum("3")} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">3</Button>
               <Button onClick={() => handleOp("+")} variant="default" className="h-14 text-2xl font-bold rounded-xl shadow-lg shadow-primary/25">+</Button>
               
               <Button onClick={() => handleNum("0")} variant="outline" className="col-span-2 h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">0</Button>
               <Button onClick={handleDot} variant="outline" className="h-14 text-2xl font-bold rounded-xl border-foreground/10 hover:bg-foreground/5 bg-background/50">.</Button>
               <Button onClick={handleEqual} variant="default" className="h-14 text-2xl font-bold rounded-xl shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/25">=</Button>
            </div>
         </div>
      </div>
    </div>
  );
}
