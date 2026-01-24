import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { LoginForm } from "@/modules/auth/components/forms/login-form/LoginForm";
import { Warehouse } from "lucide-react";

/**
 * LoginPage component handles user login and redirects authenticated users to the home page.
 * Navigation is performed in a useEffect to avoid side effects in render.
 */
export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (!isLoading && user && user._id) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Show nothing while loading auth state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-muted-foreground">Завантаження...</span>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Левая визуальная секция */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Aurora фон */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--chart-2) 100%)",
              backgroundSize: "400% 400%",
              animation: "aurora 60s linear infinite",
            }}
          />
          
          {/* Дополнительные градиентные слои для глубины */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tl from-chart-1/20 via-transparent to-chart-3/10" />

          {/* Декоративные формы */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-chart-2/20 blur-2xl" />

          {/* Контент */}
          <div className="relative z-10 flex h-full flex-col justify-center gap-6 p-12">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm">
                <Warehouse className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">BTrade</h1>
                <p className="text-lg text-muted-foreground">Warehouse App</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">
                Управління складом
                <br />
                на новому рівні
              </h2>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                Ефективна система для управління складськими операціями, інвентаризації та аналітики
              </p>
            </div>
          </div>
        </div>

        {/* Правая секция с формой */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {/* Мобильный заголовок */}
            <div className="mb-8 flex items-center gap-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Warehouse className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">BTrade</h1>
                <p className="text-sm text-muted-foreground">Warehouse App</p>
              </div>
            </div>

            {/* Стеклянная карточка с формой */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl dark:bg-card/60">
              {/* Декоративный градиент на карточке */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-accent/10 blur-xl" />
              
              <div className="relative z-10">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
