import { useState } from "react";
import { emailService } from "../model/services/email.service";
import { statesAndCities } from "../model/util/statesAndCities.util";

export function useCreateEmailVewModel() {
  const [remetente, setRemetente] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [dataEnvio, setDataEnvio] = useState("");
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const estados = Object.keys(statesAndCities);
  const municipios = estado ? statesAndCities[estado] : [];

  const salvar = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!assunto.trim() || !corpo.trim() || !estado || !municipio.trim()) {
      setError("O assunto, o corpo, o estado e o município não podem estar vazios.");
      setLoading(false);
      return;
    }

    setLoading(true);


    try {
      const dataDeEnvio = dataEnvio
        ? new Date(dataEnvio).toISOString()
        : new Date().toISOString();

      await emailService.createEmail({
        remetente,
        destinatario,
        dataEnvio: dataDeEnvio,
        assunto,
        corpo,
        estado,
        municipio,
      });

      setSuccess(true);

      setRemetente("");
      setDestinatario("");
      setDataEnvio("");
      setAssunto("");
      setCorpo("");
      setEstado("");
      setMunicipio("");
    } catch (err: any) {
      setLoading(false);
      setError("Erro ao salvar o e-mail. Verifique os dados e tente novamente");
    } finally {
      setLoading(false);
    }
  };

  return {
    remetente,
    setRemetente,
    destinatario,
    setDestinatario,
    dataEnvio,
    setDataEnvio,
    assunto,
    setAssunto,
    corpo,
    setCorpo,
    estado,
    setEstado,
    municipio,
    setMunicipio,

    estados,
    municipios,

    salvar,
    loading,
    error,
    success,
  };
}
