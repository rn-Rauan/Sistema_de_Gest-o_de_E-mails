import { Link } from "react-router-dom";
import { useSidebarViewModel } from "../viewmodels/useSidBarViewModel";

export function Sidebar() {
  const { pendingCount } = useSidebarViewModel();

  return (
    <aside className="w-64 bg-indigo-900 text-white hidden md:flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-indigo-800">
        Email Manager
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block px-4 py-3 bg-indigo-800 rounded-lg">
          📊 Dashboard
        </Link>

        <Link
          to="/pendentes"
          className="block px-4 py-3 hover:bg-indigo-800 rounded-lg flex items-center"
        >
          ⚠️ Pendentes
          <span className="bg-yellow-500 text-xs font-bold px-2 py-1 rounded-full ml-2 text-indigo-900">
            {pendingCount}
          </span>
        </Link>

        <Link
          to="/cadastro"
          className="block px-4 py-3 hover:bg-indigo-800 rounded-lg"
        >
          📝 Cadastro Manual
        </Link>

        <Link
          to="/historico"
          className="block px-4 py-3 hover:bg-indigo-800 rounded-lg"
        >
          📂 Histórico
        </Link>
      </nav>
    </aside>
  );
}
