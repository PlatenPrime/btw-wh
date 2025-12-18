import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSidebar } from "./SidebarProvider";
import { appSidebarData, getIcon } from "./data/app-sidebar-data";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();
  const colorScheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  const handleNavigation = (url: string) => {
    setIsOpen(false);
    router.push(url as any);
  };

  if (!isOpen) {
    return null;
  }

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/");
  };

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
          <TouchableOpacity onPress={() => handleNavigation("/")}>
            <ThemedText type="title" className="text-2xl font-bold">
              BTW
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            className="p-2 rounded-full active:bg-black/10 dark:active:bg-white/10"
            activeOpacity={0.7}
          >
            <MaterialIcons name="close" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 pt-2">
          {appSidebarData.navMain.map((group) => (
            <View key={group.title} className="mb-6 px-4">
              <ThemedText
                type="defaultSemiBold"
                className="text-xs uppercase mb-2 opacity-70"
              >
                {group.title}
              </ThemedText>
              {group.items.map((item) => {
                const active = isActive(item.url);
                const iconColor = active
                  ? colorScheme === "light"
                    ? Colors.light.tint
                    : Colors.dark.tint
                  : textColor;
                return (
                  <TouchableOpacity
                    key={item.title}
                    onPress={() => handleNavigation(item.url)}
                    className={`flex-row items-center py-3 px-4 rounded-lg mb-1 ${
                      active
                        ? colorScheme === "light"
                          ? "bg-sky-500/10"
                          : "bg-sky-400/20"
                        : ""
                    }`}
                  >
                    <View className="mr-3">
                      {getIcon(item.iconName, 20, iconColor)}
                    </View>
                    <ThemedText
                      type="default"
                      style={
                        active
                          ? {
                              color:
                                colorScheme === "light"
                                  ? Colors.light.tint
                                  : Colors.dark.tint,
                            }
                          : undefined
                      }
                    >
                      {item.title}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
