import { PageLayout } from "@/components/layout/page-layout";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function HomeTab() {
  return (
    <PageLayout title="Головна">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title" className="text-center mb-4">
          BTrade Warehouse App
        </ThemedText>
      </View>
    </PageLayout>
  );
}
