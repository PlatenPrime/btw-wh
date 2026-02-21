import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailHeaderActions } from "@/modules/prods/components/actions/prod-detail-header-actions";
import { ProdContainerView } from "@/modules/prods/components/containers/prod-container/ProdContainerView";

interface ProdContainerProps {
  prod: ProdDto;
}

export function ProdContainer({ prod }: ProdContainerProps) {
  return (
    <>
      <ProdDetailHeaderActions prod={prod} />
      <ProdContainerView prod={prod} />
    </>
  );
}
