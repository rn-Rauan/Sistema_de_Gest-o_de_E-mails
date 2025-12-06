import { useEffect } from "react";
import { Sidebar } from "../components/sidBar";
import { usePendingViewModel } from "../viewmodels/usePendingViewModel";

export default function PendentesPage() {
  const {
    pending,
    loading,
    saving,
    error,
    loadPending,
    updateEmail,
    saveAllPendingEmails,
    estados,
    municipios,
  } = usePendingViewModel();

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">
              E-mails Pendentes
            </h1>
            <p className="text-gray-500">Aguardando classificação de local</p>
          </div>

          <div className="space-x-2">
            <button
              className={`px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 font-semibold ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={saveAllPendingEmails}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar Tudo"}
            </button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                <th className="p-4 border-b">Remetente</th>
                <th className="p-4 border-b">Destinatário</th>
                <th className="p-4 border-b">Data</th>
                <th className="p-4 border-b w-1/3">Classificação (Local)</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200">
              {pending.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {email.remetente}
                  </td>
                  <td className="p-4 text-gray-600">{email.destinatario}</td>
                  <td className="p-4 text-gray-500">
                    {new Date(email.dataEnvio).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-2">
                    <select
                      className="border p-2 rounded bg-white w-1/3 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      value={email.estado ?? ""}
                      onChange={(e) =>
                        updateEmail(email.id, "estado", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        UF
                      </option>
                      {estados.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>

                    <select
                      className="border p-2 rounded bg-white w-2/3 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      value={email.municipio ?? ""}
                      onChange={(e) =>
                        updateEmail(email.id, "municipio", e.target.value)
                      }
                      disabled={!email.estado}
                    >
                      <option value="" disabled>
                        Selecione uma cidade
                      </option>
                      {(municipios[email.estado ?? ""] ?? []).map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
