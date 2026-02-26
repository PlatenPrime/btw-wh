import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateAnalogMutation } from "@/modules/analogs/api/hooks/mutations/useCreateAnalogMutation";
import {
  createAnalogFormDefaultValues,
  createAnalogFormSchema,
  type CreateAnalogFormData,
} from "@/modules/analogs/components/forms/create-analog-form/schema";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { CreateAnalogFormView } from "./CreateAnalogFormView";

interface CreateAnalogFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateAnalogForm({ onSuccess, onCancel }: CreateAnalogFormProps) {
  const form = useForm<CreateAnalogFormData>({
    resolver: zodResolver(createAnalogFormSchema) as Resolver<CreateAnalogFormData>,
    defaultValues: createAnalogFormDefaultValues,
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const artikul = watch("artikul")?.trim() ?? "";

  const createMutation = useCreateAnalogMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data;
  const [currentArtData, setCurrentArtData] = useState(artData);

  useEffect(() => {
    if (artikul.length === 9 && artData) {
      setCurrentArtData(artData);
    } else if (artikul.length !== 9) {
      setCurrentArtData(undefined);
    }
  }, [artikul.length, artData]);

  const onSubmit = async (data: CreateAnalogFormData) => {
    try {
      await createMutation.mutateAsync({
        konkName: data.konkName,
        prodName: data.prodName,
        url: data.url,
        artikul: data.artikul?.trim() || undefined,
        title: data.title?.trim() || undefined,
        imageUrl: data.imageUrl?.trim() || undefined,
      });
      form.reset(createAnalogFormDefaultValues);
      onSuccess?.();
    } catch {
      // toast handled in mutation
    }
  };

  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  return (
    <CreateAnalogFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      isSubmitting={form.formState.isSubmitting || createMutation.isPending}
      isArtLoading={artQuery.isPending}
      artData={currentArtData ?? undefined}
      prods={prods}
      konks={konks}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
