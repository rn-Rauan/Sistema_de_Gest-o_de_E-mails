import type { IEmailRepository } from "../interfaces/IEmailRepository.js";
import type { EmailEntity } from "../interfaces/EmailEntity.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { IEmailService } from "../interfaces/IEmailService.js";
import type { EmailLocationDTO } from "../interfaces/EmailLocationDTO.js";

class AppError extends Error {
  statusCode: number;
  original?: Error;
  constructor(message: string, statusCode = 500, original?: Error) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    if (original) {
      this.original = original;
    }
  }
}

/**
 * O EmailService lida com a lógica de negócios, validações complexas e orquestração
 * do processo de envio de e-mail (incluindo a chamada ao repositório para salvar o registro).
 */
export class EmailService implements IEmailService {
  private repository: IEmailRepository;

  constructor(repository: IEmailRepository) {
    this.repository = repository;
  }
  /**
   * valida os dados de entrada e salva no banco de dados
   */
  public async createEmail(data: EmailCreateDTO): Promise<EmailEntity> {
    if (!this.isValidEmail(data.remetente)) {
      throw new AppError(`Remetente inválido: ${data.remetente}`, 400);
    }

    if (!this.isValidEmail(data.destinatario)) {
      throw new AppError(`Destinatário inválido: ${data.destinatario}`, 400);
    }

    if (!data.assunto?.trim()) {
      throw new AppError("O campo 'assunto' é obrigatório.", 400);
    }

    if (!data.corpo?.trim()) {
      throw new AppError("O campo 'corpo' é obrigatório.", 400);
    }

    if (!data.dataEnvio) {
      data.dataEnvio = new Date();
    } else {
      data.dataEnvio = new Date(data.dataEnvio);
    }

    try {
      return await this.repository.create(data);
    } catch (err) {
      throw new AppError(
        `Erro ao salvar email: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Busca todos os emails
   */
  public async getAll(): Promise<EmailEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (err) {
      throw new AppError(
        `Erro ao buscar emails: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Busca email por ID
   */
  public async getById(id: number): Promise<EmailEntity> {
    this.isValidId(id);
    try {
      const email = await this.repository.findById(id);
      if (!email) {
        throw new AppError("Email não encontrado", 404);
      }
      return email;
    } catch (err) {
      // if it's already AppError, repassa; caso contrário, encapsula
      if (err instanceof AppError) throw err;
      throw new AppError(
        `Erro ao buscar por ID: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Retorna emails pendentes
   */
  public async getPending(): Promise<EmailEntity[]> {
    try {
      return await this.repository.findPending();
    } catch (err) {
      throw new AppError(
        `Erro ao buscar pendentes: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Atualiza a o estado e o municipio do email
   */
  public async updateLocation(
    id: number,
    location: EmailLocationDTO
  ): Promise<EmailEntity> {
    this.isValidId(id);

    if (!location.estado || !location.municipio) {
      throw new AppError("estado e municipio obrigatorios", 400);
    }

    try {
      return await this.repository.updateLocation(
        id,
        location.estado,
        location.municipio
      );
    } catch (err) {
      throw new AppError(
        `Erro ao atualizar localização: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Retorna o total de emails, classificados e pendentes
   */
  public async countEmails(): Promise<{
    total: number;
    classificados: number;
    pendentes: number;
  }> {
    try {
      return await this.repository.countResume();
    } catch (err) {
      throw new AppError(
        `Erro ao retornar resumo dos emails: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Retorna emails agrupados por estado
   */
  public async groupByState(): Promise<{ estado: string; count: number }[]> {
    try {
      return await this.repository.groupByState();
    } catch (err) {
      throw new AppError(
        `Erro ao agrupar por estado: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }
  /**
   * Retorna os emails dos ultimos 7 dias
   */
  public async getTendence7Days(): Promise<{ data: string; count: number }[]> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const results = await this.repository.findEmailsFrom(sevenDaysAgo);

      const agrupadosPorData: Record<string, number> = {};
      for (let i: number = 0; i < results.length; i++) {
        const email = results[i]!;
        const dia = email.dataEnvio.toISOString().split("T")[0]!;

        agrupadosPorData[dia] = (agrupadosPorData[dia] || 0) + 1;
      }

      return Object.entries(agrupadosPorData).map(([data, count]) => ({
        data,
        count,
      }));
    } catch (err) {
      throw new AppError(
        `Erro ao buscar os emails dos ultimos 7 dias: ${
          (err as Error).message
        }`,
        500,
        err as Error
      );
    }
  }
  /**
   * Retorna o top 3 destinatarios
   */
  public async getTop3Destinations(): Promise<
    { destinatario: string; count: number }[]
  > {
    try {
      return await this.repository.top3Destinations();
    } catch (err) {
      throw new AppError(
        `Erro ao retornar o top 3 destinatarios: ${(err as Error).message}`,
        500,
        err as Error
      );
    }
  }

  private isValidId(id: number): boolean {
    if (id < 1 || !Number.isInteger(id)) {
      throw new AppError("Id invalido", 400);
    }
    return true;
  }
  private isValidEmail(email: string): boolean {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
}
