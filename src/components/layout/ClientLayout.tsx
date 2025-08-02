"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name?: string; email?: string };
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cierra overlay al cambiar ruta
  useEffect(() => {
    const handleRouteChange = () => setSidebarOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 text-gray-800">
      <Sidebar
        collapsed={collapsed}
        sidebarOpen={sidebarOpen}
        onCloseMobileSidebar={() => setSidebarOpen(false)}
      />

      <div className={`flex flex-col flex-1 transition-all duration-300`}>
        <Header
          user={user}
          toggleSidebar={() => setCollapsed((prev) => !prev)}
          openMobileSidebar={() => setSidebarOpen(true)}
        />

        {/* Área scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
