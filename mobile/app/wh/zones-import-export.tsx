import { useSidebar } from "@/components/layout/sidebar/SidebarProvider";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Icon } from "@/components/ui/icon";
import { TouchableOpacity, View } from "react-native";
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute";
import { RoleType } from "@/constants/roles";

function ZonesImportExportScreen() {
  const { toggleSidebar } = useSidebar();
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView className="flex-1">
      <TouchableOpacity
        onPress={toggleSidebar}
        className="absolute top-[50px] left-4 z-[1000] p-2"
      >
        <Icon
          family="MaterialIcons"
          name="menu"
          size={24}
          color={colorScheme === "light" ? Colors.light.text : Colors.dark.text}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Zones Import Export</ThemedText>
      </View>
    </ThemedView>
  );
}

export default function ZonesImportExportScreenProtected() {
  return (
    <ProtectedRoute allowedRoles={[RoleType.ADMIN]}>
      <ZonesImportExportScreen />
    </ProtectedRoute>
  );
}
