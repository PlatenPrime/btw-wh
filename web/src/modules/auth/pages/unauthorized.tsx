import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

export function Unauthorized() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl">🔒</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            Доступ заборонено
          </CardTitle>
          <CardDescription className="text-base">
            Для доступу до цієї сторінки необхідно авторизуватися в системі.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoToLogin} className="w-full">
            Увійти в систему
          </Button>
          <p className="text-muted-foreground text-sm">
            Якщо у вас немає облікового запису, зверніться до адміністратора.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
