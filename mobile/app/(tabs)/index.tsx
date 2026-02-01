import { PageLayout } from "@/components/layout/page-layout";
import { HomeLogo } from "@/components/shared/home-logo";
import { QuickAccessPanel } from "@/components/shared/quick-access-panel";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ScrollView } from "react-native";

export default function HomeTab() {
  return (
    <PageLayout title="Головна" useHeroGradient>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 gap-6"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.springify().damping(20).stiffness(300)}>
          <HomeLogo />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.springify().damping(20).stiffness(300).delay(80)}
        >
          <QuickAccessPanel />
        </Animated.View>
      </ScrollView>
    </PageLayout>
  );
}
