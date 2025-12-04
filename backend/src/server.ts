import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { EmailRepository } from "./repository/EmailRepository.js";
import { EmailService } from "./services/Email.Service.js";
import { EmailController } from "./controllers/email.controller.js";
import { emailRoutes } from "./routes/Email.routes.js";

//Instanciando o prisma 
const prisma = new PrismaClient();

//Instanciando o repository e injetando o prisma
const emailRepository = new EmailRepository(prisma);

//Instanciando o service 
const emailService = new EmailService(emailRepository);

//Instanciando o controller
const emailController = new EmailController(emailService)

//Criando a aplicação Fastify
const app = fastify({ logger : true});

//Registrando as rotas
app.register(async (app) => {
    emailRoutes(app, emailController);
});


app.get("/test", async () => {
    return {ok : true, message : 'Hello Fastify no projeto do gerenciador de email'}
})

app.listen({port : 3001})
    .then(address => {
        console.log(`Servidor iniciado na porta ${address}`)
    }).catch(error =>{
        app.log.error(error)
        process.exit(1)
    })