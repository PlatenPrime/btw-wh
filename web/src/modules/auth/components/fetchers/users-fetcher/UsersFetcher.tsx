import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useUsersQuery } from "@/modules/auth/api/hooks/queries/useUsersQuery";
import type { User } from "@/modules/auth/api/types";

interface UsersFetcherProps {
  ContainerComponent: React.ComponentType<{ data: User[] }>;
  SkeletonComponent: React.ComponentType;
}

export function UsersFetcher({
  ContainerComponent,
  SkeletonComponent,
}: UsersFetcherProps) {
  const usersQuery = useUsersQuery({});

  if (usersQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (usersQuery.error) {
    return (
      <ErrorDisplay
        error={usersQuery.error}
        title="Помилка завантаження списку користувачів"
        description="Не вдалося завантажити список користувачів"
      />
    );
  }

  if (!usersQuery.data || usersQuery.data.length === 0) {
    return <LoadingNoData description="Користувачів не знайдено" />;
  }

  return <ContainerComponent data={usersQuery.data} />;
}
