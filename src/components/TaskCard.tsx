"use client";
import { useState } from "react";

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

  const toggleCompleted = async () => {
    setLoading(true);
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: !task.completed }),
    });
    setLoading(false);
    onUpdate();
  };

  const deleteTask = async () => {
    if (!confirm("¿Eliminar tarea?")) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });
    setLoading(false);
    onDelete();
  };

  return (
    <div
      className={`p-4 rounded shadow ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <h3 className="font-bold">{task.title}</h3>
      {task.content && <p>{task.content}</p>}
      <div className="mt-2 flex gap-4">
        <button
          disabled={loading}
          onClick={toggleCompleted}
          className="text-sm text-blue-600"
        >
          {task.completed ? "Marcar como pendiente" : "Marcar como completada"}
        </button>
        <button
          disabled={loading}
          onClick={deleteTask}
          className="text-sm text-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
