import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";

interface EditTriggerProps {
  onClick?: () => void;
}

export function MoveTrigger({ onClick }: EditTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-purple-500/10 text-purple-500 hover:text-purple-400 h-8 w-8 p-0"
      onClick={onClick}
    >
      <Move className="h-4 w-4" />
    </Button>
  );
}
