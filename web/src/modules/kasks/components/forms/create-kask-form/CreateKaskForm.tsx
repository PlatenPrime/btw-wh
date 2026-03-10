import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateKaskMutation } from "@/modules/kasks/api/hooks/mutations/useCreateKaskMutation";
import type { CreateKaskDto } from "@/modules/kasks/api/types/dto";
import {
  createKaskFormDefaultValues,
  createKaskFormSchema,
  type CreateKaskFormData,
} from "@/modules/kasks/components/forms/create-kask-form/schema";
import { CreateKaskFormView } from "@/modules/kasks/components/forms/create-kask-form/CreateKaskFormView";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

export function CreateKaskForm() {
  const form = useForm<CreateKaskFormData>({
    resolver: zodResolver(createKaskFormSchema) as Resolver<CreateKaskFormData>,
    defaultValues: createKaskFormDefaultValues,
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const artikul = watch("artikul")?.trim() ?? "";
  const shouldSearchArt = artikul.length === 9;
  const artQuery = useOneArtQuery(shouldSearchArt ? artikul : undefined);
  const artData = artQuery.data?.data;
  const [currentArtData, setCurrentArtData] = useState(artData);

  useEffect(() => {
    if (artikul.length === 9 && artData) {
      setCurrentArtData(artData);
      setValue("nameukr", artData.nameukr ?? "", { shouldValidate: true });
      setValue("zone", artData.zone ?? "", { shouldValidate: true });
    } else if (artikul.length !== 9) {
      setCurrentArtData(undefined);
      setValue("nameukr", "", { shouldValidate: true });
      setValue("zone", "", { shouldValidate: true });
    }
  }, [artikul.length, artData, setValue]);

  const createMutation = useCreateKaskMutation();

  const onSubmit = async (data: CreateKaskFormData) => {
    try {
      const payload: CreateKaskDto = {
        artikul: data.artikul.trim(),
        nameukr: data.nameukr.trim(),
        zone: data.zone.trim(),
      };
      if (data.quant != null && data.quant >= 1) {
        payload.quant = data.quant;
      }
      const comTrim = data.com?.trim();
      if (comTrim) {
        payload.com = comTrim;
      }
      await createMutation.mutateAsync(payload);
      form.reset(createKaskFormDefaultValues);
    } catch {
      // toast in mutation
    }
  };

  const handleArtikulChange = (value: string) => {
    setValue("artikul", value, { shouldValidate: true });
  };

  return (
    <CreateKaskFormView
      form={form}
      artikul={artikul}
      onArtikulChange={handleArtikulChange}
      isSubmitting={form.formState.isSubmitting || createMutation.isPending}
      isArtLoading={artQuery.isPending}
      artData={currentArtData ?? undefined}
      onSubmit={onSubmit}
    />
  );
}
