import type { IEmailRepository } from "../interfaces/IEmailRepository.js";
import type { EmailEntity } from "../interfaces/EmailEntity.js";
import type { EmailCreateDTO } from "../interfaces/EmailCreateDTO.js";
import type { IEmailService } from "../interfaces/IEmailService.js";
import type { EmailLocationDTO } from "../interfaces/EmailLocationDTO.js";

/**
 * O EmailService lida com a lógica de negócios, validações complexas e orquestração
 * do processo de envio de e-mail (incluindo a chamada ao repositório para salvar o registro).
 */
export class EmailService implements IEmailService{
  private repository: IEmailRepository;

  constructor(repository: IEmailRepository) {
    this.repository = repository;
  }
  /**
   * valida os dados de entrada e salva no banco de dados
   */
  public async createEmail(data: EmailCreateDTO): Promise<EmailEntity> {
    if (!this.isValidEmail(data.remetente)) {
        throw new Error(`Remetente inválido: ${data.remetente}` )
    }

    if (!this.isValidEmail(data.destinatario)) {
      throw new Error(`Destinatário inválido: ${data.destinatario}`);
    }

    if (!data.assunto?.trim()) {
      throw new Error("O campo 'assunto' é obrigatório.");
    }

    if (!data.corpo?.trim()) {
      throw new Error("O campo 'corpo' é obrigatório.");
    }

    if (!data.dataEnvio) {
      data.dataEnvio = new Date();
    }
    try {
      return await this.repository.create(data);
    } catch (err) {
      throw new Error(`Erro ao salavar email ${(err as Error).message}`);
    }
  }
  /**
   * Busca todos os emails
   */
  public async getAll(): Promise<EmailEntity[]> {
    try {
        return await this.repository.findAll();
    } catch (err) {
      throw new Error(`Erro ao buscar emails ${(err as Error).message}`);
    }
  }
  /**
   * Busca email por ID
   */
  public async getById(id: number): Promise<EmailEntity> {
    this.isValidId(id);
    try {
      return await this.repository.findById(id);
    } catch (err) {
      throw new Error(`Erro ao buscar por ID: ${(err as Error).message}`);
    }
  }
  /**
   * Retorna emails pendentes 
   */
  public async getPending(): Promise<EmailEntity[]> {
    try {
      return await this.repository.findPending();
    } catch (err) {
      throw new Error(`Erro ao buscar pendentes: ${(err as Error).message}`);
    }
  }
  /**
   * Atualiza a o estado e o municipio do email
   */
  public async updateLocation(
    id: number,
    location : EmailLocationDTO
  ): Promise<EmailEntity> {

    this.isValidId(id);

    if (!location.estado|| !location.municipio){
      throw new Error("estado e municipio obrigatorios");
    }

    try {
      return await this.repository.updateLocation(id, location.estado, location.municipio);
    } catch (err) {
      throw new Error(`Erro ao atualizar localização: ${(err as Error).message}`);
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
      throw new Error(`Erro ao retornar resumo dos emails: ${(err as Error).message}`);
    }
  }
  /**
   * Retorna emails agrupados por estado
   */
  public async groupByState(): Promise<{ estado: string; count: number }[]> {
    try {
      return await this.repository.groupByState();
    } catch (err) {
      throw new Error(`Erro ao agrupar por estado: ${(err as Error).message}`);
    }
  }
  /**
   * Retorna os emails dos ultimos 7 dias
   */
  public async getTendence7Days(): Promise<{ data: string; count: number }[]> {
    try {
      return await this.repository.tendence7Days();
    } catch (err) {
      throw new Error(`Erro ao buscar os emails dos ultimos 7 dias: ${(err as Error).message}`);
    }
  }
  /**
   * Retorna o top 3 destinatarios
   */
  public async getTop3Destinations() : Promise<{destinatario: string, count : number}[]>{
    try{
        return await this.repository.top3Destinations()
    }catch(err){
        throw new Error(`Erro ao retornar o top 3 destinatarios: ${(err as Error).message}`)
    }
  }

  private isValidId(id: number): boolean {
    if (id < 1 || !Number.isInteger(id)) {
      throw new Error("Id invalido");
    }
    return true;
  }
  private isValidEmail(email: string): boolean {
    const regex =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

}
