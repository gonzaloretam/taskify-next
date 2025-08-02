import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProtectedNav from "@/components/ProtectedNav";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // si no está logueado, redirige a login
  }

  return (
    <>
      <ProtectedNav />
      <main className="p-4">{children}</main>
    </>
  );
}
