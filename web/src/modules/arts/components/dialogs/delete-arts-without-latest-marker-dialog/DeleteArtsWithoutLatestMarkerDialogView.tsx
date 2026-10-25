import { DialogActions } from "@/components/shared/dialogs";
import { typography } from "@/lib/typography";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteArtsWithoutLatestMarkerDialogViewProps {
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteArtsWithoutLatestMarkerDialogView({
  isDeleting,
  onDelete,
  onCancel,
}: DeleteArtsWithoutLatestMarkerDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити неактуальні артикули</DialogTitle>
        <DialogDescription>
          Видалити артикули, які не з останнього імпорту каталогу? Цю дію
          неможливо скасувати.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Залишаться лише артикули з останнього оновлення каталогу. Усі
          застарілі після попередніх імпортів будуть видалені.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити"
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}

