import { useState, useCallback } from "react";
import { emailService } from "../model/services/email.service";
import type { Email } from "../model/types/email";
import { statesAndCities } from "../model/util/statesAndCities.util";

export function usePendingViewModel() {
  const [pending, setPending] = useState<Email[]>([]);
  const [modifiedEmails, setModifiedEmails] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPending = useCallback(async () => {
    try {
      setLoading(true);
      const data = await emailService.getEmailPending();
      setPending(data);
      setModifiedEmails(new Set());
    } catch (err: any) {
      setError("Erro ao carregar pendentes");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmail = (id: number, field: "estado" | "municipio", value: string) => {
    setPending((prev) =>
      prev.map((email) => {
        if (email.id == id) {
          const updatedEmail = { ...email, [field]: value };
          if (field == "estado") {
            updatedEmail.municipio = "";
          }
          return updatedEmail;
        }
        return email;
      })
    );
    setModifiedEmails((prev) => new Set(prev).add(id));
  };

  const saveAllPendingEmails = async () => {
    setSaving(true);
    setError(null);
    const emailsToSave = pending.filter((email) => modifiedEmails.has(email.id));

    try {
      await Promise.all(
        emailsToSave.map((email) => {
          if (email.estado && email.municipio) {
            return emailService.updateEmailClassification(
              email.id,
              email.estado,
              email.municipio
            );
          }
          return Promise.resolve();
        })
      );
      await loadPending();
    } catch (err) {
      setError("Falha ao salvar um ou mais e-mails.");
    } finally {
      setSaving(false);
    }
  };

  const estados = Object.keys(statesAndCities);
  const municipios = statesAndCities;

  return {
    pending,
    loading,
    saving,
    error,
    loadPending,
    updateEmail,
    saveAllPendingEmails,
    estados,
    municipios,
  };
}