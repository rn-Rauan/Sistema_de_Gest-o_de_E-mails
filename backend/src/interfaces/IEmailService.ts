import type { EmailEntity } from "../interfaces/EmailEntity.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { EmailLocationDTO } from "./EmailLocationDTO.js";

export interface IEmailService {
  createEmail(data: EmailCreateDTO): Promise<EmailEntity>;
  getAll(): Promise<EmailEntity[]>;
  getById(id: number): Promise<EmailEntity>;
  getPending(): Promise<EmailEntity[]>;
  updateLocation(
    id: number,
    location : EmailLocationDTO
  ): Promise<EmailEntity>;
  countEmails(): Promise<{
    total: number;
    classificados: number;
    pendentes: number;
  }>;
  groupByState(): Promise<{ estado: string; count: number }[]>;
  getTendence7Days(): Promise<{ data: string; count: number }[]>;
  getTop3Destinations(): Promise<{ destinatario: string; count: number }[]>;
}
