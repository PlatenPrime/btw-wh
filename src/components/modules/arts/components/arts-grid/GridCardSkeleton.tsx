import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GridCardSkeleton() {
  return (
    <div className="block h-full w-full">
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="text-center">
        <CardTitle>
          <Skeleton className="h-6 w-24 mx-auto" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Skeleton className="aspect-square w-full max-w-[10rem] rounded-md" />
      </CardContent>

      <CardDescription className="p-2 text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
      </CardDescription>
    </Card>
    </div>
  );
}
