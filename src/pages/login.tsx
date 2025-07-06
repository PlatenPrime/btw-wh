import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "../modules/auth/components/login-form";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return null;
  return <LoginForm />;
}
