import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { getRoleLabel } from "@shared/constants";
import { useNavigate } from "react-router";

export function Forbidden() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl">🚫</span>
          </div>
          <CardTitle className="text-2xl font-bold">Недостатньо прав</CardTitle>
          <CardDescription className="text-base">
            У вас недостатньо прав для доступу до цієї сторінки.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <div className="bg-muted rounded-md p-3 text-sm">
              <p className="text-muted-foreground">Ваша роль:</p>
              <p className="font-semibold">{getRoleLabel(user.role)}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={handleGoBack} variant="outline" className="w-full">
              Повернутися назад
            </Button>
            <Button onClick={handleGoHome} className="w-full">
              На головну
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Якщо вважаєте, що це помилка, зверніться до адміністратора.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
