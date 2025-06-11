import { SidebarInsetLayout } from "@/components/sidebar-inset-layout";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="">
        <h1 className="md:text-3xl text-3xl lg:text-6xl font-bold text-center ">Btrade Warehouse App</h1>
      </main>
    </SidebarInsetLayout>
  );
}
