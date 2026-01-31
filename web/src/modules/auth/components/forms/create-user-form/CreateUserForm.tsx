import type { RegisterData } from "@/modules/auth/api/types";
import { useCreateUserMutation } from "@/modules/auth/api/hooks/mutations/useCreateUserMutation";
import {
  createUserDefaultValues,
  createUserSchema,
  type CreateUserFormValues,
} from "@/modules/auth/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateUserFormView } from "./CreateUserFormView";

interface CreateUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateUserForm({ onSuccess, onCancel }: CreateUserFormProps) {
  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createUserDefaultValues,
  });

  const mutation = useCreateUserMutation();

  const onSubmit = async (data: CreateUserFormValues) => {
    try {
      const payload: RegisterData = {
        username: data.username,
        password: data.password,
        fullname: data.fullname,
        role: data.role === "" ? undefined : (data.role as RegisterData["role"]),
        telegram: data.telegram || undefined,
        photo: data.photo === "" ? undefined : data.photo,
      };
      await mutation.mutateAsync(payload);
      onSuccess?.();
    } catch (error) {
      form.setError(
        "root",
        { message: error instanceof Error ? error.message : "Помилка створення" },
      );
    }
  };

  return (
    <CreateUserFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
