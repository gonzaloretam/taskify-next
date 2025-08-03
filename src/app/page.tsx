"use client";

import { signIn, useSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

export default function HomePage() {
  return (
    <SessionProvider>
      <LoginLayout />
    </SessionProvider>
  );
}

function LoginLayout() {
  const { data: session, status } = useSession();
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

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Login */}
      <section className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Inicia sesión</h1>
            <p className="text-gray-500 mt-2">
              Usa tu cuenta de GitHub para entrar
            </p>
          </div>

          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Github size={20} />
            Entrar con GitHub
          </button>

          <p className="text-xs text-gray-400 mt-6 text-center">
            Al continuar, aceptas nuestros{" "}
            <span className="underline cursor-pointer">términos</span> y{" "}
            <span className="underline cursor-pointer">
              política de privacidad
            </span>
            .
          </p>
        </div>
      </section>

      {/* Right: Branding */}
      <section className="hidden md:flex md:w-1/2 bg-[#0F172A] text-white items-center justify-center relative">
        <div className="text-center px-8">
          <div className="mb-4">
            <span className="text-5xl">📊</span>
          </div>
          <h2 className="text-3xl font-bold">Taskify</h2>
          <p className="text-gray-300 mt-2">
            Administra tus tareas de forma simple, eficiente y visual.
          </p>
        </div>

        {/* Cuadros decorativos de fondo opcional */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 z-0" />
      </section>
    </main>
  );
}
