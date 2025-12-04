import { useState } from "react";
import type { Email } from "../model/types/email";
import * as emailService from "../model/services/email.service";

export type EmailState = {
  emails: Email[];
  loading: boolean;
  error: string | null;
};

export type EmailActions = {
  fetchAllEmails: () => Promise<void>;
  fetchPendingEmails: () => Promise<void>;
};

export function useEmailViewModel(): EmailState & EmailActions {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAllEmails() {
    try {
      setLoading(true);
      setError(null);
      const data = await emailService.getAllEmails();
      setEmails(data);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar os e-mails.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPendingEmails() {
    try {
      setLoading(true);
      setError(null);
      const data = await emailService.getEmailPending();
      setEmails(data);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao buscar os e-mails pendentes.");
    } finally {
      setLoading(false);
    }
  }

  return { emails, loading, error, fetchAllEmails, fetchPendingEmails };
}