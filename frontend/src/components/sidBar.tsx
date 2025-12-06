import { NavLink } from "react-router-dom";
import { useSidebarViewModel } from "../viewmodels/useSidBarViewModel";

export function Sidebar() {
  const { pendingCount } = useSidebarViewModel();

  return (
    <aside className="w-64 bg-indigo-900 text-white hidden md:flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-indigo-800">
        Email Manager
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/pendentes"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg flex items-center ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`
          }
        >
          ⚠️ Pendentes
          <span className="bg-yellow-500 text-xs font-bold px-2 py-1 rounded-full ml-2 text-indigo-900">
            {pendingCount}
          </span>
        </NavLink>

        <NavLink
          to="/cadastro"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`
          }
        >
          📝 Cadastro Manual
        </NavLink>

        <NavLink
          to="/historico"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg ${
              isActive ? "bg-indigo-800" : "hover:bg-indigo-800"
            }`
          }
        >
          📂 Histórico
        </NavLink>
      </nav>
    </aside>
  );
}
