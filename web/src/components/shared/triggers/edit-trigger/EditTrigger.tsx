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
      className="hover:bg-edit/10 hover:text-edit h-8 w-8 p-0"
      onClick={onClick}
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
}
