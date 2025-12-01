import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function CreatePalletDialogTrigger() {
  return (
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Додати палету
      </Button>
    </DialogTrigger>
  );
}

