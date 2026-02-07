import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDetailsCardSkeleton() {
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary gap-0 p-0 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 p-6 pb-4">
        <Skeleton className="size-32 shrink-0 rounded-full ring-2 ring-primary/20" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-2 gap-4 p-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-wrap gap-x-6 gap-y-1 border-t-0 p-6 pt-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-36" />
      </CardFooter>
    </Card>
  );
}
