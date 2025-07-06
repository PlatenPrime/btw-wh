import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RegisterForm } from "../modules/auth/components/register-form";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return <RegisterForm />;
}
