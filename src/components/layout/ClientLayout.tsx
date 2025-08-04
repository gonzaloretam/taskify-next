"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Función para convertir el segmento a título
function formatPath(path: string): string {
  const segments = path.split("/").filter(Boolean); // elimina vacío inicial
  const last = segments[segments.length - 1] || "dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1);
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage = formatPath(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-background">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/protected/dashboard">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Contenido scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
