import { useEffect } from "react";
import { Sidebar } from "../components/sidBar";
import { DashboardCards } from "../components/dashboard";
import { StateProgress } from "../components/progess";
import { TopDestinations } from "../components/topDestinations";
import { useDashboardViewModel } from "../viewmodels/useDashboardViewModel";

const DashboardPage = () => {
  const {
    resume,
    byState,
    top3,
    loading,
    error,
    loadDashboard
  } = useDashboardViewModel();


  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans flex h-screen overflow-hidden">

      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">Visão Geral</h1>
          <div className="text-sm text-gray-500">Atualizado agora</div>
        </header>

        {loading && <div>Carregando dashboard...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {resume && <DashboardCards dados={resume} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StateProgress dados={byState} />
          <TopDestinations lista={top3} />
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;
