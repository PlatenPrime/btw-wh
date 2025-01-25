import { NavLayout } from "@/components/shared/NavLayout";
import { ArtsPage } from "@/modules/arts/pages/ArtsPage";
import { UploadArtsPage } from "@/modules/arts/pages/UploadArtsPage";
import { AsksPage } from "@/modules/asks/pages/AsksPage";
import { AuthLayout } from "@/modules/auth/components/AuthLayout/AuthLayout";
import { LoginPage } from "@/modules/auth/pages/LoginPage";
import { DefsPage } from "@/modules/defs/pages/DefsPage";
import { HomePage } from "@/modules/home/pages/HomePage";
import { PosesPage } from "@/modules/poses/pages/PosesPage";
import { RacksPage } from "@/modules/racks/pages/RacksPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/">
            <Route element={<NavLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/arts" element={<ArtsPage />}>
                <Route path="upload" element={<UploadArtsPage />} />
              </Route>

              <Route path="/asks" element={<AsksPage />} />
              <Route path="/defs" element={<DefsPage />} />
              <Route path="/poses" element={<PosesPage />} />
              <Route path="/racks" element={<RacksPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
