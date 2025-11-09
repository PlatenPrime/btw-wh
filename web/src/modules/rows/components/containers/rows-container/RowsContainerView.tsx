import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { CreateRowDialog } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialog";
import { RowsGrid } from "@/modules/rows/components/lists/rows-grid/RowsGrid";
import { Plus, Rows3 } from "lucide-react";

interface RowsContainerViewProps {
  data: RowDto[];
}

export function RowsContainerView({ data }: RowsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Wrapper className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2">
          <Rows3 className="h-4 w-4" /> {data.length}
        </p>

        <CreateRowDialog
          trigger={
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Створити ряд
            </Button>
          }
        />
      </Wrapper>

      <Separator />

      <Wrapper>
        <RowsGrid rows={data} />
      </Wrapper>
    </div>
  );
}
