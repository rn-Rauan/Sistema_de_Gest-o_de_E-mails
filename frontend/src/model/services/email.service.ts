import { api } from "../../api/email.api";
import type { Email } from "../types/email";

export const emailService = {
  async getAllEmails(): Promise<Email[]> {
    const resp = await api.get("/email");
    return resp.data;
  },

  async getEmailPending(): Promise<Email[]> {
    const resp = await api.get("/email/pendentes");
    return resp.data;
  },

  async createEmail(email: Omit<Email, "id" | "estado" | "municipio">) {
    const resp = await api.post("/email", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  },

};
