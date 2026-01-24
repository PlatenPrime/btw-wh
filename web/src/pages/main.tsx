import { MainHero } from "@/components/shared/main-hero/MainHero";
import { MainQuickLinks } from "@/components/shared/main-quick-links/MainQuickLinks";
import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="flex flex-col gap-8 p-4 md:p-6 lg:p-8">
        <div className="animate-in fade-in-0 duration-500">
          <MainHero />
        </div>
        <div className="animate-in fade-in-0 duration-500 [animation-delay:120ms]">
          <MainQuickLinks />
        </div>
      </main>
    </SidebarInsetLayout>
  );
}
