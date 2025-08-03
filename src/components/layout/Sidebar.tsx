"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/protected", icon: LayoutDashboard },
  { name: "Tareas", href: "/protected/tasks", icon: ListTodo },
  { name: "Perfil", href: "/protected/profile", icon: User },
];

export default function Sidebar({
  collapsed,
  sidebarOpen,
  onCloseMobileSidebar,
}: {
  collapsed: boolean;
  sidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay en móvil */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobileSidebar}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 px-2 py-6 transition-all duration-300
          ${collapsed ? "w-16" : "w-64"} 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
      >
        <div className="mb-8 text-center text-white font-bold">
          <span
            className={`text-3xl transition-all duration-300 ${
              collapsed ? "text-4xl" : "text-2xl"
            }`}
          >
            {collapsed ? "T" : "Taskify"}
          </span>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                pathname === href
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-gray-700 pt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition text-sm w-full
              ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={20} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
