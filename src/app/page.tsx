"use client";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) router.push("/protected");
  }, [session, status, router]);

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div>
      <h1>Inicia sesión</h1>
      <button onClick={() => signIn("github")}>Entrar con GitHub</button>
    </div>
  );
}
