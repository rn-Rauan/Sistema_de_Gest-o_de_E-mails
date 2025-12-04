import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { PrismaEmailRepository } from "./repository/EmailRepository.js";
import { EmailService } from "./services/Email.Service.js";
import { EmailController } from "./controllers/email.controller.js";
import { emailRoutes } from "./routes/Email.routes.js";
import cors from "@fastify/cors";

// Instanciando o prisma
const prisma = new PrismaClient();

// Instanciando o repository e injetando o prisma
const emailRepository = new PrismaEmailRepository(prisma);

// Instanciando o service
const emailService = new EmailService(emailRepository);

// Instanciando o controller
const emailController = new EmailController(emailService);

// Criando a aplicação Fastify
const app = fastify({ logger: true });

// Registrando o CORS
await app.register(cors, {
  origin: "*", // Em produção, restrinja para o domínio do seu frontend
});

// Registrando Swagger
await app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "API de Gestão de E-mails",
      description: "Sistema de gerenciamento e análise de emails",
      version: "1.0.0",
    },
    host: "localhost:3001",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Registrando Swagger UI
await app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

// Registrando as rotas
app.register((app) => emailRoutes(app, emailController));

// Gerando documentação Swagger
await app.ready();

// Iniciando o servidor
const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
    console.log("✅ Servidor rodando em http://localhost:3001");
    console.log("📚 Swagger disponível em http://localhost:3001/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();