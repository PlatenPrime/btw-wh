import { View } from 'react-native';
import { ThemedText } from '@/components/themed/themed-text';
import { PageLayout } from '@/components/layout/page-layout';

export default function ArtsUtilsScreen() {
  return (
    <PageLayout title="Arts Utils">
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="title">Arts Utils</ThemedText>
      </View>
    </PageLayout>
  );
}