import type { KaskDto } from "@/modules/kasks/api/types/dto";
import { KasksListCard } from "@/modules/kasks/components/cards/kasks-list-card/KasksListCard";
import { DeleteKaskDialog } from "@/modules/kasks/components/dialogs/delete-kask-dialog/DeleteKaskDialog";
import { useIsMutating } from "@tanstack/react-query";
import { useState } from "react";

interface KasksListProps {
  kasks: KaskDto[];
}

export function KasksList({ kasks }: KasksListProps) {
  const [kaskToDelete, setKaskToDelete] = useState<KaskDto | null>(null);
  const isDeleteMutating =
    useIsMutating({ mutationKey: ["kasks", "delete"] }) > 0;

  if (kasks.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        Немає записів за обрану дату.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-2">
        {kasks.map((k) => (
          <KasksListCard
            key={k._id}
            kask={k}
            isDeleteDisabled={isDeleteMutating}
            onRequestDelete={() => setKaskToDelete(k)}
          />
        ))}
      </div>

      {kaskToDelete ? (
        <DeleteKaskDialog
          key={kaskToDelete._id}
          kask={kaskToDelete}
          open
          onOpenChange={(open) => {
            if (!open) setKaskToDelete(null);
          }}
          onSuccess={() => setKaskToDelete(null)}
        />
      ) : null}
    </>
  );
}
