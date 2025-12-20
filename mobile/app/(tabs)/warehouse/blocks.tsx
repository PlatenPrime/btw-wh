import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function BlocksScreen() {
  return (
    <PageLayout title="Блоки">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Блоки</ThemedText>
      </View>
    </PageLayout>
  );
}