import { useEffect } from "react";
import { Sidebar } from "../components/SidBar";
import { useHistoricoEmailViewModel } from "../viewmodels/useHistoricoEmailViewModel";

export default function HistoricoEmail() {
  const vm = useHistoricoEmailViewModel();
  useEffect(() => {
    vm.carregar();
  }, [vm.carregar]);
  return (
    <div className="bg-gray-50 text-gray-800 font-sans flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">
              Histórico de E-mails
            </h1>
            <p className="text-gray-500">
              Consulte todos os envios registrados
            </p>
          </div>
        </header>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <img
                src="https://cdn-icons-png.flaticon.com/128/16/16492.png"
                alt="Ícone de Pesquisa"
                className="w-4 h-4" // <-- Adicionado classes de tamanho
              />{" "}
            </span>
            <input
              type="text"
              value={vm.search}
              onChange={(e) => vm.setSearch(e.target.value)}
              placeholder="Digite para pesquisar (assunto, remetente)..."
              className="w-full border pl-10 p-2.5 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto items-center">
            <input
              type="date"
              value={vm.dataFiltro}
              onChange={(e) => vm.setDataFiltro(e.target.value)}
              className="border p-2.5 rounded text-gray-600"
            />

            <button
              onClick={vm.filtrar}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded shadow"
            >
              Filtrar
            </button>

            <button
              onClick={vm.limparFiltros}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded border border-gray-300"
              title="Limpar todos os filtros"
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                <th className="p-4 border-b">Remetente / Destinatário</th>
                <th className="p-4 border-b">Assunto</th>
                <th className="p-4 border-b">Local</th>
                <th className="p-4 border-b text-right">Ações</th>
              </tr>
            </thead>

            <tbody className="text-sm divide-y divide-gray-200">
              {vm.emailsFiltrados.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">
                      {email.remetente}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Para: {email.destinatario}
                    </div>
                  </td>

                  <td className="p-4 text-gray-700">{email.assunto}</td>

                  <td className="p-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        email.estado
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {email.estado
                        ? `${email.estado} / ${email.municipio}`
                        : "- / -"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <a
                      href={`/email/${email.id}`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50"
                    >
                      Ver Detalhes
                    </a>
                  </td>
                </tr>
              ))}

              {vm.emailsFiltrados.length == 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Nenhum e-mail encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
