import type { DashboardResume } from "../model/types/dashboard";

type DashboardProps = {
  dados : DashboardResume
}

export function DashboardCards({dados}: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
        <div className="text-gray-400 text-sm font-semibold uppercase">
          Total de E-mails
        </div>
        <div className="text-4xl font-bold mt-2">{dados.total}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
        <div className="text-gray-400 text-sm font-semibold uppercase">
          Classificados
        </div>
        <div className="text-4xl font-bold mt-2">{dados.classificados}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
        <div className="text-gray-400 text-sm font-semibold uppercase">
          Pendentes
        </div>
        <div className="text-4xl font-bold mt-2 text-yellow-600">{dados.pendentes}</div>
        <a className="text-xs text-blue-600 hover:underline mt-2 block" href="/pendentes">
          Resolver agora
        </a>
      </div>

    </div>
  );
}
