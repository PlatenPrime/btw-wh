import { AppSidebar } from "@/components/layout/sidebar/AppSideBar";
import { Outlet } from "react-router";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  );
}

export default App;
