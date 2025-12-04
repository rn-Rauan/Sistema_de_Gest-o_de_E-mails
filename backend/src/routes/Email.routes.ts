import type { FastifyInstance } from "fastify";
import type { EmailController } from "../controllers/email.controller.js";

export async function emailRoutes(
  app: FastifyInstance,
  controller: EmailController
) {
  app.get("/email", controller.getEmails);
  app.post("/email", controller.createEmail);
  app.get("/email/:id", controller.getEmailById);
  app.get("/email/pendentes", controller.getPending);
  app.put("/email/:id/localizacao", controller.updateLocation);
  app.get("/email/dashboard/contagem", controller.getCountEmails);
  app.get("/email/dashboard/estado", controller.getGroupByState);
  app.get("/email/dashboard/7dias", controller.getTendence7Days);
  app.get("/email/dashboard/top3", controller.getTop3Destinations);
}
