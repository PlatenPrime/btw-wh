import { NavLayout } from "@/components/shared/NavLayout";
import { ArtsPage } from "@/pages/arts/ArtsPage";
import { AsksPage } from "@/pages/asks/AsksPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DefsPage } from "@/pages/defs/DefsPage";
import { HomePage } from "@/pages/home/HomePage";
import { PosesPage } from "@/pages/poses/PosesPage";
import { RacksPage } from "@/pages/racks/RacksPage";
import { BrowserRouter, Route, Routes } from "react-router";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<NavLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/arts" element={<ArtsPage />} />
            <Route path="/asks" element={<AsksPage />} />
            <Route path="/defs" element={<DefsPage />} />
            <Route path="/poses" element={<PosesPage />} />
            <Route path="/racks" element={<RacksPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
