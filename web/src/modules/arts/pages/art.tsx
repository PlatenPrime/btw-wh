import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { useParams } from "react-router";
import { ArtFetcher } from "../components/fetchers/art-fetcher/ArtFetcher";

export function Art() {
  const { artikul } = useParams<{ artikul: string }>();

  return (
    <SidebarInsetLayout headerText={`Артикул: ${artikul || "невідомий"}`}>
      <div className="flex min-h-screen w-full flex-col gap-2 p-2">
        <ArtFetcher artikul={artikul || ""} />
      </div>
    </SidebarInsetLayout>
  );
}
