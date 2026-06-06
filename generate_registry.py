import json

input_data = """### MATH CALCULATORS
- Basic Calculator
- Math Equation Solver
- Long Addition Calculator
- Long Subtraction Calculator
- Long Multiplication Calculator
- Long Division Calculator with Remainders
- Long Division Calculator with Decimals
- Lattice Multiplication Calculator
- Exponents Calculator
- Large Exponents Calculator
- Square Calculator (x²)
- Cube Calculator (x³)
- Square Root Calculator
- Cube Root Calculator
- Fourth Roots Calculator
- Fifth Roots Calculator
- Radicals and Roots Calculator
- Simplify Radical Expressions Calculator
- Factorial Calculator (n!)
- Multifactorial Calculator (n! to n!!!!!)
- Absolute Value Calculator
- Absolute Difference Calculator
- Modulo Calculator
- GCD / Greatest Common Factor Calculator
- LCM Calculator - Least Common Multiple
- LCD Calculator - Least Common Denominator
- Prime Number Calculator
- Prime Factorization Calculator
- 1000 Prime Numbers (reference page)
- Fibonacci Numbers Calculator
- Pascal's Triangle Generator
- Euclid's Algorithm Calculator
- Diamond Problem Solver
- Rounding Numbers Calculator
- Rounding Methods (reference)
- Round to Nearest Multiple
- Significant Figures Calculator
- Significant Figures Counter
- Significant Figures Rounding
- Place Value Calculator
- Expanded Form Calculator
- Standard Form Calculator
- Number and Word to Standard Notation Calculator
- Numbers to Words Converter
- Digits to Words
- Scientific Notation Calculator
- Scientific Notation Converter
- Sum Calculator
- Mean Calculator
- Average Calculator (Mean)
- Variance Calculator
- Standard Deviation Calculator
- Descriptive Statistics Calculator
- Mean, Median, Mode Calculator
- Percentile Calculator
- Quartile Calculator
- Z Score Calculator
- Stem and Leaf Plot Generator
- Midpoint Calculator
- Distance Calculator 2D
- Distance Calculator 3D
- Slope Calculator
- Dot Product Calculator
- Ratio Calculator
- Ratio Simplifier
- Ratio to Fraction
- Unit Rate Calculator

### FRACTION CALCULATORS
- Fractions Calculator (add, subtract, multiply, divide)
- Adding and Subtracting Fractions Calculator
- Comparing Fractions Calculator
- Ordering Fractions Calculator
- Equivalent Fractions Calculator
- Simplifying Fractions Calculator
- Simplifying Complex Fractions Calculator
- Complex Fraction Calculator
- Fraction to Decimal Calculator
- Decimal to Fraction Calculator
- Fraction to Percent Calculator
- Percent to Fraction Calculator
- Fraction Exponents Calculator
- Improper Fractions to Mixed Numbers
- Mixed Numbers to Improper Fractions
- Mixed Numbers Calculator
- Mixed Number to Decimal Calculator
- Mixed Number to Percent Calculator
- Fractions Averaging
- Fractions Solve for Unknown
- Estimating Sums and Differences of Fractions Calculator
- Completing the Square Calculator
- FOIL Method Calculator

### PERCENT CALCULATORS
- Percentage Calculator
- Percentage Change Calculator
- Percentage Increase Calculator
- Percentage Decrease Calculator
- Percentage Difference Calculator
- Percentage Error Calculator
- Decimal to Percent Calculator
- Percent to Decimal Calculator
- Vote Percentage Calculator
- Discount Calculator
- Reverse Sales Tax Calculator
- Sale Price Calculator
- List Price Markdown Calculator
- Mark-Up Calculator
- Margin Calculator
- Profit Calculator
- Profit Goal Calculator
- Profit Margin Calculator
- Selling Price Calculator

### ALGEBRA CALCULATORS
- Quadratic Formula Calculator (2nd Order Polynomial)
- Cubic Equation Calculator (3rd Order Polynomial)
- Logarithm Equation Calculator
- Solve for Exponents Calculator
- Factorization Calculator
- Common Factor Calculator
- Difference of Two Squares Calculator
- Algebra Word Problems: Age
- Algebra Word Problems: Coins

### GEOMETRY CALCULATORS
- Circle Calculator
- Rectangle Calculator
- Parallelogram Calculator
- Rhombus Calculator
- Trapezoid Calculator
- Regular Polygon Calculator
- Annulus Calculator
- Square Calculator (geometry)
- Equilateral Triangles Calculator
- Isosceles Triangles Calculator
- Right Triangles Calculator
- Triangle Theorems Calculator
- Law of Sines Calculator
- Law of Cosines Calculator
- Pythagorean Theorem Calculator
- Golden Ratio Calculator
- Aspect Ratio Calculator
- Hemisphere Calculator
- Sphere Calculator
- Cone Calculator
- Capsule Calculator
- Circular Cylinder Calculator
- Cube Calculator
- Rectangular Prism Calculator
- Triangular Prism Calculator
- Square Pyramid Calculator
- Pyramid Calculator
- Pyramid Frustum Calculator
- Conical Frustum Calculator
- Tube Calculator
- Stadium Calculator
- Surface Area Calculator
- Volume Calculator
- Pixels per Inch PPI Calculator

### TRIGONOMETRY CALCULATORS
- Trigonometric Functions Calculator
- Trigonometric Functions Calculator ƒ(π)
- Inverse Trigonometric Functions
- Trigonometric Ratios

### PROBABILITY & STATISTICS
- Combinations Calculator (nCr)
- Combination with Replacement Calculator
- Permutations Calculator (nPr)
- Permutation with Replacement Calculator
- Circular Permutation Calculator
- Even Permutations Calculator
- Odd Permutations Calculator
- Odds Calculator
- Dice Roller
- Coin Flipper
- Random Number Generator
- Random Number Generator 1-10
- Random Number Generator 1-100
- Random Number and Letter Set Generator
- Random Card Generator
- Random Name Picker
- Lottery Number Generator
- Bingo Number Generator
- Bingo Card Generator
- Password Generator
- PIN Generator

### FINANCE CALCULATORS
- Compound Interest Calculator
- Simple Interest Calculator A = P(1 + rt)
- Simple Interest Calculator I = Prt
- Periodic Compound Interest Calculator
- Loan Calculator
- Simple Loan Calculator
- Advanced Loan Calculator
- Car Loan Calculator
- Car Loan Payment Calculator
- EMI Loan Calculator
- Mortgage Calculator
- Mortgage Payment Calculator
- Mortgage Repayment Calculator
- Interest Only Mortgage Calculator
- Loan Payment Table Generator
- Loan Repayment Calculator
- Amortization Schedule Calculator
- Amortization Schedule: Equal Principal Payments
- APR Calculator
- APR Calculator Basic
- Effective Interest Rate Calculator
- Effective Annual Rate (EAR) Calculator
- Nominal Interest Rate Calculator
- Equivalent Interest Rate Calculator
- Periodic Interest Rate Calculator
- Annuity on Loan: Table Creator
- Interest Rate on Table Creator
- Present Value Calculator (simple)
- Present Value Calculator (comprehensive)
- Present Value of a Future Sum Calculator
- Present Value of Annuity Calculator
- Present Value of Cash Flows Calculator
- Future Value Calculator (simple)
- Future Value Calculator (comprehensive)
- Future Value of an Investment Calculator
- Future Value of a Present Sum
- Future Value of Annuity Calculator
- Future Value of Cash Flows Calculator
- Net Present Value Calculator
- Investment Calculator
- Investment Account Calculator
- Savings Calculator
- Savings Goal Calculator
- CD Calculator
- Retirement Savings Calculator
- Return on Investment ROI Calculator
- Rule of 72 Calculator
- CAGR Calculator
- Inflation Calculator
- Salary Inflation Calculator
- Investment Inflation Calculator
- Currency Converter
- Currency Appreciation and Depreciation Calculator
- Bid-Ask Calculator
- Deferred Fixed Annuity Calculator
- Layaway Plan Calculator
- Tip Calculator
- Price Calculator
- Sales Calculator
- Gross Pay Calculator
- Hourly to Salary Calculator
- Salary to Hourly Calculator
- Federal Income Tax Estimator
- Property Tax Calculator
- Sales Tax Calculator
- State and Local Sales Tax Calculator
- Service Tax India Calculator
- Checkbook Balance Calculator
- Checkbook Calculator
- Money Calculator
- Money Math Calculator
- Debt Ratios Calculator
- Liquidity Ratios Calculator
- Financial Ratio Calculators
- Profitability Ratios Calculator
- Operations Ratios Calculator
- Stock Ratios Calculator
- How Much Car Can I Afford?
- How Much House Can I Afford?
- How Much of a Loan Can I Afford?
- Depreciation Calculator
- Straight Line Depreciation Calculator
- Declining Balance Depreciation Calculator
- Double Declining Balance Depreciation Calculator
- Fixed Declining Balance Depreciation Calculator
- Variable Declining Balance Depreciation Calculator
- Activity Depreciation Calculator
- Sum of Years Digits Depreciation Calculator
- Units of Production Depreciation Calculator
- Property Depreciation Calculator: Real Estate
- NFL Draft Pick Value Calculator

### HEALTH CALCULATORS
- BMI Calculator (Body Mass Index)
- BMI Calculator for Women
- Target Heart Rate Calculator
- Conception Calculator
- Pregnancy Calculator
- Gestation Calculator
- Period Calculator
- Age Calculator
- Age Checker
- How Old am I?
- Height Calculator
- GPA Calculator
- Grade Calculator

### PHYSICS CALCULATORS
- Speed Calculator (d = s × t)
- Velocity Calculator
- Average Velocity Calculator
- Acceleration Conversion Calculator
- Uniformly Accelerated Motion Calculator
- Velocity as a Function of Acceleration and Time
- Displacement as a Function of Average Velocity and Time
- Displacement as a Function of Velocity and Time
- Displacement as a Function of Velocity, Acceleration and Time
- Force Calculator (Physics)
- Momentum Calculator (p = mv)
- Impulse Calculator
- Impulse-Momentum Calculator
- Kinetic Energy Calculator
- Gravitational Potential Energy Calculator
- Elastic Potential Energy Calculator
- Work Calculator (Physics)
- Hooke's Law Calculator
- Friction Calculator
- E = mc² Calculator
- Ideal Gas Law Calculator
- Density (Physics)
- Wavelength Calculator
- Molecular Weight Calculator

### CHEMISTRY CALCULATORS
- Molecular Weight Calculator

### TIME & DATE CALCULATORS
- Date Days Calculator
- Date Difference Calculator
- Date ± Calendar Units Calculator
- Time and Date Difference Calculator
- Time Calculator (+ − × ÷)
- Time Calculator Hours:Minutes:Seconds
- Countdown Timer
- Digital Stopwatch Timer
- Time Card Calculator
- Time Clock Calculator (Clock-in, Clock-out)
- Work Hours Calculator
- Hours Calculator
- Hours and Minutes Calculator
- Minutes to Hours Calculator
- Minutes to Decimal Hours
- Hours to Minutes Converter
- Military Time Converter
- Time to Decimal Calculator
- Decimal to Time Calculator
- Sunrise Sunset Times
- Pace Calculator

### CONVERSION CALCULATORS
- Temperature Conversion Calculator (°C ↔ °F ↔ K ↔ °R)
- Celsius to Fahrenheit
- Fahrenheit to Celsius
- Celsius to Kelvin
- Kelvin to Celsius
- Kelvin to Fahrenheit
- Fahrenheit to Kelvin
- Celsius to Rankine
- Fahrenheit to Rankine
- Kelvin to Rankine
- Length / Distance Conversion Calculator
- Centimeters to Inches
- Inches to Centimeters
- Meters to Feet
- Area Conversion Calculator
- Acres to Square Feet
- Square Feet to Acres
- Square Feet to Square Meters
- Square Meters to Square Feet
- Volume Conversion Calculator
- Weight / Mass Conversion Calculator
- Kilograms to Pounds
- Pounds to Kilograms
- Speed Conversion Calculator
- Force Conversion Calculator
- Energy Conversion Calculator
- Power Conversion Calculator
- Pressure Conversion Calculator
- Density Conversion Calculator
- Angle Conversion Calculator
- Metric Units Conversion Calculator
- Avoirdupois Weight Conversion Calculator
- Troy Weight Conversion Calculator
- Momentum Unit Converter
- Computer Storage Units Conversion Calculator
- Cooking Conversion Calculators
- Feet and Inches Calculator
- Height ft & in to cm
- Height Converter cm to in & ft
- Cubic Yards Calculator
- Cubic Feet Calculator
- Cubic Feet to Cubic Yards
- Cubic Yards to Cubic Feet

### CONSTRUCTION / REAL ESTATE CALCULATORS
- Square Footage Calculator
- Concrete Volume Calculator
- Mulch Calculator
- Topsoil Calculator
- Road Base Calculator
- Tank Volume Calculator
- Cubic Yards Calculator
- Gas Mileage Calculator

### WORD PROBLEMS (educational pages)
- Math Word Problems: Addition & Multiplication
- Math Word Problems: Division
- Percentage Change Word Problems
- Algebra Word Problems: Age
- Algebra Word Problems: Coins

### FUN & GAMES
- Sudoku Puzzles
- Poker 5 Card Draw
- Poker Hand Rankings
- Yu-Gi-Oh Calculator
- Earned Run Average (ERA) Calculator
- NFL Draft Pick Value Calculator
- Multiplication Tables Practice

### MISCELLANEOUS TOOLS
- Character Counter
- Word Counter
- What is My IP Address?
- Adding Machine Calculator"""

