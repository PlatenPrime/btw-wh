import { View } from 'react-native';
import { ThemedText } from '@/components/themed/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function StocksScreen() {
  return (
    <PageLayout title="Стоки">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Стоки</ThemedText>
      </View>
    </PageLayout>
  );
}