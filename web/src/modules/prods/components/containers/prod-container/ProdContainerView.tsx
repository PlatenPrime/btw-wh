import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailsCard } from "@/modules/prods/components/cards/prod-details-card";

interface ProdContainerViewProps {
  prod: ProdDto;
}

export function ProdContainerView({ prod }: ProdContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ProdDetailsCard prod={prod} />
    </div>
  );
}
