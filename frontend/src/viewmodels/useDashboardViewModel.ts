import { useState } from "react";
import type {
  DashboardResume,
  TendenceItem,
  TopDestination,
  StateProgressItem,
} from "../model/types/dashboard";
import { dashboardService } from "../model/services/dashboard.service";
import { processStateData } from "../model/util/processStateData.util";

export function useDashboardViewModel() {
  const [resume, setResume] = useState<DashboardResume | null>(null);
  const [byState, setByState] = useState<StateProgressItem[]>([]);
  const [tendence, setTendence] = useState<TendenceItem[]>([]);
  const [top3, setTop3] = useState<TopDestination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);

      const [resumeData, stateData, tendenceData, topData] = await Promise.all([
        dashboardService.getDashboardResume(),
        dashboardService.getEmailsByState(),
        dashboardService.getTendence7Days(),
        dashboardService.getTop3Destinations(),
      ]);

      setResume(resumeData);

      setByState(processStateData(stateData));
      setTendence(tendenceData);
      setTop3(topData);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar o dashboard");
    } finally {
      setLoading(false);
    }
  }

  return {
    resume,
    byState,
    tendence,
    top3,
    loading,
    error,
    loadDashboard,
  };
}
