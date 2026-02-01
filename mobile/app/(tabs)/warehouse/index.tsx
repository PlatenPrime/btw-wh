import { PageLayout } from "@/components/layout/page-layout";
import { GlassCard } from "@/components/shared/glass-card";
import { ThemedIcon, ThemedPressable, ThemedScrollView, ThemedText, ThemedVStack } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { FadeInDown } from "react-native-reanimated";

export default function WarehouseList() {
  const router = useRouter();

  const navigationItems = [
    {
      title: "Ряди",
      icon: "view-list",
      iconColor: SemanticColors.iconColors.teal,
      route: "rows",
    },
    {
      title: "Зони",
      icon: "location-on",
      iconColor: SemanticColors.iconColors.orange,
      route: "zones",
    },
    {
      title: "Блоки",
      icon: "view-module",
      iconColor: SemanticColors.iconColors.yellow,
      route: "blocks",
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(`/(tabs)/warehouse/${route}` as any);
  };

  return (
    <PageLayout title="Склад" useHeroGradient>
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
