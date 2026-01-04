import { View } from 'react-native';
import { ThemedText } from '@/components/themed/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function PalletsScreen() {
  return (
    <PageLayout title="Паллети">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Паллети</ThemedText>
      </View>
    </PageLayout>
  );
}