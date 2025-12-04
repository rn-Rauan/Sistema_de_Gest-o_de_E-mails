import { useEffect } from "react";
import "./App.css";
import { useEmailViewModel } from "./viewmodels/useEmailViewModel";

function App() {
  const {
    emails,
    loading,
    error,
    fetchAllEmails,
    fetchPendingEmails,
  } = useEmailViewModel();

  useEffect(() => {
    fetchAllEmails();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de E-mails</h1>
      <button onClick={fetchAllEmails}>Todos os E-mails</button>
      <button onClick={fetchPendingEmails}>E-mails Pendentes</button>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <strong>Assunto:</strong> {email.assunto} <br />
            <strong>Remetente:</strong> {email.remetente} <br />
            <strong>Destinatário:</strong> {email.destinatario} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;