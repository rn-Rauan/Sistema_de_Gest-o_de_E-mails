export interface DashboardResume {
  total: number;
  classificados: number;
  pendentes: number;
}

export interface EmailsByState {
  estado: string;
  count: number;
}

export interface TendenceItem {
  data: string;
  count: number;
}

export interface TopDestination {
  destinatario: string;
  count: number;
}

export type StateProgressItem = EmailsByState & {
  percent: number;
  colorClass: string;
};


