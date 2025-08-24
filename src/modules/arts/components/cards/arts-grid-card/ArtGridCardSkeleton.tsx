import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtGridCardSkeleton() {
  return (
    <div className="block h-full w-full">
      <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700">
        <div className="flex h-full items-center rounded-xl md:flex-col md:justify-between md:pt-2">
          <div className="aspect-square w-full max-w-[6rem] overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>

          <CardDescription className="text-foreground w-full p-2 md:text-center">
            <Skeleton className="mx-auto h-4 w-32" />
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
