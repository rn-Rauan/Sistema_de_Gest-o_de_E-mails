import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando população da tabela de Emails...');

  const estados = ["SP", "RJ", "MG", "RS", "BA", "PR", "SC", "CE", "GO", "PA"];
  const municipios = {
    SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
    RJ: ["Rio de Janeiro", "Niterói", "Petrópolis"],
    MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
    RS: ["Porto Alegre", "Caxias do Sul", "Pelotas"],
    BA: ["Salvador", "Feira de Santana", "Ilhéus"],
    PR: ["Curitiba", "Londrina", "Maringá"],
    SC: ["Florianópolis", "Joinville", "Blumenau"],
    CE: ["Fortaleza", "Sobral", "Caucaia"],
    GO: ["Goiânia", "Anápolis", "Aparecida de Goiânia"],
    PA: ["Belém", "Marabá", "Santarém"],
  };

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomDate() {
    const start = new Date(2024, 0, 1).getTime();
    const end = new Date(2025, 11, 31).getTime();
    return new Date(start + Math.random() * (end - start));
  }

  function gerarEmailFake(id) {
    const remetentes = [
      "contato@empresa.com.br",
      "suporte@plataforma.net",
      "marketing@lojavirtual.com",
      "rh@corporacao.com",
      "noticias@portalbr.com",
      "governo@estado.gov.br",
      "noreply@sistema.com",
      "alerta@seguranca.com",
      "financeiro@contas.com",
      "info@universidade.edu"
    ];

    const destinatarios = [
      "joao.silva@teste.com",
      "maria.gomes@teste.com",
      "carlos.rocha@teste.com",
      "fernanda.costa@teste.com",
      "lucas.martins@teste.com",
      "ana.paula@teste.com",
      "thiago.souza@teste.com",
      "patricia.alves@teste.com",
      "julio.miranda@teste.com",
      "debora.pereira@teste.com"
    ];

    const assuntos = [
      "Promoção Exclusiva",
      "Atualização de Termos",
      "Seu pedido foi enviado!",
      "Comunicado Interno",
      "Aviso Importante",
      "Confirmação de Cadastro",
      "Sua nota fiscal está disponível",
      "Segurança da Conta",
      "Pagamento Recebido",
      "Agendamento Confirmado"
    ];

    const estado = Math.random() > 0.15 ? randomItem(estados) : null; // 15% nulo
    const municipio = estado ? randomItem(municipios[estado]) : null;

    return {
      remetente: randomItem(remetentes),
      destinatario: randomItem(destinatarios),
      dataEnvio: randomDate(),
      assunto: `${randomItem(assuntos)} #${id}`,
      corpo: `Mensagem automática referente ao assunto #${id}.`,
      estado,
      municipio,
    };
  }

  // Gerar 50 emails
  const emailsDeTeste = [];
  for (let i = 1; i <= 50; i++) {
    emailsDeTeste.push(gerarEmailFake(i));
  }

  const result = await prisma.email.createMany({
    data: emailsDeTeste,
  });

  console.log(`${result.count} emails foram inseridos com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
