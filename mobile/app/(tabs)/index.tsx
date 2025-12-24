import { View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';
import { Spinner } from '@/components/ui/spinner';

export default function HomeTab() {
  return (
    <PageLayout title="Головна">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title" className="text-center mb-4">
          BTrade Warehouse App
        </ThemedText>
        <ThemedText type="subtitle" className="text-center">
          Головна
        </ThemedText>
        <Spinner size="large" color="grey" />
      </View>
    </PageLayout>
  );
}