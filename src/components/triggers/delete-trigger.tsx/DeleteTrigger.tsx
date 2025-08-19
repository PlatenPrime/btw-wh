import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteTriggerProps {
  onClick?: () => void;
}

export function DeleteTrigger({ onClick }: DeleteTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
      onClick={onClick}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
