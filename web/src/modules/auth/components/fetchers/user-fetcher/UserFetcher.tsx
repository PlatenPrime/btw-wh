import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useUserByIdQuery } from "@/modules/auth/api/hooks/queries/useUserByIdQuery";
import type { User } from "@/modules/auth/api/types";

interface UserFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ user: User }>;
  SkeletonComponent: React.ComponentType;
}

export function UserFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: UserFetcherProps) {
  const userQuery = useUserByIdQuery({ id, enabled: !!id });

  if (userQuery.isLoading) {
    return (
      <SidebarInsetLayout headerText="Користувач">
        <main className="p-4">
          <SkeletonComponent />
        </main>
      </SidebarInsetLayout>
    );
  }

  if (userQuery.error) {
    return (
      <SidebarInsetLayout headerText="Користувач">
        <main className="p-4">
          <ErrorDisplay
            error={userQuery.error}
            title="Помилка завантаження користувача"
            description="Не вдалося завантажити дані користувача"
          />
        </main>
      </SidebarInsetLayout>
    );
  }

  const user = userQuery.data?.user;
  if (!user) {
    return (
      <SidebarInsetLayout headerText="Користувач не знайдений">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            Користувача не знайдено
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText={user.fullname}>
      <main className="p-4">
        <ContainerComponent user={user} />
      </main>
    </SidebarInsetLayout>
  );
}
