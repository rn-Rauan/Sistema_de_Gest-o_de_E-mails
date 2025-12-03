import { prisma } from "../../prisma/client.js";
import type { Email, Prisma } from "@prisma/client";
import type { IEmailRepository } from "../interfaces/IEmailRepository.js";

export class EmailRepository implements IEmailRepository {
  async create(data: Prisma.EmailCreateInput): Promise<Email> {
    return prisma.email.create({ data });
  }
  async findAll(): Promise<Email[]> {
    return await prisma.email.findMany();
  }
  async findById(id: number): Promise<Email> {
    return prisma.email.findFirstOrThrow({
      where: { id },
    });
  }
  async findPending(): Promise<Email[]> {
    return prisma.email.findMany({
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
  ): Promise<Email> {
    return prisma.email.update({
      where: { id },
      data: { estado, municipio },
    });
  }
  async countResume(): Promise<{
    total: number;
    classificados: number;
    pendentes: number;
  }> {
    const total = await prisma.email.count();
    const classificados = await prisma.email.count({
      where: {
        estado: { not: null },
        municipio: { not: null },
      },
    });
    const pendentes = await prisma.email.count({
      where: {
        estado: null,
        municipio: null,
      },
    });
    return { total, classificados, pendentes };
  }
  async grupByState(): Promise<{ estado: string; count: number }[]> {
    return prisma.email
      .groupBy({
        by: ["estado"],
        where: { estado: { not: null } },
        _count: { estado: true },
        orderBy: { _count: { estado: "desc" } },
      })
      .then((res) =>
        res.map((r) => ({
          estado: r.estado!,
          count: r._count.estado!,
        }))
      );
  }

  async tendence7Days(): Promise<{ data: string; count: number }[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const results = await prisma.email.groupBy({
      by: ["dataEnvio"],
      where: {
        dataEnvio: { gte: sevenDaysAgo },
      },
      _count: { dataEnvio: true },
      orderBy: { dataEnvio: "asc" },
    });

    return results.map((r) => ({
      data: r.dataEnvio.toISOString(),
      count: r._count.dataEnvio,
    }));
  }
  async top3Destinations(): Promise<{ destinatario: string; count: number }[]> {
    const reslt = await prisma.email.groupBy({
        by : ["destinatario"],
        _count : { destinatario : true},
        orderBy : { destinatario : "desc"},
        take : 3
    })
    return reslt.map(r => ({
        destinatario : r.destinatario,
        count : r._count.destinatario
    }))
  }
}
