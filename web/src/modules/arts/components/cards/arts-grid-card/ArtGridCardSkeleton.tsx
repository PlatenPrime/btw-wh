import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtGridCardSkeleton() {
  return (
    <div className="block h-full w-full">
      <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 dark:ring-gray-700">
        <div className="h-full rounded-xl p-1">
          <div className="flex h-full items-center md:flex-col md:justify-between md:pt-2">
            <Skeleton className="aspect-square w-8 rounded-lg shadow-md md:w-full md:max-w-[6rem]" />
            <div className="p-2 md:text-center">
              <Skeleton className="h-4 w-16 md:w-20" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
