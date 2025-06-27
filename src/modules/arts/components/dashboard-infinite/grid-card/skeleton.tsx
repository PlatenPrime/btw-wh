import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GridCardSkeleton() {
  return (
    <div className="block h-full w-full">
      <Card
        className="h-full p-0 bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
             shadow-none hover:shadow-2xl shadow-muted-foreground
             md:hover:scale-105 md:hover:-translate-y-1
             hover:z-10 
             ring-1 ring-gray-200 dark:ring-gray-700"
      >
        <div className="h-full rounded-xl flex md:flex-col md:pt-2 items-center md:justify-between">
          <div className="aspect-square w-full max-w-[6rem] rounded-lg  overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          <CardDescription className="p-2 md:text-center text-foreground w-full">
            <Skeleton className="h-4 w-32 mx-auto" />
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
