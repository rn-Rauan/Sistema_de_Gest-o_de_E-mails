export interface EmailEntity {
  id: number;
  remetente: String;
  destinatario: String;
  dataEnvio: Date;
  assunto: String;
  corpo: String;
  estado: String | null;
  municipio: String | null;
  criadoEm: Date;
}
