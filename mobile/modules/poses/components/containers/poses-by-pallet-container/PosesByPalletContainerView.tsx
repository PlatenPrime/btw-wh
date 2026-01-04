import { View } from "react-native";
import type { IPos } from "@/modules/poses/api/types";
import { PosesList } from "@/modules/poses/components/lists/poses-list/PosesList";
import { ThemedText } from "@/components/themed/themed-text";

interface PosesByPalletContainerViewProps {
  poses: IPos[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PosesByPalletContainerView({
  poses,
  isLoading,
  refreshing,
  onRefresh,
}: PosesByPalletContainerViewProps) {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <PosesList
        poses={poses}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

