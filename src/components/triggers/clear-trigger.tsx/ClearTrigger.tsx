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
      className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
      onClick={onClick}
    >
      <BrushCleaning className="h-4 w-4" />
    </Button>
  );
}
