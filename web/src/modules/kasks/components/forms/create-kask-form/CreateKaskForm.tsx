import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import { useCreateKaskMutation } from "@/modules/kasks/api/hooks/mutations/useCreateKaskMutation";
import type { CreateKaskDto } from "@/modules/kasks/api/types/dto";
import {
  createKaskFormDefaultValues,
  createKaskFormSchema,
  type CreateKaskFormData,
} from "@/modules/kasks/components/forms/create-kask-form/schema";
import { CreateKaskFormView } from "@/modules/kasks/components/forms/create-kask-form/CreateKaskFormView";
import { useKasksParams } from "@/modules/kasks/hooks/useKasksParams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

function parseQuantFromUrl(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) return undefined;
  return n;
}

export function CreateKaskForm() {
  const {
    artikul: urlArtikul,
    quant: urlQuant,
    com: urlCom,
    setDraft,
    clearDraft,
  } = useKasksParams();

  const defaultValues = useMemo<CreateKaskFormData>(
    () => ({
      ...createKaskFormDefaultValues,
      artikul: urlArtikul,
      quant: parseQuantFromUrl(urlQuant),
      com: urlCom,
    }),
    // Seed from URL once on mount; further sync is form → URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount seed
    [],
  );

  const form = useForm<CreateKaskFormData>({
    resolver: zodResolver(createKaskFormSchema) as Resolver<CreateKaskFormData>,
    defaultValues,
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const artikul = watch("artikul")?.trim() ?? "";
  const quant = watch("quant");
  const com = watch("com") ?? "";

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

  useEffect(() => {
    const nextQuant = quant != null ? String(quant) : "";
    if (artikul === urlArtikul && nextQuant === urlQuant) return;
    setDraft({ artikul, quant: nextQuant });
  }, [artikul, quant, urlArtikul, urlQuant, setDraft]);

  const comDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (com === urlCom) return;
    if (comDebounceRef.current) clearTimeout(comDebounceRef.current);
    comDebounceRef.current = setTimeout(() => {
      setDraft({ com });
    }, 300);
    return () => {
      if (comDebounceRef.current) clearTimeout(comDebounceRef.current);
    };
  }, [com, urlCom, setDraft]);

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
      clearDraft();
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
