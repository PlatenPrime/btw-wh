import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";

interface MoveTriggerProps {
  onClick?: () => void;
}

export function MoveTrigger({ onClick }: MoveTriggerProps) {
  return (
    <Button variant="info-soft" size="icon-sm" onClick={onClick}>
      <Move className="h-4 w-4" />
      <span className="sr-only">Перемістити</span>
    </Button>
  );
}
