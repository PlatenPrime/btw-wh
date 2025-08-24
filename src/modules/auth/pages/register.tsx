import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../api/hooks/useAuth";
import { RegisterForm } from "@/modules/auth/components/forms/register-form/RegisterForm";

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
