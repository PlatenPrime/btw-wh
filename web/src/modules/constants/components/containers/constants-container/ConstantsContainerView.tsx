import type { ConstantsListResponse } from "@/modules/constants/api/types";
import { ConstantsGrid } from "@/modules/constants/components/lists/constants-grid";

interface ConstantsContainerViewProps {
  data: ConstantsListResponse;
}

export function ConstantsContainerView({ data }: ConstantsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ConstantsGrid constants={data.data} />
    </div>
  );
}
