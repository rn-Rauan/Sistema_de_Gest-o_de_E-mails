import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./View/dashboardPage";
import PendentesPage from "./View/pendentesPage";
import HistoricoEmail from "./View/historicoPage";
import DetalhesEmailPage from "./View/detalhesEmailPage";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/pendentes" element={<PendentesPage />} />
        <Route path="/historico" element={<HistoricoEmail />} />
        <Route path="/email/:id" element={<DetalhesEmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}