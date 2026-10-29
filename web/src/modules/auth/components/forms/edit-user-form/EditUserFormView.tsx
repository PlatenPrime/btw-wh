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
import type { EditUserFormValues } from "@/modules/auth/components/forms/schema";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface EditUserFormViewProps {
  form: UseFormReturn<EditUserFormValues>;
  onSubmit: (data: EditUserFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const ROLE_OPTIONS = [
  RoleType.USER,
  RoleType.EDITOR,
  RoleType.ADMIN,
  RoleType.PRIME,
];

export function EditUserFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: EditUserFormViewProps) {
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
        <Label htmlFor="edit-username">Логін</Label>
        <Input
          id="edit-username"
          type="text"
          placeholder="Логін"
          disabled={isLoading}
          {...register("username")}
        />
        {errors.username && (
          <p className={typography.formError}>{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="edit-password">Пароль</Label>
        <div className="relative">
          <Input
            id="edit-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Залишити порожнім, щоб не змінювати"
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
        <Label htmlFor="edit-fullname">Повне ім'я</Label>
        <Input
          id="edit-fullname"
          type="text"
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
          onValueChange={(v) => setValue("role", v as EditUserFormValues["role"])}
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
        <Label htmlFor="edit-telegram">Telegram</Label>
        <Input
          id="edit-telegram"
          type="text"
          placeholder="Telegram"
          disabled={isLoading}
          {...register("telegram")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="edit-photo">URL фото</Label>
        <Input
          id="edit-photo"
          type="url"
          placeholder="URL фото"
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
        isSubmitting={isLoading}
        submitText="Зберегти"
      />
    </form>
  );
}
