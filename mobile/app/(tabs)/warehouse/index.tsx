import { PageLayout } from "@/components/layout/page-layout";
import { ThemedText } from "@/components/themed/themed-text";
import { Pressable, ScrollView, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
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
