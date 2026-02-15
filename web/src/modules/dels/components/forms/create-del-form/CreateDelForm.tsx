import { useCreateDelMutation } from "@/modules/dels/api/hooks/mutations/useCreateDelMutation";
import {
  createDelDefaultValues,
  createDelSchema,
  type CreateDelFormValues,
} from "@/modules/dels/components/forms/schema";
import { isExcelFile } from "@/modules/dels/utils/parse-excel-arts";
import { parseExcelArts } from "@/modules/dels/utils/parse-excel-arts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateDelFormView } from "./CreateDelFormView";

interface CreateDelFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateDelForm({ onSuccess, onCancel }: CreateDelFormProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CreateDelFormValues>({
    resolver: zodResolver(createDelSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: createDelDefaultValues,
  });

  const mutation = useCreateDelMutation();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.clearErrors("root");
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName(null);
    }
  };

  const onSubmit = async (data: CreateDelFormValues) => {
    if (!selectedFile) {
      form.setError("root", {
        message: "Оберіть Excel-файл з колонкою arts",
      });
      return;
    }
    if (!isExcelFile(selectedFile)) {
      form.setError("root", {
        message: "Допустимий формат файлу: .xlsx або .xls",
      });
      return;
    }

    try {
      const artikuls = await parseExcelArts(selectedFile);
      await mutation.mutateAsync({ title: data.title, artikuls });
      onSuccess?.();
      form.reset(createDelDefaultValues);
      setSelectedFile(null);
      setFileName(null);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка створення поставки";
      form.setError("root", { message });
    }
  };

  return (
    <CreateDelFormView
      form={form}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={mutation.isPending}
      fileRef={fileRef}
      onFileChange={onFileChange}
      fileName={fileName}
    />
  );
}
