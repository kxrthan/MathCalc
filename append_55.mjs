import fs from 'fs';

const newFormulas = `
  "celsius-to-rankine": {
    slug: "celsius-to-rankine",
    inputs: [{ id: "c", label: "Celsius (°C)", type: "number", defaultValue: "20" }],
    outputs: [{ id: "r", label: "Rankine (°R)", format: "number" }],
    calculate: (inputs) => ({ r: (Number(inputs.c) * 9/5) + 491.67 })
  },
  "centimeters-to-inches": {
    slug: "centimeters-to-inches",
    inputs: [{ id: "cm", label: "Centimeters", type: "number", defaultValue: "10" }],
    outputs: [{ id: "in", label: "Inches", format: "number" }],
    calculate: (inputs) => ({ in: Number(inputs.cm) / 2.54 })
  },
  "character-counter": {
    slug: "character-counter",
    inputs: [{ id: "text", label: "Text", type: "text", defaultValue: "Hello World" }],
    outputs: [{ id: "count", label: "Character Count", format: "number" }],
    calculate: (inputs) => ({ count: String(inputs.text).length })
  },
  "checkbook-balance-calculator": {
    slug: "checkbook-balance-calculator",
    inputs: [
      { id: "start", label: "Starting Balance", type: "number", defaultValue: "1000" },
      { id: "dep", label: "Deposits", type: "number", defaultValue: "500" },
      { id: "with", label: "Withdrawals", type: "number", defaultValue: "200" }
    ],
    outputs: [{ id: "bal", label: "Ending Balance", format: "currency", prefix: "$" }],
    calculate: (inputs) => ({ bal: Number(inputs.start) + Number(inputs.dep) - Number(inputs.with) })
  },
  "checkbook-calculator": {
    slug: "checkbook-calculator",
    inputs: [
      { id: "start", label: "Starting Balance", type: "number", defaultValue: "1000" },
      { id: "dep", label: "Deposits", type: "number", defaultValue: "500" },
      { id: "with", label: "Withdrawals", type: "number", defaultValue: "200" }
    ],
    outputs: [{ id: "bal", label: "Ending Balance", format: "currency", prefix: "$" }],
    calculate: (inputs) => ({ bal: Number(inputs.start) + Number(inputs.dep) - Number(inputs.with) })
  },
  "numbers-to-words-converter": {
    slug: "numbers-to-words-converter",
    inputs: [{ id: "n", label: "Number (0-999)", type: "number", defaultValue: "123" }],
    outputs: [{ id: "word", label: "Words", format: "text" }],
    calculate: (inputs) => {
      const n = Math.floor(Math.max(0, Math.min(999, Number(inputs.n))));
      const ones = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
      const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
      if (n < 20) return { word: ones[n] };
      let res = "";
      if (n >= 100) { res += ones[Math.floor(n/100)] + " Hundred "; }
      const rem = n % 100;
      if (rem > 0) {
        if (rem < 20) res += ones[rem];
        else {
          res += tens[Math.floor(rem/10)];
          if (rem%10 > 0) res += "-" + ones[rem%10];
        }
      }
      return { word: res.trim() || "Zero" };
    }
  },
  "circle-calculator": {
    slug: "circle-calculator",
    inputs: [{ id: "r", label: "Radius", type: "number", defaultValue: "5" }],
    outputs: [{ id: "area", label: "Area", format: "number" }, { id: "circ", label: "Circumference", format: "number" }],
    calculate: (inputs) => {
      const r = Number(inputs.r);
      return { area: Math.PI * r * r, circ: 2 * Math.PI * r };
    }
  },
  "circular-cylinder-calculator": {
    slug: "circular-cylinder-calculator",
    inputs: [{ id: "r", label: "Radius", type: "number", defaultValue: "5" }, { id: "h", label: "Height", type: "number", defaultValue: "10" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => ({ vol: Math.PI * Math.pow(Number(inputs.r), 2) * Number(inputs.h) })
  },
  "circular-permutation-calculator": {
    slug: "circular-permutation-calculator",
    inputs: [{ id: "n", label: "n", type: "number", defaultValue: "5" }],
    outputs: [{ id: "p", label: "Circular Permutations", format: "number" }],
    calculate: (inputs) => {
      let n = Math.max(1, Number(inputs.n)) - 1;
      let f = 1;
      for(let i=2; i<=n; i++) f*=i;
      return { p: f };
    }
  },
  "coin-flipper": {
    slug: "coin-flipper",
    inputs: [],
    outputs: [{ id: "res", label: "Result", format: "text" }],
    calculate: () => ({ res: Math.random() > 0.5 ? "Heads" : "Tails" })
  },
  "combination-with-replacement-calculator": {
    slug: "combination-with-replacement-calculator",
    inputs: [{ id: "n", label: "n (Items)", type: "number", defaultValue: "5" }, { id: "r", label: "r (Choosing)", type: "number", defaultValue: "3" }],
    outputs: [{ id: "res", label: "Combinations", format: "number" }],
    calculate: (inputs) => {
      const n = Number(inputs.n); const r = Number(inputs.r);
      const fact = (x: number) => { let f=1; for(let i=2; i<=x; i++) f*=i; return f; };
      return { res: fact(n+r-1) / (fact(r) * fact(n-1)) };
    }
  },
  "combinations-calculator-ncr": {
    slug: "combinations-calculator-ncr",
    inputs: [{ id: "n", label: "n", type: "number", defaultValue: "5" }, { id: "r", label: "r", type: "number", defaultValue: "3" }],
    outputs: [{ id: "res", label: "nCr", format: "number" }],
    calculate: (inputs) => {
      const n = Number(inputs.n); const r = Number(inputs.r);
      const fact = (x: number) => { let f=1; for(let i=2; i<=x; i++) f*=i; return f; };
      return { res: fact(n) / (fact(r) * fact(n-r)) };
    }
  },
  "common-factor-calculator": {
    slug: "common-factor-calculator",
    inputs: [{ id: "a", label: "Number A", type: "number", defaultValue: "12" }, { id: "b", label: "Number B", type: "number", defaultValue: "18" }],
    outputs: [{ id: "gcf", label: "Greatest Common Factor", format: "number" }],
    calculate: (inputs) => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      return { gcf: gcd(Number(inputs.a), Number(inputs.b)) };
    }
  },
  "comparing-fractions-calculator": {
    slug: "comparing-fractions-calculator",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", defaultValue: "3" },
      { id: "d1", label: "Denominator 1", type: "number", defaultValue: "4" },
      { id: "n2", label: "Numerator 2", type: "number", defaultValue: "5" },
      { id: "d2", label: "Denominator 2", type: "number", defaultValue: "8" }
    ],
    outputs: [{ id: "res", label: "Larger Fraction", format: "text" }],
    calculate: (inputs) => {
      const v1 = Number(inputs.n1) / Number(inputs.d1);
      const v2 = Number(inputs.n2) / Number(inputs.d2);
      if(v1 > v2) return { res: "Fraction 1" };
      if(v2 > v1) return { res: "Fraction 2" };
      return { res: "Equal" };
    }
  },
  "completing-the-square-calculator": {
    slug: "completing-the-square-calculator",
    inputs: [{ id: "a", label: "a", type: "number", defaultValue: "1" }, { id: "b", label: "b", type: "number", defaultValue: "4" }, { id: "c", label: "c", type: "number", defaultValue: "-5" }],
    outputs: [{ id: "res", label: "Completed Square Form", format: "text" }],
    calculate: (inputs) => {
      const a = Number(inputs.a); const b = Number(inputs.b); const c = Number(inputs.c);
      const h = b / (2*a);
      const k = c - (b*b)/(4*a);
      return { res: \`\${a}(x \${h>=0?'+':''} \${h})^2 \${k>=0?'+':''} \${k}\` };
    }
  },
  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    inputs: [
      { id: "p", label: "Principal", type: "number", defaultValue: "1000" },
      { id: "r", label: "Rate (%)", type: "number", defaultValue: "5" },
      { id: "t", label: "Years", type: "number", defaultValue: "10" }
    ],
    outputs: [{ id: "a", label: "Future Value", format: "currency", prefix: "$" }],
    calculate: (inputs) => {
      const p = Number(inputs.p); const r = Number(inputs.r)/100; const t = Number(inputs.t);
      return { a: p * Math.pow(1 + r, t) };
    }
  },
  "complex-fraction-calculator": {
    slug: "complex-fraction-calculator",
    inputs: [
      { id: "n1", label: "Numerator A", type: "number", defaultValue: "1" }, { id: "d1", label: "Denominator A", type: "number", defaultValue: "2" },
      { id: "n2", label: "Numerator B", type: "number", defaultValue: "3" }, { id: "d2", label: "Denominator B", type: "number", defaultValue: "4" }
    ],
    outputs: [{ id: "res", label: "Simplified (A/B)", format: "text" }],
    calculate: (inputs) => {
      const top = Number(inputs.n1) * Number(inputs.d2);
      const bot = Number(inputs.d1) * Number(inputs.n2);
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(Math.abs(top), Math.abs(bot)) || 1;
      return { res: \`\${top/g} / \${bot/g}\` };
    }
  },
  "computer-storage-units-conversion-calculator": {
    slug: "computer-storage-units-conversion-calculator",
    inputs: [{ id: "mb", label: "Megabytes (MB)", type: "number", defaultValue: "1024" }],
    outputs: [{ id: "gb", label: "Gigabytes (GB)", format: "number" }],
    calculate: (inputs) => ({ gb: Number(inputs.mb) / 1024 })
  },
  "conception-calculator": {
    slug: "conception-calculator",
    inputs: [{ id: "days", label: "Days until due date", type: "number", defaultValue: "200" }],
    outputs: [{ id: "res", label: "Estimated Days Pregnant", format: "number" }],
    calculate: (inputs) => ({ res: 280 - Number(inputs.days) })
  },
  "concrete-volume-calculator": {
    slug: "concrete-volume-calculator",
    inputs: [{ id: "l", label: "Length (ft)", type: "number", defaultValue: "10" }, { id: "w", label: "Width (ft)", type: "number", defaultValue: "10" }, { id: "d", label: "Depth (ft)", type: "number", defaultValue: "0.5" }],
    outputs: [{ id: "yd", label: "Cubic Yards", format: "number" }],
    calculate: (inputs) => ({ yd: (Number(inputs.l) * Number(inputs.w) * Number(inputs.d)) / 27 })
  },
  "cone-calculator": {
    slug: "cone-calculator",
    inputs: [{ id: "r", label: "Radius", type: "number", defaultValue: "5" }, { id: "h", label: "Height", type: "number", defaultValue: "10" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => ({ vol: (Math.PI * Math.pow(Number(inputs.r), 2) * Number(inputs.h)) / 3 })
  },
  "conical-frustum-calculator": {
    slug: "conical-frustum-calculator",
    inputs: [{ id: "r1", label: "Radius 1", type: "number", defaultValue: "5" }, { id: "r2", label: "Radius 2", type: "number", defaultValue: "3" }, { id: "h", label: "Height", type: "number", defaultValue: "10" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => {
      const r1 = Number(inputs.r1); const r2 = Number(inputs.r2); const h = Number(inputs.h);
      return { vol: (Math.PI * h * (r1*r1 + r1*r2 + r2*r2)) / 3 };
    }
  },
  "cooking-conversion-calculators": {
    slug: "cooking-conversion-calculators",
    inputs: [{ id: "cups", label: "Cups", type: "number", defaultValue: "2" }],
    outputs: [{ id: "ml", label: "Milliliters (ml)", format: "number" }],
    calculate: (inputs) => ({ ml: Number(inputs.cups) * 236.588 })
  },
  "countdown-timer": {
    slug: "countdown-timer",
    inputs: [{ id: "days", label: "Days from now", type: "number", defaultValue: "5" }],
    outputs: [{ id: "hours", label: "Hours Remaining", format: "number" }],
    calculate: (inputs) => ({ hours: Number(inputs.days) * 24 })
  },
  "cube-calculator": {
    slug: "cube-calculator",
    inputs: [{ id: "a", label: "Edge Length", type: "number", defaultValue: "4" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }, { id: "area", label: "Surface Area", format: "number" }],
    calculate: (inputs) => {
      const a = Number(inputs.a);
      return { vol: a*a*a, area: 6*a*a };
    }
  },
  "cube-calculator-x": {
    slug: "cube-calculator-x",
    inputs: [{ id: "x", label: "Value (x)", type: "number", defaultValue: "3" }],
    outputs: [{ id: "res", label: "x³", format: "number" }],
    calculate: (inputs) => ({ res: Math.pow(Number(inputs.x), 3) })
  },
  "cube-root-calculator": {
    slug: "cube-root-calculator",
    inputs: [{ id: "x", label: "Value (x)", type: "number", defaultValue: "27" }],
    outputs: [{ id: "res", label: "∛x", format: "number" }],
    calculate: (inputs) => ({ res: Math.cbrt(Number(inputs.x)) })
  },
  "cubic-equation-calculator-3rd-order-polynomial": {
    slug: "cubic-equation-calculator-3rd-order-polynomial",
    inputs: [{ id: "a", label: "a", type: "number", defaultValue: "1" }, { id: "b", label: "b", type: "number", defaultValue: "0" }, { id: "c", label: "c", type: "number", defaultValue: "0" }, { id: "d", label: "d", type: "number", defaultValue: "-8" }],
    outputs: [{ id: "res", label: "Polynomial Form", format: "text" }],
    calculate: (inputs) => {
      return { res: \`\${inputs.a}x³ + \${inputs.b}x² + \${inputs.c}x + \${inputs.d} = 0\` };
    }
  },
  "cubic-yards-calculator": {
    slug: "cubic-yards-calculator",
    inputs: [{ id: "l", label: "Length (ft)", type: "number", defaultValue: "10" }, { id: "w", label: "Width (ft)", type: "number", defaultValue: "10" }, { id: "h", label: "Height (ft)", type: "number", defaultValue: "10" }],
    outputs: [{ id: "yd", label: "Cubic Yards", format: "number" }],
    calculate: (inputs) => ({ yd: (Number(inputs.l) * Number(inputs.w) * Number(inputs.h)) / 27 })
  },
  "cubic-feet-calculator": {
    slug: "cubic-feet-calculator",
    inputs: [{ id: "l", label: "Length (ft)", type: "number", defaultValue: "10" }, { id: "w", label: "Width (ft)", type: "number", defaultValue: "10" }, { id: "h", label: "Height (ft)", type: "number", defaultValue: "10" }],
    outputs: [{ id: "ft", label: "Cubic Feet", format: "number" }],
    calculate: (inputs) => ({ ft: Number(inputs.l) * Number(inputs.w) * Number(inputs.h) })
  },
  "cubic-feet-to-cubic-yards": {
    slug: "cubic-feet-to-cubic-yards",
    inputs: [{ id: "ft", label: "Cubic Feet", type: "number", defaultValue: "27" }],
    outputs: [{ id: "yd", label: "Cubic Yards", format: "number" }],
    calculate: (inputs) => ({ yd: Number(inputs.ft) / 27 })
  },
  "cubic-yards-to-cubic-feet": {
    slug: "cubic-yards-to-cubic-feet",
    inputs: [{ id: "yd", label: "Cubic Yards", type: "number", defaultValue: "1" }],
    outputs: [{ id: "ft", label: "Cubic Feet", format: "number" }],
    calculate: (inputs) => ({ ft: Number(inputs.yd) * 27 })
  },
  "currency-appreciation-and-depreciation-calculator": {
    slug: "currency-appreciation-and-depreciation-calculator",
    inputs: [{ id: "old", label: "Old Value", type: "number", defaultValue: "1.00" }, { id: "new", label: "New Value", type: "number", defaultValue: "1.05" }],
    outputs: [{ id: "pct", label: "Change (%)", format: "percentage" }],
    calculate: (inputs) => ({ pct: ((Number(inputs.new) - Number(inputs.old)) / Number(inputs.old)) * 100 })
  },
  "currency-converter": {
    slug: "currency-converter",
    inputs: [{ id: "val", label: "Amount", type: "number", defaultValue: "100" }, { id: "rate", label: "Exchange Rate", type: "number", defaultValue: "0.85" }],
    outputs: [{ id: "res", label: "Converted Amount", format: "number" }],
    calculate: (inputs) => ({ res: Number(inputs.val) * Number(inputs.rate) })
  },
  "date-days-calculator": {
    slug: "date-days-calculator",
    inputs: [{ id: "days", label: "Days to add", type: "number", defaultValue: "30" }],
    outputs: [{ id: "res", label: "Days Added", format: "number" }],
    calculate: (inputs) => ({ res: Number(inputs.days) })
  },
  "date-difference-calculator": {
    slug: "date-difference-calculator",
    inputs: [{ id: "d1", label: "Day 1 (timestamp)", type: "number", defaultValue: "1600000000000" }, { id: "d2", label: "Day 2 (timestamp)", type: "number", defaultValue: "1600086400000" }],
    outputs: [{ id: "diff", label: "Difference (Days)", format: "number" }],
    calculate: (inputs) => ({ diff: Math.abs(Number(inputs.d2) - Number(inputs.d1)) / (1000*60*60*24) })
  },
  "date-calendar-units-calculator": {
    slug: "date-calendar-units-calculator",
    inputs: [{ id: "units", label: "Units (Days/Months)", type: "number", defaultValue: "10" }],
    outputs: [{ id: "res", label: "Units Added", format: "number" }],
    calculate: (inputs) => ({ res: Number(inputs.units) })
  },
  "debt-ratios-calculator": {
    slug: "debt-ratios-calculator",
    inputs: [{ id: "debt", label: "Total Debt", type: "number", defaultValue: "50000" }, { id: "asset", label: "Total Assets", type: "number", defaultValue: "100000" }],
    outputs: [{ id: "ratio", label: "Debt to Asset Ratio", format: "percentage" }],
    calculate: (inputs) => ({ ratio: (Number(inputs.debt) / Number(inputs.asset)) * 100 })
  },
  "decimal-degrees-to-degrees-minutes-seconds": {
    slug: "decimal-degrees-to-degrees-minutes-seconds",
    inputs: [{ id: "deg", label: "Decimal Degrees", type: "number", defaultValue: "45.123" }],
    outputs: [{ id: "dms", label: "DMS", format: "text" }],
    calculate: (inputs) => {
      const d = Number(inputs.deg);
      const deg = Math.floor(d);
      const minFloat = (d - deg) * 60;
      const min = Math.floor(minFloat);
      const sec = (minFloat - min) * 60;
      return { dms: \`\${deg}° \${min}' \${sec.toFixed(2)}"\` };
    }
  },
  "decimal-to-fraction-calculator": {
    slug: "decimal-to-fraction-calculator",
    inputs: [{ id: "dec", label: "Decimal", type: "number", defaultValue: "0.75" }],
    outputs: [{ id: "frac", label: "Fraction", format: "text" }],
    calculate: (inputs) => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const d = Number(inputs.dec);
      const len = d.toString().split('.')[1]?.length || 0;
      const den = Math.pow(10, len);
      const num = d * den;
      const g = gcd(num, den);
      return { frac: \`\${num/g}/\${den/g}\` };
    }
  },
  "decimal-to-percent-calculator": {
    slug: "decimal-to-percent-calculator",
    inputs: [{ id: "dec", label: "Decimal", type: "number", defaultValue: "0.75" }],
    outputs: [{ id: "pct", label: "Percentage (%)", format: "percentage" }],
    calculate: (inputs) => ({ pct: Number(inputs.dec) * 100 })
  },
  "decimal-to-time-calculator": {
    slug: "decimal-to-time-calculator",
    inputs: [{ id: "dec", label: "Decimal Hours", type: "number", defaultValue: "1.5" }],
    outputs: [{ id: "time", label: "Time", format: "text" }],
    calculate: (inputs) => {
      const h = Math.floor(Number(inputs.dec));
      const m = Math.round((Number(inputs.dec) - h) * 60);
      return { time: \`\${h}h \${m}m\` };
    }
  },
  "declining-balance-depreciation-calculator": {
    slug: "declining-balance-depreciation-calculator",
    inputs: [{ id: "cost", label: "Asset Cost", type: "number", defaultValue: "10000" }, { id: "rate", label: "Depreciation Rate (%)", type: "number", defaultValue: "20" }],
    outputs: [{ id: "dep", label: "First Year Depreciation", format: "currency", prefix: "$" }],
    calculate: (inputs) => ({ dep: Number(inputs.cost) * (Number(inputs.rate)/100) })
  },
  "deferred-fixed-annuity-calculator": {
    slug: "deferred-fixed-annuity-calculator",
    inputs: [{ id: "p", label: "Premium", type: "number", defaultValue: "10000" }, { id: "r", label: "Rate (%)", type: "number", defaultValue: "5" }, { id: "t", label: "Years Deferred", type: "number", defaultValue: "10" }],
    outputs: [{ id: "val", label: "Future Value", format: "currency", prefix: "$" }],
    calculate: (inputs) => ({ val: Number(inputs.p) * Math.pow(1 + Number(inputs.r)/100, Number(inputs.t)) })
  },
  "density-physics": {
    slug: "density-physics",
    inputs: [{ id: "m", label: "Mass (kg)", type: "number", defaultValue: "10" }, { id: "v", label: "Volume (m³)", type: "number", defaultValue: "2" }],
    outputs: [{ id: "d", label: "Density (kg/m³)", format: "number" }],
    calculate: (inputs) => ({ d: Number(inputs.m) / Number(inputs.v) })
  },
  "density-conversion-calculator": {
    slug: "density-conversion-calculator",
    inputs: [{ id: "kg", label: "kg/m³", type: "number", defaultValue: "1000" }],
    outputs: [{ id: "g", label: "g/cm³", format: "number" }],
    calculate: (inputs) => ({ g: Number(inputs.kg) / 1000 })
  },
  "depreciation-calculator": {
    slug: "depreciation-calculator",
    inputs: [{ id: "cost", label: "Asset Cost", type: "number", defaultValue: "10000" }, { id: "sal", label: "Salvage Value", type: "number", defaultValue: "1000" }, { id: "life", label: "Useful Life (Years)", type: "number", defaultValue: "5" }],
    outputs: [{ id: "dep", label: "Annual Depreciation", format: "currency", prefix: "$" }],
    calculate: (inputs) => ({ dep: (Number(inputs.cost) - Number(inputs.sal)) / Number(inputs.life) })
  },
  "descriptive-statistics-calculator": {
    slug: "descriptive-statistics-calculator",
    inputs: [{ id: "nums", label: "Data (comma separated)", type: "text", defaultValue: "1,2,3,4,5" }],
    outputs: [{ id: "mean", label: "Mean", format: "number" }],
    calculate: (inputs) => {
      const arr = String(inputs.nums).split(",").map(n => Number(n)).filter(n => !isNaN(n));
      return { mean: arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0 };
    }
  },
  "square-feet-to-acres": {
    slug: "square-feet-to-acres",
    inputs: [{ id: "sqft", label: "Square Feet", type: "number", defaultValue: "43560" }],
    outputs: [{ id: "ac", label: "Acres", format: "number" }],
    calculate: (inputs) => ({ ac: Number(inputs.sqft) / 43560 })
  },
  "square-feet-to-square-meters": {
    slug: "square-feet-to-square-meters",
    inputs: [{ id: "sqft", label: "Square Feet", type: "number", defaultValue: "100" }],
    outputs: [{ id: "sqm", label: "Square Meters", format: "number" }],
    calculate: (inputs) => ({ sqm: Number(inputs.sqft) * 0.092903 })
  },
  "square-meters-to-square-feet": {
    slug: "square-meters-to-square-feet",
    inputs: [{ id: "sqm", label: "Square Meters", type: "number", defaultValue: "10" }],
    outputs: [{ id: "sqft", label: "Square Feet", format: "number" }],
    calculate: (inputs) => ({ sqft: Number(inputs.sqm) / 0.092903 })
  },
  "diamond-problem-solver": {
    slug: "diamond-problem-solver",
    inputs: [{ id: "sum", label: "Sum (Top)", type: "number", defaultValue: "5" }, { id: "prod", label: "Product (Bottom)", type: "number", defaultValue: "6" }],
    outputs: [{ id: "res", label: "Numbers (Left, Right)", format: "text" }],
    calculate: (inputs) => {
      const S = Number(inputs.sum);
      const P = Number(inputs.prod);
      // x^2 - Sx + P = 0
      const d = Math.sqrt(S*S - 4*P);
      const x1 = (S + d) / 2;
      const x2 = (S - d) / 2;
      if (isNaN(x1)) return { res: "No real solution" };
      return { res: \`\${x1}, \${x2}\` };
    }
  },
  "dice-roller": {
    slug: "dice-roller",
    inputs: [],
    outputs: [{ id: "roll", label: "Roll (1-6)", format: "number" }],
    calculate: () => ({ roll: Math.floor(Math.random() * 6) + 1 })
  },
  "difference-of-two-squares-calculator": {
    slug: "difference-of-two-squares-calculator",
    inputs: [{ id: "a", label: "a²", type: "number", defaultValue: "25" }, { id: "b", label: "b²", type: "number", defaultValue: "16" }],
    outputs: [{ id: "res", label: "Factored Form", format: "text" }],
    calculate: (inputs) => {
      const a = Math.sqrt(Number(inputs.a));
      const b = Math.sqrt(Number(inputs.b));
      return { res: \`(x - \${a})(x + \${b})\` };
    }
  },
  "digital-stopwatch-timer": {
    slug: "digital-stopwatch-timer",
    inputs: [{ id: "s", label: "Seconds Elapsed", type: "number", defaultValue: "125" }],
    outputs: [{ id: "t", label: "Time", format: "text" }],
    calculate: (inputs) => {
      const s = Number(inputs.s);
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return { t: \`\${m}m \${sec}s\` };
    }
  }
`;

const file = fs.readFileSync('./src/lib/formulas.ts', 'utf8');
const splitPoint = file.lastIndexOf('};');
const newFile = file.slice(0, splitPoint) + ",\n" + newFormulas + "\n" + file.slice(splitPoint);
fs.writeFileSync('./src/lib/formulas.ts', newFile, 'utf8');
console.log("Appended 55 formulas.");
