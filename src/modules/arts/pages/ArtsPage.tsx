import { Page } from "@/components/layout/PageLayout/Page";
import { ArtsDashboard } from "@/modules/arts/components/panel";
import { Outlet } from "react-router";

export const ArtsPage = () => {
  return (
    <Page title="Артикули">
      <div className="grid lg:grid-cols-2">
        <ArtsDashboard />
        <div className="hidden lg:block" >
          <Outlet />
        </div>
      </div>
    </Page>
  );
};
