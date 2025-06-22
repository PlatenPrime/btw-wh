import { ImageBlurContainer } from "@/components/img-blur-container";
import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtCardContainer } from "@/modules/arts/components/art-card";
import { useParams } from "react-router";

export function Art() {
  const { artikul } = useParams<{ artikul: string }>();

  return (
    <SidebarInsetLayout headerText={`Артикул: ${artikul || "невідомий"}`}>
      <ImageBlurContainer
        artikul={artikul || ""}
        isMoreOverlay={true}
      >
        <div className="flex flex-col  min-h-screen w-full gap-2 p-2">
          <ArtCardContainer />
  
          <section className="p-4 border  rounded-md shadow-sm">
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
      </ImageBlurContainer>
    </SidebarInsetLayout>
  );
}
