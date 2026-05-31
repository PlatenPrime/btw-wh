import type { ProdsListResponse } from "@/modules/prods/api/types";
import { ProdsGrid } from "@/modules/prods/components/lists/prods-grid";

interface ProdsContainerViewProps {
  data: ProdsListResponse;
}

export function ProdsContainerView({ data }: ProdsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ProdsGrid prods={data.data} />
    </div>
  );
}
