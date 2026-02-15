import type { DelsListResponse } from "@/modules/dels/api/types";
import { DelsGrid } from "@/modules/dels/components/lists/dels-grid";

interface DelsContainerProps {
  data: DelsListResponse;
}

export function DelsContainer({ data }: DelsContainerProps) {
  return (
    <div className="grid gap-2">
      <DelsGrid dels={data.data} />
    </div>
  );
}
