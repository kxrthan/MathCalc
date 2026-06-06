import re

def to_slug(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

user_list = [
"1000 Prime Numbers",
"Absolute Difference Calculator",
"Absolute Value Calculator",
"Acceleration Conversion Calculator",
"Acres to Square Feet",
"Activity Depreciation Calculator",
"Adding and Subtracting Fractions Calculator",
"Adding and Subtracting Integers",
"Adding Machine Calculator",
"Advanced Loan Calculator",
"Age Calculator",
"Age Checker",
"Algebra Calculators",
"Algebra Word Problems: Age",
"Algebra Word Problems: Coins",
"Amortization Schedule Calculator",
"Amortization Schedule Calculator: Equal Principal Payments",
"Angle Conversion Calculator",
"Annuity on Loan : Table Creator",
"Annulus Calculator",
"APR Calculator",
"APR Calculator Basic",
"Area Conversion Calculator",
"Aspect Ratio Calculator",
"Average Calculator (Mean)",
"Average Velocity Calculator",
"Avoirdupois Weight Conversion Calculator",
"Basic Calculator",
"Bid-Ask Calculator",
"BMI Calculator (Body Mass Index)",
"BMI Calculator for Women",
"Bingo Number Generator",
"Bingo Card Generator",
"CAGR Calculator",
"Capsule Calculator",
"Car Loan Calculator",
"Car Loan Payment Calculator",
"CD Calculator",
"Celsius to Fahrenheit | °C to °F",
"Celsius to Kelvin | °C to K",
"Celsius to Rankine | °C to °R",
"Centimeters to Inches | cm to in",
"Character Counter",
"Checkbook Balance Calculator",
"Checkbook Calculator",
"Check Writing (Numbers to Words)",
"Chemistry Calculators",
"Circle Calculator",
"Circular Cylinder Calculator",
"Circular Permutation Calculator (Pn)",
"Coin Flipper",
"Combination with Replacement Calculator",
"Combinations Calculator (nCr)",
"Common Factor Calculator",
"Comparing Fractions Calculator",
"Completing the Square Calculator",
"Compound Interest Calculator",
"Complex Fraction Calculator",
"Computer Storage Units Conversion Calculator",
"Conception Calculator",
"Concrete Volume Calculator",
"Cone Calculator",
"Conical Frustum Calculator",
"Construction Calculators",
"Conversion Calculators",
"Cooking Conversion Calculators",
"Countdown Timer",
"Cube Calculator",
"Cube Calculator x³",
"Cube Root Calculator",
"Cubic Equation Calculator - 3rd Order Polynomial",
"Cubic Yards Calculator",
"Cubic Feet Calculator",
"Cubic Feet to Cubic Yards | ft³ to yd³",
"Cubic Yards to Cubic Feet | yd³ to ft³",
"Currency Appreciation and Depreciation Calculator",
"Currency Converter",
"Date Days Calculator",
"Date Difference Calculator",
"Date ± Calendar Units Calculator",
"Debt Ratios Calculator",
"Decimal Degrees to Degrees Minutes Seconds",
"Decimal to Fraction Calculator",
"Decimal to Percent Calculator",
"Decimal to Time Calculator",
"Declining Balance Depreciation Calculator",
"Deferred Fixed Annuity Calculator",
"Density (Physics)",
"Density Conversion Calculator",
"Depreciation Calculator",
"Depreciation Calculators Index",
"Descriptive Statistics Calculator",
"Square Feet to Acres",
"Square Feet to Square Meters",
"Square Meters to Square Feet",
"Statistics Formulas",
"Diamond Problem Solver",
"Dice Roller",
"Difference of Two Squares Calculator",
"Digital Stopwatch Timer Calculator",
"Digits to Words",
"Discount Calculator",
"Discrete Mathematics Calculators",
"Displacement as a Function of Average Velocity and Time",
"Displacement as a Function of Velocity and Time",
"Displacement as a Function of Velocity, Acceleration and Time",
"Distance Calculator 2D",
"Distance Calculator 3D",
"Distance Conversion Calculator",
"Dot Product Calculator",
"Double Declining Balance Depreciation Calculator",
"E = mc2  Calculator",
"Earned Run Average (ERA) Calculator",
"Effective Interest Rate Calculator",
"Effective Annual Rate (EAR) Calculator",
"Elastic Potential Energy Calculator",
"EMI Loan Calculator",
"Energy Conversion Calculator",
"Equilateral Triangles Calculator",
"Equivalent Fractions Calculator",
"Equivalent Interest Rate Calculator",
"Estimating Sums and Differences of Fractions Calculator",
"Euclid's Algorithm Calculator",
"Even Permutations Calculator",
"Expanded Form Calculator",
"Exponents Calculator",
"Large Exponents Calculator",
"Factorial Calculator n!",
"Factorization Calculator",
"Federal Income Tax Estimator",
"Feet and Inches Calculator",
"Fahrenheit to Celsius | °F to °C",
"Fahrenheit to Kelvin | °F to K",
"Fahrenheit to Rankine | °F to °R",
"Fibonacci Numbers Calculator",
"Fifth Roots Calculator",
"Financial Calculators",
"Financial Calculator Widgets",
"Financial Ratio Calculators",
"Fixed Declining Balance Depreciation Calculator",
"FOIL Method Calculator",
"Force Calculator (Physics)",
"Force Conversion Calculator",
"Fourth Roots Calculator"
]

slug_map = {
    "1000 Prime Numbers": "1000-prime-numbers",
    "Celsius to Fahrenheit | °C to °F": "celsius-to-fahrenheit",
    "Celsius to Kelvin | °C to K": "celsius-to-kelvin",
    "Celsius to Rankine | °C to °R": "celsius-to-rankine",
    "Centimeters to Inches | cm to in": "centimeters-to-inches",
    "Cubic Feet to Cubic Yards | ft³ to yd³": "cubic-feet-to-cubic-yards",
    "Cubic Yards to Cubic Feet | yd³ to ft³": "cubic-yards-to-cubic-feet",
    "E = mc2  Calculator": "e-mc2-calculator",
    "Fahrenheit to Celsius | °F to °C": "fahrenheit-to-celsius",
    "Fahrenheit to Kelvin | °F to K": "fahrenheit-to-kelvin",
    "Fahrenheit to Rankine | °F to °R": "fahrenheit-to-rankine",
}

def get_slug(name):
    if name in slug_map:
        return slug_map[name]
    # some names have pipe or hyphen, generating slug
    base = name.split('|')[0]
    return to_slug(base)

ts_content = '''import { FormulaConfig } from "./formulas-types";

export const generatedFormulas: Record<string, FormulaConfig> = {
'''

# Filter out categories and invalid entries
categories = ["algebra-calculators", "chemistry-calculators", "construction-calculators", 
              "conversion-calculators", "depreciation-calculators-index", "statistics-formulas",
              "discrete-mathematics-calculators", "financial-calculators", 
              "financial-calculator-widgets", "financial-ratio-calculators"]

import textwrap

for item in user_list:
    slug = get_slug(item)
    if slug in categories:
        continue
    
    # Generic template fallback
    calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "value1", label: "Value 1", type: "number", defaultValue: "10" }},
      {{ id: "value2", label: "Value 2", type: "number", defaultValue: "5" }}
    ],
    outputs: [
      {{ id: "result", label: "Result", format: "number" }}
    ],
    calculate: (inputs) => ({{ result: Number(inputs.value1) + Number(inputs.value2) }})
  }},'''

    # Basic special cases
    if "prime-numbers" in slug:
        calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "count", label: "Number of Primes", type: "number", defaultValue: "100" }}
    ],
    outputs: [
      {{ id: "primes", label: "Prime List", format: "text" }}
    ],
    calculate: (inputs) => {{
        let count = Math.min(Number(inputs.count), 1000);
        let primes = [];
        let n = 2;
        while(primes.length < count) {{
            let isPrime = true;
            for(let i=2; i<=Math.sqrt(n); i++) {{
                if(n % i === 0) {{ isPrime = false; break; }}
            }}
            if(isPrime) primes.push(n);
            n++;
        }}
        return {{ primes: primes.join(", ") }};
    }}
  }},'''
    elif "absolute-difference" in slug:
        calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "a", label: "Value A", type: "number", defaultValue: "10" }},
      {{ id: "b", label: "Value B", type: "number", defaultValue: "5" }}
    ],
    outputs: [
      {{ id: "diff", label: "Absolute Difference", format: "number" }}
    ],
    calculate: (inputs) => ({{ diff: Math.abs(Number(inputs.a) - Number(inputs.b)) }})
  }},'''
    elif "absolute-value" in slug:
        calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "a", label: "Value", type: "number", defaultValue: "-10" }}
    ],
    outputs: [
      {{ id: "abs", label: "Absolute Value", format: "number" }}
    ],
    calculate: (inputs) => ({{ abs: Math.abs(Number(inputs.a)) }})
  }},'''
    elif "acres-to-square-feet" in slug:
         calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "acres", label: "Acres", type: "number", defaultValue: "1" }}
    ],
    outputs: [
      {{ id: "sqft", label: "Square Feet", format: "number" }}
    ],
    calculate: (inputs) => ({{ sqft: Number(inputs.acres) * 43560 }})
  }},'''
    elif "square-feet-to-acres" in slug:
         calc_str = f'''
  "{slug}": {{
    slug: "{slug}",
    inputs: [
      {{ id: "sqft", label: "Square Feet", type: "number", defaultValue: "43560" }}
    ],
    outputs: [
      {{ id: "acres", label: "Acres", format: "number" }}
    ],
    calculate: (inputs) => ({{ acres: Number(inputs.sqft) / 43560 }})
  }},'''
    
    ts_content += calc_str

ts_content += "\n};\n"

with open("src/lib/formulas-batch.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated src/lib/formulas-batch.ts")
