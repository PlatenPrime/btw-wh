import type { DelListItemDto } from "@/modules/dels/api/types";
import { DeleteDelDialog } from "@/modules/dels/components/dialogs/delete-del-dialog/DeleteDelDialog";
import { Trash } from "lucide-react";
import { useState } from "react";
import { DelCardView } from "./DelCardView";

interface DelCardProps {
  del: DelListItemDto;
}

export function DelCard({ del }: DelCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
  };

  const actions = [
    {
      id: "delete",
      label: "Видалити поставку",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => setIsDeleteOpen(true),
    },
  ];

  return (
    <>
      <DelCardView del={del} actions={actions} />
      <DeleteDelDialog
        del={del}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
