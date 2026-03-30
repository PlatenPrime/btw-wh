import { RoleType } from "@/constants/roles";
import type { CardAction } from "@/components/shared/card-actions/types";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkugrDto } from "@/modules/skugrs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { Edit } from "lucide-react";
import { useMemo } from "react";
import { SkugrGridCardView } from "./SkugrGridCardView";

interface SkugrGridCardProps {
  skugr: SkugrDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (skugr: SkugrDto) => void;
}

export function SkugrGridCard({ skugr, konks, prods, onEdit }: SkugrGridCardProps) {
  const { hasRole } = useAuth();
  const canEdit = hasRole(RoleType.ADMIN);

  const konk = useMemo(
    () => konks.find((k) => k.name === skugr.konkName),
    [konks, skugr.konkName],
  );
  const prod = useMemo(
    () => prods.find((p) => p.name === skugr.prodName),
    [prods, skugr.prodName],
  );

  const actions = useMemo<CardAction[]>(
    () => [
      ...(canEdit
        ? [
            {
              id: "edit",
              label: "Редагувати",
              icon: Edit,
              onClick: () => onEdit?.(skugr),
            },
          ]
        : []),
    ],
    [canEdit, onEdit, skugr],
  );

  return <SkugrGridCardView skugr={skugr} konk={konk} prod={prod} actions={actions} />;
}
