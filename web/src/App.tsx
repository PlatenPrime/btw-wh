import { SidebarProvider } from "./components/ui/sidebar";

import { Outlet } from "react-router";
import { AppSidebar } from "@/components/layout/sidebar/AppSideBar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
}

export default App;
