import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrushCleaning, Menu, Move, Trash2 } from "lucide-react";

interface PalletActionsMenuProps {
  onRename?: () => void;
  onClear?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

export function PalletActionsMenu({
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
          aria-label="Дії з паллетою"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onClear}>
          <BrushCleaning className="mr-2 h-4 w-4" />
          Очистити
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onMove}>
          <Move className="mr-2 h-4 w-4" />
          Переставити
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Видалити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
