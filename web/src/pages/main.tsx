import { motion } from "@/lib/motion";
import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { Page } from "@/components/shared/layout";
import { MainHero } from "@/components/shared/home/main-hero/MainHero";
import { MainQuickLinks } from "@/components/shared/home/main-quick-links/MainQuickLinks";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <Page className="gap-8">
        <div className={motion.revealBlock}>
          <MainHero />
        </div>
        <div className={`${motion.revealBlock} [animation-delay:120ms]`}>
          <MainQuickLinks />
        </div>
      </Page>
    </SidebarInsetLayout>
  );
}
