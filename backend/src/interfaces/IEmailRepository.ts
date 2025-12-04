import type { EmailEntity } from "./EmailEntity.js";
import type { EmailCreateDTO } from "./EmailCreateDTO.js";

export interface IEmailRepository {
  create(data: EmailCreateDTO): Promise<EmailEntity>;
  findAll(): Promise<EmailEntity[]>;
  findById(id: number): Promise<EmailEntity | null>;
  findPending(): Promise<EmailEntity[]>;
  updateLocation(
    id: number,
    estado: string,
    municipio: string
  ): Promise<EmailEntity>;
  countResume(): Promise<{
    total: number;
    classificados: number;
    pendentes: number;
  }>;
  groupByState(): Promise<{ estado: string; count: number }[]>;
  tendence7Days(): Promise<{ data: string; count: number }[]>;
  top3Destinations(): Promise<{ destinatario: string; count: number }[]>;
}
