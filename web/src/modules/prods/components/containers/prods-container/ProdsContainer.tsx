import type { ProdsListResponse } from "@/modules/prods/api/types";
import { ProdsGrid } from "@/modules/prods/components/lists/prods-grid";

interface ProdsContainerProps {
  data: ProdsListResponse;
}

export function ProdsContainer({ data }: ProdsContainerProps) {
  return (
    <div className="grid gap-2">
      <ProdsGrid prods={data.data} />
    </div>
  );
}
