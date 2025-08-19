import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface EditTriggerProps {
  onClick?: () => void;
}

export function EditTrigger({ onClick }: EditTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-yellow-500/20 hover:text-yellow-800 dark:hover:text-yellow-200"
      onClick={onClick}
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
}
