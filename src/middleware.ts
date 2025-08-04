// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Solo proteger /api/protected/*
  if (pathname.startsWith("/api/protected")) {
    const token = await getToken({ req: request, secret: SECRET });

    if (!token || !token.email || !token.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Agregar headers al request con email y id
    const response = NextResponse.next();
    response.headers.set("x-user-email", token.email);
    response.headers.set("x-user-id", token.id as string);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};
