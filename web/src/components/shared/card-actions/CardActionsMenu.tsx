import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { useState } from "react";
import type { CardActionIconColor, CardActionsMenuProps } from "./types";

const iconColorClasses: Record<CardActionIconColor, string> = {
  emerald: "text-emerald-500",
  rose: "text-rose-500",
  red: "text-red-500",
  default: "",
};

const sizeClasses = {
  sm: {
    button: "h-6 w-6",
    icon: "h-3 w-3",
    content: "w-40",
  },
  md: {
    button: "h-8 w-8",
    icon: "h-4 w-4",
    content: "w-48",
  },
};

export function CardActionsMenu({
  actions,
  trigger,
  orientation = "vertical",
  size = "sm",
  align = "end",
}: CardActionsMenuProps) {
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

  const Icon = orientation === "horizontal" ? MoreHorizontal : MoreVertical;
  const sizeConfig = sizeClasses[size];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className={cn("hover:bg-muted shrink-0 p-0", sizeConfig.button)}
          >
            <Icon className={sizeConfig.icon} />
            <span className="sr-only">Відкрити меню дій</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={sizeConfig.content}>
        {defaultActions.map((action) => {
          const ActionIcon = action.icon;
          const iconColorClass =
            iconColorClasses[action.iconColor || "default"];
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="default"
              className="cursor-pointer"
            >
              {ActionIcon && <ActionIcon className={cn(iconColorClass)} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}

        {hasMultipleGroups && <DropdownMenuSeparator />}

        {destructiveActions.map((action) => {
          const ActionIcon = action.icon;
          const iconColorClass =
            iconColorClasses[action.iconColor || "default"];
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleActionClick(action.onClick)}
              variant="destructive"
              className="cursor-pointer"
            >
              {ActionIcon && <ActionIcon className={cn(iconColorClass)} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
