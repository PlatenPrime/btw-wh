import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

// Zod schema for user profile form
const userProfileSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().optional(),
  telegram: z.string().optional(),
  photo: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export const UserProfileForm = () => {
  const { user, updateUser, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullname: user?.fullname || "",
      password: "",
      telegram: user?.telegram || "",
      photo: user?.photo || "",
    },
  });

  const onSubmit = async (data: UserProfileFormValues) => {
    try {
      await updateUser({
        fullname: data.fullname,
        password: data.password || undefined,
        telegram: data.telegram || undefined,
        photo: data.photo || undefined,
      });
      // Clear password field after successful update
      setValue("password", "");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "An unexpected error occurred." });
      }
    }
  };

  return (
    <Card className="mx-auto mt-10 max-w-sm p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <Separator />
        {errors.root && (
          <Alert variant="destructive">{errors.root.message}</Alert>
        )}
        {error && <Alert variant="destructive">{error}</Alert>}

        <Input
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          aria-invalid={!!errors.fullname}
          aria-describedby="fullname-error"
          {...register("fullname")}
          disabled={isLoading}
        />
        {errors.fullname && (
          <span id="fullname-error" className="block text-sm text-red-600">
            {errors.fullname.message}
          </span>
        )}

        <Input
          type="password"
          placeholder="New Password (optional)"
          autoComplete="new-password"
          {...register("password")}
          disabled={isLoading}
        />

        <Input
          type="text"
          placeholder="Telegram (optional)"
          {...register("telegram")}
          disabled={isLoading}
        />

        <Input
          type="url"
          placeholder="Photo URL (optional)"
          aria-invalid={!!errors.photo}
          aria-describedby="photo-error"
          {...register("photo")}
          disabled={isLoading}
        />
        {errors.photo && (
          <span id="photo-error" className="block text-sm text-red-600">
            {errors.photo.message}
          </span>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Card>
  );
};
