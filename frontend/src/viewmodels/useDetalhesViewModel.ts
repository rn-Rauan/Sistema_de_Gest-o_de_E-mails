import { useCallback, useEffect, useState } from "react";
import { emailService } from "../model/services/email.service";
import type { Email } from "../model/types/email";
import { statesAndCities } from "../model/util/statesAndCities.util";

export function useEmailDetailsViewModel(id: number) {
  const [email, setEmail] = useState<Email | null>(null);
  const [editableEmail, setEditableEmail] = useState<Partial<Email>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const estados = Object.keys(statesAndCities);

  const getMunicipios = (uf: string | undefined) => {
    if (!uf) return [];
    return statesAndCities[uf] || [];
  };

  const loadEmail = useCallback(async () => {
    try {
      setLoading(true);
      const data = await emailService.getEmailByID(id);

      if (!data) {
        setError("Email não encontrado.");
        return;
      }

      setEmail(data);
      setEditableEmail(data);
    } catch (err) {
      setError("Erro ao carregar o e-mail.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEmail();
  }, [id]);

  const toggleEdit = () => {
    setError(null);

    if (isEditing) {
      setEditableEmail(email || {});
    }

    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field: keyof Email, value: string) => {
    setError(null);

    setEditableEmail((prev) => {
      const updated = { ...prev, [field]: value };

      if (field == "estado") {
        updated.municipio = "";
      }

      return updated;
    });
  };

  const saveChanges = async () => {
    if (!email) {
      setError("Nenhum e-mail carregado.");
      return;
    }

    const estado = editableEmail.estado;
    const municipio = editableEmail.municipio;

    if (!estado) {
      setError("Selecione um estado.");
      return;
    }

    if (!municipio) {
      setError("Selecione um município.");
      return;
    }

    const validCities = getMunicipios(estado);
    if (!validCities.includes(municipio)) {
      setError("O município selecionado não pertence ao estado escolhido.");
      return;
    }

    if (estado == email.estado && municipio == email.municipio) {
      setError("Nenhuma alteração detectada.");
      return;
    }

    try {
      setSaving(true);

      await emailService.updateEmailClassification(id, estado, municipio);

      setEmail((prev) => ({ ...prev!, estado, municipio }));
      setIsEditing(false);
    } catch (err) {
      setError("Falha ao salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  return {
    email,
    editableEmail,
    estados,
    getMunicipios,
    loading,
    saving,
    error,
    isEditing,
    toggleEdit,
    handleFieldChange,
    saveChanges,
  };
}
