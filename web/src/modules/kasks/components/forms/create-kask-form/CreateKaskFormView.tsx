import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtImage } from "@/modules/arts/components/elements/art-image/ArtImage";
import { ArtProdPreview } from "@/modules/arts/components/elements/art-prod-preview";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Новий запит до каси</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-[minmax(8rem,10rem)_1fr] md:items-start">
            {/* Ліва колонка — карточка артикула + зона під нею */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex min-h-[11rem] w-full flex-col items-center justify-center gap-2 rounded-lg border bg-muted/30 p-3">
                {isArtLoading && artikul.length === 9 && (
                  <>
                    <Skeleton className="h-24 w-24 max-w-[6rem] shrink-0 rounded-md" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </>
                )}
                {!isArtLoading && artData && artikul.length === 9 && (
                  <>
                    <div className="w-full max-w-[6rem] overflow-hidden rounded-md">
                      <ArtImage artikul={artikul} />
                    </div>
                    <span className="font-mono text-sm font-medium">
                      {artikul}
                    </span>
                    {artData.nameukr && (
                      <span className="text-center text-sm font-medium leading-tight">
                        {artData.nameukr}
                      </span>
                    )}
                    <div className="flex w-full justify-center">
                      <ArtProdPreview
                        art={artData}
                        className="max-w-full justify-center text-center text-xs"
                      />
                    </div>
                  </>
                )}
                {!isArtLoading && (!artData || artikul.length !== 9) && (
                  <div className="text-muted-foreground flex min-h-[6rem] w-full max-w-[6rem] items-center justify-center rounded-md border border-dashed text-center text-xs">
                    {artikul.length > 0 && artikul.length !== 9
                      ? "9 символів"
                      : "Введіть артикул"}
                  </div>
                )}
              </div>

              {/* Зона під карточкою — фіксована висота, скелетон / текст / пусто */}
              <div className="flex min-h-[2.25rem] items-center justify-center">
                {isArtLoading && artikul.length === 9 && (
                  <Skeleton className="h-8 w-32" />
                )}
                {!isArtLoading && artData && zoneValue && (
                  <p className="text-center text-2xl font-bold leading-tight">
                    {zoneValue}
                  </p>
                )}
              </div>

              {artikul.length === 9 && (
                <div className="w-full">
                  <BtradeArtDataFetcher
                    artikul={artikul}
                    ContainerComponent={BtradeArtDataContainer}
                    SkeletonComponent={BtradeArtDataSkeleton}
                  />
                </div>
              )}
            </div>

            {/* Права колонка — артикул, кількість, коментар (без nameukr і без зони) */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="kask-artikul">Артикул *</Label>
                <Input
                  id="kask-artikul"
                  {...register("artikul")}
                  onChange={(e) => onArtikulChange(e.target.value)}
                  placeholder="ХХХХ-ХХХХ"
                  maxLength={9}
                  className={errors.artikul ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.artikul && (
                  <p className="text-destructive text-xs">
                    {errors.artikul.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kask-quant">Кількість</Label>
                <Input
                  id="kask-quant"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Необов'язково"
                  {...register("quant")}
                  className={errors.quant ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.quant && (
                  <p className="text-destructive text-xs">
                    {errors.quant.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kask-com">Коментар</Label>
                <Input
                  id="kask-com"
                  placeholder="Необов'язково"
                  {...register("com")}
                  className={errors.com ? "border-destructive" : ""}
                  disabled={isSubmitting}
                />
                {errors.com && (
                  <p className="text-destructive text-xs">
                    {errors.com.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || !canSubmit}
            >
              {isSubmitting ? "Відправка…" : "Створити запит"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
