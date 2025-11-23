import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteArtsWithoutLatestMarkerMutation } from "@/modules/arts/api/hooks/mutations/useDeleteArtsWithoutLatestMarkerMutation";
import { toast } from "sonner";

interface DeleteArtsWithoutLatestMarkerDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DeleteArtsWithoutLatestMarkerDialogView({
  open,
  setOpen,
}: DeleteArtsWithoutLatestMarkerDialogViewProps) {
  const mutation = useDeleteArtsWithoutLatestMarkerMutation();

  const handleDelete = async () => {
    try {
      const result = await mutation.mutateAsync();
      setOpen(false);
      toast.success(
        `Успішно видалено ${result.deletedCount} артикулів. Останній маркер: ${
          result.latestMarker || "не знайдено"
        }`,
      );
    } catch (error) {
      console.error("Помилка видалення артикулів:", error);
      toast.error("Помилка видалення артикулів", {
        description:
          error instanceof Error ? error.message : "Невідома помилка",
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Видалити неактуальні артикули</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити всі артикули без останнього
            актуального маркера? Цю дію неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Будуть видалені всі артикули, у яких маркер відсутній або менший за
            максимальний знайдений маркер. Артикули з максимальним маркером
            залишаться в базі.
          </p>
          <DialogActions
            onCancel={handleCancel}
            onSubmit={handleDelete}
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

