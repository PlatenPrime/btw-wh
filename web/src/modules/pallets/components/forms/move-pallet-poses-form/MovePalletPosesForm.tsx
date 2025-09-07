import { FormErrorDisplay } from "@/components/error-components/form-error-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IPallet } from "@/modules/pallets/api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEmptyPalletsQuery } from "@/modules/pallets/api/hooks/queries/useEmptyPalletsQuery";
import { MovePalletPosesFormView } from "./MovePalletPosesFormView";

const schema = z.object({
  toPalletId: z.string().min(1, "Оберіть паллету"),
});

export type MovePalletPosesFormData = z.infer<typeof schema>;

interface MovePalletPosesFormProps {
  fromPallet: IPallet;
  onSuccess: (toPalletId: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function MovePalletPosesForm({
  fromPallet,
  onSuccess,
  onCancel,
  isSubmitting = false,
}: MovePalletPosesFormProps) {
  const [search, setSearch] = useState("");

  const form = useForm<MovePalletPosesFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { toPalletId: "" },
  });

  const { data: pallets, isLoading, isError, error } = useEmptyPalletsQuery();

  const filteredPallets = useMemo(() => {
    if (!pallets) return [] as IPallet[];
    const normalized = search.trim().toLowerCase();
    return pallets
      .filter((p) => p._id !== fromPallet._id)
      .filter((p) =>
        normalized ? p.title.toLowerCase().includes(normalized) : true,
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [pallets, fromPallet._id, search]);

  const onSubmit = (data: MovePalletPosesFormData) => {
    const selected = pallets?.find((p) => p._id === data.toPalletId);
    if (!selected) {
      form.setError("toPalletId", { message: "Паллету не знайдено" });
      return;
    }
    const isEmpty = Array.isArray(selected.poses)
      ? selected.poses.length === 0
      : true;
    if (!isEmpty) {
      form.setError("toPalletId", {
        message: "Цільова паллета повинна бути порожньою",
      });
      return;
    }
    onSuccess(selected._id);
  };

  const rootError = isError
    ? error instanceof Error
      ? error.message
      : "Помилка завантаження паллет"
    : form.formState.errors.root?.message;

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormErrorDisplay error={rootError} />

      <div className="flex flex-col gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук паллети за назвою"
        />
      </div>

      <MovePalletPosesFormView
        form={form}
        pallets={filteredPallets}
        isLoading={isLoading}
      />

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Скасувати
        </Button>
        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}
          Підтвердити
        </Button>
      </div>
    </form>
  );
}
