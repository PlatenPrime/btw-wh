import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateSegmentForm } from "@/modules/blocks/components/forms/create-segment-form";
import type { BlockDto } from "@/modules/blocks/api/types";

interface CreateSegmentDialogViewProps {
  block: BlockDto;
  enabled: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateSegmentDialogView({
  block,
  enabled,
  onSuccess,
  onCancel,
}: CreateSegmentDialogViewProps) {
  return (
    <DialogContent className="flex flex-col sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Створити сегмент для блоку {block.title}</DialogTitle>
      </DialogHeader>
      <CreateSegmentForm
        block={block}
        enabled={enabled}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}

