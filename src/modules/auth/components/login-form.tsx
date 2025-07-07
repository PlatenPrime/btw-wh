import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!username || !password) {
      setFormError("Username and password are required");
      return;
    }
    try {
      await login(username, password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("An unknown error occurred");
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-center text-xl font-semibold">Авторизація</h2>
        <Separator />
        {formError && <Alert variant="destructive">{formError}</Alert>}
        {error && <Alert variant="destructive">{error}</Alert>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Виконую вхід..." : "Вхід"}
        </Button>
      </form>
    </Card>
  );
};
