import { ThemedText } from "@/components/themed/themed-text";
import { ThemedIcon } from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileSidebarCardProps {
  handleLogout: () => void;
  isLoading: boolean;
}

export function ProfileSidebarCard({
  handleLogout,
  isLoading,
}: ProfileSidebarCardProps) {
  const { user } = useAuth();
  const {  static: staticColors } = useThemeColors();

  if (isLoading || !user) {
    return null;
  }

  return (
    <View
      className="mt-auto border-t border-outline-100 p-4"
      style={{
        borderTopColor: staticColors.black[300],
      }}
    >
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
          className="w-full p-3 flex-row items-center justify-center mt-2"
          style={{
            backgroundColor: staticColors.destructive,
            borderWidth: 1,
            borderColor: staticColors.destructive,
            borderRadius: 8,
          }}
        >
          <ThemedIcon
            family="MaterialIcons"
            name="logout"
            size={20}
            color={staticColors.white}
          />
          <Text
            className="ml-2 font-semibold"
            style={{ color: staticColors.white }}
          >
            Вийти
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
