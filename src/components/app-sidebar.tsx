"use client";

import { LayoutDashboard, CheckSquare, GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "./team-switcher";

const navLinks = [
  {
    title: "Dashboard",
    url: "/protected/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tareas",
    url: "/protected/tareas",
    icon: CheckSquare,
  },
];

const teams = [
  {
    name: "Hey App.",
    logo: GalleryVerticalEnd,
    plan: "Gestión",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map(({ title, url, icon: Icon }) => (
              <SidebarMenuItem key={url}>
                <SidebarMenuButton
                  asChild
                  tooltip={title}
                  className={
                    pathname === url
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }
                >
                  <Link href={url}>
                    <Icon className="h-4 w-4" />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
