"use client";

import { useState, useEffect, useRef } from "react";
import { formulas } from "@/lib/formulas";
import { tools } from "@/lib/tools-registry";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DoughnutChart from "./charts/DoughnutChart";
import LineChart from "./charts/LineChart";
import GaugeChart from "./charts/GaugeChart";


function AutocompleteInput({ 
  options, 
  value, 
  onChange 
}: { 
  options: {value: string, label: string}[], 
  value: string, 
  onChange: (val: string) => void 
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync searchTerm with value when closed or value changes from outside
  useEffect(() => {
    if (!open) {
      const selectedOpt = options.find(o => o.value === value);
      setSearchTerm(selectedOpt ? selectedOpt.label : value);
    }
  }, [value, options, open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o => 
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          value={open ? searchTerm : (options.find(o => o.value === value)?.label || value)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!open) setOpen(true);
          }}
          onClick={() => {
            setSearchTerm(""); // clear search on click for easy typing
            setOpen(true);
          }}
          placeholder="Search or select..."
          className="w-full pr-8"
        />
        <ChevronsUpDown className="absolute right-3 top-3 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm">No results found.</div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden hover:bg-accent hover:text-accent-foreground",
                    value === opt.value && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    onChange(opt.value);
                    setSearchTerm(opt.label);
                    setOpen(false);
                  }}
                >
                  {value === opt.value && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DynamicCalculator({ slug }: { slug: string }) {
  const config = formulas[slug];
  const toolInfo = tools.find(t => t.slug === slug);
  const category = toolInfo?.category || "math";
  
  let emptyStateIcon = "✨";
  if (category === "finance") emptyStateIcon = "📈";
  else if (category === "conversion") emptyStateIcon = "🔄";
  else if (category === "geometry") emptyStateIcon = "📐";
  else if (category === "physics") emptyStateIcon = "⚡";
  else if (category === "health") emptyStateIcon = "❤️";
  else if (category === "fun") emptyStateIcon = "🎲";
  
  // Initialize state based on inputs
  const initialInputs: Record<string, string> = {};
  if (config) {
    config.inputs.forEach(input => {
      initialInputs[input.id] = input.defaultValue || "";
    });
  }

  const [inputs, setInputs] = useState<Record<string, string>>(initialInputs);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currencies, setCurrencies] = useState<{value: string, label: string}[] | null>(null);

  const isGenerator = slug.includes("generator");
  const actionVerb = isGenerator ? "Generate" : "Calculate";
  const actionVerbing = isGenerator ? "Generating" : "Calculating";

  // Fetch dynamic currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      if (slug !== "currency-converter" && !config?.inputs.some(i => i.id === "currency")) return;
      try {
        const res = await fetch('https://api.currencyapi.com/v3/currencies?apikey=fca_live_Gher1ZqJkCJCnCws7BfIOADvQggxWiPraF94X7S2');
        const json = await res.json();
        const data = json.data;
        const options = Object.entries(data).map(([code, details]: [string, any]) => ({
          value: code,
          label: `${code} - ${details.name}`
        }));
        // Put common ones first
        const common = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];
        options.sort((a, b) => {
          const aIdx = common.indexOf(a.value);
          const bIdx = common.indexOf(b.value);
          if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
          if (aIdx !== -1) return -1;
          if (bIdx !== -1) return 1;
          return a.label.localeCompare(b.label);
        });
        setCurrencies(options);
      } catch (error) {
        console.error("Failed to fetch currencies", error);
      }
    };
    fetchCurrencies();
  }, [config]);

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleCalculate = async () => {
    const parsedInputs: Record<string, number | string> = {};
    for (const [key, value] of Object.entries(inputs)) {
      const inputDef = config.inputs.find(i => i.id === key);
      if (inputDef?.type === "number") {
        parsedInputs[key] = parseFloat(value as string) || 0;
      } else {
        parsedInputs[key] = value;
      }
    }
    
    try {
      setIsCalculating(true);
      const output = await config.calculate(parsedInputs);
      setResults(output);
    } catch (e) {
      console.error("Calculation error", e);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatOutput = (value: number | string | null, format?: string, prefix?: string, suffix?: string) => {
    if (value === null || value === undefined) return "-";
    
    let formatted = String(value);
    let actualPrefix = prefix || "";
    let actualSuffix = suffix || "";
    
    if (format === "currency" && inputs.currency) {
      actualPrefix = inputs.currency + " ";
    }

    if (inputs.to && slug.includes("-converter")) {
      actualSuffix = ` ${inputs.to}${actualSuffix}`;
    }
    
    if (typeof value === "number") {
      if (format === "currency") {
        formatted = value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else if (format === "percentage") {
        formatted = value.toFixed(2);
      } else if (format === "number") {
        formatted = value.toLocaleString(undefined, { maximumFractionDigits: 4 });
      }
    }
    
    return `${actualPrefix}${formatted}${actualSuffix}`;
  };

  if (!config) return null;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Inputs */}
      <div className="lg:col-span-5 relative p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl overflow-hidden group">
        {/* Subtle animated background gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-1">
            {config.inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <Label htmlFor={input.id} className="text-sm font-semibold tracking-wide text-foreground/80">{input.label}</Label>
                {input.type === "select" ? (
                  (slug === "currency-converter" || input.id === "currency") ? (
                    <AutocompleteInput
                      options={currencies ? currencies : (input.options || [])}
                      value={inputs[input.id]}
                      onChange={(val) => handleInputChange(input.id, val)}
                    />
                  ) : (
                    <div className="relative group">
                      <select
                        value={inputs[input.id]}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="w-full h-12 px-4 py-2 appearance-none rounded-xl bg-background/50 border border-foreground/20 focus:bg-background focus:ring-2 focus:ring-primary/20 hover:border-primary/50 transition-all outline-hidden font-medium cursor-pointer shadow-sm text-foreground"
                      >
                        {input.options?.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-background text-foreground py-2">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronsUpDown className="absolute right-4 top-4 h-4 w-4 opacity-40 group-hover:opacity-70 pointer-events-none transition-opacity" />
                    </div>
                  )
                ) : input.type === "toggle" ? (
                  <div className="flex p-1.5 bg-muted/50 rounded-xl border border-foreground/20">
                    {input.options?.map(opt => (
                      <button
                        key={opt.value}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${inputs[input.id] === opt.value ? 'bg-background shadow-md text-foreground scale-[1.02]' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                        onClick={() => handleInputChange(input.id, opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <Input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={inputs[input.id]}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="h-12 rounded-xl bg-background/50 border-foreground/20 focus:bg-background transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full h-14 text-xl font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group"
            onClick={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? `${actionVerbing}...` : actionVerb}
          </Button>
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-7 h-full">
        {results ? (
          <div className="p-6 md:p-8 space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-2xl font-bold border-b border-foreground/20 pb-4 flex items-center gap-2">
              <span className="w-2 h-8 rounded-full bg-primary"></span>
              Results
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {config.outputs.filter(o => o.format !== "chart").map((output, idx) => (
                <div key={output.id} className={`p-6 rounded-2xl border flex flex-col justify-center text-left transition-all hover:scale-[1.02] duration-300 ${idx === 0 ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm sm:col-span-2' : 'bg-muted/30 border-foreground/20'}`}>
                  <p className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-widest">{output.label}</p>
                  <p className={`font-black tracking-tight break-all ${idx === 0 ? 'text-4xl md:text-5xl text-primary' : 'text-2xl md:text-3xl text-foreground'}`}>
                    {formatOutput(results[output.id], output.format, output.prefix, output.suffix)}
                  </p>
                </div>
              ))}
            </div>

            {/* Render Charts */}
            {config.outputs.filter(o => o.format === "chart").map(output => {
              if (!output.chartConfig) return null;
              const chartData = results[output.id];
              
              if (output.chartConfig.type === "gauge") {
                const valueKey = output.chartConfig.series[0].key;
                const value = Number(results[valueKey] || 0);
                return (
                  <div key={output.id} className="mt-8 p-6 bg-background rounded-2xl border border-foreground/20 shadow-inner">
                    <GaugeChart value={value} title={output.label} />
                  </div>
                );
              }
              
              if (output.chartConfig.type === "doughnut") {
                const data = output.chartConfig.series.map(s => ({
                  name: s.name,
                  value: Number(results[s.key] || 0),
                  color: s.color
                }));
                return (
                  <div key={output.id} className="mt-8 p-6 bg-background rounded-2xl border border-foreground/20 shadow-inner">
                    <DoughnutChart data={data} title={output.label} />
                  </div>
                );
              }
              
              if (output.chartConfig.type === "line" && Array.isArray(chartData)) {
                return (
                  <div key={output.id} className="mt-8 p-6 bg-background rounded-2xl border border-foreground/20 shadow-inner">
                    <LineChart 
                      data={chartData} 
                      series={output.chartConfig.series} 
                      xAxisKey={output.chartConfig.xAxisKey || "year"}
                      title={output.label} 
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-foreground/20 rounded-[2rem] bg-background/60 backdrop-blur-xl shadow-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20">
              <span className="text-2xl text-primary">{emptyStateIcon}</span>
            </div>
            <p className="text-xl font-medium text-foreground text-center">Ready to {actionVerb.toLowerCase()}</p>
            <p className="text-muted-foreground text-center mt-2 max-w-sm font-medium">Fill in your details on the left and hit {actionVerb.toLowerCase()} to see your interactive results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
