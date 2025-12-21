import { ScrollView, VStack } from '@/components/ui';
import { Pressable } from '@/components/ui';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { PageLayout } from '@/components/layout/page-layout';
import { Icon } from '@/components/ui/icon';

export default function RefilingList() {
  const router = useRouter();

  const navigationItems = [
    {
      title: 'Запити',
      icon: 'help-outline',
      route: 'asks',
    },
    {
      title: 'Дефіцити',
      icon: 'warning',
      route: 'defs',
    },
    {
      title: 'Зняття',
      icon: 'inventory-2',
      route: 'pulls',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/refiling/${route}` as any);
  };

  return (
    <PageLayout title="Поповнення">
      <ScrollView className="flex-1 px-4">
        <VStack className="gap-3 py-4">
          {navigationItems.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              className="flex-row items-center p-4 rounded-lg border border-outline-200 bg-background-0"
            >
              <Icon
                family="MaterialIcons"
                name={item.icon as any}
                size={24}
                className="text-typography-900"
              />
              <ThemedText type="defaultSemiBold" className="ml-3 text-base">
                {item.title}
              </ThemedText>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </PageLayout>
  );
}