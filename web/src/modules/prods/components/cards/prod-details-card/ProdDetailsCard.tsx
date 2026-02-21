import type { ProdDto } from "@/modules/prods/api/types";
import { ProdDetailsCardView } from "./ProdDetailsCardView";

interface ProdDetailsCardProps {
  prod: ProdDto;
}

export function ProdDetailsCard({ prod }: ProdDetailsCardProps) {
  return <ProdDetailsCardView prod={prod} />;
}
