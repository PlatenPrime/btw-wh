import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function ArtsUpdateScreen() {
  return (
    <PageLayout title="Оновити артикули">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Оновити артикули</ThemedText>
      </View>
    </PageLayout>
  );
}