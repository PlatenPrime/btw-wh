import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { LoginForm } from "@/modules/auth/components/forms/login-form/LoginForm";

/**
 * LoginScreen component handles user login and redirects authenticated users to the home page.
 * Navigation is performed in a useEffect to avoid side effects in render.
 */
export default function LoginScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to tabs if already authenticated
  useEffect(() => {
    if (!isLoading && user && user._id) {
      router.replace("/(tabs)");
    }
  }, [user, isLoading, router]);

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-typography-500">Завантаження...</Text>
      </View>
    );
  }

  return <LoginForm />;
}
