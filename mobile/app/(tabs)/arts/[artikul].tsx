import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';
import { useLocalSearchParams } from 'expo-router';

export default function ArtScreen() {
  const { artikul } = useLocalSearchParams<{ artikul: string }>();

  return (
    <PageLayout title={`Артикул: ${artikul || "невідомий"}`}>
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Артикул: {artikul}</ThemedText>
      </View>
    </PageLayout>
  );
}