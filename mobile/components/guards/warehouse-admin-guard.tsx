import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface WarehouseAdminGuardProps {
  children: React.ReactNode;
}

/**
 * Доступ до зон/блоків (API ≥ ADMIN). Інакше — /forbidden.
 */
export function WarehouseAdminGuard({ children }: WarehouseAdminGuardProps) {
  const { hasRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasRole(RoleType.ADMIN)) {
    return <Redirect href="/forbidden" />;
  }

  return <>{children}</>;
}
