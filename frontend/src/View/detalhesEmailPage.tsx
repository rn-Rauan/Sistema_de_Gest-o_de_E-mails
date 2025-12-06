import { useParams, Link } from "react-router-dom";
import { Sidebar } from "../components/SidBar";
import { useEmailDetailsViewModel } from "../viewmodels/useDetalhesViewModel";

export default function DetalhesEmailPage() {
  const { id } = useParams();
  const vm = useEmailDetailsViewModel(Number(id));

  if (vm.loading) return <div className="p-8 text-center">Carregando...</div>;
  if (vm.error && !vm.isEditing)
    return <div className="p-8 text-center text-red-500">{vm.error}</div>;
  if (!vm.email)
    return <div className="p-8 text-center">Nenhum e-mail encontrado</div>;

  const email = vm.email;

  return (
    <div className="bg-gray-50 text-gray-800 font-sans flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 bg-gray-100 flex justify-center">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden h-fit mt-4">
          <div className="bg-indigo-50 p-6 border-b border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-indigo-900 mb-2">
                  {email.assunto}
                </h2>

                <div className="text-sm text-gray-600">
                  <span className="font-bold">De:</span> {email.remetente}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold">Para:</span> {email.destinatario}
                </div>
              </div>

              <div className="text-right w-48">
                {!vm.isEditing && (
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {email.estado
                      ? `${email.estado} - ${email.municipio}`
                      : "Sem classificação"}
                  </div>
                )}

                {vm.isEditing && (
                  <div className="mt-3 space-y-2">
                    <select
                      className="border p-2 rounded bg-white w-full text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      value={vm.editableEmail.estado || ""}
                      onChange={(e) =>
                        vm.handleFieldChange("estado", e.target.value)
                      }
                    >
                      <option value="">UF</option>
                      {vm.estados.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>

                    <select
                      className="border p-2 rounded bg-white w-full text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      value={vm.editableEmail.municipio || ""}
                      onChange={(e) =>
                        vm.handleFieldChange("municipio", e.target.value)
                      }
                      disabled={!vm.editableEmail.estado}
                    >
                      <option value="">Selecione uma cidade</option>
                      {vm
                        .getMunicipios(vm.editableEmail.estado || "")
                        .map((cidade) => (
                          <option key={cidade} value={cidade}>
                            {cidade}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 text-gray-700 leading-relaxed min-h-[300px] whitespace-pre-line">
            {email.corpo}
          </div>

          {vm.error && vm.isEditing && (
            <div className="px-8 pb-4 text-red-600 text-sm">{vm.error}</div>
          )}

          <div className="bg-gray-50 p-4 border-t flex justify-end gap-3">
            <Link
              to="/historico"
              className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded border border-gray-300"
            >
              Voltar
            </Link>

            <button
              onClick={vm.toggleEdit}
              className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium shadow-md"
            >
              {vm.isEditing ? "Cancelar" : "Editar Local"}
            </button>
            {vm.isEditing && (
              <button
                onClick={vm.saveChanges}
                disabled={vm.saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-400"
              >
                {vm.saving ? "Salvando..." : "Salvar"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
