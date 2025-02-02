import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useNavigate } from "react-router";

export default function UserInfo() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return <div
  className="flex gap-2 items-center text-sm font-medium leading-none text-muted-foreground hover:text-foreground cursor-pointer"
onClick={() => {navigate("/")}}
  >
     <Avatar>
      <AvatarImage src={user?.photo} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    {user?.fullname} 
    </div>;
}
