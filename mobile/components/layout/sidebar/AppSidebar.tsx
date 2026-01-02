import { ModeToggle } from "@/components/shared/mode-toggle";
import { Icon } from "@/components/ui/icon";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileSidebarCard } from "./components/profile-sidebar-card/ProfileSidebarCard";
import { useSidebar } from "./SidebarProvider";

export function AppSidebar() {
  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebar();
  const insets = useSafeAreaInsets();
  const { logout, isLoading } = useAuth();
  const { background, text } = useThemeColors();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.replace("/login");
  };

  if (!isOpen) {
    return null;
  }

  const bgColor = background.primary;
  const textColor = text.primary;

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
        <View className="flex-row items-center justify-end p-4 border-b border-black/10">
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="p-2 rounded-full active:bg-black/10 dark:active:bg-white/10"
            activeOpacity={0.7}
          >
            <Icon
              family="MaterialIcons"
              name="close"
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-end">
          <View className="px-4 py-4">
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
