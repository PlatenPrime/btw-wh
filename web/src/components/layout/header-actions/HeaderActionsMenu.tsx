import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
import { useHeaderActions } from "./useHeaderActions";

interface HeaderActionsMenuProps {
  trigger?: React.ReactNode;
}

export function HeaderActionsMenu({ trigger }: HeaderActionsMenuProps) {
  const { actions } = useHeaderActions();
  const [open, setOpen] = useState(false);

  // Если нет действий, не рендерим меню
  if (actions.length === 0) {
    return null;
  }

  // Группируем действия по variant
  const defaultActions = actions.filter(
    (action) => action.variant !== "destructive",
  );
  const destructiveActions = actions.filter(
    (action) => action.variant === "destructive",
  );

  const hasMultipleGroups =
    defaultActions.length > 0 && destructiveActions.length > 0;

  // Обработчик клика на действие - закрываем dropdown и вызываем действие
  const handleActionClick = (onClick: () => void) => {
    // Сначала закрываем dropdown
    setOpen(false);

    // Даем время dropdown закрыться перед открытием диалога
    setTimeout(() => {
      onClick();
    }, 100);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="shrink-0">
            <MoreVerticalIcon />
            <span className="sr-only">Відкрити меню дій</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {defaultActions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="default"
            >
              {Icon && <Icon />}
              {action.label}
            </DropdownMenuItem>
          );
        })}

        {hasMultipleGroups && <DropdownMenuSeparator />}

        {destructiveActions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="destructive"
            >
              {Icon && <Icon />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
