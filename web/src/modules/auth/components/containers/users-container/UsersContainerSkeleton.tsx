import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { UserCardSkeleton } from "@/modules/auth/components/cards/user-card";

export function UsersContainerSkeleton() {
  return (
    <SurfaceSection className="grid gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </SurfaceSection>
  );
}
