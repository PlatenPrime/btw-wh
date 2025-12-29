import { PageLayout } from "@/components/layout/page-layout";
import { ThemedText } from "@/components/themed-text";
import { Pressable, ScrollView, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { SemanticColors } from "@/constants/theme";
import { useRouter } from "expo-router";

export default function RefilingList() {
  const router = useRouter();

  const navigationItems = [
    {
      title: "Запити",
      icon: "help-outline",
      iconColor: SemanticColors.iconColors.purple,
      route: "asks",
    },
    {
      title: "Дефіцити",
      icon: "warning",
      iconColor: SemanticColors.iconColors.rose,
      route: "defs",
    },
    {
      title: "Зняття",
      icon: "arrow-downward",
      iconColor: SemanticColors.iconColors.green,
      route: "pulls",
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
              className="flex-row items-center p-4 rounded-lg border border-outline-100 bg-background-0"
            >
              <Icon
                family="MaterialIcons"
                name={item.icon as any}
                size={24}
                color={item.iconColor}
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
