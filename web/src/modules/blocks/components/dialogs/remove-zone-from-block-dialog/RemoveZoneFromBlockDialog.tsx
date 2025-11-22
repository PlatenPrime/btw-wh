import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import type { BlockDto, ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { useZonesByBlockIdQuery } from "@/modules/zones/api/hooks/queries/useZonesByBlockIdQuery";
import { useQueryClient } from "@tanstack/react-query";

interface RemoveZoneFromBlockDialogProps {
  zone: ZoneWithBlockDto;
  block: BlockDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RemoveZoneFromBlockDialog({
  zone,
  block,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: RemoveZoneFromBlockDialogProps) {
  const mutation = useUpdateBlockMutation();
  const queryClient = useQueryClient();
  const { data: zonesData } = useZonesByBlockIdQuery({
    blockId: block._id,
    enabled: controlledOpen ?? false,
  });

  const handleRemove = async () => {
    try {
      // Получаем текущие зоны блока
      const currentZones = (zonesData?.data ?? []) as ZoneWithBlockDto[];
      
      // Исключаем удаляемую зону из списка
      const updatedZones = currentZones
        .filter((z) => z._id !== zone._id)
        .map((z, index) => ({
          zoneId: z._id,
          order: index + 1, // 1-based порядок
        }));

      await mutation.mutateAsync({
        id: block._id,
        data: {
          zones: updatedZones,
        },
      });

      // Инвалидируем кеш зон и блока
      queryClient.invalidateQueries({ queryKey: ["zones", "by-block", block._id] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      queryClient.invalidateQueries({ queryKey: ["zones-infinite"] });
      queryClient.invalidateQueries({ queryKey: ["blocks", block._id] });
      queryClient.invalidateQueries({ queryKey: ["blocks"] });

      onOpenChange?.(false);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення зони з блоку:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Видалити зону з блоку</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-muted-foreground text-sm">
            Ви впевнені, що хочете видалити зону <strong>{zone.title}</strong> з блоку{" "}
            <strong>{block.title}</strong>? Зона буде відв'язана від блоку, але не буде
            видалена.
          </p>
          <DialogActions
            onCancel={handleCancel}
            onSubmit={handleRemove}
            isSubmitting={mutation.isPending}
            submitText="Видалити"
            variant="destructive"
            className="justify-end"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

