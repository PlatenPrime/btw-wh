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
    <div className="grid gap-4">

        <div className="flex items-center justify-between gap-4">

          <div className="text-muted-foreground ">
            Всього рядів: {data.length}
          </div>

          <RowDialog
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Створити ряд
              </Button>
            }
            onSuccess={onRowUpdated}
          />
        </div>
   

      <Grid rows={data} onRowUpdated={onRowUpdated} />
    </div>
  );
}
