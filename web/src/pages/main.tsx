import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import ArtikulImageLink from "@/components/shared/artikul-image-link/ArtikulImageLink";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          Btrade Warehouse App
        </h1>
        <ArtikulImageLink
          artikul="1102-0008"
          nameukr="1102-0008 Кулька В105/009 Пастель лавандовий"
        />
      </main>
    </SidebarInsetLayout>
  );
}
