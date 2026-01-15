import { PageLayout } from "@/components/layout/page-layout";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedScrollView,
  ThemedVStack,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";

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
      <ThemedScrollView className="flex-1 px-4">
        <ThemedVStack className="gap-3 py-4">
          {navigationItems.map((item) => (
            <ThemedPressable
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              className="flex-row items-center p-4 rounded-lg border border-outline-50 bg-background-0"
            >
              <ThemedIcon
                family="MaterialIcons"
                name={item.icon as any}
                size={24}
                color={item.iconColor}
              />
              <ThemedText type="defaultSemiBold" className="ml-3 text-base">
                {item.title}
              </ThemedText>
            </ThemedPressable>
          ))}
        </ThemedVStack>
      </ThemedScrollView>
    </PageLayout>
  );
}
