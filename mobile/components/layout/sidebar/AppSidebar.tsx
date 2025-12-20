import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSidebar } from "./SidebarProvider";
import { ProfileSidebarCard } from "./ProfileSidebarCard";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { ModeToggle } from "@/components/shared/mode-toggle";

export function AppSidebar() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebar();
  const colorScheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();
  const { logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.replace("/login");
  };

  if (!isOpen) {
    return null;
  }

  const bgColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <>
      <Pressable
        className="absolute inset-0 bg-black/50 z-[998]"
        onPress={() => setIsOpen(false)}
      />
      <View
        className="absolute left-0 bottom-0 w-[280px] z-[999] shadow-lg"
        style={{
          backgroundColor: bgColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          top: 0,
        }}
      >
        <View className="flex-row items-center justify-between p-4 border-b border-black/10">
          <ThemedText type="title" className="text-2xl font-bold">
            BTW
          </ThemedText>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="p-2 rounded-full active:bg-black/10 dark:active:bg-white/10"
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-end">
          <View className="px-4 pb-4">
            <ModeToggle />
          </View>
          <ProfileSidebarCard
            handleLogout={handleLogout}
            isLoading={isLoading}
          />
        </View>
      </View>
    </>
  );
}
