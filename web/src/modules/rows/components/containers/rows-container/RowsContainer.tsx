import type { RowDto } from "@/modules/rows/api/types";
import { RowsContainerView } from "@/modules/rows/components/containers/rows-container/RowsContainerView";

interface RowsContainerProps {
  data: RowDto[];
}

export function RowsContainer({ data }: RowsContainerProps) {
  return <RowsContainerView data={data} />;
}
