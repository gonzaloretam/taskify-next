"use client";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}

function HomeContent() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Bienvenido, {session.user?.name}</h1>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </>
    );
  }

  return (
    <>
      <h1>Inicia sesión</h1>
      <button onClick={() => signIn("github")}>Entrar con GitHub</button>
    </>
  );
}
