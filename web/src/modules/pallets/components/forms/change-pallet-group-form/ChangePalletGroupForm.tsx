import { usePalletGroupsQuery } from "@/modules/pallet-groups/api/hooks/queries/usePalletGroupsQuery";
import { useSetPalletGroupMutation } from "@/modules/pallets/api/hooks/mutations/useSetPalletGroupMutation";
import { ChangePalletGroupFormView } from "@/modules/pallets/components/forms/change-pallet-group-form/ChangePalletGroupFormView";
import {
  changePalletGroupSchema,
  type ChangePalletGroupFormValues,
} from "@/modules/pallets/components/forms/change-pallet-group-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ChangePalletGroupFormProps {
  palletId: string;
  currentGroupId?: string;
  enabled?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChangePalletGroupForm({
  palletId,
  currentGroupId,
  enabled = true,
  onSuccess,
  onCancel,
}: ChangePalletGroupFormProps) {
  const form = useForm<ChangePalletGroupFormValues>({
    resolver: zodResolver(changePalletGroupSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      groupId: currentGroupId ?? "",
    },
  });

  const groupsQuery = usePalletGroupsQuery({ enabled });
  const setGroupMutation = useSetPalletGroupMutation();
  const isSubmitting = setGroupMutation.isPending;

  const onSubmit = async (data: ChangePalletGroupFormValues) => {
    if (data.groupId === currentGroupId) {
      onSuccess();
      return;
    }

    try {
      await setGroupMutation.mutateAsync({
        palletId,
        data: { groupId: data.groupId },
      });
      onSuccess();
    } catch (error) {
      console.error("Помилка зміни палетної групи:", error);
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Помилка зміни палетної групи",
      });
    }
  };

  return (
    <ChangePalletGroupFormView
      form={form}
      groups={groupsQuery.data?.data ?? []}
      isLoadingGroups={groupsQuery.isLoading}
      isGroupsError={groupsQuery.isError}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
