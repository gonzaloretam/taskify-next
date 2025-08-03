"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import { Plus } from "lucide-react";

type Task = {
  id: string;
  title: string;
  content?: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) return alert("El título es obligatorio");
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    setLoading(false);
    fetchTasks();
  };

  return (
    <main className="min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📝 Tus Tareas
        </h1>

        {/* Formulario */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Crear nueva tarea
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Descripción (opcional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={createTask}
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Plus size={18} /> {loading ? "Agregando..." : "Agregar tarea"}
            </button>
          </div>
        </div>

        {/* Lista de tareas */}
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No tienes tareas aún.
            </p>
          )}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={fetchTasks}
              onDelete={fetchTasks}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
