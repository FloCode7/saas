import {
  ClipboardList,
  Settings,
  Boxes,
  Cog,
  FlaskConical,
  Package,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Main items.
const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Suppliers",
    url: "/dashboard/suppliers",
    icon: ClipboardList,
  },
  {
    title: "Raw Materials",
    url: "/dashboard/raw-materials",
    icon: Boxes,
  },
  {
    title: "Formulas",
    url: "/dashboard/formulas",
    icon: FlaskConical,
  },
  {
    title: "Fabrications",
    url: "/dashboard/fabrications",
    icon: Cog,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
];

// Other items.
const otherItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Log Out",
    url: "/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger className="mt-6 mb-6 ml-3 w-8" />
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((mainItem) => (
                <SidebarMenuItem key={mainItem.title}>
                  <SidebarMenuButton asChild>
                    <a href={mainItem.url}>
                      <mainItem.icon />
                      <span>{mainItem.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>OTHERS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
