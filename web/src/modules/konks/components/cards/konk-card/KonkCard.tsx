import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { KonkDto } from "@/modules/konks/api/types";
import { DeleteKonkDialog } from "@/modules/konks/components/dialogs/delete-konk-dialog/DeleteKonkDialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { KonkCardView } from "./KonkCardView";

interface KonkCardProps {
  konk: KonkDto;
}

export function KonkCard({ konk }: KonkCardProps) {
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
            label: "Видалити конкурента",
            icon: Trash,
            variant: "destructive" as const,
            onClick: () => setIsDeleteOpen(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <KonkCardView konk={konk} actions={actions} />
      <DeleteKonkDialog
        konk={konk}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
