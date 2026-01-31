import type { AdminUpdateUserData, User } from "@/modules/auth/api/types";
import { useUpdateUserMutation } from "@/modules/auth/api/hooks/mutations/useUpdateUserMutation";
import {
  editUserDefaultValues,
  editUserSchema,
  type EditUserFormValues,
} from "@/modules/auth/components/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditUserFormView } from "./EditUserFormView";

interface EditUserFormProps {
  user: User;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function toAdminUpdateData(data: EditUserFormValues): AdminUpdateUserData {
  const out: AdminUpdateUserData = {};
  if (data.username && data.username.trim()) out.username = data.username.trim();
  if (data.password && data.password.trim()) out.password = data.password.trim();
  if (data.fullname && data.fullname.trim()) out.fullname = data.fullname.trim();
  if (data.role) out.role = data.role as AdminUpdateUserData["role"];
  if (data.telegram !== undefined) out.telegram = data.telegram?.trim() || undefined;
  if (data.photo !== undefined) out.photo = data.photo?.trim() || undefined;
  return out;
}

export function EditUserForm({ user, onSuccess, onCancel }: EditUserFormProps) {
  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: editUserDefaultValues,
  });

  const mutation = useUpdateUserMutation();

  useEffect(() => {
    form.reset({
      username: user.username,
      password: "",
      fullname: user.fullname,
      role: user.role ?? "",
      telegram: user.telegram ?? "",
      photo: user.photo ?? "",
    });
  }, [user, form]);

  const onSubmit = async (data: EditUserFormValues) => {
    try {
      const payload = toAdminUpdateData(data);
      await mutation.mutateAsync({ userId: user._id, data: payload });
      onSuccess?.();
    } catch (error) {
      form.setError(
        "root",
        { message: error instanceof Error ? error.message : "Помилка оновлення" },
      );
    }
  };

  return (
    <EditUserFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
    />
  );
}
