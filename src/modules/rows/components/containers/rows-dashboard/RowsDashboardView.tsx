import { Button } from "@/components/ui/button";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { Grid } from "@/modules/rows/components/containers/rows-grid/Grid";
import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog";
import { Plus } from "lucide-react";

interface ViewProps {
  data: RowDto[];
  refetch: RowsRefetch;
}

export function RowsDashboardView({ data, refetch }: ViewProps) {
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
          onSuccess={() => refetch() ?? (() => {})}
        />
      </div>

      <Grid rows={data} refetch={refetch} />
    </div>
  );
}
