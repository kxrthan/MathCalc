"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, RotateCcw, Pause } from "lucide-react";

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [millisecondsInput, setMillisecondsInput] = useState(0);
  
  // Time is stored in milliseconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 10)); // Tick every 10ms
      }, 10);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (!isActive && timeLeft === 0) {
      const total = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + millisecondsInput;
      if (total > 0) {
        setTimeLeft(total);
        setTotalTime(total);
        setIsActive(true);
      }
    } else if (!isActive && timeLeft > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setTotalTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMillisecondsInput(0);
  };

  const displayHours = Math.floor(timeLeft / 3600000);
  const displayMinutes = Math.floor((timeLeft % 3600000) / 60000);
  const displaySeconds = Math.floor((timeLeft % 60000) / 1000);
  const displayMilliseconds = Math.floor((timeLeft % 1000) / 10);
  
  // Progress is 0 when full time is left, 100 when time is up.
  // When no time is set, progress is 0.
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Settings */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group">
         {/* Subtle animated background gradient */}
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
         
         <div className="relative z-10 space-y-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="space-y-2">
             <Label className="text-muted-foreground font-semibold text-xs">Hours</Label>
             <Input 
               type="number" min="0" 
               value={hours} 
               onChange={e => setHours(Number(e.target.value))} 
               disabled={isActive} 
               className="h-14 text-lg font-bold bg-background text-center rounded-xl px-1"
             />
           </div>
           <div className="space-y-2">
             <Label className="text-muted-foreground font-semibold text-xs">Minutes</Label>
             <Input 
               type="number" min="0" max="59" 
               value={minutes} 
               onChange={e => setMinutes(Number(e.target.value))} 
               disabled={isActive} 
               className="h-14 text-lg font-bold bg-background text-center rounded-xl px-1"
             />
           </div>
           <div className="space-y-2">
             <Label className="text-muted-foreground font-semibold text-xs">Seconds</Label>
             <Input 
               type="number" min="0" max="59" 
               value={seconds} 
               onChange={e => setSeconds(Number(e.target.value))} 
               disabled={isActive} 
               className="h-14 text-lg font-bold bg-background text-center rounded-xl px-1"
             />
           </div>
           <div className="space-y-2">
             <Label className="text-muted-foreground font-semibold text-xs">MS</Label>
             <Input 
               type="number" min="0" max="999" step="10"
               value={millisecondsInput} 
               onChange={e => setMillisecondsInput(Number(e.target.value))} 
               disabled={isActive} 
               className="h-14 text-lg font-bold bg-background text-center rounded-xl px-1"
             />
           </div>
         </div>
         
         <div className="flex gap-4">
           {!isActive ? (
             <Button onClick={handleStart} className="flex-1 h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
               <Play className="w-5 h-5 mr-2" /> {timeLeft > 0 ? 'Resume' : 'Start'}
             </Button>
           ) : (
             <Button onClick={handlePause} variant="destructive" className="flex-1 h-14 text-lg font-bold rounded-xl shadow-lg shadow-destructive/25 transition-all duration-300">
               <Pause className="w-5 h-5 mr-2" /> Pause
             </Button>
           )}
           <Button onClick={handleReset} variant="outline" className="flex-1 h-14 text-lg font-bold rounded-xl border-foreground/20 hover:bg-muted/50 transition-all duration-300">
             <RotateCcw className="w-5 h-5 mr-2" /> Reset
           </Button>
         </div>
         </div>
      </div>
      
      {/* Right Column: Display */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 md:p-12 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl relative overflow-hidden min-h-[400px]">
         {/* Subtle ambient glow behind the timer */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/0 to-background/0"></div>
         
         {/* Minimalist Stopwatch Container */}
         <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
               {/* Background Track */}
               <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/20" />
               
               {/* Progress Ring */}
               <circle 
                 cx="50" cy="50" r="45" fill="none" 
                 stroke="currentColor" 
                 strokeWidth="5" 
                 strokeLinecap="round"
                 className={`text-primary ${isActive ? 'drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]' : ''}`}
                 strokeDasharray="283" 
                 strokeDashoffset={(283 * progress) / 100}
                 style={{ transition: 'stroke-dashoffset 10ms linear' }}
               />
            </svg>

            {/* Text Display */}
            <div className="absolute flex flex-col items-center justify-center w-full px-6">
              <div className={`flex items-baseline justify-center font-black tracking-tight tabular-nums transition-colors duration-300 w-full ${isActive ? 'text-primary' : 'text-foreground'}`}>
                <span className="text-4xl md:text-5xl">
                  {displayHours.toString().padStart(2, '0')}:
                  {displayMinutes.toString().padStart(2, '0')}:
                  {displaySeconds.toString().padStart(2, '0')}
                </span>
                <span className="text-xl md:text-2xl text-primary/70 ml-1">
                  .{displayMilliseconds.toString().padStart(2, '0')}
                </span>
              </div>
              
              {timeLeft === 0 && totalTime > 0 && !isActive && (
                <span className="text-lg text-green-500 font-bold mt-2 animate-bounce bg-background/80 px-4 py-1 rounded-full shadow-lg border border-green-500/20 backdrop-blur-sm">
                  Time&apos;s up!
                </span>
              )}
            </div>
         </div>
      </div>
    </div>
  );
}
