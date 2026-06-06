import fs from 'fs';
import path from 'path';

// The existing categories
const categories = [
  { slug: "math", name: "Math", icon: "calculator" },
  { slug: "finance", name: "Finance", icon: "trending-up" },
  { slug: "conversion", name: "Conversion", icon: "arrow-right-left" },
  { slug: "geometry", name: "Geometry", icon: "shapes" },
  { slug: "physics", name: "Physics", icon: "zap" },
  { slug: "health", name: "Health", icon: "activity" },
  { slug: "fun", name: "Fun & Random", icon: "dices" },
  { slug: "datetime", name: "Date & Time", icon: "clock" }
];

// The existing tools base
const toolsBase = [
  { slug: "basic-calculator", name: "Basic Calculator", description: "Standard calculator with standard operations.", category: "math", component: "BasicCalculator" },
  { slug: "fractions-calculator", name: "Fractions Calculator", description: "Add, subtract, multiply, and divide fractions.", category: "math" },
  { slug: "quadratic-formula-calculator", name: "Quadratic Formula", description: "Calculate roots of a quadratic equation.", category: "math" },
  { slug: "square-root-calculator", name: "Square Root Calculator", description: "Calculate square roots and other roots.", category: "math" },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate your Grade Point Average.", category: "math" },
  { slug: "percentage-change-calculator", name: "Percentage Change", description: "Calculate percentage increase or decrease.", category: "math" },
  { slug: "lcm-lcd-calculator", name: "LCM / LCD Calculator", description: "Find the Least Common Multiple/Denominator.", category: "math" },
  { slug: "mean-median-mode-calculator", name: "Mean, Median, Mode", description: "Calculate averages and central tendencies.", category: "math" },
  { slug: "standard-deviation-calculator", name: "Standard Deviation", description: "Calculate variance and standard deviation.", category: "math" },
  { slug: "long-division-calculator", name: "Long Division Calculator", description: "Calculate quotient and remainder.", category: "math" },
  { slug: "length-converter", name: "Length Converter", description: "Convert between various units of length.", category: "conversion" },
  { slug: "distance-converter", name: "Distance Conversion", description: "Convert between various units of distance.", category: "conversion" },
  { slug: "temperature-converter", name: "Temperature Conversion", description: "Convert between Celsius, Fahrenheit, and Kelvin.", category: "conversion" },
  { slug: "speed-converter", name: "Speed Conversion", description: "Convert between m/s, km/h, mph, knots, etc.", category: "conversion" },
  { slug: "weight-converter", name: "Weight Converter", description: "Convert between various units of weight and mass.", category: "conversion" },
  { slug: "volume-converter", name: "Volume Converter", description: "Convert between various units of volume.", category: "conversion" },
  { slug: "area-of-circle", name: "Area of Circle", description: "Calculate the area and circumference of a circle.", category: "geometry" },
  { slug: "area-of-rectangle", name: "Area of Rectangle", description: "Calculate the area and perimeter of a rectangle.", category: "geometry" },
  { slug: "area-of-triangle", name: "Area of Triangle", description: "Calculate the area of a triangle.", category: "geometry" },
  { slug: "area-of-square", name: "Area of Square", description: "Calculate the area and perimeter of a square.", category: "geometry" },
  { slug: "volume-of-cube", name: "Volume of Cube", description: "Calculate the volume of a cube.", category: "geometry" },
  { slug: "volume-of-sphere", name: "Volume of Sphere", description: "Calculate the volume of a sphere.", category: "geometry" },
  { slug: "volume-of-cylinder", name: "Volume of Cylinder", description: "Calculate the volume of a cylinder.", category: "geometry" },
  { slug: "pythagorean-theorem", name: "Pythagorean Theorem", description: "Calculate the hypotenuse of a right-angled triangle.", category: "geometry" },
  { slug: "velocity", name: "Velocity Calculator", description: "Calculate velocity from distance and time.", category: "physics" },
  { slug: "kinetic-energy", name: "Kinetic Energy", description: "Calculate kinetic energy from mass and velocity.", category: "physics" },
  { slug: "ohms-law-calculator", name: "Ohm's Law", description: "Calculate voltage from current and resistance.", category: "physics" },
  { slug: "speed-calculator", name: "Speed Calculator", description: "Calculate speed from distance and time.", category: "physics" },
  { slug: "density-calculator", name: "Density Calculator", description: "Calculate density from mass and volume.", category: "physics" },
  { slug: "simple-interest-calculator", name: "Simple Interest", description: "Calculate simple interest earned.", category: "finance" },
  { slug: "markup-calculator", name: "Markup Calculator", description: "Calculate profit and markup percentage.", category: "finance" },
  { slug: "sip-calculator", name: "SIP Calculator", description: "Calculate SIP and Lumpsum investment returns.", category: "finance" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator", description: "Calculate monthly mortgage payments.", category: "finance" },
  { slug: "emi-calculator", name: "EMI Calculator", description: "Calculate Equated Monthly Installment for loans.", category: "finance" },
  { slug: "compound-interest-calculator", name: "Compound Interest", description: "Calculate compound interest over time.", category: "finance" },
  { slug: "car-loan-calculator", name: "Car Loan Calculator", description: "Calculate car loan payments.", category: "finance" },
  { slug: "sales-tax-calculator", name: "Sales Tax Calculator", description: "Calculate sales tax on purchases.", category: "finance" },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate discounts on prices.", category: "finance" },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages of numbers.", category: "finance" },
  { slug: "savings-calculator", name: "Savings Calculator", description: "Calculate savings growth over time.", category: "finance" },
  { slug: "retirement-savings-calculator", name: "Retirement Savings", description: "Calculate retirement savings projection.", category: "finance" },
  { slug: "currency-converter", name: "Currency Converter", description: "Convert between currencies with live rates.", category: "finance" },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate your Body Mass Index.", category: "health" },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate your exact age in years, months, and days.", category: "datetime" },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", description: "Calculate the exact difference between two dates.", category: "datetime" },
  { slug: "countdown-timer", name: "Countdown Timer", description: "A simple countdown timer.", category: "datetime", component: "CountdownTimer" },
  { slug: "time-calculator", name: "Time Calculator", description: "Add or subtract time.", category: "datetime" },
  { slug: "military-time-converter", name: "Military Time Converter", description: "Convert between 12-hour and 24-hour formats.", category: "datetime" },
  { slug: "calorie-calculator", name: "Calorie & Target HR", description: "Calculate daily calorie needs and target heart rate.", category: "health" },
  { slug: "pregnancy-calculator", name: "Pregnancy Calculator", description: "Calculate estimated due date and current week of pregnancy.", category: "health" },
  { slug: "height-converter", name: "Height Converter", description: "Convert between centimeters and feet/inches.", category: "conversion" },
  { slug: "random-number-generator", name: "Random Number Generator", description: "Generate a random number between a range.", category: "fun" },
  { slug: "password-generator", name: "Password Generator", description: "Generate a secure random password.", category: "fun" },
  { slug: "dice-roller", name: "Dice Roller", description: "Roll one or more virtual dice.", category: "fun", component: "DiceRoller" },
  { slug: "coin-flipper", name: "Coin Flipper", description: "Flip a virtual coin multiple times.", category: "fun", component: "CoinFlipper" },
  { slug: "lottery-number-generator", name: "Lottery Number Generator", description: "Generate random numbers for lottery tickets.", category: "fun", component: "LotteryMachine" }
];

