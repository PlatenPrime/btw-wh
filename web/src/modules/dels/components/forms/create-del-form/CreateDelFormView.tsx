import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateDelFormValues } from "@/modules/dels/components/forms/schema";
import type { ProdDto } from "@/modules/prods/api/types";
import type { UseFormReturn } from "react-hook-form";

interface CreateDelFormViewProps {
  form: UseFormReturn<CreateDelFormValues>;
  onSubmit: (data: CreateDelFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null;
  prods: ProdDto[];
  isProdsLoading: boolean;
}

export function CreateDelFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  fileRef,
  onFileChange,
  fileName,
  prods,
  isProdsLoading,
}: CreateDelFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const prodName = watch("prodName");

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
        <Label htmlFor="prodName">Виробник</Label>
        <Select
          value={prodName || ""}
          onValueChange={(value) =>
            setValue("prodName", value, { shouldValidate: true })
          }
          disabled={isLoading || isProdsLoading}
        >
          <SelectTrigger
            id="prodName"
            className={errors.prodName ? "border-destructive" : ""}
          >
            <SelectValue
              placeholder={
                isProdsLoading
                  ? "Завантаження виробників..."
                  : "Оберіть виробника"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {prods.map((p) => (
              <SelectItem key={p._id} value={p.name}>
                {p.title || p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.prodName && (
          <p className="text-destructive text-sm">{errors.prodName.message}</p>
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
