import fs from 'fs';
import { tools } from './src/lib/tools-registry';

const inputList = `Celsius to Rankine | °C to °R
Centimeters to Inches | cm to in
Character Counter
Checkbook Balance Calculator
Checkbook Calculator
Check Writing (Numbers to Words)
Chemistry Calculators
Circle Calculator
Circular Cylinder Calculator
Circular Permutation Calculator (Pn)
Coin Flipper
Combination with Replacement Calculator
Combinations Calculator (nCr)
Common Factor Calculator
Comparing Fractions Calculator
Completing the Square Calculator
Compound Interest Calculator
Complex Fraction Calculator
Computer Storage Units Conversion Calculator
Conception Calculator
Concrete Volume Calculator
Cone Calculator
Conical Frustum Calculator
Construction Calculators
Conversion Calculators
Cooking Conversion Calculators
Countdown Timer
Cube Calculator
Cube Calculator x³
Cube Root Calculator
Cubic Equation Calculator - 3rd Order Polynomial
Cubic Yards Calculator
Cubic Feet Calculator
Cubic Feet to Cubic Yards | ft³ to yd³
Cubic Yards to Cubic Feet | yd³ to ft³
Currency Appreciation and Depreciation Calculator
Currency Converter
Date Days Calculator
Date Difference Calculator
Date ± Calendar Units Calculator
Debt Ratios Calculator
Decimal Degrees to Degrees Minutes Seconds
Decimal to Fraction Calculator
Decimal to Percent Calculator
Decimal to Time Calculator
Declining Balance Depreciation Calculator
Deferred Fixed Annuity Calculator
Density (Physics)
Density Conversion Calculator
Depreciation Calculator
Depreciation Calculators Index
Descriptive Statistics Calculator
Square Feet to Acres
Square Feet to Square Meters
Square Meters to Square Feet
Statistics Formulas
Diamond Problem Solver
Dice Roller
Difference of Two Squares Calculator
Digital Stopwatch Timer Calculator`;

const lines = inputList.split('\n').map(l => l.trim()).filter(Boolean);

const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

const matched = [];
const unmatched = [];

for (const line of lines) {
  let found = false;
  // first try exact match or prefix match
  for (const t of tools) {
    if (normalize(line).includes(normalize(t.name)) || normalize(t.name).includes(normalize(line.split('|')[0]))) {
      matched.push({ input: line, slug: t.slug, name: t.name });
      found = true;
      break;
    }
  }
  if (!found) {
    unmatched.push(line);
  }
}

console.log("MATCHED (" + matched.length + "):");
matched.forEach(m => console.log(`- ${m.input} => ${m.slug} (${m.name})`));

console.log("\nUNMATCHED (" + unmatched.length + "):");
unmatched.forEach(u => console.log(`- ${u}`));
