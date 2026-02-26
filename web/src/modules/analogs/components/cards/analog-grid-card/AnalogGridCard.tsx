import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { AnalogDto } from "@/modules/analogs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { Edit, Trash } from "lucide-react";
import { useMemo } from "react";
import { AnalogGridCardView } from "./AnalogGridCardView";

interface AnalogGridCardProps {
  analog: AnalogDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
}

export function AnalogGridCard({
  analog,
  konks,
  prods,
  onEdit,
  onDelete,
}: AnalogGridCardProps) {
  const { hasAnyRole } = useAuth();
  const canEdit = hasAnyRole([RoleType.ADMIN, RoleType.PRIME]);
  const canDelete = hasAnyRole([RoleType.PRIME]);

  const konk = useMemo(
    () => konks.find((k) => k.name === analog.konkName),
    [konks, analog.konkName],
  );
  const prod = useMemo(
    () => prods.find((p) => p.name === analog.prodName),
    [prods, analog.prodName],
  );

  const actions = useMemo(
    () => [
      ...(canEdit
        ? [
            {
              id: "edit",
              label: "Редагувати",
              icon: Edit,
              onClick: () => onEdit?.(analog),
            },
          ]
        : []),
      ...(canDelete
        ? [
            {
              id: "delete",
              label: "Видалити",
              icon: Trash,
              variant: "destructive" as const,
              onClick: () => onDelete?.(analog),
            },
          ]
        : []),
    ],
    [analog, canEdit, canDelete, onEdit, onDelete],
  );

  return (
    <AnalogGridCardView
      analog={analog}
      konk={konk}
      prod={prod}
      actions={actions}
    />
  );
}
