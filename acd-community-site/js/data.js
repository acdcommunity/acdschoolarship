/* =========================================================================
   ACD COMMUNITY — FICHEIRO DE DADOS
   =========================================================================
   ESTE É O ÚNICO FICHEIRO QUE PRECISA DE EDITAR PARA ATUALIZAR O SITE.
   Não é preciso saber programação: basta seguir os exemplos abaixo.

   REGRAS RÁPIDAS:
   - Cada bolsa ou serviço é um bloco entre chavetas { ... }
   - Separe cada bloco por uma vírgula ,
   - Texto vai sempre entre aspas "assim"
   - Números NÃO levam aspas nem "kz" (ex: 4000, não "4000kz")
   - Para "desativar" uma bolsa temporariamente, mude active: true para active: false
   - Depois de editar, basta guardar o ficheiro e atualizar a página do site
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. BOLSAS DE ESTUDO DISPONÍVEIS
   -------------------------------------------------------------------------
   ➜ A MANEIRA MAIS FÁCIL DE EDITAR ESTA LISTA É PELO PAINEL DE ADMINISTRAÇÃO:
      abra o ficheiro admin.html no navegador, edite ou adicione bolsas por
      formulário, e descarregue o novo data.js pronto a substituir este.
      Editar aqui à mão também funciona — segue as mesmas regras de sempre.

   CAMPOS OBRIGATÓRIOS:
   pais    -> nome do país (aparece no título do cartão)
   status:   "aberta"      -> inscrições abertas (verde)
             "processando" -> a processar (âmbar)
             "brevemente"  -> brevemente disponível (cinza)
             "encerrada"   -> prazo terminado (vermelho)
   priceMin / priceMax -> intervalo do valor da inscrição (serviço ACD) em Kz
   active: true  -> aparece no site   |   active: false -> fica escondida

   CAMPOS OPCIONAIS (deixe de fora o que não se aplica, ou apague a linha):
   programa      -> nome do programa de bolsa, ex: "World in Serbia"
   nivel         -> "Licenciatura, Mestrado & Doutoramento"
   vagas         -> número de vagas (número, sem aspas)
   financiamento -> ex: "Totalmente financiada"
   prazo         -> data limite no formato "AAAA-MM-DD" (o site calcula
                     sozinho se já encerrou e muda o estado para "encerrada")
   beneficios    -> lista de benefícios, ex: ["Propinas", "Alojamento"]
   areas         -> lista de áreas prioritárias
   requisitos    -> lista de requisitos gerais
   documentos    -> lista de documentos necessários
   emailEnvio    -> e-mail para onde a candidatura deve ser enviada
   linkFormulario-> link do formulário oficial de candidatura
   linkInfo      -> link com mais informações / edital oficial
   observacao    -> nota importante em destaque
------------------------------------------------------------------------- */
const BOLSAS = [
  {
    pais: "Sérvia",
    programa: "World in Serbia",
    status: "aberta",
    nivel: "Licenciatura, Mestrado & Doutoramento",
    vagas: 100,
    financiamento: "Totalmente financiada",
    prazo: "2026-06-26",
    priceMin: 4000,
    priceMax: 7000,
    nota: "Programa do INAGBE em parceria com o Governo da Sérvia, para o ano académico 2026/2027.",
    beneficios: [
      "Cobertura integral das propinas",
      "Alojamento gratuito",
      "Alimentação",
      "Subsídio mensal",
      "Seguro de saúde",
      "Curso preparatório da língua sérvia"
    ],
    areas: ["Ciências", "Tecnologia", "Engenharia", "Artes", "Matemática (STEAM)"],
    requisitos: [
      "Nacionalidade angolana e residência em Angola",
      "Não possuir o grau académico para o qual se candidata",
      "Não ter beneficiado de bolsa financiada pelo Estado Angolano nos últimos 24 meses",
      "Licenciatura: Ensino Secundário nas áreas de Ciências Exactas/Técnicas/Tecnológicas, média ≥14, até 22 anos",
      "Mestrado/Doutoramento: grau reconhecido pelo Estado Angolano, média ≥14, até 35 anos"
    ],
    documentos: [
      "Bilhete de Identidade válido",
      "Passaporte válido",
      "Certificado de habilitações autenticado",
      "Histórico académico",
      "Carta de motivação",
      "Atestado médico",
      "Comprovativo de vínculo institucional (para docentes)",
      "Homologação/Reconhecimento do INAAREES (para pós-graduação)"
    ],
    emailEnvio: "worldinserbia@prosveta.gov.rs",
    linkFormulario: "https://docs.google.com/forms/d/e/1FAIpQLSevQItl0KUaeW/viewform",
    linkInfo: "https://prosveta.gov.rs/sti/stipendije-svet-u-srbiji/",
    observacao: "Toda a documentação deve ser traduzida para inglês. Docentes de Instituições de Ensino Superior Públicas têm preferência para Pós-Graduação. Candidaturas incompletas, fora do prazo ou em desconformidade com o edital serão automaticamente excluídas.",
    active: true
  },
  {
    pais: "Turquia",
    status: "aberta",
    priceMin: 4000,
    priceMax: 7000,
    nota: "Inscrições a decorrer",
    active: true
  },
  {
    pais: "França",
    status: "processando",
    priceMin: 4000,
    priceMax: 7000,
    nota: "A processar",
    active: true
  },
  {
    pais: "Índia",
    status: "processando",
    priceMin: 4000,
    priceMax: 7000,
    nota: "A processar",
    active: true
  },
  {
    pais: "Portugal",
    status: "processando",
    priceMin: 4000,
    priceMax: 7000,
    nota: "A processar",
    active: true
  },
  {
    pais: "Dubai",
    status: "processando",
    priceMin: 4000,
    priceMax: 7000,
    nota: "A processar",
    active: true
  },
  {
    pais: "Holanda",
    status: "processando",
    priceMin: 4000,
    priceMax: 7000,
    nota: "A processar",
    active: true
  }
];


