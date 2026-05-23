import { Button } from "@/components/ui/button";
import { CircleOff } from "lucide-react";

interface ClearZeroTriggerProps {
  onClick?: () => void;
}

export function ClearZeroTrigger({ onClick }: ClearZeroTriggerProps) {
  return (
    <Button variant="warning" size="icon-sm" onClick={onClick}>
      <CircleOff className="h-4 w-4" />
    </Button>
  );
}
