"use client";
import { Menu } from "lucide-react";

export default function Header({
  user,
  toggleSidebar,
  openMobileSidebar,
}: {
  user: { name?: string; email?: string };
  toggleSidebar: () => void;
  openMobileSidebar: () => void;
}) {
  const handleToggle = () => {
    if (window.innerWidth < 768) openMobileSidebar();
    else toggleSidebar();
  };

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="p-2 rounded hover:bg-gray-200 transition"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Hola, {user.name || "Usuario"}
          </h1>
          {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
        </div>
      </div>
    </header>
  );
}
