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
      className="hover:bg-edit/10 hover:text-edit h-8 w-8 p-0"
      onClick={onClick}
    >
      <Move className="h-4 w-4" />
    </Button>
  );
}
