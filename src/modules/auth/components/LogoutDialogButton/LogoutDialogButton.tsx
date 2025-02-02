import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useNavigate } from "react-router";

export function LogoutDialogButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Вийти</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вихід</DialogTitle>
          <DialogDescription>Ви впевнені, що хочете вийти?</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="destructive" onClick={handleLogout}>
            Вийти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
