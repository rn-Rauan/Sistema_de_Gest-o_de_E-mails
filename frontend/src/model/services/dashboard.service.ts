import { api } from "../../api/email.api";
import type {
  DashboardResume,
  EmailsByState,
  TendenceItem,
  TopDestination,
} from "../types/dashboard";

export const dashboardService = {

  // GET: total/classificados/pendentes
  async getDashboardResume(): Promise<DashboardResume> {
    const resp = await api.get("/email/dashboard/contagem");
    return resp.data;
  },

  // GET: agrupado por estado
  async getEmailsByState(): Promise<EmailsByState[]> {
    const resp = await api.get("/email/dashboard/estado");
    return resp.data;
  },

  // GET: últimos 7 dias
  async getTendence7Days(): Promise<TendenceItem[]> {
    const resp = await api.get("/email/dashboard/7dias");
    return resp.data;
  },

  // GET: top 3 destinatários
  async getTop3Destinations(): Promise<TopDestination[]> {
    const resp = await api.get("/email/dashboard/top3");
    return resp.data;
  },
};
