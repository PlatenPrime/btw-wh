import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { VariantDto } from "@/modules/variants/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { Edit, Trash } from "lucide-react";
import { useMemo } from "react";
import type { CardAction } from "@/components/shared/card-actions";
import { VariantGridCardView } from "./VariantGridCardView";

interface VariantGridCardProps {
  variant: VariantDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (variant: VariantDto) => void;
  onDelete?: (variant: VariantDto) => void;
}

export function VariantGridCard({
  variant,
  konks,
  prods,
  onEdit,
  onDelete,
}: VariantGridCardProps) {
  const { hasAnyRole } = useAuth();

  const canEdit = hasAnyRole([RoleType.ADMIN, RoleType.PRIME]);
  const canDelete = hasAnyRole([RoleType.PRIME]);

  const konk = useMemo(
    () => konks.find((k) => k.name === variant.konkName),
    [konks, variant.konkName],
  );

  const prod = useMemo(
    () => prods.find((p) => p.name === variant.prodName),
    [prods, variant.prodName],
  );

  const actions = useMemo<CardAction[]>(
    () => {
      const nextActions: CardAction[] = [];

      if (canEdit) {
        nextActions.push({
          id: "edit",
          label: "Редагувати",
          icon: Edit,
          onClick: () => {
            onEdit?.(variant);
          },
        });
      }

      if (canDelete) {
        nextActions.push({
          id: "delete",
          label: "Видалити",
          icon: Trash,
          variant: "destructive",
          onClick: () => {
            onDelete?.(variant);
          },
        });
      }

      return nextActions;
    },
    [canDelete, canEdit, onDelete, onEdit, variant],
  );

  return (
    <VariantGridCardView
      variant={variant}
      konk={konk}
      prod={prod}
      actions={actions}
    />
  );
}

