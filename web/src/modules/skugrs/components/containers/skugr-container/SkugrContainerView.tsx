import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { SkugrDetailHeaderActions } from "@/modules/skugrs/components/actions/skugr-detail-header-actions/SkugrDetailHeaderActions";
import { SkugrDetailCardView } from "@/modules/skugrs/components/cards/skugr-detail-card";

interface SkugrContainerViewProps {
  skugr: SkugrPageDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkugrContainerView({
  skugr,
  konk,
  prod,
}: SkugrContainerViewProps) {
  return (
    <>
      <SkugrDetailHeaderActions skugr={skugr} />
      <div className="grid gap-4">
        <SkugrDetailCardView skugr={skugr} konk={konk} prod={prod} />
      </div>
    </>
  );
}
