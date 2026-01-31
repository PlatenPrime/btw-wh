import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UsersContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="gap-0 p-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
            <div className="flex flex-1 flex-col gap-1">
              <div className="bg-muted h-5 w-32 animate-pulse rounded" />
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            </div>
            <div className="bg-muted h-8 w-8 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="grid gap-1 p-0 pt-2">
            <div className="bg-muted h-4 w-40 animate-pulse rounded" />
            <div className="bg-muted h-3 w-48 animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
