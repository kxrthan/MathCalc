export type FormulaInput = {
  id: string;
  label: string;
  type: "number" | "text" | "select" | "toggle" | "date" | "time";
  defaultValue?: string;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select and toggle
};

export type FormulaChartConfig = {
  type: "doughnut" | "line" | "bar" | "gauge";
  series: { key: string; name: string; color: string }[];
  xAxisKey?: string; // For line/bar charts
};

export type FormulaOutput = {
  id: string;
  label: string;
  format: "number" | "currency" | "percentage" | "text" | "chart";
  prefix?: string;
  suffix?: string;
  chartConfig?: FormulaChartConfig;
};

export type FormulaConfig = {
  slug: string;
  inputs: FormulaInput[];
  outputs: FormulaOutput[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calculate: (inputs: Record<string, any>) => Record<string, any> | Promise<Record<string, any>>;
};
