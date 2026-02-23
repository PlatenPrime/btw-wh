import type { KonksListResponse } from "@/modules/konks/api/types";
import { KonksGrid } from "@/modules/konks/components/lists/konks-grid";

interface KonksContainerProps {
  data: KonksListResponse;
}

export function KonksContainer({ data }: KonksContainerProps) {
  return (
    <div className="grid gap-2">
      <KonksGrid konks={data.data} />
    </div>
  );
}
