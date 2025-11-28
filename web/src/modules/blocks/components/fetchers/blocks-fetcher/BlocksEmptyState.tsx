import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Button } from "@/components/ui/button";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog/CreateBlockDialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export function BlocksEmptyState() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="grid gap-4 p-2">
      <div className="flex flex-col items-center gap-4">
        <LoadingNoData description="Блоки не знайдено" />
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 size-4" />
          Створити блок
        </Button>
      </div>
      <CreateBlockDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

