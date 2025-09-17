import { SidebarProvider } from "./components/ui/sidebar";

import { Outlet } from "react-router";
import { AppSidebar } from "./components/shared/sidebar/app-sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
}

export default App;
