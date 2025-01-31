import NotFoundPage from "@/components/layout/NotFoundPage";
import { SidebarLayout } from "@/components/layout/SidebarLayout/SidebarLayout";
import { ArtByIdPage } from "@/modules/arts/pages/ArtByIdPage";
import { ArtsPage } from "@/modules/arts/pages/ArtsPage";
import { UploadArtsPage } from "@/modules/arts/pages/UploadArtsPage";
import { AsksPage } from "@/modules/asks/pages/AsksPage";
import { AuthLayout } from "@/modules/auth/components/AuthLayout/AuthLayout";
import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { DefsPage } from "@/modules/defs/pages/DefsPage";
import { HomePage } from "@/modules/home/pages/HomePage";
import { PosesPage } from "@/modules/poses/pages/PosesPage";
import { RacksPage } from "@/modules/racks/pages/RacksPage";
import { SettingsPage } from "@/modules/settings/pages/SettingsPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          {/* <Route path="/" element={<LoginPage />} /> */}

          <Route path="/login" element={<LoginPage />} />

          <Route element={<SidebarLayout />}>
            <Route index element={<HomePage />} />

            <Route path="arts">
              <Route index element={<ArtsPage />} />
              <Route path=":artId" element={<ArtByIdPage />} />
              <Route path="upload" element={<UploadArtsPage />} />
            </Route>

            <Route path="/asks" element={<AsksPage />} />
            <Route path="/defs" element={<DefsPage />} />
            <Route path="/poses" element={<PosesPage />} />
            <Route path="/racks" element={<RacksPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
