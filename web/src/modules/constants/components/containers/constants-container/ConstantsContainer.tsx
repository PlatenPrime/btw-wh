import type { ConstantsListResponse } from "@/modules/constants/api/types";
import { ConstantsGrid } from "@/modules/constants/components/lists/constants-grid";

interface ConstantsContainerProps {
  data: ConstantsListResponse;
}

export function ConstantsContainer({ data }: ConstantsContainerProps) {
  return (
    <div className="grid gap-2">
      <ConstantsGrid constants={data.data} />
    </div>
  );
}
