import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ClientLayout from "@/components/layout/ClientLayout";
import { Toaster } from "@/components/ui/sonner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <ClientLayout user={session.user}>
      {children}

      <Toaster closeButton richColors />
    </ClientLayout>
  );
}
