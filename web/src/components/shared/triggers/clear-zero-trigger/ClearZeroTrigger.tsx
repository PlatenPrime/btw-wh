import { Button } from "@/components/ui/button";
import { CircleOff } from "lucide-react";

interface ClearZeroTriggerProps {
  onClick?: () => void;
}

export function ClearZeroTrigger({ onClick }: ClearZeroTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
      onClick={onClick}
    >
      <CircleOff className="h-4 w-4" />
    </Button>
  );
}
