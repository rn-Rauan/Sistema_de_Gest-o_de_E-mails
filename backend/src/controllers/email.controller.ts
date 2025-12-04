import type { EmailService } from "../services/Email.Service.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { EmailEntity } from "../interfaces/EmailEntity.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { EmailLocationDTO } from "../interfaces/EmailLocationDTO.js";
/**
 * O EmailController atua como uma camada intermediária entre as solicitações do cliente
 * e o EmailService, recebendo as requisições, extraindo os dados necessários e
 * chamando os métodos apropriados do serviço para processar essas requisições.
 */
export class EmailController {
  private service: EmailService;

  constructor(service: EmailService) {
    this.service = service;
  }
  /**
   * Criar um novo email
   */
  public createEmail = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const novoEmail = await this.service.createEmail(
        req.body as EmailCreateDTO
      );
      return reply.status(201).send(novoEmail);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Buscar todos os emails
   */
  public getEmails = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const emails: EmailEntity[] = await this.service.getAll();
      return reply.status(200).send(emails);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Buscar email por Id
   */
  public getEmailById = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id : string};
      const numId = Number(id);
      const email: EmailEntity = await this.service.getById(numId);
      return reply.status(200).send(email);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Buscar pendentes
   */
  public getPending = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const emailsPendentes: EmailEntity[] = await this.service.getPending();
      return reply.status(200).send(emailsPendentes);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Atualizar Localização do email
   */
  public updateLocation = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = req.params as { id: string};
      const numId = Number(id);
      const body = req.body as EmailLocationDTO;
      const atualizado = await this.service.updateLocation(numId, body);
      return reply.status(200).send(atualizado);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Retorna a quantidade de Emails total, pendentes e classificados
   */
  public getCountEmails = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const resumo = await this.service.countEmails();
      return reply.status(200).send(resumo);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Agrupar por estado
   */
  public getGroupByState = async (
    _req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const estadosAgrupados = await this.service.groupByState();
      return reply.status(200).send(estadosAgrupados);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**
   * Tendencia dos ultimos 7 dias
   */
  public getTendence7Days = async (
    _req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const dados = await this.service.getTendence7Days();
      return reply.status(200).send(dados);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };
  /**   
   * Retorna o top 3 destinatarios
   */
    public getTop3Destinations = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const top = await this.service.getTop3Destinations();
      return reply.status(200).send(top);
    } catch (err) {
      return this.handleError(reply, err);
    }
  };

  /**
   * Metodo para lidar com erro
   */
  private handleError(reply: FastifyReply, err: any) {
    return reply.status(400).send({
      error: (err as Error).message ?? "Erro inesperado",
    });
  }
}
