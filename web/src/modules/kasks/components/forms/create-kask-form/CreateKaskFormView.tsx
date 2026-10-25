import { DetailPanelCard } from "@/components/shared/cards";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { CreateKaskArtColumn } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-column/CreateKaskArtColumn";
import { CreateKaskFormFields } from "@/modules/kasks/components/forms/create-kask-form/create-kask-form-fields/CreateKaskFormFields";
import type { CreateKaskFormData } from "@/modules/kasks/components/forms/create-kask-form/schema";
import { Sparkles } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface CreateKaskFormViewProps {
  form: UseFormReturn<CreateKaskFormData>;
  artikul: string;
  onArtikulChange: (value: string) => void;
  isSubmitting: boolean;
  isArtLoading: boolean;
  artData?: ArtDto;
  onSubmit: (data: CreateKaskFormData) => void;
}

export function CreateKaskFormView({
  form,
  artikul,
  onArtikulChange,
  isSubmitting,
  isArtLoading,
  artData,
  onSubmit,
}: CreateKaskFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const zoneValue = watch("zone");
  const canSubmit = Boolean(artData);

  return (
    <DetailPanelCard className="grid gap-0 overflow-hidden p-0">
      <div
        className="relative flex items-center gap-2 overflow-hidden border-b px-4 py-3 sm:px-5"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--chart-6) 28%, transparent) 0%, color-mix(in oklch, var(--primary) 20%, transparent) 55%, color-mix(in oklch, var(--chart-6) 12%, transparent) 100%)",
          borderColor:
            "color-mix(in oklch, var(--chart-6) 32%, var(--border))",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-6 size-28 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--chart-6) 45%, transparent) 0%, transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-8 size-20 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent) 0%, transparent 70%)",
          }}
        />
        <span
          className="relative flex size-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(145deg, color-mix(in oklch, var(--chart-6) 28%, transparent), color-mix(in oklch, var(--primary) 18%, transparent))",
            color: "var(--chart-6)",
          }}
        >
          <Sparkles className="size-4" aria-hidden />
        </span>
        <h2 className={cn("relative", typography.sectionTitle)}>Новий запит</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 p-4 sm:p-5"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--chart-6) 7%, transparent) 0%, color-mix(in oklch, var(--primary) 5%, transparent) 100%)",
        }}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:items-start">
          <CreateKaskArtColumn
            artikul={artikul}
            isArtLoading={isArtLoading}
            artData={artData}
            zoneValue={zoneValue}
          />
          <CreateKaskFormFields
            register={register}
            errors={errors}
            onArtikulChange={onArtikulChange}
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
          />
        </div>
      </form>
    </DetailPanelCard>
  );
}
