import { DialogActions } from "@/components/shared/dialogs";
import { FormErrorDisplay } from "@/components/shared/errors";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typography } from "@/lib/typography";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import type { ChangePalletGroupFormValues } from "@/modules/pallets/components/forms/change-pallet-group-form/schema";
import type { UseFormReturn } from "react-hook-form";

interface ChangePalletGroupFormViewProps {
  form: UseFormReturn<ChangePalletGroupFormValues>;
  groups: PalletGroupDto[];
  isLoadingGroups: boolean;
  isGroupsError: boolean;
  isSubmitting: boolean;
  onSubmit: (data: ChangePalletGroupFormValues) => void;
  onCancel: () => void;
}

export function ChangePalletGroupFormView({
  form,
  groups,
  isLoadingGroups,
  isGroupsError,
  isSubmitting,
  onSubmit,
  onCancel,
}: ChangePalletGroupFormViewProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const groupId = watch("groupId");
  const selectDisabled = isSubmitting || isLoadingGroups || isGroupsError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="pallet-group-select">Палетна група</Label>
        <Select
          value={groupId || undefined}
          onValueChange={(value) =>
            setValue("groupId", value, { shouldValidate: true })
          }
          disabled={selectDisabled}
        >
          <SelectTrigger
            id="pallet-group-select"
            className={errors.groupId ? "border-destructive" : ""}
          >
            <SelectValue
              placeholder={
                isLoadingGroups
                  ? "Завантаження..."
                  : isGroupsError
                    ? "Не вдалося завантажити групи"
                    : "Оберіть групу"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isGroupsError ? (
          <p className={typography.formError}>
            Список груп недоступний. Спробуйте пізніше.
          </p>
        ) : null}
        {errors.groupId ? (
          <p className={typography.formError}>{errors.groupId.message}</p>
        ) : null}
      </div>

      {errors.root ? (
        <FormErrorDisplay error={errors.root.message} variant="compact" />
      ) : null}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        cancelText="Скасувати"
        submitText="Зберегти"
        isSubmitting={isSubmitting}
        className="w-full"
      />
    </form>
  );
}