// Re-add custom SEO we already made
const customSeo = {
  "mortgage-calculator": {
    about: "Our Mortgage Calculator is designed to help you estimate your monthly home loan payments accurately. By factoring in your principal loan amount, interest rate, and loan term, you can quickly see how much house you can afford. It's the perfect free online calculator for homebuyers, real estate agents, and financial planners.",
    howToUse: "Enter your total home price, your down payment, the expected interest rate, and the length of your mortgage (typically 15 or 30 years). Once you hit calculate, we will instantly break down your estimated monthly principal and interest payment.",
    faqs: [
      { q: "What is a good mortgage interest rate?", a: "Interest rates fluctuate based on the market and your credit score. A 'good' rate is typically anything at or below the national average at the time of your application." },
      { q: "Does this include property taxes and insurance?", a: "This basic calculator estimates your principal and interest (P&I). You will need to manually add your estimated property taxes, home insurance, and HOA fees to get your total monthly payment." }
    ]
  },
  "bmi-calculator": {
    about: "Our free online BMI Calculator (Body Mass Index) helps you determine if your weight is in a healthy proportion to your height. It is a widely used screening tool for categorizing whether a person is underweight, normal weight, overweight, or obese. While it doesn't measure body fat directly, it provides an excellent starting point for assessing overall health risks.",
    howToUse: "Simply input your height (in feet/inches or centimeters) and your current weight (in pounds or kilograms). Press the 'Calculate' button, and your BMI score will be generated instantly, along with the standard health category it falls under.",
    faqs: [
      { q: "Is BMI an accurate measure of health?", a: "BMI is a general screening tool, not a diagnostic one. It does not account for muscle mass, bone density, or overall body composition. Athletes with high muscle mass may have a high BMI but very low body fat." },
      { q: "What is a normal BMI range?", a: "A normal, healthy BMI typically falls between 18.5 and 24.9. A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is considered obese." }
    ]
  }
};

