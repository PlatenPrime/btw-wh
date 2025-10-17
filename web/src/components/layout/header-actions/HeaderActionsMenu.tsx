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
  slate: "text-slate-500",
  gray: "text-gray-500",
  zinc: "text-zinc-500",
  neutral: "text-neutral-500",
  stone: "text-stone-500",
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  lime: "text-lime-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  violet: "text-violet-500",
  purple: "text-purple-500",
  fuchsia: "text-fuchsia-500",
  pink: "text-pink-500",
  rose: "text-rose-500",
  default: "",
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
          <Button variant="ghost" size="icon" className="shrink-0">
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
