import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export function SegmentInfoCardSkeleton() {
  return (
    <Card className="gap-2 p-2 transition-shadow hover:shadow-md">
      <CardContent className="grid gap-2 p-0">
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-8" />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button disabled>
          <Plus className="size-4" />
          Додати зони
        </Button>
      </CardFooter>
    </Card>
  );
}
