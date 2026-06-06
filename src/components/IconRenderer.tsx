import { Calculator, TrendingUp, ArrowRightLeft, Shapes, Zap, Activity, Dices, Clock, LucideProps } from 'lucide-react';

const iconMap = {
  calculator: Calculator,
  'trending-up': TrendingUp,
  'arrow-right-left': ArrowRightLeft,
  shapes: Shapes,
  zap: Zap,
  activity: Activity,
  dices: Dices,
  clock: Clock
};

export type CategoryIconName = keyof typeof iconMap;

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name as CategoryIconName] || Calculator;
  return <Icon {...props} />;
}
