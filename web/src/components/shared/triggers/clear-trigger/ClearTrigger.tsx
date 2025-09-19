import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";

interface ClearTriggerProps {
  onClick?: () => void;
}

export function ClearTrigger({ onClick }: ClearTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-rose-500/10 text-rose-500 hover:text-rose-400 h-8 w-8 p-0"
      onClick={onClick}
    >
      <BrushCleaning className="h-4 w-4" />
    </Button>
  );
}
