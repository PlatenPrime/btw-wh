import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateDelFormValues } from "@/modules/dels/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreateDelFormViewProps {
  form: UseFormReturn<CreateDelFormValues>;
  onSubmit: (data: CreateDelFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
}

export function CreateDelFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  fileRef,
  onFileChange,
  fileName,
}: CreateDelFormViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Назва поставки</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Поставка 01.2025"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="excel-file">Excel-файл (колонка arts)</Label>
        <Input
          id="excel-file"
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls"
          disabled={isLoading}
          onChange={onFileChange}
          className="cursor-pointer"
        />
        {fileName && (
          <p className="text-muted-foreground text-sm">{fileName}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Створити"
      />
    </form>
  );
}
