import { Button } from "@/components/ui/button";
import { Grid } from "@/modules/rows/components/grid";
import { Plus } from "lucide-react";
import type { RowDto } from "../../types/dto";
import { RowDialog } from "../row-dialog";

interface ViewProps {
  data: RowDto[];
  onRowUpdated?: () => void;
}

export function View({ data, onRowUpdated }: ViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">Ряди складу</h1>
        <div className="flex items-center gap-4">
          <div className="text-muted-foreground text-sm">
            Всього рядів: {data.length}
          </div>
          <RowDialog
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Row
              </Button>
            }
            onSuccess={onRowUpdated}
          />
        </div>
      </div>

      <Grid rows={data} onRowUpdated={onRowUpdated} />
    </div>
  );
}
