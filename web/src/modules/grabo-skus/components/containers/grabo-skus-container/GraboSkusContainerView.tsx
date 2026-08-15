import { PaginationControls } from "@/components/shared/controls";
import type { GraboSkusResponseDto } from "@/modules/grabo-skus/api/types";
import { GraboSkusGrid } from "@/modules/grabo-skus/components/lists/grabo-skus-grid";

export interface GraboSkusContainerViewProps {
  data: GraboSkusResponseDto;
  onPageChange: (page: number) => void;
}

export function GraboSkusContainerView({
  data,
  onPageChange,
}: GraboSkusContainerViewProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
      <GraboSkusGrid skus={data.data} />
    </div>
  );
}
