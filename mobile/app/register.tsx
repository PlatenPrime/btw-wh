import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { RegisterForm } from "@/modules/auth/components/forms/register-form/RegisterForm";

export default function RegisterScreen() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  return <RegisterForm />;
}
