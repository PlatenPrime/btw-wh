import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";

export function Main() {
  return (
    <SidebarInsetLayout headerText="Головна">
      <main className="p-2 ">
        <h1 className="text-center text-3xl font-bold md:text-3xl lg:text-6xl">
          BTrade Warehouse App
        </h1>
      </main>
    </SidebarInsetLayout>
  );
}
