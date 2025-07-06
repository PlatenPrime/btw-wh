import { Grid } from "@/modules/rows/components/grid";
import type { RowDto } from "../../types/dto";

interface ViewProps {
  data: RowDto[];
}

export function View({ data }: ViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">Ряди складу</h1>
        <div className="text-muted-foreground text-sm">
          Всього рядів: {data.length}
        </div>
      </div>

      <Grid rows={data} />
    </div>
  );
}
