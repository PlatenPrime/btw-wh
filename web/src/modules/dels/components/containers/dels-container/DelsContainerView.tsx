import type { DelsListResponse } from "@/modules/dels/api/types";
import { DelsGrid } from "@/modules/dels/components/lists/dels-grid";

interface DelsContainerViewProps {
  data: DelsListResponse;
}

export function DelsContainerView({ data }: DelsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <DelsGrid dels={data.data} />
    </div>
  );
}
