import { useUpdatePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useUpdatePalletGroupMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { useState } from "react";
import { RenamePalletGroupFormView } from "./RenamePalletGroupFormView";

interface RenamePalletGroupFormProps {
  group: PalletGroupDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function RenamePalletGroupForm({
  group,
  onSuccess,
  onCancel,
}: RenamePalletGroupFormProps) {
  const [title, setTitle] = useState(group.title);
  const updateMutation = useUpdatePalletGroupMutation();

  const handleSubmit = async () => {
    if (!title.trim() || title === group.title) {
      onSuccess();
      return;
    }

    await updateMutation.mutateAsync({
      id: group.id,
      data: { title: title.trim() },
    });

    onSuccess();
  };

  const isSubmitDisabled = !title.trim() || title === group.title;

  return (
    <RenamePalletGroupFormView
      title={title}
      onTitleChange={setTitle}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isSubmitting={updateMutation.isPending}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
}
