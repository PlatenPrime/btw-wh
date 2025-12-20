import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { HeaderActionsMenu } from "./HeaderActionsMenu";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const colorScheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  const bgColor =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor =
    colorScheme === "light" ? "#e5e7eb" : "#374151";

  const headerHeight = 56 + insets.top;

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: bgColor,
          borderBottomColor: borderColor,
          paddingTop: insets.top,
          height: headerHeight,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Левая секция - триггер сайдбара */}
        <TouchableOpacity
          onPress={toggleSidebar}
          style={styles.iconButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="menu" size={24} color={textColor} />
        </TouchableOpacity>

        {/* Центральная секция - заголовок */}
        <View style={styles.titleContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
        </View>

        {/* Правая секция - меню действий */}
        <View style={styles.actionsContainer}>
          <HeaderActionsMenu />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 8,
  },
  iconButton: {
    padding: 8,
    minWidth: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  actionsContainer: {
    minWidth: 40,
    alignItems: "flex-end",
  },
});
