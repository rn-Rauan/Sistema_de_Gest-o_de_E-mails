import { api } from "../../api/email.api";
import type { Email } from "../types/email";

export async function getAllEmails(): Promise<Email[]> {
  const resp = await api.get("/email");
  return resp.data;
}

export async function getEmailPending(): Promise<Email[]> {
  const resp = await api.get("/email/pendentes");
  return resp.data;
}

export async function createEmail(
  email: Omit<Email, "id" | "estado" | "municipio">
) {
  const resp = await api.post("/email", email, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.data;
}