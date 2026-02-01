import { PageLayout } from "@/components/layout/page-layout";
import { GlassCard } from "@/components/shared/glass-card";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedScrollView,
  ThemedText,
  ThemedVStack,
} from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { FadeInDown } from "react-native-reanimated";

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
    <PageLayout title="Поповнення" useHeroGradient>
      <ThemedScrollView className="flex-1 px-4">
        <ThemedVStack className="gap-3 py-4 px-4">
          {navigationItems.map((item, index) => (
            <GlassCard
              key={item.route}
              entering={FadeInDown.springify().damping(20).stiffness(300).delay(index * 50)}
            >
              <ThemedPressable
                onPress={() => handleNavigation(item.route)}
                className="flex-row items-center p-5 rounded-xl"
              >
                <ThemedIcon
                  family="MaterialIcons"
                  name={item.icon as any}
                  size={24}
                  color={item.iconColor}
                />
                <ThemedText type="defaultSemiBold" className="ml-3 text-base flex-1">
                  {item.title}
                </ThemedText>
              </ThemedPressable>
            </GlassCard>
          ))}
        </ThemedVStack>
      </ThemedScrollView>
    </PageLayout>
  );
}
