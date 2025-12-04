export interface EmailCreateDTO {
  remetente: string;
  destinatario: string;
  dataEnvio: Date | string;
  assunto: string;
  corpo: string;
}
