import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsHeaderActions } from "@/modules/rows/components/actions/rows-header-actions";
import { RowsContainerView } from "./RowsContainerView";

interface RowsContainerProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsContainer({
  data,
  isLoading,
  refreshing,
  onRefresh,
}: RowsContainerProps) {
  return (
    <>
      <RowsHeaderActions />
      <RowsContainerView
        data={data}
        isLoading={isLoading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </>
  );
}

