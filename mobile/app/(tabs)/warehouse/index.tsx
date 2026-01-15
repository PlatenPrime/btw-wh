import { PageLayout } from "@/components/layout/page-layout";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedPressable, ThemedScrollView, ThemedVStack, ThemedIcon } from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useRouter } from "expo-router";

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
    <PageLayout title="Склад">
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
