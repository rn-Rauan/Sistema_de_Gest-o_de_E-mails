import type { EmailEntity } from "../interfaces/EmailEntity.js"
import type { IEmailRepository } from "../interfaces/IEmailRepository.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { IDatabaseClient } from "../interfaces/IDatabaseClient.js";

export class EmailRepository implements IEmailRepository {
  private db : IDatabaseClient
  constructor (database: IDatabaseClient){
    this.db = database
  }

  async create(data: EmailCreateDTO): Promise<EmailEntity> {
    return await this.db.email.create({ data });
  }

  async findAll(): Promise<EmailEntity[]> {
    return await this.db.email.findMany();
  }

  async findById(id: number): Promise<EmailEntity> {
    return await this.db.email.findFirstOrThrow({
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
    return res.map((r: { estado: string | null; _count: { estado: number } }) => ({
      estado: r.estado!,
      count: r._count.estado!,
    }));
  }

  async tendence7Days(): Promise<{ data: string; count: number }[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const results = await this.db.email.groupBy({
      by: ["dataEnvio"],
      where: {
        dataEnvio: { gte: sevenDaysAgo },
      },
      _count: { dataEnvio: true },
      orderBy: { dataEnvio: "asc" },
    });

    return results.map((r: { dataEnvio: Date; _count: { dataEnvio: number } }) => ({
      data: r.dataEnvio.toISOString(),
      count: r._count.dataEnvio,
    }));
  }

  async top3Destinations(): Promise<{ destinatario: string; count: number }[]> {
    const reslt = await this.db.email.groupBy({
      by: ["destinatario"],
      _count: { destinatario: true },
      orderBy: { destinatario: "desc" },
      take: 3,
    });
    return reslt.map((r: { destinatario: string; _count: { destinatario: number } }) => ({
      destinatario: r.destinatario,
      count: r._count.destinatario,
    }));
  }
}