/* -------------------------------------------------------------------------
   2. SERVIÇOS E PREÇOS
   -------------------------------------------------------------------------
   Organizados por categoria. Para adicionar um novo serviço, copie um
   bloco { ... } dentro da categoria certa e mude o texto e o preço.
   Para criar uma nova categoria, copie um bloco inteiro de categoria
   (desde categoria: até o ] que fecha "itens").
------------------------------------------------------------------------- */
const SERVICOS = [
  {
    categoria: "Tradução",
    itens: [
      { nome: "Certificado", preco: 5000 },
      { nome: "Histórico Escolar", preco: 5000 },
      { nome: "Diploma", preco: 4000 },
      { nome: "Bilhete de Identidade (BI)", preco: 2500 },
      { nome: "Cédula Pessoal", preco: 2500 },
      { nome: "Assento de Nascimento", preco: 4000 }
    ]
  },
  {
    categoria: "Tradução para Russo",
    itens: [
      { nome: "Passaporte", preco: 4000 },
      { nome: "Certificado", preco: 7000 },
      { nome: "Ficha Médica", preco: 5000 }
    ]
  },
  {
    categoria: "Tratamento de Documentos",
    itens: [
      { nome: "Carta de Motivação", preco: 1500 },
      { nome: "Carta de Recomendação", preco: 2000 },
      { nome: "Currículo Europass", preco: 2500 },
      { nome: "Certificado de Proficiência Inglesa", preco: 3000 },
      { nome: "Ficha Médica da Índia", preco: 3000 },
      { nome: "Ficha Médica do Japão", preco: 3000 },
      { nome: "Ficha Médica Geral (todas as bolsas)", preco: 3000 },
      { nome: "Plano de Estudo", preco: 2000 }
    ]
  },
  {
    categoria: "Agendamento",
    itens: [
      { nome: "Agendamento de Passaporte", preco: 4000 },
      { nome: "Agendamento — Consulado Português (Visto de Turismo, Estudante, CPLP)", preco: 0 }
    ]
  },
  {
    categoria: "Viagem e Visto",
    itens: [
      { nome: "Visto de Turismo", preco: 800000 },
      { nome: "Visto de Estudante", preco: 1500000 },
      { nome: "Visto da CPLP", preco: 1500000 }
    ]
  }
];

/* preco: 0 significa "consulte-nos" (o preço aparecerá como "Sob consulta") */


/* -------------------------------------------------------------------------
   3. AVISOS GERAIS (aparecem no topo da secção de Serviços)
------------------------------------------------------------------------- */
const AVISOS = {
  desconto: "Margem de desconto até 20% em pacotes de documentos.",
  urgencia: "Para documentos urgentes, o preço varia entre +25% e +75%.",
  inscricaoBolsa: "Inscrição para Bolsa de Estudo: de 4.000 Kz a 7.000 Kz, consoante o país."
};


/* -------------------------------------------------------------------------
   4. CONTACTOS E REDES SOCIAIS
------------------------------------------------------------------------- */
const CONTACTOS = {
  whatsappNumero: "244952285244",           // usado nos botões "Obter serviço"
  telefones: ["+244 942 503 051", "+244 952 285 244"],
  email: "acdcommunity.org@gmail.com",
  linkWhatsappDireto: "https://wa.me/message/UOFJ4ECVRVVKO1",
  canalWhatsapp: "https://whatsapp.com/channel/0029VagRuOk1XquczRIfBn0d",
  grupoWhatsappDocumentos: "https://chat.whatsapp.com/BEcaQnmL3aDL13nRHfSBEW",
  grupoMundoDigital: "https://chat.whatsapp.com/FMeBCsbBh723A8NBQKAIUS",
  facebook: "https://www.facebook.com/profile.php?id=100069093128515",
  facebookScholarship: "https://www.facebook.com/share/16v1wBiRsZ/",
  instagram: "https://www.instagram.com/acd.community",
  youtube: "https://youtube.com/@acdcommunity-zv4io",
  tiktok: "https://vm.tiktok.com/ZMHvwpjxdpAoj-wXJnV/"
};

/* -------------------------------------------------------------------------
   5. SOBRE A ACD COMMUNITY
------------------------------------------------------------------------- */
const SOBRE = {
  descricao: "Uma comunidade com fins em Ciência e Tecnologia: Consultoria de Bolsas de Estudo, Desenvolvimento de Software, Implementação de Sites e Assistência Técnica.",
  pilares: [
    { titulo: "Bolsas de Estudo", texto: "Consultoria completa para concorrer a bolsas no estrangeiro, da tradução de documentos ao acompanhamento do processo." },
    { titulo: "Desenvolvimento de Software", texto: "Criação de soluções digitais sob medida para negócios e instituições." },
    { titulo: "Sites e Implementação", texto: "Conceção e publicação de sites profissionais, como este." },
    { titulo: "Assistência Técnica", texto: "Suporte técnico contínuo para manter tudo a funcionar." }
  ]
};


/* -------------------------------------------------------------------------
   6. ACESSO AO PAINEL DE ADMINISTRAÇÃO (admin.html)
   -------------------------------------------------------------------------
   Isto é apenas um travão simples para visitantes casuais — NÃO é uma
   senha de segurança real, porque qualquer pessoa pode ver o código deste
   ficheiro. Para proteger a sério, restrinja o acesso a admin.html ao
   nível da hospedagem (ex: proteção por password no Netlify, ou não
   publicar o link do painel publicamente).
------------------------------------------------------------------------- */
const ADMIN = {
  senha: "acd2026"
};
