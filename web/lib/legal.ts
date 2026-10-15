// Páginas legais da Howhow: Política de Privacidade, Termos de Uso e Exclusão de Dados.
// Texto copiado sem alterações das páginas oficiais em howhow.com.br (mesmos endereços: /politica-de-privacidade,
// /termos-de-uso e /exclusao-de-dados), que são as URLs informadas ao Google, Meta e TikTok nas integrações.
// Qualquer mudança de texto aqui é mudança jurídica: passe pelo jurídico antes.
//
// Blocos: p = parágrafo; list = itens (label em negrito opcional); note = destaque; links = lista de links.
// Nos textos, e-mails e "howhow.com.br/..." viram links automaticamente (ver LegalPage).

export type LegalBlock =
  | { p: string; label?: string }
  | { list: { label?: string; text: string }[] }
  | { note: string; label?: string }
  | { links: { label: string; href: string }[] };

export type LegalSection = { id: string; n: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: "politica-de-privacidade" | "termos-de-uso" | "exclusao-de-dados";
  tab: string;
  title: string;
  subtitle: string;
  updated?: string;
  sections: LegalSection[];
  meta: { title: string; description: string };
};

export const privacy: LegalDoc = {
  slug: "politica-de-privacidade",
  tab: "Política de Privacidade",
  title: "Política de Privacidade Global",
  subtitle: "Em conformidade com a LGPD (Brasil) e GDPR (Europa)",
  updated: "27 de Janeiro de 2026",
  meta: {
    title: "Política de Privacidade — Howhow",
    description: "Como a Howhow coleta, utiliza, compartilha e protege dados pessoais, em conformidade com a LGPD e a GDPR.",
  },
  sections: [
    {
      id: "escopo",
      n: "0",
      title: "Escopo e Controlador",
      blocks: [
        { p: "Esta Política descreve como a Howhow (a “Plataforma”) coleta, utiliza, compartilha e protege dados pessoais ao operar o website, aplicativos e APIs associados ao domínio howhow.com.br." },
        { label: "Controlador:", p: "para fins desta Política, “Howhow” refere-se à entidade responsável por operar a Plataforma e determinar as finalidades e meios do tratamento de dados pessoais. Informações de contato oficiais estão na Seção 14." },
        { label: "Transparência:", note: "a Howhow não solicita senhas de contas de YouTube/Google, Meta (Instagram/Facebook), TikTok e outras. A conexão ocorre via OAuth (login seguro no provedor), e você pode revogar permissões a qualquer momento." },
        { p: "Esta Política deve ser lida em conjunto com os Termos de Uso e com as instruções públicas de exclusão de dados." },
      ],
    },
    {
      id: "dados-coletados",
      n: "1",
      title: "Dados que Coletamos (Incluindo Financeiros)",
      blocks: [
        { p: "Para operar nosso Marketplace e recursos de gestão financeira, coletamos dados conforme a sua interação com a Plataforma." },
        {
          list: [
            { label: "Dados de Identificação:", text: "Nome, CPF/CNPJ, RG, Data de Nascimento, Endereço, Selfie (para prova de vida/KYC)." },
            { label: "Dados Financeiros Críticos:", text: "Dados bancários (Agência, Conta, Chave Pix), histórico de transações, notas fiscais emitidas. Nota: Não armazenamos números completos de cartão de crédito; estes são processados diretamente por gateways certificados PCI-DSS." },
            { label: "Dados de Perfil Social:", text: "Métricas públicas e privadas (mediante autorização OAuth) de redes sociais (alcance, engajamento, audiência), quando você conecta suas contas." },
            { label: "Dados de Uso e Logs:", text: "Registros de acesso, eventos de segurança, informações técnicas do dispositivo/navegador (ex.: IP, data/hora, user-agent), necessários para prevenção a fraudes e estabilidade." },
            { label: "Conteúdos e Arquivos:", text: "Materiais enviados por você (ex.: banners, assets, briefings, comprovantes), quando aplicável." },
            { label: "Dados de Integrações (OAuth):", text: "tokens de acesso/atualização e identificadores técnicos (ex.: open_id), usados exclusivamente para sincronizar métricas e executar funcionalidades solicitadas por você. Esses tokens são tratados como segredos e armazenados com criptografia no servidor." },
          ],
        },
        { label: "Dados sensíveis:", note: "a Howhow não solicita intencionalmente dados sensíveis (ex.: origem racial, religião, dados biométricos para identificação), exceto quando estritamente necessários para segurança/validação (ex.: prova de vida/KYC, quando aplicável)." },
      ],
    },
    {
      id: "uso-dos-dados",
      n: "2",
      title: "Como Usamos seus Dados (Bases Legais)",
      blocks: [
        { p: "Tratamos seus dados para:" },
        {
          list: [
            { label: "Execução de Contrato:", text: "Processar pagamentos, emitir invoices, intermediar campanhas." },
            { label: "Cumprimento Legal:", text: "Reportar operações financeiras aos órgãos competentes (COAF, Receita Federal) quando exigido por lei (Prevenção à Lavagem de Dinheiro)." },
            { label: "Segurança:", text: "Análise antifraude, validação de identidade e proteção contra acessos não autorizados." },
            { label: "Legítimo Interesse:", text: "Melhorar funcionalidades, medir desempenho, prevenir abuso e proteger a integridade do marketplace, respeitando seus direitos e expectativas." },
            { label: "Consentimento (quando aplicável):", text: "Para integrações via OAuth e acesso a dados de plataformas de terceiros, conforme permitido por você." },
          ],
        },
      ],
    },
    {
      id: "inteligencia-artificial",
      n: "3",
      title: "Uso em Inteligência Artificial e Matching",
      blocks: [
        { p: "Utilizamos algoritmos proprietários para conectar Marcas e Criadores. Dados de performance de campanhas anteriores, taxas de resposta e avaliações são processados para gerar um \"Score de Afinidade\"." },
        { label: "Anonimização:", p: "Dados utilizados para treinamento geral de modelos de IA são anonimizados ou agregados, impedindo a reidentificação direta do titular fora do contexto da plataforma." },
        { label: "Decisões automatizadas:", p: "Quando houver recomendações/ordenação de perfis, elas têm finalidade de sugestão e não impedem que você navegue e selecione opções manualmente." },
      ],
    },
    {
      id: "apis-de-terceiros",
      n: "4",
      title: "Dados de APIs (YouTube, Instagram, etc)",
      blocks: [
        { p: "A Howhow utiliza os Serviços de API do YouTube, Meta (Instagram/Facebook) e TikTok. Ao conectar suas contas, você concorda em estar vinculado aos Termos de Serviço dessas plataformas:" },
        {
          links: [
            { label: "Termos de Serviço do YouTube", href: "https://www.youtube.com/t/terms" },
            { label: "Política de Privacidade do Google", href: "https://policies.google.com/privacy" },
            { label: "Termos da Meta", href: "https://www.facebook.com/legal/terms" },
            { label: "Termos do TikTok", href: "https://www.tiktok.com/legal/terms-of-service" },
          ],
        },
        { label: "Revogação:", p: "Você pode revogar o acesso da Howhow aos seus dados a qualquer momento através das configurações de segurança do Google/Meta/TikTok e/ou desconectando a integração dentro da Plataforma." },
        { label: "Minimização:", p: "coletamos apenas o necessário para (i) exibir métricas no seu painel, (ii) gerar relatórios de campanha, (iii) melhorar matching e segurança do marketplace, e (iv) cumprir obrigações legais/contratuais. Exemplo de campos sincronizados (conforme o provedor e escopos autorizados): identificadores técnicos, nome/usuário, foto/avatar, e contadores de performance (seguidores, visualizações, vídeos, curtidas)." },
        { label: "Google / YouTube API:", p: "O uso e a transferência de informações recebidas de APIs do Google pela Howhow obedecem à Google API Services User Data Policy, incluindo os requisitos de Limited Use." },
        { label: "Limited Use (resumo prático):", note: "informações recebidas de APIs do Google são usadas apenas para fornecer e melhorar funcionalidades solicitadas por você (ex.: exibir métricas e relatórios), não são vendidas e não são utilizadas para segmentação publicitária baseada em dados do Google. O acesso humano a esses dados é restrito e ocorre somente quando necessário para suporte, segurança, conformidade e prevenção a abusos." },
      ],
    },
    {
      id: "compartilhamento",
      n: "5",
      title: "Compartilhamento e Operadores",
      blocks: [
        { p: "Não vendemos seus dados. Compartilhamos apenas o estritamente necessário com:" },
        {
          list: [
            { label: "Instituições Financeiras:", text: "Para processamento de saques, boletos e pagamentos." },
            { label: "Autoridades Governamentais:", text: "Mediante ordem judicial ou requisição legal expressa." },
            { label: "Infraestrutura Cloud (ex.: Google Cloud/Firebase):", text: "Para hospedagem e operação segura de dados." },
          ],
        },
        { p: "Quando atuamos como operador (ex.: para Marcas em campanhas), tratamos dados conforme instruções e limites contratuais. Quando atuamos como controladora, definimos finalidades e meios do tratamento para operar a Plataforma." },
      ],
    },
    {
      id: "seguranca",
      n: "6",
      title: "Segurança Bancária e Proteção",
      blocks: [
        { p: "Adotamos medidas técnicas e administrativas de segurança, incluindo criptografia em trânsito (TLS), controles de acesso, segregação de ambientes, monitoramento e auditoria de eventos (logs). O acesso a dados sensíveis é restrito por necessidade, monitorado e revisado." },
        { label: "Segredos e tokens:", p: "credenciais e tokens de integrações são tratados como informação confidencial e armazenados com criptografia no servidor, além de controles de acesso e registro de auditoria." },
      ],
    },
    {
      id: "seus-direitos",
      n: "7",
      title: "Seus Direitos (LGPD/GDPR)",
      blocks: [
        { p: "Você pode solicitar via painel de controle ou DPO:" },
        {
          list: [
            { text: "Acesso e Portabilidade dos dados." },
            { text: "Correção de dados incompletos ou errados." },
            { text: "Eliminação de dados (salvo os que precisamos manter por obrigação legal, como registros fiscais por 5 anos)." },
          ],
        },
        { p: "Para exercer seus direitos, poderemos solicitar comprovação de identidade para proteger sua conta e evitar fraudes." },
      ],
    },
    {
      id: "cookies",
      n: "8",
      title: "Cookies, Logs e Tecnologias Semelhantes",
      blocks: [
        { p: "Utilizamos cookies e tecnologias semelhantes para autenticação, preferências (ex.: tema), segurança, prevenção a fraudes e melhoria da experiência. Também podemos registrar eventos técnicos (logs) para diagnóstico e auditoria." },
        { p: "Você pode gerenciar cookies pelo seu navegador. A desativação de cookies essenciais pode afetar o funcionamento da Plataforma." },
      ],
    },
    {
      id: "transferencia-internacional",
      n: "9",
      title: "Transferência Internacional",
      blocks: [
        { p: "Podemos armazenar e processar dados em provedores de infraestrutura e serviços localizados fora do seu país (ex.: serviços em nuvem). Nesses casos, adotamos salvaguardas adequadas e exigimos padrões de segurança e confidencialidade compatíveis com LGPD/GDPR." },
      ],
    },
    {
      id: "retencao",
      n: "10",
      title: "Retenção de Dados",
      blocks: [
        { p: "Mantemos seus dados apenas pelo tempo necessário para cumprir as finalidades descritas nesta Política, inclusive para cumprir obrigações legais, resolver disputas e fazer cumprir nossos contratos." },
        { p: "Alguns dados podem ser retidos por períodos mínimos exigidos por lei (ex.: registros fiscais/financeiros e evidências de transações)." },
      ],
    },
    {
      id: "exclusao",
      n: "11",
      title: "Exclusão de Dados e Revogação de Acessos",
      blocks: [
        { p: "Você pode desconectar integrações (YouTube/Meta/TikTok) a qualquer momento no menu Integrações do seu dashboard. A revogação também pode ser feita diretamente nas configurações da respectiva plataforma." },
        { p: "Para solicitar exclusão de dados e/ou encerramento de conta, utilize as instruções da nossa página pública de exclusão: howhow.com.br/exclusao-de-dados." },
        { label: "Observação:", note: "a exclusão pode ser parcial quando houver necessidade de retenção por obrigação legal ou para prevenção a fraudes (ex.: registros de transações e logs de segurança)." },
        { label: "Prazos:", p: "responderemos solicitações de titulares dentro dos prazos aplicáveis (ex.: LGPD), podendo estender quando permitido, mediante justificativa." },
      ],
    },
    {
      id: "criancas",
      n: "12",
      title: "Crianças e Adolescentes",
      blocks: [
        { p: "A Plataforma é destinada a maiores de 18 anos. Não coletamos intencionalmente dados de crianças. Se você acredita que uma criança forneceu dados pessoais à Howhow, entre em contato para que possamos avaliar e tomar as medidas apropriadas (inclusive exclusão, quando aplicável)." },
      ],
    },
    {
      id: "alteracoes",
      n: "13",
      title: "Alterações nesta Política",
      blocks: [
        { p: "Podemos atualizar esta Política periodicamente para refletir mudanças legais, técnicas ou operacionais. Quando apropriado, comunicaremos alterações relevantes por meios razoáveis (ex.: aviso no app)." },
      ],
    },
    {
      id: "dpo",
      n: "14",
      title: "Encarregado de Dados (DPO)",
      blocks: [
        { p: "Para assuntos relacionados à privacidade e proteção de dados:" },
        {
          list: [
            { label: "Encarregado (DPO):", text: "Departamento Jurídico Howhow" },
            { label: "Email:", text: "privacy@howhow.com.br" },
          ],
        },
        { p: "Se você estiver no Brasil e entender que sua solicitação não foi atendida adequadamente, você também pode contatar a Autoridade Nacional de Proteção de Dados (ANPD) por meio dos canais oficiais." },
      ],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "termos-de-uso",
  tab: "Termos de Uso",
  title: "Termos de Uso e Condições Gerais",
  subtitle: "As regras para usar a Howhow como marca, agência ou criador",
  updated: "27 de Janeiro de 2026",
  meta: {
    title: "Termos de Uso e Condições Gerais — Howhow",
    description: "Termos de Uso e Condições Gerais da plataforma Howhow para marcas, agências e criadores.",
  },
  sections: [
    {
      id: "definicoes",
      n: "1",
      title: "Definições e Interpretação",
      blocks: [
        { p: "Para os fins destes Termos, consideram-se:" },
        {
          list: [
            { label: "Plataforma:", text: "O sistema Howhow, incluindo website, APIs, e serviços relacionados." },
            { label: "Usuário:", text: "Qualquer pessoa física ou jurídica cadastrada (Criadores, Marcas, Agências)." },
            { label: "Campanha:", text: "Acordo comercial celebrado entre Marca/Agência e Criador através da Plataforma." },
            { label: "Carteira Digital:", text: "Interface visual do saldo virtual custodiado por processadores de pagamento parceiros." },
            { label: "Conteúdo:", text: "Todo material (texto, imagem, vídeo, áudio) submetido ou criado no âmbito da Plataforma." },
            { label: "Serviços de Terceiros:", text: "Plataformas e provedores externos (ex.: YouTube/Google, Meta, TikTok, gateways de pagamento, serviços de nuvem) integrados ao funcionamento da Plataforma." },
          ],
        },
        { p: "Quando houver conflito entre estes Termos e regras específicas de uma Campanha (briefing/contrato), prevalecerão as regras da Campanha para aquela contratação, sem prejuízo das disposições gerais de segurança, compliance e uso aceitável aqui descritas." },
      ],
    },
    {
      id: "adesao",
      n: "2",
      title: "Adesão e Cadastro",
      blocks: [
        { label: "2.1. Capacidade Civil.", p: "O uso é restrito a maiores de 18 anos ou menores emancipados com plena capacidade civil. Pessoas Jurídicas devem ser representadas por sócios ou procuradores com poderes estatutários." },
        { label: "2.2. Veracidade dos Dados.", p: "A Howhow reserva-se o direito de utilizar meios legais (como verificação de documentos e biometria) para confirmar a identidade. Dados falsos acarretarão o bloqueio imediato e retenção de saldos preventivamente para averiguação de fraude." },
        { label: "2.3. Segurança da Conta.", p: "O Usuário é o único responsável pelas operações realizadas com suas credenciais. A Howhow não se responsabiliza por invasões decorrentes de falha do Usuário na guarda de senhas." },
        { label: "2.4. Compliance, KYC/KYB e Prevenção a Fraudes.", p: "Para proteger o Marketplace, a Howhow pode solicitar informações e documentos adicionais (ex.: dados cadastrais, comprovação de titularidade de conta, comprovante de endereço) e utilizar mecanismos de análise de risco, sob pena de limitação de funcionalidades (ex.: saques) até a conclusão da verificação." },
        { label: "2.5. Representação e Autorizações.", p: "Ao conectar contas de Serviços de Terceiros (ex.: YouTube, Meta, TikTok), o Usuário declara ser titular/administrador legítimo ou possuir autorização suficiente para conceder as permissões solicitadas (OAuth), respondendo por quaisquer violações." },
      ],
    },
    {
      id: "uso-aceitavel",
      n: "3",
      title: "Uso Aceitável e Conduta",
      blocks: [
        { label: "3.1. Integridade do Marketplace.", p: "É proibido usar a Plataforma para fraude, lavagem de dinheiro, engenharia social, assédio, spam, scraping não autorizado, reverse engineering, exploração de vulnerabilidades ou qualquer atividade ilegal." },
        { label: "3.2. Conteúdo Proibido.", p: "É vedado publicar, enviar ou negociar conteúdo que viole direitos autorais, marca, imagem/voz de terceiros; que promova discurso de ódio, violência, abuso, exploração sexual, drogas ilícitas, armas, ou atividades que violem políticas das plataformas conectadas." },
        { label: "3.3. Políticas de Plataformas (YouTube/TikTok/Meta etc.).", p: "O Usuário concorda em cumprir, além destes Termos, as políticas, termos e regras aplicáveis de Serviços de Terceiros quando utilizar integrações, recursos de login, métricas e/ou publicação de conteúdo. A Howhow pode restringir funcionalidades se necessário para manter conformidade com exigências de provedores de API." },
        { label: "3.4. Anti-Circumvention.", p: "Caso haja match/negociação iniciada via Howhow, é proibido contornar o fluxo de contratação e pagamento por fora com a finalidade de evitar taxas, regras de escrow, auditoria, segurança e proteção contra fraude." },
        { label: "3.5. Auditoria e Enforcements.", p: "A Howhow pode investigar, suspender, limitar funcionalidades e/ou encerrar contas quando houver indícios razoáveis de violação destes Termos, das leis aplicáveis ou das políticas de Serviços de Terceiros." },
      ],
    },
    {
      id: "gestao-financeira",
      n: "4",
      title: "Gestão Financeira, Custódia e Saques",
      blocks: [
        { label: "4.1. Mandato de Gestão.", p: "Ao transacionar na Plataforma, o Usuário outorga à Howhow e seus parceiros de pagamento (Gateways/Instituições de Pagamento), na extensão permitida pela lei, mandato para receber, custodiar e repassar valores referentes às Campanhas." },
        { label: "4.2. Saldo em Custódia.", p: "Os valores visualizados na \"Carteira\" não representam depósito bancário nem rendem juros. São meros indicativos de créditos a serem liquidados conforme as regras de pagamento." },
        { label: "4.3. Liberação de Valores (Escrow).", p: "Os pagamentos a Criadores ficam retidos (status \"Pendente\" ou \"Em Custódia\") até a confirmação da entrega do serviço e aprovação pela Marca, ou decurso de prazo automático estipulado no Contrato da Campanha." },
        { label: "4.4. Bloqueio de Saldo.", p: "A Howhow reserva-se o direito de bloquear saques ou saldos em casos de: (i) Disputas abertas sobre entregas; (ii) Suspeita de fraude ou lavagem de dinheiro; (iii) Determinação judicial; (iv) Dívidas do Usuário com a Plataforma." },
        { label: "4.5. Processadores de Pagamento.", p: "Operações financeiras podem ser executadas por terceiros (Instituições de Pagamento, adquirentes, gateways). A Howhow não armazena números completos de cartão e não controla políticas internas desses provedores, sem prejuízo de exigir padrões razoáveis de segurança e conformidade." },
      ],
    },
    {
      id: "taxas",
      n: "5",
      title: "Taxas, Comissões e Remuneração",
      blocks: [
        { label: "5.1. Taxa de Serviço (Service Fee).", p: "A Howhow cobra uma taxa sobre o valor total transacionado na campanha. O percentual vigente é informado no checkout ou na proposta comercial. Esta taxa não é reembolsável em caso de cancelamento por culpa do Usuário." },
        { label: "5.2. Impostos.", p: "A Howhow emite nota fiscal apenas sobre a sua Taxa de Intermediação. A responsabilidade pela emissão de nota fiscal referente ao serviço de publicidade/conteúdo é exclusiva do Criador para com a Marca (Tomador), devendo as partes observar as regras tributárias de seus domicílios." },
        { label: "5.3. Chargeback.", p: "Caso uma Marca realize chargeback ou contestação indevida de cartão de crédito após a entrega do serviço, a dívida será cobrada pela Howhow por todos os meios legais, acrescida de multa de 10% e juros legais." },
      ],
    },
    {
      id: "campanhas",
      n: "6",
      title: "Campanhas e Obrigações de Entrega",
      blocks: [
        { label: "6.1. Obrigações do Criador.", p: "O Criador compromete-se a: (i) Entregar o conteúdo no prazo e formato acordados; (ii) Manter o conteúdo público pelo tempo estipulado; (iii) Não realizar publicidade concorrente se houver cláusula de exclusividade; (iv) Garantir que possui todos os direitos sobre o material entregue." },
        { label: "6.2. Aprovação e Refação.", p: "A Marca tem direito a solicitar ajustes razoáveis dentro do escopo original. Recusas injustificadas de ajuste pelo Criador podem levar ao cancelamento da campanha sem pagamento." },
        { label: "6.3. Não Garantia de Performance.", p: "Salvo estipulação expressa em contrário no briefing (ex.: campanhas de performance/CPA), a contratação é de meio e não de resultado. A Howhow e o Criador não garantem vendas, leads ou ROI específicos." },
        { label: "6.4. Responsabilidade por Produtos/Serviços Anunciados.", p: "Marcas/Agências são integralmente responsáveis pela legalidade e veracidade de alegações publicitárias, ofertas, sorteios, promoções e produtos/serviços divulgados. A Howhow não endossa anúncios nem se responsabiliza por eventuais reclamações de consumidores decorrentes do conteúdo publicitário." },
      ],
    },
    {
      id: "compliance-de-conteudo",
      n: "6.1",
      title: "Compliance de Conteúdo e Publicidade",
      blocks: [
        { label: "6.1.1. Transparência/Publicidade.", p: "Quando houver conteúdo patrocinado, o Criador deve cumprir regras de publicidade e transparência (ex.: marcações como “publi” / “parceria paga” quando exigidas), além das políticas das plataformas (YouTube/Instagram/TikTok) e normas aplicáveis (ex.: CONAR, quando aplicável)." },
        { label: "6.1.2. Brand Safety.", p: "A Marca pode exigir diretrizes de brand safety no briefing (ex.: linguagem, temas, exclusões). O descumprimento pode resultar em reprovação de entrega, disputa e/ou cancelamento conforme regras da Campanha." },
        { label: "6.1.3. Direitos de Terceiros.", p: "O Criador garante que o conteúdo não infringe direitos de terceiros (música, imagens, marcas, pessoas). Caso haja reclamação/strike/takedown por violação, o Criador se responsabiliza e deve cooperar com a apuração." },
        { label: "6.1.4. Solicitações de Remoção (Notice & Takedown).", p: "A Howhow pode remover, restringir ou despublicar conteúdos e materiais (incluindo anexos de campanha) quando houver reclamação plausível de violação legal, direitos de terceiros ou regras de Serviços de Terceiros. Para reportar, utilize privacy@howhow.com.br ou suporte@howhow.com.br, anexando evidências mínimas (URL, descrição, titularidade)." },
      ],
    },
    {
      id: "propriedade-intelectual",
      n: "7",
      title: "Propriedade Intelectual e Licenças",
      blocks: [
        { label: "7.1. Licença de Uso para a Plataforma.", p: "Ao utilizar a Howhow, o Usuário concede à Plataforma uma licença mundial, não exclusiva e gratuita para hospedar, processar, analisar e exibir seus dados e conteúdos para fins de prestação do serviço e aprimoramento dos algoritmos de IA." },
        { label: "7.2. Licença Marca-Criador.", p: "Os termos de cessão de direitos de imagem e voz e licenciamento de conteúdo são definidos no contrato específico de cada Campanha. Na ausência de termo específico, aplica-se a licença de uso digital não exclusiva pelo período de 12 meses." },
        { label: "7.3. Feedback.", p: "Sugestões e feedbacks enviados à Howhow podem ser utilizados para melhorar produtos e serviços, sem obrigação de remuneração, desde que não envolvam a divulgação de segredos industriais do Usuário." },
      ],
    },
    {
      id: "dados-e-confidencialidade",
      n: "8",
      title: "Dados, Analytics e Confidencialidade",
      blocks: [
        { label: "8.1. Acesso a APIs.", p: "Ao conectar contas de redes sociais (YouTube, Instagram, TikTok), o Usuário autoriza a Howhow a coletar, armazenar e processar dados estatísticos (Analytics) para relatórios de campanha e cálculo de métricas de perfil." },
        { label: "8.1.1. Segurança de Integrações.", p: "O Usuário reconhece que as integrações dependem de autorização via OAuth no provedor (YouTube/Google, Meta, TikTok etc.). A Howhow não solicita senha desses serviços e recomenda que o Usuário ative recursos de segurança (ex.: 2FA) e revise periodicamente permissões concedidas." },
        { label: "8.2. Política de Privacidade e Limited Use (Google).", p: "O tratamento de dados pessoais é regido pela nossa Política de Privacidade. Quando aplicável, o uso e a transferência de informações recebidas de APIs do Google pela Howhow obedecem à Google API Services User Data Policy, incluindo os requisitos de Limited Use." },
        { label: "8.3. Revogação e Exclusão.", p: "O Usuário pode revogar integrações e solicitar exclusão de dados conforme instruções públicas em howhow.com.br/exclusao-de-dados, observado o cumprimento de obrigações legais de retenção." },
        { label: "8.3.1. Solicitações de Provedores de API.", p: "Para manter conformidade com requisitos de YouTube/Google, TikTok, Meta, Twitch, X e outros Serviços de Terceiros, a Howhow pode (i) limitar escopos, (ii) suspender integrações, (iii) exigir recadastramento/reconsentimento e/ou (iv) remover acessos quando solicitado pelo provedor, por motivos de segurança, auditoria, violação de termos ou mudanças de política." },
        { label: "8.4. Sigilo de Briefings.", p: "Criadores devem manter estrita confidencialidade sobre briefings, lançamentos de produtos e estratégias das Marcas a que tiverem acesso antes da publicação autorizada." },
        { label: "8.5. Serviços de Terceiros.", p: "Integrações e métricas dependem de APIs externas e permissões concedidas pelo Usuário. A Howhow não garante disponibilidade, completude ou continuidade de dados quando houver limitações, mudanças de API, bloqueios ou revogações pelos provedores." },
      ],
    },
    {
      id: "responsabilidade",
      n: "9",
      title: "Limitação de Responsabilidade e Indenização",
      blocks: [
        { label: "9.1. Serviços de Terceiros.", p: "A Howhow não responde por instabilidades em APIs de redes sociais, gateways de pagamento ou servidores de nuvem que fujam ao seu controle razoável e direto." },
        { label: "9.2. Disponibilidade e Garantias.", p: "A Plataforma é fornecida “no estado em que se encontra” e “conforme disponível”. Na máxima extensão permitida por lei, a Howhow não oferece garantias implícitas de adequação a um fim específico, não infração ou disponibilidade ininterrupta, reconhecendo-se que integrações dependem de Serviços de Terceiros." },
        { label: "9.3. Danos Indiretos.", p: "Em nenhuma hipótese a Howhow será responsável por lucros cessantes, perda de receita, perda de dados ou danos indiretos decorrentes do uso da plataforma. A responsabilidade total da Howhow é limitada ao valor das taxas de serviço (Service Fee) pagas pelo Usuário nos últimos 3 meses." },
        { label: "9.4. Indenização (Hold Harmless).", p: "O Usuário concorda em defender, indenizar e isentar a Howhow de quaisquer reclamações, perdas e despesas (incluindo honorários advocatícios) decorrentes de seu uso indevido da plataforma, violação de direitos de terceiros ou descumprimento destes Termos." },
      ],
    },
    {
      id: "relacao-entre-as-partes",
      n: "10",
      title: "Relação entre as Partes (Sem Vínculo)",
      blocks: [
        { label: "10.1. Inexistência de Vínculo Trabalhista.", p: "Marcas e Criadores são partes independentes. A Howhow atua apenas como intermediadora tecnológica. Não há subordinação, habitualidade ou onerosidade salarial entre a Howhow e os Criadores, nem entre Marcas e Criadores, salvo contrato de trabalho formalizado externamente à plataforma." },
      ],
    },
    {
      id: "vigencia",
      n: "11",
      title: "Vigência, Suspensão e Rescisão",
      blocks: [
        { label: "11.1.", p: "A Howhow pode, a seu exclusivo critério, suspender ou banir Usuários que violem estes Termos, tentem burlar o sistema de pagamentos (transacionando por fora da plataforma após o match - \"Circumvention\"), ou adotem condutas ofensivas." },
        { label: "11.2.", p: "Em caso de banimento, valores legítimos de serviços já prestados serão liberados, descontadas eventuais taxas, multas ou prejuízos causados." },
        { label: "11.3. Atualizações e Alterações.", p: "A Howhow pode alterar, descontinuar ou atualizar funcionalidades (inclusive integrações), por motivos técnicos, legais, de segurança ou por exigência de Serviços de Terceiros. Quando apropriado, informaremos alterações relevantes por meios razoáveis." },
      ],
    },
    {
      id: "foro",
      n: "12",
      title: "Resolução de Disputas e Foro",
      blocks: [
        { label: "12.1.", p: "As partes elegem o Foro da Comarca de São Paulo, Estado de São Paulo, como único competente para dirimir questões oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja, salvo disposições legais em contrário." },
      ],
    },
    {
      id: "contato",
      n: "13",
      title: "Contato",
      blocks: [
        { p: "Para suporte e assuntos gerais da Plataforma, utilize suporte@howhow.com.br." },
        { p: "Para assuntos relacionados à privacidade e proteção de dados, utilize privacy@howhow.com.br." },
        { label: "Atenção:", note: "a Howhow não é afiliada, endossada ou patrocinada por YouTube/Google, TikTok, Meta, Twitch, X ou quaisquer outros Serviços de Terceiros. Marcas e nomes de terceiros pertencem aos seus respectivos titulares." },
      ],
    },
  ],
};

export const deletion: LegalDoc = {
  slug: "exclusao-de-dados",
  tab: "Exclusão de Dados",
  title: "Instruções de Exclusão de Dados",
  subtitle: "Revogação de integrações (OAuth) e solicitação de exclusão de dados.",
  meta: {
    title: "Exclusão de Dados — Howhow",
    description: "Como desconectar integrações (YouTube, Meta, TikTok) e solicitar a exclusão dos seus dados na Howhow.",
  },
  sections: [
    {
      id: "desconectar",
      n: "1",
      title: "Desconectar integrações (recomendado)",
      blocks: [
        { p: "Se você conectou YouTube/Meta (Instagram/Facebook) ou TikTok, você pode remover o acesso da Howhow a qualquer momento." },
        {
          list: [
            { label: "Dentro da Howhow:", text: "acesse seu dashboard e vá em Integrações para desconectar a plataforma desejada." },
            { label: "No provedor:", text: "você também pode revogar o acesso diretamente nas configurações da sua conta (Google/Meta/TikTok)." },
          ],
        },
      ],
    },
    {
      id: "solicitar",
      n: "2",
      title: "Solicitar exclusão de dados / encerramento de conta",
      blocks: [
        { p: "Para solicitar exclusão de dados pessoais e/ou encerramento de conta, envie um e-mail para privacy@howhow.com.br com:" },
        {
          list: [
            { label: "Assunto:", text: "“Exclusão de dados”" },
            { text: "E-mail da conta cadastrada na Howhow" },
            { label: "Plataformas conectadas (se souber):", text: "YouTube / Meta / TikTok" },
            { label: "Solicitação:", text: "(a) exclusão de dados, (b) encerramento de conta, ou (c) ambos" },
          ],
        },
        { note: "Para sua segurança, poderemos pedir confirmação de identidade antes de concluir a exclusão." },
        { label: "Prazos:", p: "responderemos sua solicitação dentro dos prazos aplicáveis (ex.: LGPD), podendo estender quando permitido, mediante justificativa." },
      ],
    },
    {
      id: "o-que-e-excluido",
      n: "3",
      title: "O que é excluído e o que pode ser retido",
      blocks: [
        { p: "Em regra, excluímos/anonimizamos dados como perfil, preferências e dados de integrações (ex.: tokens e métricas sincronizadas), quando aplicável. Alguns dados podem ser retidos por obrigação legal, prevenção a fraudes ou necessidade de comprovação de transações (ex.: registros fiscais/financeiros, histórico de pagamentos e logs de segurança)." },
      ],
    },
    {
      id: "referencias",
      n: "4",
      title: "Referências",
      blocks: [
        {
          links: [
            { label: "Política de Privacidade", href: "/politica-de-privacidade" },
            { label: "Termos de Uso", href: "/termos-de-uso" },
          ],
        },
      ],
    },
  ],
};

export const legalDocs = [privacy, terms, deletion];
