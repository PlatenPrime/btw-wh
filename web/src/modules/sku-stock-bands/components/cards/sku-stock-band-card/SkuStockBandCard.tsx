import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandCardView } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-card/SkuStockBandCardView";
import { DeleteSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/delete-sku-stock-band-dialog";
import { UpdateSkuStockBandDialog } from "@/modules/sku-stock-bands/components/dialogs/update-sku-stock-band-dialog";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

interface SkuStockBandCardProps {
  band: SkuStockBandDto;
}

export function SkuStockBandCard({ band }: SkuStockBandCardProps) {
  const { hasRole } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const canManage = hasRole(RoleType.ADMIN);

  const actions = canManage
    ? [
        {
          id: "edit",
          label: "Редагувати",
          icon: Pencil,
          variant: "default" as const,
          onClick: () => setIsEditOpen(true),
        },
        {
          id: "delete",
          label: "Видалити",
          icon: Trash,
          variant: "destructive" as const,
          onClick: () => setIsDeleteOpen(true),
        },
      ]
    : [];

  return (
    <>
      <SkuStockBandCardView band={band} actions={actions} />
      {canManage ? (
        <>
          <UpdateSkuStockBandDialog
            band={band}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <DeleteSkuStockBandDialog
            band={band}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        </>
      ) : null}
    </>
  );
}
