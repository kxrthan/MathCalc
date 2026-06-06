import { formulas } from "./src/lib/formulas";

const targetSlugs = [
  "apr-calculator",
  "apr-calculator-basic",
  "area-conversion-calculator",
  "aspect-ratio-calculator",
  "average-calculator-mean",
  "average-velocity-calculator",
  "avoirdupois-weight-conversion-calculator",
  "basic-calculator",
  "bid-ask-calculator",
  "bmi-calculator-body-mass-index",
  "bmi-calculator-for-women",
  "bingo-number-generator",
  "bingo-card-generator",
  "cagr-calculator",
  "capsule-calculator",
  "car-loan-calculator",
  "car-loan-payment-calculator",
  "cd-calculator",
  "celsius-to-fahrenheit",
  "celsius-to-kelvin"
];

let allPassed = true;
for (const slug of targetSlugs) {
  const tool = formulas[slug];
  if (!tool) {
    console.error(`FAILED: Tool ${slug} not found in formulas!`);
    allPassed = false;
    continue;
  }
  
  // Construct default inputs
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
  console.log("\nALL 20 TOOLS PASSED SUCCESSFULLY!");
} else {
  console.log("\nSOME TOOLS FAILED.");
}
