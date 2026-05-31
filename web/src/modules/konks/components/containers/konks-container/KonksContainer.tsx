import type { KonksListResponse } from "@/modules/konks/api/types";
import { KonksContainerView } from "@/modules/konks/components/containers/konks-container/KonksContainerView";

interface KonksContainerProps {
  data: KonksListResponse;
}

export function KonksContainer({ data }: KonksContainerProps) {
  return <KonksContainerView data={data} />;
}
