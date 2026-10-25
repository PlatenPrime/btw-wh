import { MetricChipSkeleton } from "@/components/shared/elements";
import { Card, CardContent } from "@/components/ui/card";

export function AskEventsSkeleton() {
  return (
    <Card className="p-2">
      <CardContent className="grid gap-2 p-0">
        <div className="grid gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <MetricChipSkeleton key={index} className="w-full" />
          ))}
        </div>
        <footer className="border-t border-border pt-2">
          <MetricChipSkeleton className="w-full" />
        </footer>
      </CardContent>
    </Card>
  );
}
