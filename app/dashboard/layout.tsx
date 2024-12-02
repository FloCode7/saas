import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { AppTopbar } from "../../components/layout/app-topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex justify-around">
        <AppSidebar />
      </div>
      <div className="h-full w-full">
        <AppTopbar />
        <main className="lg:px-10 pt-10">{children}</main>
      </div>
    </SidebarProvider>
  );
}
