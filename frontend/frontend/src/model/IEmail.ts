export interface EmailEntityFrontend {
  id: number;
  remetente: string; 
  destinatario: string;
  dataEnvio: string; 
  assunto: string;
  corpo: string;
  estado: string | null;
  municipio: string | null;
  criadoEm: string;
}