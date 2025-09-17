import { SidebarInsetLayout } from '@/components/shared/layout/sidebar-inset-layout';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <SidebarInsetLayout headerText="Сторінка не знайдена">
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-2xl">404</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              Сторінка не знайдена
            </CardTitle>
            <CardDescription className="text-base">
              Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={handleGoHome} className="flex-1 sm:flex-none">
                На головну
              </Button>
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Назад
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              Якщо ви вважаєте, що це помилка, зверніться до адміністратора.
            </p>
          </CardContent>
        </Card>
      </main>
    </SidebarInsetLayout>
  );
}
