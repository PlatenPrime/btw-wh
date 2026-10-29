import { DialogActions } from "@/components/shared/dialogs";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoleLabel, RoleType } from "@/constants/roles";
import { typography } from "@/lib/typography";
import type { CreateUserFormValues } from "@/modules/auth/components/forms/schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface CreateUserFormViewProps {
  form: UseFormReturn<CreateUserFormValues>;
  onSubmit: (data: CreateUserFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const ROLE_OPTIONS = [
  RoleType.USER,
  RoleType.EDITOR,
  RoleType.ADMIN,
  RoleType.PRIME,
];

export function CreateUserFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateUserFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const roleValue = watch("role");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {errors.root && (
        <Alert variant="destructive">{errors.root.message}</Alert>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="create-username">Логін</Label>
        <Input
          id="create-username"
          type="text"
          autoComplete="username"
          placeholder="Логін"
          disabled={isLoading}
          {...register("username")}
        />
        {errors.username && (
          <p className={typography.formError}>{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="create-password">Пароль</Label>
        <div className="relative">
          <Input
            id="create-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Пароль"
            disabled={isLoading}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className={typography.formError}>{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="create-fullname">Повне ім'я</Label>
        <Input
          id="create-fullname"
          type="text"
          autoComplete="name"
          placeholder="Повне ім'я"
          disabled={isLoading}
          {...register("fullname")}
        />
        {errors.fullname && (
          <p className={typography.formError}>{errors.fullname.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Роль</Label>
        <Select
          value={roleValue || ""}
          onValueChange={(v) =>
            setValue("role", v as CreateUserFormValues["role"])
          }
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Оберіть роль" />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {getRoleLabel(r)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="create-telegram">Telegram</Label>
        <Input
          id="create-telegram"
          type="text"
          placeholder="Telegram (необов'язково)"
          disabled={isLoading}
          {...register("telegram")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="create-photo">URL фото</Label>
        <Input
          id="create-photo"
          type="url"
          placeholder="URL фото (необов'язково)"
          disabled={isLoading}
          {...register("photo")}
        />
        {errors.photo && (
          <p className={typography.formError}>{errors.photo.message}</p>
        )}
      </div>

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        cancelText="Скасувати"
        submitText="Створити"
        isSubmitting={isLoading}
        variant="success"
      />
    </form>
  );
}
