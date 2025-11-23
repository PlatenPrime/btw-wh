import { DeleteArtsWithoutLatestMarkerDialogView } from "./DeleteArtsWithoutLatestMarkerDialogView";

interface DeleteArtsWithoutLatestMarkerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteArtsWithoutLatestMarkerDialog({
  open,
  onOpenChange,
}: DeleteArtsWithoutLatestMarkerDialogProps) {
  return (
    <DeleteArtsWithoutLatestMarkerDialogView
      open={open}
      setOpen={onOpenChange}
    />
  );
}

