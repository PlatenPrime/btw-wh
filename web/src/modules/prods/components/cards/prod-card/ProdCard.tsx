import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { ProdDto } from "@/modules/prods/api/types";
import { DeleteProdDialog } from "@/modules/prods/components/dialogs/delete-prod-dialog/DeleteProdDialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ProdCardView } from "./ProdCardView";

interface ProdCardProps {
  prod: ProdDto;
}

export function ProdCard({ prod }: ProdCardProps) {
  const { hasRole } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const canDelete = hasRole(RoleType.PRIME);

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
  };

  const actions = [
    ...(canDelete
      ? [
          {
            id: "delete",
            label: "Видалити виробника",
            icon: Trash,
            variant: "destructive" as const,
            onClick: () => setIsDeleteOpen(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <ProdCardView prod={prod} actions={actions} />
      <DeleteProdDialog
        prod={prod}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
