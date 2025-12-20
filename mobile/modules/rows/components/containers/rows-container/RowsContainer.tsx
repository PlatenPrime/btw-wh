import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsContainerView } from "./RowsContainerView";

interface RowsContainerProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
}

export function RowsContainer({ data, isLoading }: RowsContainerProps) {
  return <RowsContainerView data={data} isLoading={isLoading} />;
}

