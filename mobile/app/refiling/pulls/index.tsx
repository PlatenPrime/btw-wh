import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSidebar } from '@/components/layout/sidebar/SidebarProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function PullsScreen() {
  const { toggleSidebar } = useSidebar();
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView className="flex-1">
      <TouchableOpacity
        onPress={toggleSidebar}
        className="absolute top-[50px] left-4 z-[1000] p-2">
        <MaterialIcons
          name="menu"
          size={24}
          color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Зняття</ThemedText>
      </View>
    </ThemedView>
  );
}
