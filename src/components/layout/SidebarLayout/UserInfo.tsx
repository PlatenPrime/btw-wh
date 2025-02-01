import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/modules/auth/stores/authStore";

export default function UserInfo() {
  const { user } = useAuthStore();

  return <div
  className="flex gap-2 items-center text-sm font-medium leading-none text-muted-foreground"
  >
     <Avatar>
      <AvatarImage src={user?.photo} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    {user?.fullname} 
    </div>;
}
