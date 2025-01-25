import { LoginForm } from "@/modules/auth/components/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-center text-3xl">Авторизація</h1>
      <LoginForm />
    </div>
  );
};
