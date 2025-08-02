"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProtectedNav() {
  return (
    <SessionProvider>
      <NavContent />
    </SessionProvider>
  );
}

function NavContent() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/protected">
        <span className="font-bold text-lg cursor-pointer">Taskify</span>
      </Link>
      <div className="flex items-center gap-4">
        {session?.user?.name && <span>Hola, {session.user.name}</span>}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
