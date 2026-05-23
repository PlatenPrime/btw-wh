import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";

interface ClearTriggerProps {
  onClick?: () => void;
}

export function ClearTrigger({ onClick }: ClearTriggerProps) {
  return (
    <Button variant="warning" size="icon-sm" onClick={onClick}>
      <BrushCleaning className="h-4 w-4" />
      <span className="sr-only">Очистити</span>
    </Button>
  );
}
