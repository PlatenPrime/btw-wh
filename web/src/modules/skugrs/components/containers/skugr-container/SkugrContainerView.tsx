import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { SkugrDetailHeaderActions } from "@/modules/skugrs/components/actions/skugr-detail-header-actions/SkugrDetailHeaderActions";
import { SkugrDetailCardView } from "@/modules/skugrs/components/cards/skugr-detail-card";
import { SkusGrid } from "@/modules/skus/components/lists/skus-grid";

interface SkugrContainerViewProps {
  skugr: SkugrPageDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  prods: ProdDto[];
}

export function SkugrContainerView({
  skugr,
  konk,
  prod,
  prods,
}: SkugrContainerViewProps) {
  return (
    <>
      <SkugrDetailHeaderActions skugr={skugr} />
      <div className="grid gap-4">
        <SkugrDetailCardView skugr={skugr} konk={konk} prod={prod} />

        <section className="grid gap-2">
          <h2 className="text-lg font-semibold">Товари в групі</h2>
          {skugr.skus.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              У групі ще немає товарів. Для ADMIN доступне заповнення з браузера
              через меню дій у заголовку.
            </p>
          ) : (
            <SkusGrid skus={skugr.skus} konk={konk} prods={prods} />
          )}
        </section>
      </div>
    </>
  );
}
