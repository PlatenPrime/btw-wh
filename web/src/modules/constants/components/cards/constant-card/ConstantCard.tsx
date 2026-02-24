import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { ConstantDto } from "@/modules/constants/api/types";
import { DeleteConstantDialog } from "@/modules/constants/components/dialogs/delete-constant-dialog/DeleteConstantDialog";
import { UpdateConstantDialog } from "@/modules/constants/components/dialogs/update-constant-dialog/UpdateConstantDialog";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { ConstantCardView } from "./ConstantCardView";

interface ConstantCardProps {
  constant: ConstantDto;
}

export function ConstantCard({ constant }: ConstantCardProps) {
  const { hasRole } = useAuth();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const canUpdate = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);

  const handleUpdateSuccess = () => {
    setIsUpdateOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
  };

  const actions = [
    ...(canUpdate
      ? [
          {
            id: "update",
            label: "Редагувати константу",
            icon: Pencil,
            variant: "default" as const,
            onClick: () => setIsUpdateOpen(true),
          },
        ]
      : []),
    ...(canDelete
      ? [
          {
            id: "delete",
            label: "Видалити константу",
            icon: Trash,
            variant: "destructive" as const,
            onClick: () => setIsDeleteOpen(true),
          },
        ]
      : []),
  ];

  return (
    <>
      <ConstantCardView constant={constant} actions={actions} />
      <UpdateConstantDialog
        constant={constant}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        onSuccess={handleUpdateSuccess}
      />
      <DeleteConstantDialog
        constant={constant}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
