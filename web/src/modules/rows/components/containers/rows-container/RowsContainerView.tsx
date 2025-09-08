import { Button } from "@/components/ui/button";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";
import { RowsGrid } from "@/modules/rows/components/lists/rows-grid/RowsGrid";
import { Plus } from "lucide-react";

interface RowsContainerViewProps {
  data: RowDto[];
}

export function RowsContainerView({ data }: RowsContainerViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-muted-foreground">Всього рядів: {data.length}</div>

        <CreateRowDialog
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Створити ряд
            </Button>
          }
        />
      </div>

      <RowsGrid rows={data} />
    </div>
  );
}
