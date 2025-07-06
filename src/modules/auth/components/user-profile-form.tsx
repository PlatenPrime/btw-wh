import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const UserProfileForm = () => {
  const { user, updateUser, isLoading, error } = useAuth();
  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    password: "",
    telegram: user?.telegram || "",
    photo: user?.photo || "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);
    if (!form.fullname) {
      setFormError("Fullname is required");
      return;
    }
    try {
      await updateUser({
        fullname: form.fullname,
        password: form.password || undefined,
        telegram: form.telegram || undefined,
        photo: form.photo || undefined,
      });
      setSuccess(true);
      setForm((f) => ({ ...f, password: "" }));
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="mx-auto mt-10 max-w-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <Separator />
        {formError && <Alert variant="destructive">{formError}</Alert>}
        {error && <Alert variant="destructive">{error}</Alert>}
        {success && <Alert variant="default">Profile updated!</Alert>}
        <Input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={form.password}
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
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Card>
  );
};
