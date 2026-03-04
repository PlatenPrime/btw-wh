import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailsCard } from "@/modules/analogs/components/cards/analog-details-card";
import { AnalogSlicesChartContainer } from "@/modules/analogs/components/containers/analog-slices-chart-container";

interface AnalogContainerViewProps {
  analog: EnrichedAnalogDto;
}

export function AnalogContainerView({ analog }: AnalogContainerViewProps) {
  return (
    <div className="grid gap-2">
      <AnalogDetailsCard analog={analog} />
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="pb-2">
          <h3 className="text-muted-foreground text-sm font-medium">
            Динаміка залишків та ціни
          </h3>
        </CardHeader>
        <CardContent>
          <AnalogSlicesChartContainer analogId={analog._id} />
        </CardContent>
      </Card>
    </div>
  );
}
