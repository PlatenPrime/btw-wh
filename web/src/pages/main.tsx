import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { Page } from "@/components/shared/layout";
import { MainHero } from "@/components/shared/main-hero/MainHero";
import { MainQuickLinks } from "@/components/shared/main-quick-links/MainQuickLinks";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <Page className="gap-8">
        <div className="animate-in fade-in-0 duration-500">
          <MainHero />
        </div>
        <div className="animate-in fade-in-0 duration-500 [animation-delay:120ms]">
          <MainQuickLinks />
        </div>
      </Page>
    </SidebarInsetLayout>
  );
}
