"use client";
import { useState } from "react";
import { CheckCircle, Undo2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
type Task = {
  id: string;
  title: string;
  content?: string;
  completed: boolean;
};

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleCompleted = async () => {
    setLoading(true);
    await fetch("/api/protected/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: !task.completed }),
    });
    setLoading(false);
    onUpdate();
  };

  const confirmDelete = async () => {
    setLoading(true);
    await fetch("/api/protected/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });
    setLoading(false);
    setShowConfirm(false);
    onDelete();
    toast.success("Se ha eliminado una tarea.", {
      description: new Date().toLocaleString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  };

  return (
    <div
      className={`p-4 rounded-xl border shadow-sm transition-all ${
        task.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
      {task.content && <p className="text-gray-600 text-sm">{task.content}</p>}

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={loading}
          onClick={toggleCompleted}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          {task.completed ? (
            <>
              <Undo2 size={16} /> <span>Pendiente</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} /> <span>Completar</span>
            </>
          )}
        </button>

        <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
          <AlertDialogTrigger asChild>
            <button
              disabled={loading}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              <Trash2 size={16} />
              <span>Eliminar</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. La tarea se eliminará
                permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} disabled={loading}>
                {loading ? "Eliminando..." : "Eliminar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
