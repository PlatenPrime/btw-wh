import { UserDetailsCardSkeleton } from "@/modules/auth/components/cards/user-details-card";

export function UserDetailsContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <UserDetailsCardSkeleton />
    </div>
  );
}
