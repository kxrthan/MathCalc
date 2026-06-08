import { FormulaConfig } from "./formulas-types";

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "INR", label: "INR (₹)" },
  { value: "JPY", label: "JPY (¥)" }
];

export const formulas: Record<string, FormulaConfig> = {
  // --- CONVERSION TOOLS ---
  "length-converter": {
    slug: "length-converter",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: "1" },
      { id: "from", label: "From Unit", type: "select", defaultValue: "cm", options: [
        { value: "cm", label: "Centimeters (cm)" },
        { value: "m", label: "Meters (m)" },
        { value: "km", label: "Kilometers (km)" },
        { value: "in", label: "Inches (in)" },
        { value: "ft", label: "Feet (ft)" },
        { value: "mi", label: "Miles (mi)" }
      ]},
      { id: "to", label: "To Unit", type: "select", defaultValue: "in", options: [
        { value: "cm", label: "Centimeters (cm)" },
        { value: "m", label: "Meters (m)" },
        { value: "km", label: "Kilometers (km)" },
        { value: "in", label: "Inches (in)" },
        { value: "ft", label: "Feet (ft)" },
        { value: "mi", label: "Miles (mi)" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Value", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const toMeters: Record<string, number> = {
        "cm": 0.01, "m": 1, "km": 1000, "in": 0.0254, "ft": 0.3048, "mi": 1609.344
      };
      const base = val * (toMeters[inputs.from] || 1);
      const result = base / (toMeters[inputs.to] || 1);
      return { result };
    }
  },
  "distance-converter": {
    slug: "distance-converter",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: "1" },
      { id: "from", label: "From Unit", type: "select", defaultValue: "km", options: [
        { value: "mm", label: "Millimeters (mm)" },
        { value: "cm", label: "Centimeters (cm)" },
        { value: "m", label: "Meters (m)" },
        { value: "km", label: "Kilometers (km)" },
        { value: "in", label: "Inches (in)" },
        { value: "ft", label: "Feet (ft)" },
        { value: "yd", label: "Yards (yd)" },
        { value: "mi", label: "Miles (mi)" }
      ]},
      { id: "to", label: "To Unit", type: "select", defaultValue: "mi", options: [
        { value: "mm", label: "Millimeters (mm)" },
        { value: "cm", label: "Centimeters (cm)" },
        { value: "m", label: "Meters (m)" },
        { value: "km", label: "Kilometers (km)" },
        { value: "in", label: "Inches (in)" },
        { value: "ft", label: "Feet (ft)" },
        { value: "yd", label: "Yards (yd)" },
        { value: "mi", label: "Miles (mi)" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Distance", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const toMeters: Record<string, number> = {
        "mm": 0.001, "cm": 0.01, "m": 1, "km": 1000, "in": 0.0254, "ft": 0.3048, "yd": 0.9144, "mi": 1609.344
      };
      const base = val * (toMeters[inputs.from] || 1);
      const result = base / (toMeters[inputs.to] || 1);
      return { result };
    }
  },
  "temperature-converter": {
    slug: "temperature-converter",
    inputs: [
      { id: "value", label: "Temperature", type: "number", defaultValue: "0" },
      { id: "from", label: "From", type: "select", defaultValue: "c", options: [
        { value: "c", label: "Celsius (°C)" },
        { value: "f", label: "Fahrenheit (°F)" },
        { value: "k", label: "Kelvin (K)" }
      ]},
      { id: "to", label: "To", type: "select", defaultValue: "f", options: [
        { value: "c", label: "Celsius (°C)" },
        { value: "f", label: "Fahrenheit (°F)" },
        { value: "k", label: "Kelvin (K)" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Temperature", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      let celsius = 0;
      if (inputs.from === "c") celsius = val;
      else if (inputs.from === "f") celsius = (val - 32) * 5 / 9;
      else if (inputs.from === "k") celsius = val - 273.15;
      
      let result = 0;
      if (inputs.to === "c") result = celsius;
      else if (inputs.to === "f") result = (celsius * 9 / 5) + 32;
      else if (inputs.to === "k") result = celsius + 273.15;
      return { result };
    }
  },
  "speed-converter": {
    slug: "speed-converter",
    inputs: [
      { id: "value", label: "Speed", type: "number", defaultValue: "60" },
      { id: "from", label: "From Unit", type: "select", defaultValue: "mph", options: [
        { value: "ms", label: "Meters per second (m/s)" },
        { value: "kmh", label: "Kilometers per hour (km/h)" },
        { value: "mph", label: "Miles per hour (mph)" },
        { value: "knots", label: "Knots" }
      ]},
      { id: "to", label: "To Unit", type: "select", defaultValue: "kmh", options: [
        { value: "ms", label: "Meters per second (m/s)" },
        { value: "kmh", label: "Kilometers per hour (km/h)" },
        { value: "mph", label: "Miles per hour (mph)" },
        { value: "knots", label: "Knots" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Speed", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const toMs: Record<string, number> = {
        "ms": 1, "kmh": 0.277778, "mph": 0.44704, "knots": 0.514444
      };
      const base = val * (toMs[inputs.from] || 1);
      const result = base / (toMs[inputs.to] || 1);
      return { result };
    }
  },
  "weight-converter": {
    slug: "weight-converter",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: "1" },
      { id: "from", label: "From Unit", type: "select", defaultValue: "kg", options: [
        { value: "g", label: "Grams (g)" },
        { value: "kg", label: "Kilograms (kg)" },
        { value: "oz", label: "Ounces (oz)" },
        { value: "lbs", label: "Pounds (lbs)" }
      ]},
      { id: "to", label: "To Unit", type: "select", defaultValue: "lbs", options: [
        { value: "g", label: "Grams (g)" },
        { value: "kg", label: "Kilograms (kg)" },
        { value: "oz", label: "Ounces (oz)" },
        { value: "lbs", label: "Pounds (lbs)" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Value", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const toKg: Record<string, number> = {
        "g": 0.001, "kg": 1, "oz": 0.0283495, "lbs": 0.453592
      };
      const base = val * (toKg[inputs.from] || 1);
      const result = base / (toKg[inputs.to] || 1);
      return { result };
    }
  },
  "volume-converter": {
    slug: "volume-converter",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: "1" },
      { id: "from", label: "From Unit", type: "select", defaultValue: "gal", options: [
        { value: "ml", label: "Milliliters (ml)" },
        { value: "l", label: "Liters (L)" },
        { value: "gal", label: "US Gallons (gal)" }
      ]},
      { id: "to", label: "To Unit", type: "select", defaultValue: "l", options: [
        { value: "ml", label: "Milliliters (ml)" },
        { value: "l", label: "Liters (L)" },
        { value: "gal", label: "US Gallons (gal)" }
      ]}
    ],
    outputs: [{ id: "result", label: "Converted Value", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.value);
      const toLiters: Record<string, number> = {
        "ml": 0.001, "l": 1, "gal": 3.78541
      };
      const base = val * (toLiters[inputs.from] || 1);
      const result = base / (toLiters[inputs.to] || 1);
      return { result };
    }
  },
  // --- MATH TOOLS ---
  "area-of-circle": {
    slug: "area-of-circle",
    inputs: [{ id: "r", label: "Radius (r)", type: "number", defaultValue: "5" }],
    outputs: [{ id: "area", label: "Area", format: "number" }, { id: "circumference", label: "Circumference", format: "number" }],
    calculate: (inputs) => {
      const r = Number(inputs.r);
      return { area: Math.PI * r * r, circumference: 2 * Math.PI * r };
    }
  },
  "area-of-rectangle": {
    slug: "area-of-rectangle",
    inputs: [
      { id: "l", label: "Length", type: "number", defaultValue: "10" },
      { id: "w", label: "Width", type: "number", defaultValue: "5" }
    ],
    outputs: [{ id: "area", label: "Area", format: "number" }, { id: "perimeter", label: "Perimeter", format: "number" }],
    calculate: (inputs) => {
      const l = Number(inputs.l);
      const w = Number(inputs.w);
      return { area: l * w, perimeter: 2 * (l + w) };
    }
  },
  "pythagorean-theorem": {
    slug: "pythagorean-theorem",
    inputs: [
      { id: "a", label: "Side a", type: "number", defaultValue: "3" },
      { id: "b", label: "Side b", type: "number", defaultValue: "4" }
    ],
    outputs: [{ id: "c", label: "Hypotenuse (c)", format: "number" }],
    calculate: (inputs) => {
      const a = Number(inputs.a);
      const b = Number(inputs.b);
      return { c: Math.sqrt(a * a + b * b) };
    }
  },
  "velocity": {
    slug: "velocity",
    inputs: [
      { id: "d", label: "Distance (m)", type: "number", defaultValue: "100" },
      { id: "t", label: "Time (s)", type: "number", defaultValue: "10" }
    ],
    outputs: [{ id: "v", label: "Velocity (m/s)", format: "number" }],
    calculate: (inputs) => {
      const d = Number(inputs.d);
      const t = Number(inputs.t);
      return { v: t !== 0 ? d / t : 0 };
    }
  },
  "kinetic-energy": {
    slug: "kinetic-energy",
    inputs: [
      { id: "m", label: "Mass (kg)", type: "number", defaultValue: "10" },
      { id: "v", label: "Velocity (m/s)", type: "number", defaultValue: "5" }
    ],
    outputs: [{ id: "ke", label: "Kinetic Energy (Joules)", format: "number" }],
    calculate: (inputs) => {
      const m = Number(inputs.m);
      const v = Number(inputs.v);
      return { ke: 0.5 * m * v * v };
    }
  },

  // --- ADDITIONAL VERIFIED TOOLS ---
  
  "area-of-triangle": {
    slug: "area-of-triangle",
    inputs: [
      { id: "b", label: "Base", type: "number", defaultValue: "10" },
      { id: "h", label: "Height", type: "number", defaultValue: "5" }
    ],
    outputs: [{ id: "area", label: "Area", format: "number" }],
    calculate: (inputs) => ({ area: 0.5 * Number(inputs.b) * Number(inputs.h) })
  },
  "area-of-square": {
    slug: "area-of-square",
    inputs: [{ id: "s", label: "Side Length", type: "number", defaultValue: "5" }],
    outputs: [{ id: "area", label: "Area", format: "number" }, { id: "perimeter", label: "Perimeter", format: "number" }],
    calculate: (inputs) => ({ area: Number(inputs.s) ** 2, perimeter: 4 * Number(inputs.s) })
  },
  "volume-of-cube": {
    slug: "volume-of-cube",
    inputs: [{ id: "s", label: "Side Length", type: "number", defaultValue: "5" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => ({ vol: Number(inputs.s) ** 3 })
  },
  "volume-of-sphere": {
    slug: "volume-of-sphere",
    inputs: [{ id: "r", label: "Radius (r)", type: "number", defaultValue: "5" }],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => ({ vol: (4/3) * Math.PI * (Number(inputs.r) ** 3) })
  },
  "volume-of-cylinder": {
    slug: "volume-of-cylinder",
    inputs: [
      { id: "r", label: "Radius (r)", type: "number", defaultValue: "3" },
      { id: "h", label: "Height (h)", type: "number", defaultValue: "10" }
    ],
    outputs: [{ id: "vol", label: "Volume", format: "number" }],
    calculate: (inputs) => ({ vol: Math.PI * (Number(inputs.r) ** 2) * Number(inputs.h) })
  },
  "ohms-law-calculator": {
    slug: "ohms-law-calculator",
    inputs: [
      { id: "i", label: "Current (Amps - I)", type: "number", defaultValue: "2" },
      { id: "r", label: "Resistance (Ohms - R)", type: "number", defaultValue: "100" }
    ],
    outputs: [{ id: "v", label: "Voltage (Volts - V)", format: "number" }],
    calculate: (inputs) => ({ v: Number(inputs.i) * Number(inputs.r) })
  },
  "speed-calculator": {
    slug: "speed-calculator",
    inputs: [
      { id: "d", label: "Distance", type: "number", defaultValue: "100" },
      { id: "t", label: "Time", type: "number", defaultValue: "2" }
    ],
    outputs: [{ id: "s", label: "Speed", format: "number" }],
    calculate: (inputs) => ({ s: Number(inputs.t) !== 0 ? Number(inputs.d) / Number(inputs.t) : 0 })
  },
  "density-calculator": {
    slug: "density-calculator",
    inputs: [
      { id: "m", label: "Mass", type: "number", defaultValue: "50" },
      { id: "v", label: "Volume", type: "number", defaultValue: "5" }
    ],
    outputs: [{ id: "d", label: "Density", format: "number" }],
    calculate: (inputs) => ({ d: Number(inputs.v) !== 0 ? Number(inputs.m) / Number(inputs.v) : 0 })
  },

  // --- FINANCE TOOLS WITH CHARTS ---
  "investment-calculator": {
    slug: "investment-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "INR", options: currencyOptions },
      { id: "type", label: "Investment Type", type: "toggle", defaultValue: "sip", options: [
        { value: "sip", label: "Monthly SIP" },
        { value: "lumpsum", label: "One-time Lumpsum" }
      ]},
      { id: "amount", label: "Amount", type: "number", defaultValue: "5000" },
      { id: "rate", label: "Expected Return Rate (p.a %)", type: "number", defaultValue: "12" },
      { id: "years", label: "Time Period (Years)", type: "number", defaultValue: "10" }
    ],
    outputs: [
      { id: "invested", label: "Invested Amount", format: "currency" },
      { id: "wealth", label: "Est. Returns", format: "currency" },
      { id: "total", label: "Total Value", format: "currency" },
      { id: "chart", label: "Investment Breakdown", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "invested", name: "Invested Amount", color: "hsl(var(--chart-1))" },
          { key: "wealth", name: "Est. Returns", color: "hsl(var(--chart-2))" }
        ]
      }},
      { id: "timeline", label: "Wealth Growth Over Time", format: "chart", chartConfig: {
        type: "line",
        xAxisKey: "year",
        series: [
          { key: "invested", name: "Invested", color: "hsl(var(--chart-1))" },
          { key: "total", name: "Total Value", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.amount);
      const rate = Number(inputs.rate) / 100;
      const years = Number(inputs.years);
      const isSip = inputs.type === "sip";
      
      let invested = 0;
      let total = 0;
      const timeline = [];

      if (isSip) {
        const monthlyRate = rate / 12;
        invested = amount * 12 * years;
        total = amount * ((Math.pow(1 + monthlyRate, years * 12) - 1) / monthlyRate) * (1 + monthlyRate);
        
        for (let y = 1; y <= years; y++) {
          const inv = amount * 12 * y;
          const tot = amount * ((Math.pow(1 + monthlyRate, y * 12) - 1) / monthlyRate) * (1 + monthlyRate);
          timeline.push({ year: `Year ${y}`, invested: inv, total: tot });
        }
      } else {
        invested = amount;
        total = amount * Math.pow(1 + rate, years);
        
        for (let y = 1; y <= years; y++) {
          const tot = amount * Math.pow(1 + rate, y);
          timeline.push({ year: `Year ${y}`, invested: amount, total: tot });
        }
      }

      return { invested, wealth: total - invested, total, timeline };
    }
  },
  "markup-calculator": {
    slug: "markup-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "c", label: "Cost", type: "number", defaultValue: "50" },
      { id: "r", label: "Revenue", type: "number", defaultValue: "75" }
    ],
    outputs: [
      { id: "profit", label: "Profit", format: "currency" },
      { id: "markup", label: "Markup (%)", format: "percentage", suffix: "%" },
      { id: "chart", label: "Cost vs Profit", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "c", name: "Cost", color: "hsl(var(--chart-1))" },
          { key: "profit", name: "Profit", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const c = Number(inputs.c);
      const r = Number(inputs.r);
      const profit = r - c;
      const markup = c !== 0 ? (profit / c) * 100 : 0;
      return { c, profit: profit, markup: markup };
    }
  },
  "mortgage-calculator": {
    slug: "mortgage-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "p", label: "Principal Amount", type: "number", defaultValue: "250000" },
      { id: "r", label: "Annual Interest Rate (%)", type: "number", defaultValue: "5" },
      { id: "t", label: "Loan Term (Years)", type: "number", defaultValue: "30" }
    ],
    outputs: [
      { id: "monthly", label: "Monthly Payment", format: "currency" },
      { id: "totalInterest", label: "Total Interest", format: "currency" },
      { id: "totalPayment", label: "Total Payment", format: "currency" },
      { id: "chart", label: "Principal vs Interest", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "p", name: "Principal", color: "hsl(var(--chart-1))" },
          { key: "totalInterest", name: "Total Interest", color: "hsl(var(--chart-5))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const p = Number(inputs.p);
      const r = Number(inputs.r) / 100 / 12;
      const n = Number(inputs.t) * 12;
      let monthly = 0;
      if (r === 0) {
        monthly = p / n;
      } else {
        monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      const totalPayment = monthly * n;
      return { p, monthly, totalInterest: totalPayment - p, totalPayment };
    }
  },
  "loan-payment-calculator": {
    slug: "loan-payment-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "INR", options: currencyOptions },
      { id: "p", label: "Loan Amount", type: "number", defaultValue: "500000" },
      { id: "r", label: "Annual Interest Rate (%)", type: "number", defaultValue: "10" },
      { id: "t", label: "Loan Tenure (Months)", type: "number", defaultValue: "24" }
    ],
    outputs: [
      { id: "emi", label: "EMI", format: "currency" },
      { id: "totalInterest", label: "Total Interest", format: "currency" },
      { id: "totalPayment", label: "Total Payment", format: "currency" },
      { id: "chart", label: "Amount Breakdown", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "p", name: "Principal", color: "hsl(var(--chart-1))" },
          { key: "totalInterest", name: "Total Interest", color: "hsl(var(--chart-5))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const p = Number(inputs.p);
      const r = Number(inputs.r) / 100 / 12;
      const n = Number(inputs.t);
      let emi = 0;
      if (r === 0) {
        emi = p / n;
      } else {
        emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
      }
      const totalPayment = emi * n;
      return { p, emi, totalInterest: totalPayment - p, totalPayment };
    }
  },
  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "p", label: "Principal Amount", type: "number", defaultValue: "5000" },
      { id: "r", label: "Annual Interest Rate (%)", type: "number", defaultValue: "5" },
      { id: "t", label: "Time (Years)", type: "number", defaultValue: "10" },
      { id: "n", label: "Compounding Frequency (per year)", type: "number", defaultValue: "12" }
    ],
    outputs: [
      { id: "amount", label: "Total Amount", format: "currency" },
      { id: "interest", label: "Total Interest Earned", format: "currency" },
      { id: "chart", label: "Growth Over Time", format: "chart", chartConfig: {
        type: "line",
        xAxisKey: "year",
        series: [
          { key: "principal", name: "Principal", color: "hsl(var(--chart-1))" },
          { key: "amount", name: "Total Value", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const p = Number(inputs.p);
      const r = Number(inputs.r) / 100;
      const t = Number(inputs.t);
      const n = Number(inputs.n);
      
      const timeline = [];
      for(let y=1; y<=t; y++) {
        timeline.push({ year: `Y${y}`, principal: p, amount: p * Math.pow(1 + r / n, n * y) });
      }
      
      const amount = p * Math.pow(1 + r / n, n * t);
      return { amount, interest: amount - p, timeline };
    }
  },
  "simple-interest-calculator": {
    slug: "simple-interest-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "p", label: "Principal", type: "number", defaultValue: "1000" },
      { id: "r", label: "Annual Rate (%)", type: "number", defaultValue: "5" },
      { id: "t", label: "Time (Years)", type: "number", defaultValue: "3" }
    ],
    outputs: [
      { id: "i", label: "Interest Earned", format: "currency" }, 
      { id: "total", label: "Total Amount", format: "currency" },
      { id: "chart", label: "Principal vs Interest", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "p", name: "Principal", color: "hsl(var(--chart-1))" },
          { key: "i", name: "Interest", color: "hsl(var(--chart-3))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const p = Number(inputs.p);
      const r = Number(inputs.r);
      const t = Number(inputs.t);
      const i = p * (r / 100) * t;
      return { p, i: i, total: p + i };
    }
  },
  "car-loan-calculator": {
    slug: "car-loan-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "price", label: "Car Price", type: "number", defaultValue: "25000" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: "5000" },
      { id: "r", label: "Interest Rate (%)", type: "number", defaultValue: "4.5" },
      { id: "t", label: "Loan Term (Months)", type: "number", defaultValue: "60" }
    ],
    outputs: [
      { id: "monthly", label: "Monthly Payment", format: "currency" },
      { id: "totalInterest", label: "Total Interest", format: "currency" },
      { id: "totalCost", label: "Total Cost of Car", format: "currency" },
      { id: "chart", label: "Cost Breakdown", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "principal", name: "Loan Principal", color: "hsl(var(--chart-1))" },
          { key: "downPayment", name: "Down Payment", color: "hsl(var(--chart-2))" },
          { key: "totalInterest", name: "Total Interest", color: "hsl(var(--chart-5))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const downPayment = Number(inputs.downPayment);
      const principal = Number(inputs.price) - downPayment;
      const r = Number(inputs.r) / 100 / 12;
      const n = Number(inputs.t);
      let monthly = 0;
      let totalPayment = principal;
      if (r === 0) {
        monthly = principal / n;
      } else {
        monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        totalPayment = monthly * n;
      }
      return { 
        principal,
        downPayment,
        monthly, 
        totalInterest: totalPayment - principal, 
        totalCost: totalPayment + downPayment 
      };
    }
  },
  "sales-tax-calculator": {
    slug: "sales-tax-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "price", label: "Price Before Tax", type: "number", defaultValue: "100" },
      { id: "rate", label: "Sales Tax Rate (%)", type: "number", defaultValue: "8.5" }
    ],
    outputs: [
      { id: "taxAmount", label: "Tax Amount", format: "currency" },
      { id: "totalPrice", label: "Total Price", format: "currency" },
      { id: "chart", label: "Price vs Tax", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "price", name: "Price", color: "hsl(var(--chart-1))" },
          { key: "taxAmount", name: "Tax", color: "hsl(var(--chart-4))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const price = Number(inputs.price);
      const rate = Number(inputs.rate) / 100;
      const taxAmount = price * rate;
      return { price, taxAmount, totalPrice: price + taxAmount };
    }
  },
  "discount-calculator": {
    slug: "discount-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "price", label: "Original Price", type: "number", defaultValue: "100" },
      { id: "discount", label: "Discount (%)", type: "number", defaultValue: "20" }
    ],
    outputs: [
      { id: "saved", label: "Amount Saved", format: "currency" },
      { id: "finalPrice", label: "Final Price", format: "currency" },
      { id: "chart", label: "Final Price vs Discount", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "finalPrice", name: "Final Price", color: "hsl(var(--chart-1))" },
          { key: "saved", name: "Saved", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const price = Number(inputs.price);
      const discount = Number(inputs.discount) / 100;
      const saved = price * discount;
      return { saved, finalPrice: price - saved };
    }
  },
  "percentage-calculator": {
    slug: "percentage-calculator",
    inputs: [
      { id: "p", label: "What is (%)", type: "number", defaultValue: "20" },
      { id: "v", label: "of Value", type: "number", defaultValue: "150" }
    ],
    outputs: [
      { id: "result", label: "Result", format: "number" },
      { id: "chart", label: "Percentage Split", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "result", name: "Result", color: "hsl(var(--chart-1))" },
          { key: "remaining", name: "Remaining", color: "hsl(var(--chart-5))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const result = (Number(inputs.p) / 100) * Number(inputs.v);
      return { result, remaining: Number(inputs.v) - result };
    }
  },
  "savings-calculator": {
    slug: "savings-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "initial", label: "Initial Deposit", type: "number", defaultValue: "1000" },
      { id: "monthly", label: "Monthly Contribution", type: "number", defaultValue: "200" },
      { id: "r", label: "Annual Interest Rate (%)", type: "number", defaultValue: "5" },
      { id: "t", label: "Time (Years)", type: "number", defaultValue: "10" }
    ],
    outputs: [
      { id: "total", label: "Total Savings", format: "currency" },
      { id: "interest", label: "Total Interest Earned", format: "currency" },
      { id: "chart", label: "Savings Growth", format: "chart", chartConfig: {
        type: "line",
        xAxisKey: "year",
        series: [
          { key: "contributed", name: "Contributed", color: "hsl(var(--chart-1))" },
          { key: "total", name: "Total Value", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const p = Number(inputs.initial);
      const pmt = Number(inputs.monthly);
      const r = Number(inputs.r) / 100 / 12; // monthly rate
      const years = Number(inputs.t);
      
      const timeline = [];
      for(let y=1; y<=years; y++) {
        const n = y * 12;
        const compoundPrincipal = p * Math.pow(1 + r, n);
        const compoundContributions = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
        timeline.push({ 
          year: `Y${y}`, 
          contributed: p + (pmt * n), 
          total: compoundPrincipal + compoundContributions 
        });
      }

      const n = years * 12;
      const compoundPrincipal = p * Math.pow(1 + r, n);
      const compoundContributions = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
      
      const total = compoundPrincipal + compoundContributions;
      const totalContributed = p + (pmt * n);
      
      return { total, interest: total - totalContributed, timeline };
    }
  },
  "retirement-savings-calculator": {
    slug: "retirement-savings-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "currentAge", label: "Current Age", type: "number", defaultValue: "30" },
      { id: "retireAge", label: "Retirement Age", type: "number", defaultValue: "65" },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: "10000" },
      { id: "monthly", label: "Monthly Contribution", type: "number", defaultValue: "500" },
      { id: "r", label: "Annual Return (%)", type: "number", defaultValue: "7" }
    ],
    outputs: [
      { id: "total", label: "Total at Retirement", format: "currency" },
      { id: "interest", label: "Total Earnings", format: "currency" },
      { id: "chart", label: "Retirement Trajectory", format: "chart", chartConfig: {
        type: "line",
        xAxisKey: "age",
        series: [
          { key: "contributed", name: "Contributed", color: "hsl(var(--chart-1))" },
          { key: "total", name: "Total Value", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retireAge = Number(inputs.retireAge);
      const years = retireAge - currentAge;
      if (years <= 0) return { total: 0, interest: 0 };
      
      const p = Number(inputs.currentSavings);
      const pmt = Number(inputs.monthly);
      const r = Number(inputs.r) / 100 / 12; // monthly rate
      
      const timeline = [];
      for(let y=1; y<=years; y++) {
        const n = y * 12;
        const compoundPrincipal = p * Math.pow(1 + r, n);
        const compoundContributions = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
        timeline.push({ 
          age: `Age ${currentAge + y}`, 
          contributed: p + (pmt * n), 
          total: compoundPrincipal + compoundContributions 
        });
      }
      
      const n = years * 12;
      const compoundPrincipal = p * Math.pow(1 + r, n);
      const compoundContributions = r > 0 ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
      
      const total = compoundPrincipal + compoundContributions;
      const totalContributed = p + (pmt * n);
      
      return { total, interest: total - totalContributed, timeline };
    }
  },
  "currency-converter": {
    slug: "currency-converter",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: "100" },
      { id: "from", label: "From Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "to", label: "To Currency", type: "select", defaultValue: "EUR", options: currencyOptions }
    ],
    outputs: [
      { id: "result", label: "Converted Amount", format: "number" },
      { id: "chart", label: "Value Comparison", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "amount", name: "Base Amount", color: "hsl(var(--chart-1))" },
          { key: "result", name: "Converted Amount", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: async (inputs) => {
      const amount = Number(inputs.amount);
      const from = inputs.from;
      const to = inputs.to;
      
      if (from === to) {
        return { amount, result: amount };
      }
      
      try {
        const response = await fetch(`https://api.currencyapi.com/v3/latest?apikey=fca_live_Gher1ZqJkCJCnCws7BfIOADvQggxWiPraF94X7S2&base_currency=${from}&currencies=${to}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        return { amount, result: amount * data.data[to].value };
      } catch (error) {
        console.error("Error converting currency:", error);
        return { result: null };
      }
    }
  },
  // --- HEALTH & MISC TOOLS ---
  "bmi-calculator": {
    slug: "bmi-calculator",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: "25" },
      { id: "gender", label: "Gender", type: "toggle", defaultValue: "male", options: [
        { value: "male", label: "Male" }, { value: "female", label: "Female" }
      ]},
      { id: "units", label: "Units", type: "toggle", defaultValue: "metric", options: [
        { value: "us", label: "US Units" }, { value: "metric", label: "Metric Units" }
      ]},
      { id: "height", label: "Height (cm for Metric, inches for US)", type: "number", defaultValue: "180" },
      { id: "weight", label: "Weight (kg for Metric, lbs for US)", type: "number", defaultValue: "65" }
    ],
    outputs: [
      { id: "bmi", label: "BMI", format: "number", suffix: " kg/m²" },
      { id: "category", label: "Category", format: "text" },
      { id: "healthyRange", label: "Healthy BMI range", format: "text" },
      { id: "healthyWeight", label: "Healthy weight for height", format: "text" },
      { id: "bmiPrime", label: "BMI Prime", format: "number" },
      { id: "ponderalIndex", label: "Ponderal Index", format: "number", suffix: " kg/m³" },
      { id: "chart", label: "BMI Category", format: "chart", chartConfig: {
        type: "gauge",
        series: [
          { key: "bmi", name: "BMI", color: "hsl(var(--primary))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      let w = Number(inputs.weight);
      let hCm = Number(inputs.height);

      if (inputs.units === "us") {
        // Convert lbs to kg, inches to cm
        w = w * 0.453592;
        hCm = hCm * 2.54;
      }

      const h = hCm / 100;
      if (w <= 0 || h <= 0) return { bmi: 0, category: "Invalid input" };
      
      const bmi = w / (h * h);
      
      let category = "Obesity";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal";
      else if (bmi < 30) category = "Overweight";

      let healthyMin = 18.5 * (h * h);
      let healthyMax = 25 * (h * h);
      const bmiPrime = bmi / 25;
      const ponderalIndex = w / (h * h * h);
      
      let weightUnitStr = "kg";
      if (inputs.units === "us") {
        healthyMin = healthyMin / 0.453592;
        healthyMax = healthyMax / 0.453592;
        weightUnitStr = "lbs";
      }

      return { 
        bmi: Number(bmi.toFixed(1)), 
        category,
        healthyRange: "18.5 kg/m² - 25 kg/m²",
        healthyWeight: `${healthyMin.toFixed(1)} ${weightUnitStr} - ${healthyMax.toFixed(1)} ${weightUnitStr}`,
        bmiPrime: Number(bmiPrime.toFixed(2)),
        ponderalIndex: Number(ponderalIndex.toFixed(1))
      };
    }
  },
  "age-calculator": {
    slug: "age-calculator",
    inputs: [
      { id: "dob", label: "Date of Birth", type: "date", defaultValue: "1990-01-01" }
    ],
    outputs: [
      { id: "years", label: "Years", format: "number" },
      { id: "months", label: "Months", format: "number" },
      { id: "days", label: "Days", format: "number" }
    ],
    calculate: (inputs) => {
      const dob = new Date(inputs.dob);
      const today = new Date();
      if (isNaN(dob.getTime())) return { years: 0, months: 0, days: 0 };
      
      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();

      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      return { years, months, days };
    }
  },
  "date-difference-calculator": {
    slug: "date-difference-calculator",
    inputs: [
      { id: "start", label: "Start Date", type: "date", defaultValue: "2023-01-01" },
      { id: "end", label: "End Date", type: "date", defaultValue: "2023-12-31" }
    ],
    outputs: [
      { id: "days", label: "Total Days", format: "number" },
      { id: "weeks", label: "Total Weeks", format: "number" },
      { id: "months", label: "Total Months", format: "number" },
      { id: "years", label: "Total Years", format: "number" }
    ],
    calculate: (inputs) => {
      const start = new Date(inputs.start);
      const end = new Date(inputs.end);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return { days: 0, weeks: 0, months: 0, years: 0 };
      
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = diffDays / 7;
      
      let diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
      diffMonths -= start.getMonth();
      diffMonths += end.getMonth();
      
      const diffYears = Math.abs(end.getFullYear() - start.getFullYear());
      
      return { days: diffDays, weeks: diffWeeks, months: Math.abs(diffMonths), years: diffYears };
    }
  },
  "time-calculator": {
    slug: "time-calculator",
    inputs: [
      { id: "time", label: "Start Time", type: "time", defaultValue: "12:00" },
      { id: "operation", label: "Operation", type: "select", defaultValue: "add", options: [
        { value: "add", label: "Add" },
        { value: "subtract", label: "Subtract" }
      ]},
      { id: "hours", label: "Hours", type: "number", defaultValue: "1" },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: "30" }
    ],
    outputs: [
      { id: "result", label: "Resulting Time", format: "text" },
      { id: "result24", label: "24-Hour Format", format: "text" }
    ],
    calculate: (inputs) => {
      const timeParts = String(inputs.time).split(":");
      if (timeParts.length < 2) return { result: "Invalid time", result24: "Invalid time" };
      let h = parseInt(timeParts[0], 10) || 0;
      let m = parseInt(timeParts[1], 10) || 0;
      
      const opHours = Number(inputs.hours) || 0;
      const opMins = Number(inputs.minutes) || 0;
      
      if (inputs.operation === "subtract") {
        h -= opHours;
        m -= opMins;
      } else {
        h += opHours;
        m += opMins;
      }
      
      // Normalize time
      while (m < 0) { m += 60; h -= 1; }
      while (m >= 60) { m -= 60; h += 1; }
      while (h < 0) { h += 24; }
      h = h % 24;
      
      const res24 = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      const res12H = h % 12 || 12;
      const ampm = h >= 12 ? "PM" : "AM";
      const res12 = `${res12H}:${m.toString().padStart(2, '0')} ${ampm}`;
      
      return { result: res12, result24: res24 };
    }
  },
  "military-time-converter": {
    slug: "military-time-converter",
    inputs: [
      { id: "timeInput", label: "Enter Time (e.g., 14:30 or 2:30 PM)", type: "text", defaultValue: "14:30" }
    ],
    outputs: [
      { id: "standard", label: "Standard Time (12-Hour)", format: "text" },
      { id: "military", label: "Military Time (24-Hour)", format: "text" }
    ],
    calculate: (inputs) => {
      const t = String(inputs.timeInput).trim().toLowerCase();
      let h = 0;
      let m = 0;
      const isPm = t.includes("pm") || t.includes("p.m.");
      const isAm = t.includes("am") || t.includes("a.m.");
      
      // Extract numbers
      const match = t.match(/(\d{1,2}):?(\d{2})?/);
      if (!match) return { standard: "Invalid", military: "Invalid" };
      
      h = parseInt(match[1], 10);
      m = match[2] ? parseInt(match[2], 10) : 0;
      
      if (isPm && h < 12) h += 12;
      if (isAm && h === 12) h = 0;
      
      // If no am/pm specified and h > 12, it's 24h format. 
      // If h is already 0-23 it's fine.
      h = h % 24;
      
      const mil = `${h.toString().padStart(2, '0')}${m.toString().padStart(2, '0')} Hours / ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      
      const stH = h % 12 || 12;
      const ampm = h >= 12 ? "PM" : "AM";
      const std = `${stH}:${m.toString().padStart(2, '0')} ${ampm}`;
      
      return { standard: std, military: mil };
    }
  },
  "calorie-calculator": {
    slug: "calorie-calculator",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: "30" },
      { id: "gender", label: "Gender", type: "toggle", defaultValue: "male", options: [
        { value: "male", label: "Male" }, { value: "female", label: "Female" }
      ]},
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: "70" },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: "175" },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: "1.55", options: [
        { value: "1.2", label: "Sedentary (little to no exercise)" },
        { value: "1.375", label: "Lightly active (light exercise/sports 1-3 days/week)" },
        { value: "1.55", label: "Moderately active (moderate exercise/sports 3-5 days/week)" },
        { value: "1.725", label: "Very active (hard exercise/sports 6-7 days a week)" },
        { value: "1.9", label: "Extra active (very hard exercise/physical job)" }
      ]}
    ],
    outputs: [
      { id: "maintain", label: "Maintain Weight", format: "number", suffix: " kcal" },
      { id: "mildLoss", label: "Mild Weight Loss (0.25kg/w)", format: "number", suffix: " kcal" },
      { id: "weightLoss", label: "Weight Loss (0.5kg/w)", format: "number", suffix: " kcal" },
      { id: "extremeLoss", label: "Extreme Loss (1kg/w)", format: "number", suffix: " kcal" },
      { id: "targetHr", label: "Target Heart Rate (Moderate)", format: "text" }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.age);
      const w = Number(inputs.weight);
      const h = Number(inputs.height);
      const isMale = inputs.gender === "male";
      const activity = Number(inputs.activity);
      
      let bmr = 10 * w + 6.25 * h - 5 * age;
      bmr += isMale ? 5 : -161;
      
      const maintain = bmr * activity;
      
      const maxHr = 220 - age;
      const targetHrLow = Math.round(maxHr * 0.5);
      const targetHrHigh = Math.round(maxHr * 0.85);

      return {
        maintain: Math.round(maintain),
        mildLoss: Math.round(maintain - 250),
        weightLoss: Math.round(maintain - 500),
        extremeLoss: Math.round(maintain - 1000),
        targetHr: `${targetHrLow} - ${targetHrHigh} bpm`
      };
    }
  },
  "pregnancy-calculator": {
    slug: "pregnancy-calculator",
    inputs: [
      { id: "lmp", label: "First day of last menstrual period", type: "date", defaultValue: new Date().toISOString().split('T')[0] }
    ],
    outputs: [
      { id: "dueDate", label: "Estimated Due Date", format: "text" },
      { id: "currentWeek", label: "Current Week", format: "text" }
    ],
    calculate: (inputs) => {
      const lmp = new Date(inputs.lmp);
      if (isNaN(lmp.getTime())) return { dueDate: "Invalid Date", currentWeek: "-" };
      
      const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lmp.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      
      return { 
        dueDate: due.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        currentWeek: `${weeks} weeks, ${days} days`
      };
    }
  },
  "height-converter": {
    slug: "height-converter",
    inputs: [
      { id: "mode", label: "Convert", type: "toggle", defaultValue: "cm-to-ft", options: [
        { value: "cm-to-ft", label: "cm to ft/in" },
        { value: "ft-to-cm", label: "ft/in to cm" }
      ]},
      { id: "cm", label: "Centimeters (if cm to ft)", type: "number", defaultValue: "170" },
      { id: "ft", label: "Feet (if ft to cm)", type: "number", defaultValue: "5" },
      { id: "in", label: "Inches (if ft to cm)", type: "number", defaultValue: "7" }
    ],
    outputs: [
      { id: "result", label: "Result", format: "text" }
    ],
    calculate: (inputs) => {
      if (inputs.mode === "cm-to-ft") {
        const cm = Number(inputs.cm);
        const totalInches = cm / 2.54;
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return { result: `${ft} ft ${inches} in` };
      } else {
        const ft = Number(inputs.ft);
        const inc = Number(inputs.in);
        const cm = ((ft * 12) + inc) * 2.54;
        return { result: `${cm.toFixed(2)} cm` };
      }
    }
  },
  // --- FUN & RANDOM TOOLS ---
  "random-number-generator": {
    slug: "random-number-generator",
    inputs: [
      { id: "min", label: "Minimum Number", type: "number", defaultValue: "1" },
      { id: "max", label: "Maximum Number", type: "number", defaultValue: "100" }
    ],
    outputs: [
      { id: "result", label: "Random Number", format: "number" }
    ],
    calculate: (inputs) => {
      const min = Math.ceil(Number(inputs.min));
      const max = Math.floor(Number(inputs.max));
      if (min > max) return { result: 0 };
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return { result };
    }
  },
  "password-generator": {
    slug: "password-generator",
    inputs: [
      { id: "length", label: "Password Length", type: "number", defaultValue: "16" },
      { id: "uppercase", label: "Include Uppercase", type: "toggle", defaultValue: "yes", options: [{value: "yes", label: "Yes"}, {value: "no", label: "No"}] },
      { id: "numbers", label: "Include Numbers", type: "toggle", defaultValue: "yes", options: [{value: "yes", label: "Yes"}, {value: "no", label: "No"}] },
      { id: "symbols", label: "Include Symbols", type: "toggle", defaultValue: "yes", options: [{value: "yes", label: "Yes"}, {value: "no", label: "No"}] }
    ],
    outputs: [
      { id: "password", label: "Generated Password", format: "text" }
    ],
    calculate: (inputs) => {
      const length = Math.max(4, Math.min(128, Number(inputs.length)));
      const hasUpper = inputs.uppercase === "yes";
      const hasNum = inputs.numbers === "yes";
      const hasSym = inputs.symbols === "yes";
      
      let charset = "abcdefghijklmnopqrstuvwxyz";
      if (hasUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (hasNum) charset += "0123456789";
      if (hasSym) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return { password };
    }
  },
  "fractions-calculator": {
    slug: "fractions-calculator",
    inputs: [
      { id: "n1", label: "Numerator 1", type: "number", defaultValue: "1" },
      { id: "d1", label: "Denominator 1", type: "number", defaultValue: "2" },
      { id: "operation", label: "Operation", type: "select", defaultValue: "add", options: [
        { value: "add", label: "+" }, { value: "subtract", label: "-" },
        { value: "multiply", label: "×" }, { value: "divide", label: "÷" }
      ]},
      { id: "n2", label: "Numerator 2", type: "number", defaultValue: "1" },
      { id: "d2", label: "Denominator 2", type: "number", defaultValue: "4" }
    ],
    outputs: [
      { id: "fraction", label: "Result Fraction", format: "text" },
      { id: "decimal", label: "Decimal", format: "number" }
    ],
    calculate: (inputs) => {
      const n1 = Number(inputs.n1) || 0;
      const d1 = Number(inputs.d1) || 1;
      const n2 = Number(inputs.n2) || 0;
      const d2 = Number(inputs.d2) || 1;
      if (d1 === 0 || d2 === 0) return { fraction: "Undefined (div by 0)", decimal: NaN };
      
      let resN = 0, resD = 1;
      if (inputs.operation === "add") { resN = n1*d2 + n2*d1; resD = d1*d2; }
      if (inputs.operation === "subtract") { resN = n1*d2 - n2*d1; resD = d1*d2; }
      if (inputs.operation === "multiply") { resN = n1*n2; resD = d1*d2; }
      if (inputs.operation === "divide") { resN = n1*d2; resD = d1*n2; }
      
      if (resD === 0) return { fraction: "Undefined (div by 0)", decimal: NaN };
      
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const div = Math.abs(gcd(resN, resD)) || 1;
      const finalN = resN / div;
      const finalD = resD / div;
      
      const sign = (finalN < 0 && finalD < 0) || (finalN > 0 && finalD < 0) ? -1 : (finalN < 0 || finalD < 0 ? -1 : 1);
      const finalFrac = Math.abs(finalD) === 1 ? `${Math.abs(finalN) * sign}` : `${Math.abs(finalN) * sign}/${Math.abs(finalD)}`;
      
      return { fraction: finalFrac, decimal: resN / resD };
    }
  },
  "quadratic-formula-calculator": {
    slug: "quadratic-formula-calculator",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: "1" },
      { id: "b", label: "b", type: "number", defaultValue: "-3" },
      { id: "c", label: "c", type: "number", defaultValue: "2" }
    ],
    outputs: [
      { id: "root1", label: "Root 1 (x₁)", format: "text" },
      { id: "root2", label: "Root 2 (x₂)", format: "text" }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.a);
      const b = Number(inputs.b) || 0;
      const c = Number(inputs.c) || 0;
      if (a === 0) return { root1: "Not a quadratic equation (a=0)", root2: "-" };
      
      const discriminant = b*b - 4*a*c;
      if (discriminant >= 0) {
        const r1 = (-b + Math.sqrt(discriminant)) / (2*a);
        const r2 = (-b - Math.sqrt(discriminant)) / (2*a);
        return { root1: r1.toString(), root2: r2.toString() };
      } else {
        const real = -b / (2*a);
        const imag = Math.sqrt(-discriminant) / (2*a);
        return { root1: `${real} + ${imag}i`, root2: `${real} - ${imag}i` };
      }
    }
  },
  "square-root-calculator": {
    slug: "square-root-calculator",
    inputs: [
      { id: "n", label: "Number", type: "number", defaultValue: "16" }
    ],
    outputs: [
      { id: "sqrt", label: "Principal Square Root", format: "number" }
    ],
    calculate: (inputs) => {
      const n = Number(inputs.n);
      return { sqrt: n >= 0 ? Math.sqrt(n) : NaN };
    }
  },
  "gpa-calculator": {
    slug: "gpa-calculator",
    inputs: [
      { id: "g1", label: "Grade 1 (A, B, C...)", type: "text", defaultValue: "A" },
      { id: "c1", label: "Credits 1", type: "number", defaultValue: "3" },
      { id: "g2", label: "Grade 2", type: "text", defaultValue: "B" },
      { id: "c2", label: "Credits 2", type: "number", defaultValue: "3" },
      { id: "g3", label: "Grade 3", type: "text", defaultValue: "" },
      { id: "c3", label: "Credits 3", type: "number", defaultValue: "0" },
      { id: "g4", label: "Grade 4", type: "text", defaultValue: "" },
      { id: "c4", label: "Credits 4", type: "number", defaultValue: "0" },
      { id: "g5", label: "Grade 5", type: "text", defaultValue: "" },
      { id: "c5", label: "Credits 5", type: "number", defaultValue: "0" }
    ],
    outputs: [
      { id: "gpa", label: "GPA (4.0 Scale)", format: "number" }
    ],
    calculate: (inputs) => {
      const gradesMap: Record<string, number> = {
        "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0
      };
      let totalPoints = 0;
      let totalCredits = 0;
      for (let i = 1; i <= 5; i++) {
        const gradeStr = String(inputs[`g${i}`]).toUpperCase().trim();
        const credits = Number(inputs[`c${i}`]) || 0;
        if (gradeStr && credits > 0 && gradesMap[gradeStr] !== undefined) {
          totalPoints += gradesMap[gradeStr] * credits;
          totalCredits += credits;
        }
      }
      return { gpa: totalCredits > 0 ? totalPoints / totalCredits : 0 };
    }
  },
  "percentage-change-calculator": {
    slug: "percentage-change-calculator",
    inputs: [
      { id: "oldV", label: "Original Value", type: "number", defaultValue: "100" },
      { id: "newV", label: "New Value", type: "number", defaultValue: "120" }
    ],
    outputs: [
      { id: "pct", label: "Percentage Change (%)", format: "number" },
      { id: "diff", label: "Absolute Difference", format: "number" }
    ],
    calculate: (inputs) => {
      const o = Number(inputs.oldV);
      const n = Number(inputs.newV);
      if (o === 0) return { pct: NaN, diff: Math.abs(n) };
      return { pct: ((n - o) / Math.abs(o)) * 100, diff: n - o };
    }
  },
  "lcm-lcd-calculator": {
    slug: "lcm-lcd-calculator",
    inputs: [
      { id: "n1", label: "Number 1", type: "number", defaultValue: "12" },
      { id: "n2", label: "Number 2", type: "number", defaultValue: "15" }
    ],
    outputs: [
      { id: "lcm", label: "LCM", format: "number" },
      { id: "gcd", label: "GCD", format: "number" }
    ],
    calculate: (inputs) => {
      const n1 = Math.abs(Math.round(Number(inputs.n1)));
      const n2 = Math.abs(Math.round(Number(inputs.n2)));
      if (!n1 || !n2) return { lcm: 0, gcd: 0 };
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const resGcd = gcd(n1, n2);
      const resLcm = (n1 * n2) / resGcd;
      return { lcm: resLcm, gcd: resGcd };
    }
  },
  "mean-median-mode-calculator": {
    slug: "mean-median-mode-calculator",
    inputs: [
      { id: "data", label: "Dataset (Comma separated)", type: "text", defaultValue: "1, 2, 2, 3, 4" }
    ],
    outputs: [
      { id: "mean", label: "Mean", format: "number" },
      { id: "median", label: "Median", format: "number" },
      { id: "mode", label: "Mode", format: "text" }
    ],
    calculate: (inputs) => {
      const arr = String(inputs.data).split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (arr.length === 0) return { mean: 0, median: 0, mode: "None" };
      
      const mean = arr.reduce((a,b) => a+b, 0) / arr.length;
      
      arr.sort((a,b) => a-b);
      const mid = Math.floor(arr.length / 2);
      const median = arr.length % 2 === 0 ? (arr[mid-1] + arr[mid]) / 2 : arr[mid];
      
      const counts: Record<number, number> = {};
      let maxCount = 0;
      arr.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
        if (counts[n] > maxCount) maxCount = counts[n];
      });
      const modes = Object.keys(counts).filter(k => counts[Number(k)] === maxCount);
      const mode = modes.length === arr.length ? "None" : modes.join(', ');
      
      return { mean, median, mode };
    }
  },
  "standard-deviation-calculator": {
    slug: "standard-deviation-calculator",
    inputs: [
      { id: "data", label: "Dataset (Comma separated)", type: "text", defaultValue: "1, 2, 3, 4, 5" }
    ],
    outputs: [
      { id: "stddev", label: "Sample Standard Deviation", format: "number" },
      { id: "variance", label: "Sample Variance", format: "number" },
      { id: "count", label: "Count", format: "number" }
    ],
    calculate: (inputs) => {
      const arr = String(inputs.data).split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (arr.length < 2) return { stddev: 0, variance: 0, count: arr.length };
      
      const mean = arr.reduce((a,b) => a+b, 0) / arr.length;
      const variance = arr.reduce((a,b) => a + Math.pow(b - mean, 2), 0) / (arr.length - 1);
      
      return { stddev: Math.sqrt(variance), variance, count: arr.length };
    }
  },
  "long-division-calculator": {
    slug: "long-division-calculator",
    inputs: [
      { id: "dividend", label: "Dividend (Number to divide)", type: "number", defaultValue: "125" },
      { id: "divisor", label: "Divisor (Divide by)", type: "number", defaultValue: "4" }
    ],
    outputs: [
      { id: "quotient", label: "Quotient (Whole number)", format: "number" },
      { id: "remainder", label: "Remainder", format: "number" },
      { id: "decimal", label: "Decimal Result", format: "number" }
    ],
    calculate: (inputs) => {
      const d1 = Number(inputs.dividend);
      const d2 = Number(inputs.divisor);
      if (d2 === 0) return { quotient: NaN, remainder: NaN, decimal: NaN };
      return {
        quotient: Math.floor(d1 / d2),
        remainder: d1 % d2,
        decimal: d1 / d2
      };
    }
  },
  "tip-calculator": {
    slug: "tip-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "bill", label: "Bill Amount", type: "number", defaultValue: "50" },
      { id: "tipPercent", label: "Tip Percentage (%)", type: "number", defaultValue: "18" },
      { id: "people", label: "Split Between (people)", type: "number", defaultValue: "1" }
    ],
    outputs: [
      { id: "tipAmount", label: "Total Tip", format: "currency" },
      { id: "totalAmount", label: "Total Bill (with Tip)", format: "currency" },
      { id: "perPerson", label: "Total Per Person", format: "currency" },
      { id: "tipPerPerson", label: "Tip Per Person", format: "currency" },
      { id: "chart", label: "Bill vs Tip Breakdown", format: "chart", chartConfig: {
        type: "doughnut",
        series: [
          { key: "bill", name: "Bill", color: "hsl(var(--chart-1))" },
          { key: "tipAmount", name: "Tip", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      const bill = Number(inputs.bill) || 0;
      const percent = Number(inputs.tipPercent) || 18;
      const people = Math.max(1, Number(inputs.people) || 1);
      const tipAmount = bill * (percent / 100);
      const totalAmount = bill + tipAmount;
      return { bill, tipAmount, totalAmount, perPerson: totalAmount / people, tipPerPerson: tipAmount / people };
    }
  },
  "401k-calculator": {
    slug: "401k-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "currentBalance", label: "Current Balance", type: "number", defaultValue: "10000" },
      { id: "salary", label: "Annual Salary", type: "number", defaultValue: "60000" },
      { id: "contribution", label: "Your Contribution (%)", type: "number", defaultValue: "5" },
      { id: "employerMatch", label: "Employer Match (%)", type: "number", defaultValue: "3" },
      { id: "rate", label: "Annual Return (%)", type: "number", defaultValue: "7" },
      { id: "years", label: "Years to Grow", type: "number", defaultValue: "30" }
    ],
    outputs: [
      { id: "total", label: "Total Savings", format: "currency" },
      { id: "chart", label: "Growth Over Time", format: "chart", chartConfig: {
        type: "line",
        xAxisKey: "year",
        series: [
          { key: "total", name: "Total Value", color: "hsl(var(--chart-2))" }
        ]
      }}
    ],
    calculate: (inputs) => {
      let balance = Number(inputs.currentBalance) || 0;
      const salary = Number(inputs.salary) || 0;
      const contrib = (Number(inputs.contribution) || 0) / 100;
      const match = (Number(inputs.employerMatch) || 0) / 100;
      const rate = (Number(inputs.rate) || 0) / 100;
      const years = Number(inputs.years) || 0;
      
      const annualAdd = salary * contrib + salary * Math.min(contrib, match);
      const timeline = [];
      
      for(let y=1; y<=years; y++) {
        balance = balance * (1 + rate) + annualAdd;
        timeline.push({ year: `Year ${y}`, total: balance });
      }
      return { total: balance, timeline };
    }
  },
  "paycheck-calculator": {
    slug: "paycheck-calculator",
    inputs: [
      { id: "currency", label: "Currency", type: "select", defaultValue: "USD", options: currencyOptions },
      { id: "salary", label: "Gross Salary", type: "number", defaultValue: "60000" },
      { id: "frequency", label: "Pay Frequency", type: "select", defaultValue: "26", options: [
        { value: "52", label: "Weekly" },
        { value: "26", label: "Bi-Weekly" },
        { value: "24", label: "Semi-Monthly" },
        { value: "12", label: "Monthly" }
      ]},
      { id: "taxRate", label: "Est. Tax Rate (%)", type: "number", defaultValue: "22" }
    ],
    outputs: [
      { id: "gross", label: "Gross Per Paycheck", format: "currency" },
      { id: "tax", label: "Taxes Per Paycheck", format: "currency" },
      { id: "net", label: "Net Take-Home Pay", format: "currency" }
    ],
    calculate: (inputs) => {
      const salary = Number(inputs.salary) || 0;
      const freq = Number(inputs.frequency) || 26;
      const taxRate = (Number(inputs.taxRate) || 0) / 100;
      const gross = salary / freq;
      const tax = gross * taxRate;
      const net = gross - tax;
      return { gross, tax, net };
    }
  },

  "angle-conversion-calculator": {
    slug: "angle-conversion-calculator",
    inputs: [
      { id: "val", label: "Value", type: "number", defaultValue: "180" },
      { id: "input", label: "From", type: "select", defaultValue: "degree", options: [
        { value: "degree", label: "Degree" },
        { value: "radian", label: "Radian" },
        { value: "gradian", label: "Gradian" },
        { value: "minute", label: "Minute of arc" },
        { value: "second", label: "Second of arc" }
      ]},
      { id: "output", label: "To", type: "select", defaultValue: "radian", options: [
        { value: "degree", label: "Degree" },
        { value: "radian", label: "Radian" },
        { value: "gradian", label: "Gradian" },
        { value: "minute", label: "Minute of arc" },
        { value: "second", label: "Second of arc" }
      ]}
    ],
    outputs: [{ id: "res", label: "Result", format: "number" }],
    calculate: (inputs) => {
      const val = Number(inputs.val);
      if (isNaN(val)) return { res: null };
      
      // Convert to degrees first
      let deg = val;
      if (inputs.input === "radian") deg = val * (180 / Math.PI);
      else if (inputs.input === "gradian") deg = val * 0.9;
      else if (inputs.input === "minute") deg = val / 60;
      else if (inputs.input === "second") deg = val / 3600;
      
      // Convert from degrees to target
      let res = deg;
      if (inputs.output === "radian") res = deg * (Math.PI / 180);
      else if (inputs.output === "gradian") res = deg / 0.9;
      else if (inputs.output === "minute") res = deg * 60;
      else if (inputs.output === "second") res = deg * 3600;
      
      return { res };
    }
  },
};
