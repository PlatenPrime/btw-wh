import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui";

export function ArtsExcelUploaderSkeleton() {
  return (
    <Wrapper className="grid w-full gap-6">
      {/* Скелетон для header */}
      <header className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-96" />
      </header>

      {/* Скелетон для InputUploader */}
      <Skeleton className="h-32 w-full" />

      {/* Скелетон для PreviewTable */}
      <Skeleton className="h-64 w-full" />

      {/* Скелетон для Button */}
      <Skeleton className="h-10 w-32" />
    </Wrapper>
  );
}
