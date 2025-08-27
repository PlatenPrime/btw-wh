import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { LoginForm } from "@/modules/auth/components/forms/login-form/LoginForm";

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
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}
//
