import { Box, HStack, Pressable } from "@/components/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { HeaderActionsMenu } from "./HeaderActionsMenu";
import { useIconColor } from "@/hooks/use-icon-color";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const insets = useSafeAreaInsets();
  const iconColor = useIconColor();

  const headerHeight = 56 + insets.top;

  return (
    <Box
      className="absolute top-0 left-0 right-0 z-[1000] bg-background-0 border-b border-outline-100 shadow-sm"
      style={{
        paddingTop: insets.top,
        height: headerHeight,
      }}
    >
      <HStack className="items-center justify-between  p-2">
        {/* Левая секция - триггер сайдбара */}
        <Pressable
          onPress={toggleSidebar}
          className="p-2 min-w-[40px]"
        >
          <Icon family="MaterialIcons" name="menu" size={24} color={iconColor} />
        </Pressable>

        {/* Центральная секция - заголовок */}
        <Box className="flex-1 items-center justify-center px-2">
          <ThemedText type="defaultSemiBold" className="text-xl text-center ">
            {title}
          </ThemedText>
        </Box>

        {/* Правая секция - меню действий */}
        <Box className="min-w-[40px] items-end">
          <HeaderActionsMenu />
        </Box>
      </HStack>
    </Box>
  );
}
