import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { useUpdateAnalogMutation } from "@/modules/analogs/api/hooks/mutations/useUpdateAnalogMutation";
import {
  updateAnalogFormSchema,
  type UpdateAnalogFormData,
} from "@/modules/analogs/components/forms/update-analog-form/schema";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateAnalogFormView } from "./UpdateAnalogFormView";

interface UpdateAnalogFormProps {
  analog: AnalogDto;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UpdateAnalogForm({
  analog,
  onSuccess,
  onCancel,
}: UpdateAnalogFormProps) {
  const form = useForm<UpdateAnalogFormData>({
    resolver: zodResolver(updateAnalogFormSchema),
    defaultValues: {
      konkName: analog.konkName,
      prodName: analog.prodName,
      url: analog.url,
      artikul: analog.artikul ?? "",
      title: analog.title ?? "",
      imageUrl: analog.imageUrl ?? "",
    },
    mode: "onChange",
  });

  const { watch, setValue, reset } = form;
  const artikul = watch("artikul")?.trim() ?? "";

  const updateMutation = useUpdateAnalogMutation();
  const prodsQuery = useProdsQuery();
  const konksQuery = useKonksQuery();
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data;
  const [currentArtData, setCurrentArtData] = useState(artData);

  useEffect(() => {
    reset({
      konkName: analog.konkName,
      prodName: analog.prodName,
      url: analog.url,
      artikul: analog.artikul ?? "",
      title: analog.title ?? "",
      imageUrl: analog.imageUrl ?? "",
    });
  }, [analog, reset]);

  useEffect(() => {
    if (artikul.length === 9 && artData) {
      setCurrentArtData(artData);
    } else if (artikul.length !== 9) {
      setCurrentArtData(undefined);
    }
  }, [artikul.length, artData]);

  const onSubmit = async (data: UpdateAnalogFormData) => {
    const payload: Record<string, string | undefined> = {};
    if (data.konkName !== analog.konkName) payload.konkName = data.konkName;
    if (data.prodName !== analog.prodName) payload.prodName = data.prodName;
    if (data.url !== analog.url) payload.url = data.url;
    if (data.artikul !== analog.artikul) payload.artikul = data.artikul?.trim();
    if (data.title !== analog.title) payload.title = data.title?.trim();
    if (data.imageUrl !== analog.imageUrl)
      payload.imageUrl = data.imageUrl?.trim();
    if (Object.keys(payload).length === 0) {
      onSuccess?.();
      return;
    }
    try {
      await updateMutation.mutateAsync({ id: analog._id, data: payload });
      onSuccess?.();
    } catch {
      // toast in mutation
    }
  };

  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  const prods = prodsQuery.data?.data ?? [];
  const konks = konksQuery.data?.data ?? [];

  return (
    <UpdateAnalogFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      isSubmitting={form.formState.isSubmitting || updateMutation.isPending}
      isArtLoading={artQuery.isPending}
      artData={currentArtData ?? undefined}
      prods={prods}
      konks={konks}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}
