import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantDetailsCardView } from "./VariantDetailsCardView";

interface VariantDetailsCardProps {
  variant: VariantDto;
  konk?: KonkDto;
  prod?: ProdDto;
}

export function VariantDetailsCard({
  variant,
  konk,
  prod,
}: VariantDetailsCardProps) {
  return <VariantDetailsCardView variant={variant} konk={konk} prod={prod} />;
}

