import fs from 'fs';

const registryStr = fs.readFileSync('./src/lib/tools-registry.ts', 'utf-8');
const formulasStr = fs.readFileSync('./src/lib/formulas.ts', 'utf-8');

// Extract tools array from tools-registry.ts
const toolsMatch = registryStr.match(/export const tools: Tool\[\] = (\[[\s\S]*?\]);/);
const tools = JSON.parse(toolsMatch[1]);

// Extract keys from formulas.ts
const formulaKeys = [];
const regex = /"([^"]+)":\s*\{/g;
let match;
while ((match = regex.exec(formulasStr)) !== null) {
  formulaKeys.push(match[1]);
}

const targetNames = [
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
  "Amortization Schedule: Equal Principal Payments",
  "Angle Conversion Calculator",
  "Annuity on Loan: Table Creator",
  "Annulus Calculator",
  "Annuity on Loan : Table Creator",
  "Amortization Schedule Calculator: Equal Principal Payments",
  "1000 Prime Numbers (reference page)"
];

console.log("Missing Tools:");
for (const name of targetNames) {
  // Find in registry
  const tool = tools.find(t => t.name === name || t.name.startsWith(name) || name.startsWith(t.name));
  if (tool) {
    if (!formulaKeys.includes(tool.slug)) {
      console.log(`- "${name}" is in registry as "${tool.slug}" but MISSING from formulas.ts (we used ...)`);
    } else {
      console.log(`- "${name}" is OK (${tool.slug})`);
    }
  } else {
    console.log(`- "${name}" NOT FOUND in registry!`);
  }
}
