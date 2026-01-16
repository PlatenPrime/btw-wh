import { ThemedIcon } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { SemanticColors } from "@/constants/theme";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

interface ProfileSidebarCardProps {
  handleLogout: () => void;
  isLoading: boolean;
}

export function ProfileSidebarCard({
  handleLogout,
  isLoading,
}: ProfileSidebarCardProps) {
  const { user } = useAuth();

  if (isLoading || !user) {
    return null;
  }

  return (
    <View className="mt-auto border-t border-outline-50 p-4">
      <View className="flex-col items-center gap-2 ">
        {user.photo && (
          <Image
            source={{ uri: user.photo }}
            className="h-12 w-12 rounded-full"
            style={{ width: 96, height: 96, borderRadius: 48 }}
          />
        )}
        <ThemedText type="defaultSemiBold" className="text-lg">
          {user.fullname}
        </ThemedText>
        <ThemedText type="default" className="text-lg opacity-70">
          @{user.username}
        </ThemedText>
        <TouchableOpacity
          onPress={handleLogout}
          className="w-full p-3 flex-row items-center justify-center mt-2 bg-error-500 border border-error-500 rounded-lg"
        >
          <ThemedIcon
            family="MaterialIcons"
            name="logout"
            size={20}
            lightColor={SemanticColors.white}
            darkColor={SemanticColors.white}
          />
          <ThemedText
            className="ml-2 font-semibold"
            lightColor={SemanticColors.white}
            darkColor={SemanticColors.white}
          >
            Вийти
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
