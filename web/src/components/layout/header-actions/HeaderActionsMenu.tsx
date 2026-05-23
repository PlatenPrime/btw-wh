import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import type { HeaderActionIconColor } from "./types";
import { useHeaderActions } from "./useHeaderActions";

interface HeaderActionsMenuProps {
  trigger?: React.ReactNode;
}

const iconColorClasses: Record<HeaderActionIconColor, string> = {
  default: "text-foreground",
  primary: "text-primary",
  muted: "text-muted-foreground",
  success: "text-success",
  edit: "text-edit",
  info: "text-info",
  warning: "text-warning",
  destructive: "text-destructive",
  green: "text-success",
  emerald: "text-success",
  blue: "text-info",
  sky: "text-info",
  red: "text-destructive",
  rose: "text-destructive",
  violet: "text-primary",
  purple: "text-primary",
  orange: "text-warning",
  amber: "text-warning",
};

export function HeaderActionsMenu({ trigger }: HeaderActionsMenuProps) {
  const { actions } = useHeaderActions();
  const [open, setOpen] = useState(false);

  // Если нет действий, не рендерим меню
  if (actions.length === 0) {
    return null;
  }

  // Группируем действия по variant
  const defaultActions = actions.filter(
    (action) =>
      action.variant !== "destructive" &&
      action.variant !== "super-destructive",
  );
  const destructiveActions = actions.filter(
    (action) => action.variant === "destructive",
  );
  const superDestructiveActions = actions.filter(
    (action) => action.variant === "super-destructive",
  );

  const hasMultipleGroups =
    (defaultActions.length > 0 && destructiveActions.length > 0) ||
    (defaultActions.length > 0 && superDestructiveActions.length > 0) ||
    (destructiveActions.length > 0 && superDestructiveActions.length > 0);

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
          <Button variant="info-soft" size="icon" className="shrink-0">
            <MenuIcon />
            <span className="sr-only">Відкрити меню дій</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {defaultActions.map((action) => {
          const Icon = action.icon;
          const iconColorClass =
            iconColorClasses[action.iconColor || "default"];
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="default"
              className="cursor-pointer"
            >
              {Icon && <Icon className={cn(iconColorClass)} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}

        {hasMultipleGroups && <DropdownMenuSeparator />}

        {destructiveActions.map((action) => {
          const Icon = action.icon;
          const iconColorClass =
            iconColorClasses[action.iconColor || "default"];
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="destructive"
              className="cursor-pointer"
            >
              {Icon && <Icon className={cn(iconColorClass)} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}

        {(destructiveActions.length > 0 || defaultActions.length > 0) &&
          superDestructiveActions.length > 0 && <DropdownMenuSeparator />}

        {superDestructiveActions.map((action) => {
          const Icon = action.icon;
          const iconColorClass =
            iconColorClasses[action.iconColor || "default"];
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="super-destructive"
              className="cursor-pointer"
            >
              {Icon && <Icon className={cn(iconColorClass)} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
