import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { title, content } = await request.json();

  if (!title?.trim()) {
    return NextResponse.json(
      { error: "El título es obligatorio" },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return NextResponse.json(task);
}

export async function PATCH(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id, completed } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  const updated = await prisma.task.updateMany({
    where: { id, userId },
    data: { completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID es obligatorio" }, { status: 400 });
  }

  await prisma.task.deleteMany({
    where: { id, userId },
  });

  return NextResponse.json({ message: "Tarea eliminada" });
}
