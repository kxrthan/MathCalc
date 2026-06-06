"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FlipRecord {
  id: string;
  timestamp: Date;
  result: "Heads" | "Tails";
}

export default function CoinFlipper() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState<FlipRecord[]>([]);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    const isHeads = Math.random() < 0.5;
    
    // Add 5 full spins (1800 degrees) plus adjustment to land on the correct side
    const spins = 1800;
    let newRot = rotation + spins;
    
    const remainder = newRot % 360;
    if (isHeads && remainder !== 0) {
      newRot += 180;
    } else if (!isHeads && remainder !== 180) {
      newRot += 180;
    }

    setRotation(newRot);

    // Play animation for 2 seconds matching the CSS transition
    setTimeout(() => {
      setIsFlipping(false);
      const nextResult = isHeads ? "Heads" : "Tails";
      
      const record: FlipRecord = {
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date(),
        result: nextResult
      };
      setHistory(prev => [record, ...prev]);
    }, 2000);
  };

  const deleteRecord = (id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const headsCount = history.filter(r => r.result === "Heads").length;
  const tailsCount = history.filter(r => r.result === "Tails").length;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Coin Animation & Controls */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group flex flex-col items-center">
        {/* Subtle animated background gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className={`relative w-48 h-48 my-8 perspective-1000 z-10 ${isFlipping ? 'animate-toss' : ''}`}>
          <div 
            className="w-full h-full relative preserve-3d"
            style={{ 
              transform: `rotateX(${rotation}deg)`,
              transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {/* 3D Edge layers for thickness */}
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={`edge-${i}`} 
                className="absolute w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-600 to-yellow-800"
                style={{ transform: `translateZ(${i - 8}px)` }}
              />
            ))}
            
            {/* Heads Side (Front) */}
            <div 
              className="absolute w-full h-full backface-hidden rounded-full flex flex-col items-center justify-center"
              style={{ 
                transform: 'translateZ(9px)',
                background: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #d97706 100%)',
                boxShadow: 'inset 0 0 20px rgba(180, 83, 9, 0.8), inset 0 0 0 5px #fbbf24, inset 0 0 0 8px #b45309, 0 5px 15px rgba(0,0,0,0.5)',
              }}
            >
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-yellow-700/60 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50 transform -skew-x-12"></div>
                <span className="text-4xl font-black text-yellow-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.6)] tracking-widest z-10">HEADS</span>
              </div>
            </div>

            {/* Tails Side (Back) */}
            <div 
              className="absolute w-full h-full backface-hidden rounded-full flex flex-col items-center justify-center"
              style={{ 
                transform: 'rotateX(180deg) translateZ(9px)',
                background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #475569 100%)',
                boxShadow: 'inset 0 0 20px rgba(30, 41, 59, 0.8), inset 0 0 0 5px #cbd5e1, inset 0 0 0 8px #475569, 0 -5px 15px rgba(0,0,0,0.5)',
              }}
            >
              <div className="w-36 h-36 rounded-full border-2 border-dashed border-slate-700/60 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50 transform -skew-x-12"></div>
                <span className="text-4xl font-black text-slate-800 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] tracking-widest z-10">TAILS</span>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          @keyframes toss {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-40px) scale(1.2); }
            100% { transform: translateY(0) scale(1); }
          }
          .animate-toss { animation: toss 2s cubic-bezier(0.2, 0.8, 0.2, 1); }
        `}} />

        <div className="relative z-10 w-full space-y-8">
          <Button 
            className="w-full h-14 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            onClick={handleFlip}
            disabled={isFlipping}
          >
            {isFlipping ? "Flipping..." : "FLIP COIN"}
          </Button>
          
          {/* Stats */}
          <div className="flex w-full justify-around mt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Heads</p>
              <p className="text-3xl font-black text-primary">{headsCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Tails</p>
              <p className="text-3xl font-black text-foreground">{tailsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: History Table */}
      <div className="lg:col-span-7 h-full">
        <div className="p-6 md:p-8 space-y-6 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-foreground/20 pb-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              History
            </h3>
            {history.length > 0 && (
              <Button variant="destructive" size="sm" onClick={clearHistory}>Clear Table</Button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[500px] pr-2">
            {history.length === 0 ? (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-foreground/20 rounded-2xl bg-muted/10">
                <span className="text-4xl opacity-50 mb-4">🪙</span>
                <p className="text-muted-foreground">Flip the coin to see history</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-background/95 backdrop-blur z-10">
                  <tr className="border-b border-foreground/10">
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Flip #</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Result</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Time</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, idx) => (
                    <tr key={record.id} className="border-b border-foreground/5 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{history.length - idx}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${record.result === 'Heads' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'}`}>
                          {record.result}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{record.timestamp.toLocaleTimeString()}</td>
                      <td className="py-3 px-4 text-right">
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
