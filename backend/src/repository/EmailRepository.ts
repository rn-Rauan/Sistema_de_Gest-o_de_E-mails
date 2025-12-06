import type { EmailEntity } from "../interfaces/EmailEntity.js";
import type { IEmailRepository } from "../interfaces/IEmailRepository.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { PrismaClient } from "@prisma/client";

export class PrismaEmailRepository implements IEmailRepository {
  private db: PrismaClient;
  constructor(database: PrismaClient) {
    this.db = database;
  }

  async create(data: EmailCreateDTO): Promise<EmailEntity> {
    return await this.db.email.create({ data });
  }

  async findAll(): Promise<EmailEntity[]> {
    return await this.db.email.findMany();
  }

  async findById(id: number): Promise<EmailEntity | null> {
    return await this.db.email.findFirst({
      where: { id },
    });
  }

  async findPending(): Promise<EmailEntity[]> {
    return await this.db.email.findMany({
      where: {
        estado: null,
        municipio: null,
      },
    });
  }

  async updateLocation(
    id: number,
    estado: string,
    municipio: string
  ): Promise<EmailEntity> {
    return await this.db.email.update({
      where: { id },
      data: { estado, municipio },
    });
  }

  async countResume(): Promise<{
    total: number;
    classificados: number;
    pendentes: number;
  }> {
    const total = await this.db.email.count();
    const classificados = await this.db.email.count({
      where: {
        estado: { not: null },
        municipio: { not: null },
      },
    });
    const pendentes = await this.db.email.count({
      where: {
        estado: null,
        municipio: null,
      },
    });
    return { total, classificados, pendentes };
  }

  async groupByState(): Promise<{ estado: string; count: number }[]> {
    const res = await this.db.email.groupBy({
      by: ["estado"],
      where: { estado: { not: null } },
      _count: { estado: true },
      orderBy: { _count: { estado: "desc" } },
    });
    return res.map(
      (r: { estado: string | null; _count: { estado: number } }) => ({
        estado: r.estado!,
        count: r._count.estado!,
      })
    );
  }

  async findEmailsFrom(date: Date): Promise<EmailEntity[]> {
    return await this.db.email.findMany({
      where: {
        dataEnvio: { gte: date },
      },
      orderBy: { dataEnvio: "asc" },
    });
  }

  async top3Destinations(): Promise<{ destinatario: string; count: number }[]> {
    const reslt = await this.db.email.groupBy({
      by: ["destinatario"],
      _count: { destinatario: true },
      orderBy: {
        _count: {
          destinatario: "desc",
        },
      },
      take: 3,
    });
    return reslt.map(
      (r: { destinatario: string; _count: { destinatario: number } }) => ({
        destinatario: r.destinatario,
        count: r._count.destinatario,
      })
    );
  }
}
