"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

export function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const doMath = (op: string, a: number, b: number) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
    }
    return b;
  };

  const handleOp = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (previous === null) {
      setPrevious(inputValue);
    } else if (operator && !waitingForNewValue) {
      const currentValue = previous;
      const newValue = doMath(operator, currentValue, inputValue);
      const res = parseFloat(newValue.toPrecision(12));
      setPrevious(res);
      setDisplay(String(res));
    }

    setWaitingForNewValue(true);
    setOperator(nextOp);
  };

  const calculate = () => {
    if (!operator || previous === null) return;
    
    const inputValue = parseFloat(display);
    const newValue = doMath(operator, previous, inputValue);
    const res = parseFloat(newValue.toPrecision(12));
    
    setDisplay(String(res));
    setPrevious(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleDot = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleDelete = () => {
    if (!waitingForNewValue) {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    }
  };

  return (
    <div className="w-64 p-4 bg-background border border-foreground/20 rounded-2xl shadow-2xl flex flex-col gap-3">
      <div className="w-full bg-muted/50 p-3 rounded-xl text-right font-mono tracking-tight overflow-hidden text-ellipsis border border-foreground/20 h-16 flex flex-col items-end justify-center relative">
        {/* Sub-display for expression */}
        <div className="text-xs text-muted-foreground h-4 absolute top-1.5 right-3">
          {previous !== null && operator ? `${previous} ${operator === '*' ? '×' : operator === '/' ? '÷' : operator}` : ''}
        </div>
        {/* Main display */}
        <div className="text-2xl mt-3">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button variant="destructive" onClick={handleClear} className="col-span-2 border border-foreground/20">AC</Button>
        <Button variant="secondary" onClick={handleDelete} className="border border-foreground/20">DEL</Button>
        <Button variant={operator === '/' && waitingForNewValue ? 'default' : 'secondary'} onClick={() => handleOp("/")} className={`border border-foreground/20 ${operator === '/' && waitingForNewValue ? 'bg-primary text-white' : ''}`}>÷</Button>

        <Button variant="outline" onClick={() => handleNum("7")} className="border border-foreground/20 bg-background hover:bg-muted">7</Button>
        <Button variant="outline" onClick={() => handleNum("8")} className="border border-foreground/20 bg-background hover:bg-muted">8</Button>
        <Button variant="outline" onClick={() => handleNum("9")} className="border border-foreground/20 bg-background hover:bg-muted">9</Button>
        <Button variant={operator === '*' && waitingForNewValue ? 'default' : 'secondary'} onClick={() => handleOp("*")} className={`border border-foreground/20 ${operator === '*' && waitingForNewValue ? 'bg-primary text-white' : ''}`}>×</Button>

        <Button variant="outline" onClick={() => handleNum("4")} className="border border-foreground/20 bg-background hover:bg-muted">4</Button>
        <Button variant="outline" onClick={() => handleNum("5")} className="border border-foreground/20 bg-background hover:bg-muted">5</Button>
        <Button variant="outline" onClick={() => handleNum("6")} className="border border-foreground/20 bg-background hover:bg-muted">6</Button>
        <Button variant={operator === '-' && waitingForNewValue ? 'default' : 'secondary'} onClick={() => handleOp("-")} className={`border border-foreground/20 ${operator === '-' && waitingForNewValue ? 'bg-primary text-white' : ''}`}>-</Button>

        <Button variant="outline" onClick={() => handleNum("1")} className="border border-foreground/20 bg-background hover:bg-muted">1</Button>
        <Button variant="outline" onClick={() => handleNum("2")} className="border border-foreground/20 bg-background hover:bg-muted">2</Button>
        <Button variant="outline" onClick={() => handleNum("3")} className="border border-foreground/20 bg-background hover:bg-muted">3</Button>
        <Button variant={operator === '+' && waitingForNewValue ? 'default' : 'secondary'} onClick={() => handleOp("+")} className={`border border-foreground/20 ${operator === '+' && waitingForNewValue ? 'bg-primary text-white' : ''}`}>+</Button>

        <Button variant="outline" onClick={() => handleNum("0")} className="col-span-2 border border-foreground/20 bg-background hover:bg-muted">0</Button>
        <Button variant="outline" onClick={handleDot} className="border border-foreground/20 bg-background hover:bg-muted">.</Button>
        <Button variant="default" onClick={calculate} className="bg-primary hover:bg-primary/90 text-white border border-foreground/20">=</Button>
      </div>
    </div>
  );
}
