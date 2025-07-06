import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const RegisterForm = () => {
  const { register, isLoading, error } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullname: "",
    role: "",
    telegram: "",
    photo: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.username || !form.password || !form.fullname) {
      setFormError("Username, password, and fullname are required");
      return;
    }
    try {
      await register(form);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("An unknown error occurred");
      }
    }
  };

  return (
    <Card className="mx-auto mt-10 max-w-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Register</h2>
        <Separator />
        {formError && <Alert variant="destructive">{formError}</Alert>}
        {error && <Alert variant="destructive">{error}</Alert>}
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <Input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="role"
          placeholder="Role (optional)"
          value={form.role}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="telegram"
          placeholder="Telegram (optional)"
          value={form.telegram}
          onChange={handleChange}
        />
        <Input
          type="url"
          name="photo"
          placeholder="Photo URL (optional)"
          value={form.photo}
          onChange={handleChange}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Card>
  );
};
