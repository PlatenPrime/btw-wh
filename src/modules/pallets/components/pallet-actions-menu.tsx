import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Menu, Move, Package, Trash2 } from "lucide-react";

interface PalletActionsMenuProps {
  onRename?: () => void;
  onClear?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

export function PalletActionsMenu({
  onRename,
  onClear,
  onMove,
  onDelete,
}: PalletActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Действия с паллетой"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onRename}>
          <Edit className="mr-2 h-4 w-4" />
          Переименовать
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClear}>
          <Package className="mr-2 h-4 w-4" />
          Очистить
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onMove}>
          <Move className="mr-2 h-4 w-4" />
          Переставить
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
