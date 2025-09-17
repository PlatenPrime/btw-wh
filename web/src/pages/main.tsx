import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          Btrade Warehouse App
        </h1>
      </main>
    </SidebarInsetLayout>
  );
}
