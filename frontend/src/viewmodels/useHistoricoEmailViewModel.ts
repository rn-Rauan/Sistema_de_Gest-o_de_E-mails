import { useCallback, useEffect, useState } from "react";
import { emailService } from "../model/services/email.service";

export function useHistoricoEmailViewModel() {
  const [emails, setEmails] = useState<any[]>([]);
  const [emailsFiltrados, setEmailsFiltrados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await emailService.getAllEmails();
      setEmails(dados);
      setEmailsFiltrados(dados);
    } catch (err) {
      setError("Falha ao carregar o histórico de e-mails.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);
  const filtrar = () => {
    let filtrado = [...emails];

    if (search.trim() != "") {
      filtrado = filtrado.filter((e) =>
        `${e.assunto} ${e.remetente}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (dataFiltro != "") {
      filtrado = filtrado.filter((e) => e.dataEnvio.startsWith(dataFiltro));
    }

    setEmailsFiltrados(filtrado);
  };

  const limparFiltros = () => {
    setSearch("");
    setDataFiltro("");
    setEmailsFiltrados(emails);
  };

  return {
    emails,
    emailsFiltrados,
    search,
    setSearch,
    dataFiltro,
    setDataFiltro,
    filtrar,
    limparFiltros,
    carregar,
  };
}
