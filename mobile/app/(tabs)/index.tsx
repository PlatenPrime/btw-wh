import { PageLayout } from "@/components/layout/page-layout";
import { HomeLogo } from "@/components/shared/home-logo";
import { QuickAccessPanel } from "@/components/shared/quick-access-panel";
import { ScrollView } from "react-native";

export default function HomeTab() {
  return (
    <PageLayout title="Головна">
      <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
        <HomeLogo />
        <QuickAccessPanel />
      </ScrollView>
    </PageLayout>
  );
}
