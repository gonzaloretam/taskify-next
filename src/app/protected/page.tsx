"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";

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
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tus tareas</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={createTask}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar tarea
        </button>
      </div>

      <section className="space-y-4">
        {tasks.length === 0 && <p>No tienes tareas.</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={fetchTasks}
            onDelete={fetchTasks}
          />
        ))}
      </section>
    </main>
  );
}
