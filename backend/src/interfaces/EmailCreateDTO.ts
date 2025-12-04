export interface EmailCreateDTO {
  remetente: string;
  destinatario: string;
  dataEnvio: Date;
  assunto: string;
  corpo: string;
}
