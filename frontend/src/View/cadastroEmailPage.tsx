import { Sidebar } from "../components/sidBar";
import { useCreateEmailVewModel } from "../viewmodels/useCadastroVewModel";

export default function CadastroEmail() {
  const vm = useCreateEmailVewModel();

  return (
    <div className="bg-gray-50 text-gray-800 font-sans flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-700">
              Novo E-mail Manual
            </h1>
            <p className="text-gray-500">
              Preencha os dados do envio para registro no sistema
            </p>
          </header>

          {vm.error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {vm.error}
            </div>
          )}

          {vm.success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
              E-mail cadastrado com sucesso!
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remetente
                  </label>
                  <input
                    type="email"
                    value={vm.remetente}
                    onChange={(e) => vm.setRemetente(e.target.value)}
                    placeholder="ex: joao@empresa.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinatário
                  </label>
                  <input
                    type="email"
                    value={vm.destinatario}
                    onChange={(e) => vm.setDestinatario(e.target.value)}
                    placeholder="ex: cliente@dominio.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Envio
                  </label>
                  <input
                    type="date"
                    value={vm.dataEnvio}
                    onChange={(e) => vm.setDataEnvio(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <input
                    type="text"
                    value={vm.assunto}
                    onChange={(e) => vm.setAssunto(e.target.value)}
                    placeholder="Assunto do e-mail"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">
                  Classificação Local
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado (UF)
                    </label>
                    <select
                      value={vm.estado}
                      onChange={(e) => {
                        vm.setEstado(e.target.value);
                        vm.setMunicipio("");
                      }}
                      className="w-full border border-gray-300 rounded-lg p-2.5 bg-white"
                    >
                      <option value="">Selecione...</option>
                      {vm.estados.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Município
                    </label>
                    <select
                      value={vm.municipio}
                      onChange={(e) => vm.setMunicipio(e.target.value)}
                      disabled={!vm.estado}
                      className="w-full border border-gray-300 rounded-lg p-2.5 bg-white disabled:bg-gray-100"
                    >
                      {!vm.estado ? (
                        <option>Selecione o estado primeiro...</option>
                      ) : (
                        <>
                          <option value="">Selecione...</option>
                          {vm.municipios.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corpo da mensagem
                </label>
                <textarea
                  rows={6}
                  value={vm.corpo}
                  onChange={(e) => vm.setCorpo(e.target.value)}
                  placeholder="Cole o conteúdo do e-mail aqui..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <a
                  href="/dashboard"
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </a>

                <button
                  type="button"
                  onClick={vm.salvar}
                  disabled={vm.loading}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-md disabled:bg-indigo-300"
                >
                  {vm.loading ? "Salvando..." : "Salvar Registro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
