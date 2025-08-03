import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function PerfilPage() {
  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <div className="my-6 border-b border-gray-200">
        <div className="mb-6">
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}
