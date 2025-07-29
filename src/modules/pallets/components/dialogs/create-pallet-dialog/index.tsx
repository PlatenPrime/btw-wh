import { useCreatePalletMutation } from "@/modules/pallets/api/hooks";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { CreatePalletDialogView } from "./view";

export function CreatePalletDialog({ row }: { row: RowDto }) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("");
  const createPalletMutation = useCreatePalletMutation(row._id, row.title);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim()) {
      setFormError("Назва палети обов'язкова");
      return;
    }
    createPalletMutation.mutate(
      {
        title: title.trim(),
        rowData: { _id: row._id, title: row.title },
        sector: sector.trim() || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setTitle("");
          setSector("");
        },
        onError: (err: unknown) => {
          let message = "Помилка створення палети";
          if (
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof (err as { response?: unknown }).response === "object" &&
            (err as { response?: unknown }).response !== null
          ) {
            const response = (err as { response?: unknown }).response as Record<
              string,
              unknown
            >;
            if (
              "data" in response &&
              typeof response.data === "object" &&
              response.data !== null &&
              "message" in (response.data as Record<string, unknown>)
            ) {
              message = String(
                (response.data as Record<string, unknown>).message,
              );
            }
          }
          setFormError(message);
        },
      },
    );
  };

  return (
    <CreatePalletDialogView
      open={open}
      setOpen={setOpen}
      handleSubmit={handleSubmit}
      title={title}
      setTitle={setTitle}
      sector={sector}
      setSector={setSector}
      formError={formError}
      createPalletMutation={createPalletMutation}
    />
  );
}
