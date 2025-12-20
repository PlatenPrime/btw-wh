import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function AsksScreen() {
  return (
    <PageLayout title="Запити">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Запити</ThemedText>
      </View>
    </PageLayout>
  );
}