import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./View/dashboardPage";
import "./index.css";
import PendingPage from "./View/pendentesPage";
import CadastroEmail from "./View/cadastroEmailPage";
import HistoricoEmail from "./View/historicoPage";
import DetalhesEmailPage from "./View/detalhesEmailPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/pendentes" element={<PendingPage />} />
      <Route path="/cadastro" element={<CadastroEmail />} />
      <Route path="/historico" element={<HistoricoEmail />} />
      <Route path="/email/:id" element={<DetalhesEmailPage />} />
    </Routes>
  </BrowserRouter>
);
