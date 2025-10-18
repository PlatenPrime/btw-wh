import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import type { RowDto } from "@/modules/rows/api/types";

interface RowActionsMenuProps {
  row: RowDto;
}

export function RowActionsMenu({ row }: RowActionsMenuProps) {
  const navigate = useNavigate();

  const handleRowDeleted = () => {
    navigate("/wh/rows");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Дії з паллетою"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem variant="destructive">
          <DeleteRowDialog row={row} onSuccess={handleRowDeleted} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
