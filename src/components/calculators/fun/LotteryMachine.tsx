"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface DrawRecord {
  id: string;
  timestamp: Date;
  numbers: number[];
}

const BALL_COLORS = [
  'from-red-400 to-red-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-yellow-400 to-yellow-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-orange-400 to-orange-600',
];

export default function LotteryMachine() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [poolSize, setPoolSize] = useState<number | "">(49);
  const [pickCount, setPickCount] = useState<number | "">(6);
  const [history, setHistory] = useState<DrawRecord[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[] | null>(null);

  const handleGenerate = () => {
    if (isGenerating) return;
    
    const pSize = Number(poolSize) || 49;
    const pCount = Number(pickCount) || 6;
    
    const pool = Math.max(1, Math.min(1000, pSize));
    const count = Math.max(1, Math.min(pool, pCount));
    
    setIsGenerating(true);
    setDrawnNumbers(null);

    const numbers = new Set<number>();
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * pool) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    // 3 seconds animation
    setTimeout(() => {
      setIsGenerating(false);
      setDrawnNumbers(sortedNumbers);
      
      const record: DrawRecord = {
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date(),
        numbers: sortedNumbers
      };
      setHistory(prev => [record, ...prev]);
    }, 3000);
  };

  const deleteRecord = (id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getBallColor = (num: number) => {
    return BALL_COLORS[num % BALL_COLORS.length];
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Animation & Controls */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group flex flex-col items-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Glass Dome Lottery Machine */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-8 border-slate-200 dark:border-slate-700 bg-gradient-to-b from-white/40 to-slate-200/40 dark:from-slate-800/40 dark:to-slate-900/40 backdrop-blur-md shadow-[inset_0_-20px_40px_rgba(0,0,0,0.2),_0_15px_30px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden my-4 isolate">
            {/* Base / Stand illusion */}
            <div className="absolute bottom-0 w-32 h-6 bg-slate-300 dark:bg-slate-800 rounded-t-full opacity-50 blur-sm"></div>
            
            {/* Tumbling Balls */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div 
                key={`ball-${i}`}
                className="absolute w-8 h-8 rounded-full shadow-lg flex items-center justify-center border border-white/30 z-10"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%), var(--tw-gradient-stops)`,
                  left: `${15 + (i * 17) % 60}%`,
                  top: `${15 + (i * 23) % 60}%`,
                  animation: isGenerating ? `tumble${(i % 3) + 1} ${0.3 + (i * 0.05)}s infinite alternate ease-in-out` : 'none',
                  transform: `translate(${i % 2 === 0 ? 10 : -10}px, ${i % 3 === 0 ? 10 : -10}px)`,
                }}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${BALL_COLORS[i % BALL_COLORS.length]} -z-10`}></div>
                <span className="text-[10px] font-black text-white/90 drop-shadow-md">{Math.floor(Math.random() * 99) + 1}</span>
              </div>
            ))}
            
            {/* Glass reflection highlight */}
            <div className="absolute top-2 left-6 w-24 h-12 bg-gradient-to-b from-white/60 to-transparent rounded-full transform -rotate-45 z-20 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-12 h-6 bg-gradient-to-t from-white/30 to-transparent rounded-full transform rotate-45 z-20 pointer-events-none blur-sm"></div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes tumble1 {
              0% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(30px, -40px) rotate(120deg); }
              66% { transform: translate(-20px, 30px) rotate(240deg); }
              100% { transform: translate(-30px, -20px) rotate(360deg); }
            }
            @keyframes tumble2 {
              0% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(-30px, -30px) rotate(-120deg); }
              66% { transform: translate(40px, 10px) rotate(-240deg); }
              100% { transform: translate(20px, 40px) rotate(-360deg); }
            }
            @keyframes tumble3 {
              0% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(-10px, -50px) rotate(90deg); }
              66% { transform: translate(40px, -10px) rotate(180deg); }
              100% { transform: translate(-20px, 40px) rotate(270deg); }
            }
          `}} />

          {/* Configuration Inputs */}
          <div className="w-full grid grid-cols-2 gap-4 mt-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="poolSize" className="text-sm font-semibold tracking-wide text-foreground/80">Pool Size</Label>
              <Input 
                id="poolSize" 
                type="number" 
                value={poolSize} 
                onChange={(e) => setPoolSize(e.target.value ? Number(e.target.value) : "")}
                min={1}
                className="bg-background/50 border-foreground/20 font-medium"
                disabled={isGenerating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickCount" className="text-sm font-semibold tracking-wide text-foreground/80">Numbers to Pick</Label>
              <Input 
                id="pickCount" 
                type="number" 
                value={pickCount} 
                onChange={(e) => setPickCount(e.target.value ? Number(e.target.value) : "")}
                min={1}
                max={Number(poolSize) || 49}
                className="bg-background/50 border-foreground/20 font-medium"
                disabled={isGenerating}
              />
            </div>
          </div>

          <Button 
            className="w-full h-14 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "GENERATING..." : "GENERATE NUMBERS"}
          </Button>

          {/* Drawn Numbers Display */}
          {drawnNumbers && !isGenerating && (
            <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Label className="block text-center text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">Winning Numbers</Label>
              <div className="flex flex-wrap justify-center gap-3">
                {drawnNumbers.map((num, i) => (
                  <div 
                    key={i} 
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${getBallColor(num)} shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(255,255,255,0.4)] flex items-center justify-center border-2 border-white/50 text-white font-black text-xl transform hover:-translate-y-1 hover:scale-110 transition-all duration-300`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: History Table */}
      <div className="lg:col-span-7 h-full">
        <div className="p-6 md:p-8 space-y-6 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-foreground/20 pb-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              Draw History
            </h3>
            {history.length > 0 && (
              <Button variant="destructive" size="sm" onClick={clearHistory}>Clear Table</Button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[600px] pr-2">
            {history.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-foreground/20 rounded-[2rem] bg-muted/5">
                <span className="text-5xl opacity-50 mb-4">🎱</span>
                <p className="text-xl font-medium text-foreground">Ready to draw</p>
                <p className="text-muted-foreground text-center mt-2 max-w-sm">Hit generate to spin the machine and draw your winning numbers.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-background/95 backdrop-blur z-10">
                  <tr className="border-b border-foreground/10">
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Draw #</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Numbers</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Time</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, idx) => (
                    <tr key={record.id} className="border-b border-foreground/5 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-muted-foreground">{history.length - idx}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {record.numbers.map((num, i) => (
                            <span 
                              key={i} 
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br ${getBallColor(num)} text-white text-[10px] font-black shadow-sm border border-white/30`}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground whitespace-nowrap">{record.timestamp.toLocaleTimeString()}</td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={() => deleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
