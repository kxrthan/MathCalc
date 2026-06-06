import { formulas } from "./src/lib/formulas";

const targetSlugs = [
  "celsius-to-rankine",
  "centimeters-to-inches",
  "character-counter",
  "checkbook-balance-calculator",
  "checkbook-calculator",
  "numbers-to-words-converter",
  "circle-calculator",
  "circular-cylinder-calculator",
  "circular-permutation-calculator",
  "coin-flipper",
  "combination-with-replacement-calculator",
  "combinations-calculator-ncr",
  "common-factor-calculator",
  "comparing-fractions-calculator",
  "completing-the-square-calculator",
  "compound-interest-calculator",
  "complex-fraction-calculator",
  "computer-storage-units-conversion-calculator",
  "conception-calculator",
  "concrete-volume-calculator",
  "cone-calculator",
  "conical-frustum-calculator",
  "cooking-conversion-calculators",
  "countdown-timer",
  "cube-calculator",
  "cube-calculator-x",
  "cube-root-calculator",
  "cubic-equation-calculator-3rd-order-polynomial",
  "cubic-yards-calculator",
  "cubic-feet-calculator",
  "cubic-feet-to-cubic-yards",
  "cubic-yards-to-cubic-feet",
  "currency-appreciation-and-depreciation-calculator",
  "currency-converter",
  "date-days-calculator",
  "date-difference-calculator",
  "date-calendar-units-calculator",
  "debt-ratios-calculator",
  "decimal-degrees-to-degrees-minutes-seconds",
  "decimal-to-fraction-calculator",
  "decimal-to-percent-calculator",
  "decimal-to-time-calculator",
  "declining-balance-depreciation-calculator",
  "deferred-fixed-annuity-calculator",
  "density-physics",
  "density-conversion-calculator",
  "depreciation-calculator",
  "descriptive-statistics-calculator",
  "square-feet-to-acres",
  "square-feet-to-square-meters",
  "square-meters-to-square-feet",
  "diamond-problem-solver",
  "dice-roller",
  "difference-of-two-squares-calculator",
  "digital-stopwatch-timer"
];

let allPassed = true;
for (const slug of targetSlugs) {
  const tool = formulas[slug];
  if (!tool) {
    console.error(`FAILED: Tool ${slug} not found in formulas!`);
    allPassed = false;
    continue;
  }
  
  const inputs: Record<string, any> = {};
  for (const inp of tool.inputs) {
    inputs[inp.id] = inp.defaultValue || "0";
  }
  
  try {
    const result = tool.calculate(inputs);
    if (!result) {
      console.error(`FAILED: Tool ${slug} returned null/undefined!`);
      allPassed = false;
    } else {
      console.log(`OK: ${slug} -> Result: ${JSON.stringify(result)}`);
    }
  } catch(e: any) {
    console.error(`FAILED: Tool ${slug} threw an error: ${e.message}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log("\nALL 55 TOOLS PASSED SUCCESSFULLY!");
} else {
  console.log("\nSOME TOOLS FAILED.");
}
