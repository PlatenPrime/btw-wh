import { Badge } from "@/components/ui/badge";

interface PullStatsProps {
  totalPulls: number;
  totalAsks: number;
}

export function PullStats({ totalPulls, totalAsks }: PullStatsProps) {
  return (
    <div className="flex gap-2">
      <Badge variant="secondary">Палет: {totalPulls}</Badge>
      <Badge variant="secondary">Запитів: {totalAsks}</Badge>
    </div>
  );
}

