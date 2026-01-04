import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import {
  ThemedBox,
  ThemedHStack,
  ThemedIcon,
  ThemedPressable,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderActionsMenu } from "./HeaderActionsMenu";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const insets = useSafeAreaInsets();
  const iconColor = useIconColor();

  const headerHeight = 56 + insets.top;

  return (
    <ThemedBox
      className="absolute top-0 left-0 right-0 z-[1000] bg-background-0 border-b border-outline-100 shadow-sm"
      style={{
        paddingTop: insets.top,
        height: headerHeight,
      }}
    >
      <ThemedHStack className="items-center justify-between  p-2">
        {/* Левая секция - триггер сайдбара */}
        <ThemedPressable onPress={toggleSidebar} className="p-2 min-w-[40px]">
          <ThemedIcon
            family="MaterialIcons"
            name="menu"
            size={24}
            color={iconColor}
          />
        </ThemedPressable>

        {/* Центральная секция - заголовок */}
        <ThemedBox className="flex-1 items-center justify-center px-2">
          <ThemedText type="defaultSemiBold" className="text-xl text-center ">
            {title}
          </ThemedText>
        </ThemedBox>

        {/* Правая секция - меню действий */}
        <ThemedBox className="min-w-[40px] items-end">
          <HeaderActionsMenu />
        </ThemedBox>
      </ThemedHStack>
    </ThemedBox>
  );
}
