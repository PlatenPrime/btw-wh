import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { RowDto } from "@/modules/rows/types/dto";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { DeleteRowDialog } from "../delete-row-dialog";
import { PalletsList } from "./pallets-list";

interface ViewProps {
  row: RowDto;
}

export function View({ row }: ViewProps) {
  const navigate = useNavigate();

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-foreground text-3xl font-bold">{row.title}</h1>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Додати палету
          </Button>

          <DeleteRowDialog
            row={row}
            trigger={
              <Button variant="destructive" size="sm">
                Видалити
              </Button>
            }
            onSuccess={handleRowDeleted}
          />
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Row Information */}

        {/* Pallets List */}
        <div className="lg:col-span-3">
          <PalletsList row={row} />
        </div>
      </div>
    </div>
  );
}
