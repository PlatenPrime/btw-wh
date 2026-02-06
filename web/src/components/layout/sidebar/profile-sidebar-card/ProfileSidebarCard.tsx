import type { User } from "@/modules/auth/api/types";
import { Button } from "@/components/ui/button";

interface ProfileSidebarCardProps {
  user: User | null;
  isLoading: boolean;
  handleLogout: () => void;
}

export function ProfileSidebarCard({
  user,
  isLoading,
  handleLogout,
}: ProfileSidebarCardProps) {
  return (
    <div className="mt-auto border-t p-4">
      {isLoading ? null : (
        <div className="flex flex-col items-center gap-2">
          {user?.photo && (
            <img
              src={user.photo}
              alt="User"
              className="h-12 w-12 rounded-full"
            />
          )}
          <div className="text-sm font-semibold">{user?.fullname}</div>
          <div className="text-xs text-muted-foreground">@{user?.username}</div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleLogout}
            className="w-full"
          >
            Вийти
          </Button>
        </div>
      )}
    </div>
  );
}