import re

def to_slug(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def to_component(text):
    parts = re.sub(r'[^a-zA-Z0-9 ]', '', text).split()
    comp = ''.join(p.capitalize() for p in parts)
    if 'calculator' not in text.lower():
        comp += 'Calculator'
    return comp

categories = [
    {"slug": "math", "name": "Math", "icon": "calculator"},
    {"slug": "fraction", "name": "Fractions", "icon": "divide"},
    {"slug": "percent", "name": "Percent", "icon": "percent"},
    {"slug": "algebra", "name": "Algebra", "icon": "function-square"},
    {"slug": "geometry", "name": "Geometry", "icon": "shapes"},
    {"slug": "trigonometry", "name": "Trigonometry", "icon": "triangle-right"},
    {"slug": "probability-statistics", "name": "Probability & Statistics", "icon": "bar-chart"},
    {"slug": "finance", "name": "Finance", "icon": "trending-up"},
    {"slug": "health", "name": "Health", "icon": "heart"},
    {"slug": "physics", "name": "Physics", "icon": "zap"},
    {"slug": "chemistry", "name": "Chemistry", "icon": "flask-conical"},
    {"slug": "time-date", "name": "Time & Date", "icon": "clock"},
    {"slug": "conversion", "name": "Conversion", "icon": "arrow-right-left"},
    {"slug": "construction", "name": "Construction & Real Estate", "icon": "hard-hat"},
    {"slug": "word-problems", "name": "Word Problems", "icon": "book-open"},
    {"slug": "fun-games", "name": "Fun & Games", "icon": "gamepad-2"},
    {"slug": "miscellaneous", "name": "Miscellaneous", "icon": "more-horizontal"},
]

tools = []
current_category = ""
current_category_slug = ""
slugs = set()

for line in input_data.strip().split('\n'):
    line = line.strip()
    if line.startswith("### "):
        current_category = line[4:].lower()
        current_category_slug = current_category.split()[0]
        if 'fraction' in current_category: current_category_slug = 'fraction'
        elif 'percent' in current_category: current_category_slug = 'percent'
        elif 'probability' in current_category: current_category_slug = 'probability-statistics'
        elif 'time' in current_category: current_category_slug = 'time-date'
        elif 'construction' in current_category: current_category_slug = 'construction'
        elif 'word' in current_category: current_category_slug = 'word-problems'
        elif 'fun' in current_category: current_category_slug = 'fun-games'
        elif 'misc' in current_category: current_category_slug = 'miscellaneous'
    elif line.startswith("- "):
        name = line[2:]
        slug = to_slug(name)
        
        # Override specific slugs requested
        if slug == "gcd-greatest-common-factor-calculator": slug = "gcd-lcm"
        if slug == "temperature-conversion-calculator-c-f-k-r": slug = "temperature-converter"
        if slug == "bmi-calculator-body-mass-index": slug = "bmi-calculator"
        if slug == "simple-interest-calculator-i-prt": slug = "simple-interest"
        
        # Ensure uniqueness
        base_slug = slug
        counter = 1
        while slug in slugs:
            slug = f"{base_slug}-{counter}"
            counter += 1
        slugs.add(slug)
        
        tags = [current_category_slug] + [re.sub(r'[^a-z]', '', w) for w in name.lower().split() if len(w) > 3]
        tags = list(filter(None, tags))
        
        tools.append({
            "slug": slug,
            "name": name,
            "description": f"Free online {name.lower()}.",
            "category": current_category_slug,
            "tags": tags,
            "component": to_component(name)
        })

output_ts = f'''import {{ Category, Tool }} from "@/types/tool";

export const categories: Category[] = {json.dumps(categories, indent=2)};

export const tools: Tool[] = {json.dumps(tools, indent=2)};
'''

with open('src/lib/tools-registry.ts', 'w', encoding='utf-8') as f:
    f.write(output_ts)

print("Registry generated successfully.")
