import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteZoneMutation } from "@/modules/zones/api/hooks/mutations/useDeleteZoneMutation";
import type { ZoneDto } from "@/modules/zones/api/types";

interface DeleteZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteZoneDialog({ zone, open: controlledOpen, onOpenChange }: DeleteZoneDialogProps) {
  const mutation = useDeleteZoneMutation();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(zone._id);
      onOpenChange?.(false);
    } catch (error) {
      // Ошибка уже обработана в mutation
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Удалить зону</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Вы уверены, что хотите удалить зону <strong>{zone.title}</strong>?
            Это действие нельзя отменить.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={mutation.isPending}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={mutation.isPending}>
              {mutation.isPending ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


