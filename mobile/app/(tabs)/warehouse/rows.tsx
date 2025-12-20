import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function RowsScreen() {
  return (
    <PageLayout title="Ряди">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Ряди</ThemedText>
      </View>
    </PageLayout>
  );
}