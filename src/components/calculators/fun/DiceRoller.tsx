"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface RollRecord {
  id: string;
  timestamp: Date;
  dice: number[];
  total: number;
}

// Map dice numbers to final 3D rotations (X, Y)
const faceRotations: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 0, y: 90 },
  4: { x: -90, y: 0 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

export default function DiceRoller() {
  const [isRolling, setIsRolling] = useState(false);
  const [diceCount, setDiceCount] = useState<1 | 2>(2);
  
  // Store the current accumulated rotation for each die
  const [rotations, setRotations] = useState([{ x: 0, y: 0 }, { x: 0, y: 0 }]);
  const [history, setHistory] = useState<RollRecord[]>([]);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    const newRolls: number[] = [];
    const newRotations = [...rotations];

    for (let i = 0; i < diceCount; i++) {
      const result = Math.floor(Math.random() * 6) + 1;
      newRolls.push(result);
      
      const target = faceRotations[result];
      // Add multiple full spins (360 * 3 = 1080) for the animation effect
      const spinsX = 1080;
      const spinsY = 1080;
      
      // Calculate the new absolute rotation ensuring we land on the target face
      // We need to find a value that is congruent to `target` modulo 360
      // and is greater than the current rotation by at least `spins`
      const currentX = newRotations[i]?.x || 0;
      const currentY = newRotations[i]?.y || 0;
      
      const nextX = currentX + spinsX + (target.x - (currentX % 360));
      const nextY = currentY + spinsY + (target.y - (currentY % 360));
      
      newRotations[i] = { x: nextX, y: nextY };
    }

    setRotations(newRotations);

    setTimeout(() => {
      setIsRolling(false);
      const total = newRolls.reduce((sum, val) => sum + val, 0);
      
      const record: RollRecord = {
        id: Math.random().toString(36).substring(2, 15),
        timestamp: new Date(),
        dice: newRolls,
        total
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

  const getDotPositions = (num: number) => {
    switch (num) {
      case 1: return ['col-start-2 row-start-2'];
      case 2: return ['col-start-1 row-start-1', 'col-start-3 row-start-3'];
      case 3: return ['col-start-1 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-3'];
      case 4: return ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-3', 'col-start-3 row-start-3'];
      case 5: return ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-2 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'];
      case 6: return ['col-start-1 row-start-1', 'col-start-1 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-1', 'col-start-3 row-start-2', 'col-start-3 row-start-3'];
      default: return [];
    }
  };

  // 3D Dice Component
  const renderDie = (index: number) => {
    const rot = rotations[index] || { x: 0, y: 0 };
    return (
      <div key={`die-${index}`} className={`relative w-24 h-24 perspective-1000 ${isRolling ? 'animate-toss' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
        <div 
          className="w-full h-full relative preserve-3d"
          style={{ 
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* Faces */}
          {[
            { num: 1, transform: 'translateZ(48px)' },
            { num: 6, transform: 'rotateY(180deg) translateZ(48px)' },
            { num: 3, transform: 'rotateY(90deg) translateZ(48px)' },
            { num: 4, transform: 'rotateY(-90deg) translateZ(48px)' },
            { num: 5, transform: 'rotateX(90deg) translateZ(48px)' },
            { num: 2, transform: 'rotateX(-90deg) translateZ(48px)' },
          ].map(face => (
            <div 
              key={`face-${face.num}`}
              className="absolute w-full h-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.1),0_0_5px_rgba(0,0,0,0.05)] flex items-center justify-center backface-hidden"
              style={{ transform: face.transform }}
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-16 h-16 p-1">
                {getDotPositions(face.num).map((pos, i) => (
                  <div key={i} className={`w-3.5 h-3.5 bg-rose-500 dark:bg-rose-400 rounded-full shadow-inner ${pos}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Animation & Controls */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group flex flex-col items-center">
        {/* Subtle animated background gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="relative z-10 w-full flex justify-center gap-6 my-12 min-h-[120px]">
          {Array.from({ length: diceCount }).map((_, i) => renderDie(i))}
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

        <div className="relative z-10 w-full space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold tracking-wide text-foreground/80">Number of Dice</Label>
            <div className="flex p-1.5 bg-muted/50 rounded-xl border border-foreground/20">
              {[1, 2].map(num => (
                <button
                  key={num}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${diceCount === num ? 'bg-background shadow-md text-foreground scale-[1.02]' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                  onClick={() => !isRolling && setDiceCount(num as 1 | 2)}
                  disabled={isRolling}
                >
                  {num} {num === 1 ? 'Die' : 'Dice'}
                </button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full h-14 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            onClick={handleRoll}
            disabled={isRolling}
          >
            {isRolling ? "Rolling..." : "ROLL DICE"}
          </Button>
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
                <span className="text-4xl opacity-50 mb-4">🎲</span>
                <p className="text-muted-foreground">Roll the dice to see history</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-background/95 backdrop-blur z-10">
                  <tr className="border-b border-foreground/10">
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Roll #</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Result</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Total</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground">Time</th>
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record, idx) => (
                    <tr key={record.id} className="border-b border-foreground/5 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{history.length - idx}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5">
                          {record.dice.map((d, i) => (
                            <span key={i} className="inline-flex items-center justify-center w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 text-xs font-bold shadow-sm">
                              {d}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-primary">{record.total}</td>
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
