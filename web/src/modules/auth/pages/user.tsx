import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  UserDetailsContainer,
  UserDetailsContainerSkeleton,
} from "@/modules/auth/components/containers/user-details-container";
import { UserFetcher } from "@/modules/auth/components/fetchers/user-fetcher";
import { useParams } from "react-router";

export function UserPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Користувач не знайдений">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            Ідентифікатор користувача не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <UserFetcher
      id={id}
      ContainerComponent={({ user }) => <UserDetailsContainer user={user} />}
      SkeletonComponent={UserDetailsContainerSkeleton}
    />
  );
}
