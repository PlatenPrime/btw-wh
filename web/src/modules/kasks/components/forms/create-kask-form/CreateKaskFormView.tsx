import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { CreateKaskArtColumn } from "@/modules/kasks/components/forms/create-kask-form/create-kask-art-column/CreateKaskArtColumn";
import { CreateKaskFormFields } from "@/modules/kasks/components/forms/create-kask-form/create-kask-form-fields/CreateKaskFormFields";
import type { CreateKaskFormData } from "@/modules/kasks/components/forms/create-kask-form/schema";
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
    <Card className="overflow-hidden shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] md:items-start md:gap-10">
            <CreateKaskArtColumn
              artikul={artikul}
              isArtLoading={isArtLoading}
              artData={artData}
              zoneValue={zoneValue}
            />
            <div className="md:border-border grid min-w-0 gap-6 md:border-l md:pl-10">
              <CreateKaskFormFields
                register={register}
                errors={errors}
                onArtikulChange={onArtikulChange}
                isSubmitting={isSubmitting}
              />
              <div className="border-border flex max-w-md justify-end border-t pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  size="lg"
                >
                  {isSubmitting ? "Відправка…" : "Створити запит"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
