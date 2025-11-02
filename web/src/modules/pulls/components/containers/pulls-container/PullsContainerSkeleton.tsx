import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/shared/containers/Container";

export function PullsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Container className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
      </Container>
      <Container>
        <div className="grid gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </Container>
    </div>
  );
}