const updatedTools = toolsBase.map(tool => {
  if (customSeo[tool.slug]) {
    return { ...tool, seoContent: customSeo[tool.slug] };
  }
  
  const isGenerator = tool.slug.includes("generator");
  const isStarter = tool.slug.includes("stopwatch") || tool.slug.includes("timer");
  const isRoller = tool.slug.includes("dice");
  const isFlipper = tool.slug.includes("coin");
  const isSpinner = tool.slug.includes("lottery") || tool.slug.includes("spinner");

  let actionVerb = "Calculate";
  if (isGenerator) actionVerb = "Generate";
  else if (isStarter) actionVerb = "Start";
  else if (isRoller) actionVerb = "Roll";
  else if (isFlipper) actionVerb = "Flip";
  else if (isSpinner) actionVerb = "Spin";

  let about = "";
  let howToUse = `Using the ${tool.name} is straightforward. Just input your required values into the provided fields. Your results will automatically update or will display instantly when you press the "${actionVerb}" button.`;
  let faqs = [
    { q: `Is the ${tool.name} free to use?`, a: `Yes, our ${tool.name} is completely free to use online with no hidden fees or registrations required.` }
  ];

  if (tool.category === 'math' || tool.category === 'geometry') {
    about = `Our free online ${tool.name} is the perfect utility to help you ${tool.description.toLowerCase()} Whether you are a student double-checking your homework, a teacher creating lesson plans, or a professional needing quick mathematical answers, this tool is designed for speed and accuracy.`;
    faqs.push({ q: `Can I trust the accuracy of the ${tool.name}?`, a: `Absolutely. Our calculators use standard mathematical formulas and high-precision arithmetic to ensure your answers are correct.` });
  } else if (tool.category === 'finance') {
    about = `Make informed financial decisions with our free ${tool.name}. Designed to help you ${tool.description.toLowerCase()}, this calculator takes the guesswork out of your personal or business finances.`;
    howToUse = `Enter your financial figures into the appropriate fields. Double-check your numbers for the most accurate projection, then click "${actionVerb}" to see your detailed breakdown.`;
    faqs.push({ q: `Does this ${tool.name} provide financial advice?`, a: `No, this tool provides estimates based on standard financial formulas for informational purposes only. Always consult a certified financial planner for official advice.` });
  } else if (tool.category === 'physics' || tool.category === 'conversion') {
    about = `Our ${tool.name} makes complex conversions and calculations incredibly simple. Use this free online tool to quickly ${tool.description.toLowerCase()} without needing to memorize complex conversion factors or scientific formulas.`;
    faqs.push({ q: `What formula does the ${tool.name} use?`, a: `This tool utilizes universally accepted scientific and conversion formulas to guarantee reliable results every time.` });
  } else if (tool.category === 'health') {
    about = `Track and maintain your well-being with our ${tool.name}. This free online tool is built to help you ${tool.description.toLowerCase()} quickly and privately from your own device.`;
    faqs.push({ q: `Is this a replacement for medical advice?`, a: `No. All health-related calculators are for general informational purposes only and should not replace professional medical advice or diagnosis.` });
  } else if (tool.category === 'datetime') {
    about = `Easily manage schedules and time-based tasks with our ${tool.name}. Designed to help you ${tool.description.toLowerCase()}, this reliable utility saves you the hassle of manual date and time math.`;
    faqs.push({ q: `Does the ${tool.name} account for timezones or leap years?`, a: `Where applicable, our date and time tools automatically factor in standard calendar rules like leap years for absolute precision.` });
  } else {
    about = `Looking for a quick and reliable ${tool.name}? You're in the right place. Our free online tool is carefully designed to ${tool.description.toLowerCase()} efficiently and accurately.`;
  }

  return {
    ...tool,
    seoContent: { about, howToUse, faqs }
  };
});

const tsOutput = `import { Category, Tool } from '@/types/tool';

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

export const tools: Tool[] = ${JSON.stringify(updatedTools, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/lib/tools-registry.ts'), tsOutput, 'utf8');
console.log("Successfully generated SEO content for all tools.");
