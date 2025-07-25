import { ImageBlurContainer } from "@/components/image/image-blur-container";
import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtCardContainer } from "@/modules/arts/components/containers/art-detail";
import { useParams } from "react-router";

export function Art() {
  const { artikul } = useParams<{ artikul: string }>();

  return (
    <SidebarInsetLayout headerText={`Артикул: ${artikul || "невідомий"}`}>
      <ImageBlurContainer artikul={artikul || ""} isMoreOverlay={true}>
        <div className="flex min-h-screen w-full flex-col gap-2 p-2">
          <ArtCardContainer />

          <section className="rounded-md border p-4 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Наявність на складах</h2>
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
