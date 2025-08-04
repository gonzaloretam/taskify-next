"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

export default function LoginPage() {
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

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left: Login */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Hey App.
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Inicia sesión</h1>
            <p className="text-gray-500">Usa tu cuenta para entrar</p>

            {/* Botón Google */}
            <button
              onClick={() => signIn("google")}
              className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <img
                src="/icon-google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Entrar con Google
            </button>

            {/* Botón GitHub */}
            <button
              onClick={() => signIn("github")}
              className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <img
                src="/icon-github.svg"
                alt="GitHub logo"
                className="w-5 h-5"
              />
              Entrar con GitHub
            </button>

            <p className="text-xs text-gray-400 text-center">
              Al continuar, aceptas nuestros{" "}
              <span className="underline cursor-pointer">términos</span> y{" "}
              <span className="underline cursor-pointer">
                política de privacidad
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Right: Imagen */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/home.jpg"
          alt="Imagen"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
