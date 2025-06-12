import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtCardContainer } from "@/modules/arts/components/art-card";
import { useParams } from "react-router";

export function Art() {
  const { artikul } = useParams<{ artikul: string }>();

  return (
    <SidebarInsetLayout headerText={`Артикул: ${artikul || "невідомий"}`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ArtCardContainer />
        <section className="p-4 border border-blue-500 ">
          <h2 className="text-xl font-semibold mb-2">Наявність на складах</h2>
          <p>Погреби</p>
          <p>Погреби</p>
          <p>Погреби</p>
          <p>Погреби</p>
          <p>Погреби</p>
          <p>Погреби</p>
          <p>Мережі</p>
        </section>
      </div>
    </SidebarInsetLayout>
  );
}
