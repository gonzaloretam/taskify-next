"use client";

import { useSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <SessionProvider>
      <LoginLayout />
    </SessionProvider>
  );
}

function LoginLayout() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/protected");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Cargando...</p>
      </main>
    );
  }

  return <main className="min-h-screen flex flex-col md:flex-row">home</main>;
}
