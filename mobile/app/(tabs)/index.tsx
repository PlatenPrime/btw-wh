import { PageLayout } from "@/components/layout/page-layout";
import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { View } from "react-native";

export default function HomeTab() {
  return (
    <PageLayout title="Головна">
      <View className="flex-1 justify-center items-center p-4">
        <View className="mb-6 rounded-lg p-2  ">
          <Image
            source={require("@/assets/images/logo-btw.jpg")}
            style={{ width: 220, height: 220, borderRadius: 10 }}
            contentFit="contain"
          />
        </View>
        <ThemedText type="title" className="text-center mb-4">
          BTrade Warehouse App
        </ThemedText>
      </View>
    </PageLayout>
  );
}
