import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { UserCardSkeleton } from "@/modules/auth/components/cards/user-card";

export function UsersContainerSkeleton() {
  return (
    <Wrapper className="grid gap-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </Wrapper>
  );
}
