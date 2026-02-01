import { useCreatePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useCreatePalletGroupMutation";
import type { CreatePalletGroupFormValues } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/schema";
import { createPalletGroupSchema } from "@/modules/pallet-groups/components/forms/create-pallet-group-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreatePalletGroupFormView } from "./CreatePalletGroupFormView";

interface CreatePalletGroupFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreatePalletGroupForm({
  onSuccess,
  onCancel,
}: CreatePalletGroupFormProps) {
  const form = useForm<CreatePalletGroupFormValues>({
    resolver: zodResolver(createPalletGroupSchema),
    defaultValues: {
      title: "",
      order: 1,
    },
  });

  const createMutation = useCreatePalletGroupMutation();

  const onSubmit = async (values: CreatePalletGroupFormValues) => {
    await createMutation.mutateAsync({
      title: values.title,
      order: values.order,
    });
    onSuccess();
  };

  return (
    <CreatePalletGroupFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isSubmitting={createMutation.isPending}
    />
  );
}
