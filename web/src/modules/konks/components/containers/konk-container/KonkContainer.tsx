import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActions } from "@/modules/konks/components/actions/konk-detail-header-actions";
import { KonkContainerView } from "./KonkContainerView";

interface KonkContainerProps {
  konk: KonkDto;
}

export function KonkContainer({ konk }: KonkContainerProps) {
  return (
    <>
      <KonkDetailHeaderActions konk={konk} />
      <KonkContainerView konk={konk} />
    </>
  );
}
