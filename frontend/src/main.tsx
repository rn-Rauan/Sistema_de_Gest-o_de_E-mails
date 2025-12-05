import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./View/dashboardPage";
import "./index.css"
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>
);