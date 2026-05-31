import type { KonksListResponse } from "@/modules/konks/api/types";
import { KonksGrid } from "@/modules/konks/components/lists/konks-grid";

interface KonksContainerViewProps {
  data: KonksListResponse;
}

export function KonksContainerView({ data }: KonksContainerViewProps) {
  return (
    <div className="grid gap-2">
      <KonksGrid konks={data.data} />
    </div>
  );
}
