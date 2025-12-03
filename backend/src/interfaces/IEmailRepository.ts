import type { Email } from "@prisma/client";

export interface IEmailRepository{
    create(data : Email) : Promise<Email>;
    findAll() : Promise<Email[]>;
    findById(id : number) : Promise<Email>;
    findPending() : Promise<Email[]>
    updateLocation(id : number, estado : string, municipio : string) : Promise<Email>;
    countResume() : Promise<{total : number, classificados : number, pendentes : number}>;
    grupByState() : Promise<{estado : string, count : number}[]>;
    tendence7Days() : Promise<{data : string, count : number}[]>;
    top3Destinations() : Promise<{destinatario : string, count : number}[]>;
    
}