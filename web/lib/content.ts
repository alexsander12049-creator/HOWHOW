// Conteúdo da landing da Howhow — fonte única para o site (Next.js) e o app (React Native).
// Edite SÓ este arquivo: `npm run dev` / `npm start` copiam ele para cada projeto.
//
// Narrativa e ordem das seções seguem a referência sideshift.app:
// promessa → logos → números → como funciona (5 passos) → conteúdo real → cases e depoimentos →
// objetivo → devolução da sobra → comparação → gerenciado → como começar → FAQ → CTA final.
// No site, os planos ficam só em /marcas e o white-label só em /agencias (o app ainda mostra os planos).
//
// Fontes dos dados:
// - Benchmark "Howhow × SideShift" (out/2026): planos e preços, teste grátis (7 dias, definido pela Howhow; o benchmark falava em 14), white-label para agências,
//   Gerenciado (20% da verba, mín. R$ 25 mil), devolução da sobra, 4 modelos de pagamento, envio de produto,
//   nota fiscal, 2.246 creators no casting, fila de decisões, posicionamento "plataforma, não agência".
//   O próprio documento pede para validar os valores com o financeiro antes de publicar.
// - Cérebro Howhow: números de cases aprovados (3,1 mi · 8,4% · 96%), slogan, How Perfil.
// - howhow.com.br: clientes e depoimentos (HBO Max, JBL).
// Itens marcados com [CONFIRMAR] ainda precisam de validação.
// Recursos que o benchmark coloca como "adicionar" (ainda não existem) aparecem com "(em breve)".

export type ImageKey =
  | "foguete"
  | "fogueteBranco"
  | "hopeRetrato"
  | "hopeCapa"
  | "painelHome"
  | "painelCampanhas"
  | "painelAnalytics"
  | "appCreator";

export const brand = {
  name: "HOWHOW",
  slogan: "Não é impulso. É decolagem.",
  site: "howhow.com.br",
  instagram: "@howhow.oficial",
  platformUrl: "https://howhow.com.br",
  contactEmail: "contato@howhow.com.br", // [CONFIRMAR] e-mail real de contato
};

export const nav = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Métricas", href: "#metricas" },
  { label: "CPM", href: "#cpm" },
  { label: "Planos", href: "/marcas#planos" },
];
export const navCta = { label: "Começar grátis", href: "/marcas#planos" };

// Menu "Soluções" no topo de todas as páginas (como o "Use cases" da referência): por negócio e por objetivo.
export type SolutionIcon = "brand" | "agency" | "video" | "coin" | "chart" | "rocket";
export const solutions = {
  label: "Soluções",
  groups: [
    {
      title: "Por negócio",
      items: [
        { label: "Para marcas", text: "Seu programa de UGC dentro de casa", href: "/marcas", icon: "brand" as SolutionIcon },
        { label: "Para agências", text: "Creators em escala para os seus clientes", href: "/agencias", icon: "agency" as SolutionIcon },
      ],
    },
    {
      title: "O que você quer fazer?",
      items: [
        { label: "Conteúdo em volume", text: "Um exército de creators UGC postando", href: "/#como-funciona", icon: "video" as SolutionIcon },
        { label: "Pagar por CPM", text: "Só pelas views que foram entregues", href: "/#cpm", icon: "coin" as SolutionIcon },
        { label: "Métricas ao vivo", text: "Views de cada post em tempo real", href: "/#metricas", icon: "chart" as SolutionIcon },
        { label: "Howhow Gerenciado", text: "Nosso time roda as campanhas para você", href: "/#gerenciado", icon: "rocket" as SolutionIcon },
      ],
    },
  ],
};

/* 1. PROMESSA */
export const hero = {
  tag: "Plataforma de UGC e creator marketing",
  title: "Um exército de creators criando conteúdo viral para a sua marca",
  text: "A Howhow coloca 2.246 creators UGC produzindo vídeos para a sua marca, sem prospecção fria, DM ou planilha. Você acompanha as views de cada post em tempo real e pode pagar por CPM, só pelo que entregou.",
  primary: { label: "Começar grátis", href: "/marcas#planos" },
  secondary: { label: "Agendar demo", href: "#contato" },
  note: "7 dias grátis · zero porcentagem para a marca · cartão, Pix ou boleto",
  // VSL do topo: web/public/howhow/vsl.mp4 (site) e mobile/assets/howhow/vsl.mp4 (app), capa vsl-capa.jpg.
  vsl: { duration: "1 min" },
};

/* 2. LOGOS */
// As marcas da faixa do site antigo. Logos recortados da gravação do site antigo (preto com transparência):
// web/public/howhow/marcas/<logo>.png e mobile/assets/howhow/marcas/<logo>.png.
// `height` é a altura de exibição no computador, ajustada para os logos parecerem do mesmo tamanho.
export type LogoKey = "paramount" | "aliexpress" | "netflix" | "garena" | "hbo" | "picpay" | "mondial";
export const clients = {
  label: "Marcas líderes que já confiam na curadoria da Howhow",
  logos: [
    { name: "Paramount+", logo: "paramount" as LogoKey, w: 307, h: 193, height: 64 },
    { name: "AliExpress", logo: "aliexpress" as LogoKey, w: 360, h: 89, height: 32 },
    { name: "Netflix", logo: "netflix" as LogoKey, w: 359, h: 104, height: 34 },
    { name: "Garena", logo: "garena" as LogoKey, w: 220, h: 173, height: 56 },
    { name: "HBO", logo: "hbo" as LogoKey, w: 281, h: 121, height: 40 },
    { name: "PicPay", logo: "picpay" as LogoKey, w: 336, h: 115, height: 38 },
    { name: "Mondial", logo: "mondial" as LogoKey, w: 415, h: 69, height: 24 },
  ],
};

/* 3. NÚMEROS */
export const scale = {
  tag: "UGC em escala",
  title: "Seu exército de UGC, pronto para postar",
  stats: [
    { value: "2.246", label: "creators no casting", eyebrow: "Casting", viz: "people" as const },
    { value: "8,4%", label: "de engajamento médio nos cases", eyebrow: "Engajamento", viz: "bars" as const },
    { value: "96%", label: "das entregas aprovadas sem retrabalho", eyebrow: "Aprovação", viz: "segments" as const },
  ],
  // faixa com exemplos de campanhas (ilustrativo, sem marca real)
  ticker: [
    "Skincare · Reels · entrega aprovada",
    "Games · TikTok · 30 creators aprovados",
    "Moda · Stories · publicada",
    "Tech · Reels · pagamento liberado",
    "Bebidas · TikTok · produto enviado",
    "Fitness · Reels · publicada",
  ],
  note: "Números de cases da Howhow. Não são promessa de resultado de uma campanha específica.",
};

/* 4. COMO FUNCIONA (5 passos) */
export type CreatorKey = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export const steps = {
  tag: "Como funciona",
  title: "Toda a sua operação com creators num lugar só",
  items: [
    {
      key: "Crie a campanha",
      title: "Comece pelo briefing, não pela planilha.",
      text: "Produto, objetivo e tom. Escolha campanha aberta, híbrida ou fechada e como pagar: permuta + cachê, valor fixo, por views ou post + bônus.",
    },
    {
      key: "Receba candidaturas",
      title: "Creators compatíveis chegam até você.",
      text: "2.246 creators no casting, com filtros que só a Howhow tem: nicho, cidade, aparência, rotina e idiomas. Você aprova quem combina com a marca.",
    },
    {
      key: "Decida numa fila",
      title: "Tudo o que espera por você, numa fila só.",
      text: "A Home mostra as decisões do dia: candidaturas para aprovar, conteúdos para revisar e pagamentos para liberar.",
    },
    {
      key: "Envie e aprove",
      title: "Produto enviado, entrega revisada.",
      text: "Endereço liberado, produto enviado. O creator entrega e você aprova ou pede ajuste, sem áudio perdido no WhatsApp.",
    },
    {
      key: "Pague com nota fiscal",
      title: "Pagamento protegido, e a sobra volta para você.",
      text: "O creator só recebe o que você aprovou, com nota fiscal. Se ele fechar abaixo do teto, a diferença volta para a sua carteira.",
    },
  ],
  // fila de decisões (dados de exemplo do painel)
  queue: {
    title: "15 decisões esperando você",
    counters: [
      { value: "13", label: "candidaturas" },
      { value: "48", label: "aprovados" },
      { value: "2", label: "em revisão" },
      { value: "98", label: "publicados" },
    ],
    rows: [
      { campaign: "Sérum Vitamina C", detail: "9 candidaturas", action: "Aprovar" },
      { campaign: "Linha Fitness Verão", detail: "1 conteúdo para revisar", action: "Revisar" },
    ],
  },
  flow: ["Briefing", "Envio", "Entrega", "Revisão", "Publicado"],
  // Creators do exemplo: pessoas FICTÍCIAS, rostos gerados por IA (não são creators reais da Howhow).
  // Fotos: web/public/howhow/creators/<photo>.jpg e mobile/assets/howhow/creators/<photo>.jpg
  people: [
    { ini: "AP", name: "Ana P.", handle: "@ana.pele", photo: "c1" as CreatorKey },
    { ini: "DR", name: "Duda R.", handle: "@duda.rotina", photo: "c2" as CreatorKey },
    { ini: "LN", name: "Lu N.", handle: "@lu.natural", photo: "c3" as CreatorKey },
    { ini: "CM", name: "Caio M.", handle: "@caio.tech", photo: "c4" as CreatorKey },
    { ini: "BS", name: "Bruno S.", handle: "@bruno.fit", photo: "c5" as CreatorKey },
    { ini: "JT", name: "Júlia T.", handle: "@ju.looks", photo: "c6" as CreatorKey },
    { ini: "RF", name: "Rafa F.", handle: "@rafa.come", photo: "c7" as CreatorKey },
    { ini: "MV", name: "Mari V.", handle: "@mari.viaja", photo: "c8" as CreatorKey },
  ],
  payouts: [
    // exemplo ilustrativo (pessoas fictícias acima)
    { name: "Ana P.", value: 1800, photo: "c1" as CreatorKey },
    { name: "Duda R.", value: 950, photo: "c2" as CreatorKey },
    { name: "Lu N.", value: 620, photo: "c3" as CreatorKey },
    { name: "Caio M.", value: 2400, photo: "c4" as CreatorKey },
  ],
  cta: { label: "Começar grátis", href: "/marcas#planos" },
};

/* 4b. MÉTRICAS REAIS (painel por dentro da plataforma) */
// [CONFIRMAR] o benchmark de out/2026 lista "métricas por post" como recurso a lançar no plano de 30 dias.
// Os números do painel são ilustrativos (mesmo exemplo do benchmark); `badge` some se ficar vazio.
export const metrics = {
  tag: "Métricas reais",
  badge: "Novo",
  title: "Acompanhe cada view, por dentro da plataforma.",
  text: "Views, engajamento e CPM de cada post, atualizados sozinhos. Veja quais creators e formatos trazem resultado e coloque mais verba no que funciona.",
  campaign: "Lançamento · Sérum Vitamina C",
  periods: ["7 dias", "30 dias", "90 dias"],
  kpis: [
    { label: "Views", values: ["412.380", "1.208.940", "3.104.220"], delta: ["▲ 22%", "▲ 18%", "▲ 31%"], up: true },
    { label: "Engajamento", values: ["4,6%", "4,1%", "4,3%"], delta: ["▲ 0,8 p.p.", "▲ 0,6 p.p.", "▲ 0,4 p.p."], up: true },
    { label: "CPM médio", values: ["R$ 12", "R$ 14", "R$ 13"], delta: ["▼ R$ 4", "▼ R$ 3", "▼ R$ 5"], up: true },
    { label: "Investido", values: ["R$ 5.100", "R$ 17.000", "R$ 41.200"], delta: ["de R$ 6 mil", "de R$ 20 mil", "de R$ 50 mil"], up: true },
  ],
  // série de views por dia (formato do gráfico); cada período tem a sua curva
  series: [
    [18, 24, 31, 29, 46, 58, 72],
    [12, 14, 18, 17, 22, 26, 25, 31, 38, 36, 42, 47, 45, 52, 60, 58, 64, 71, 69, 78, 84, 80, 88, 97, 92, 104, 112, 108, 121, 130],
    [8, 10, 13, 12, 16, 19, 18, 23, 27, 26, 31, 35, 34, 39, 44, 42, 48, 53, 51, 58, 63, 61, 68, 74, 72, 80, 86, 84, 92, 99, 97, 106, 113, 110, 119, 127],
  ],
  topPosts: [
    { handle: "@ju.looks", network: "TikTok", views: "420 mil", cpm: "R$ 6", photo: "c6", thumb: 3 },
    { handle: "@duda.rotina", network: "Kwai", views: "186 mil", cpm: "R$ 11", photo: "c2", thumb: 2 },
    { handle: "@ana.pele", network: "Reels", views: "92 mil", cpm: "R$ 19", photo: "c1", thumb: 1 },
  ],
  networks: [
    { name: "Kwai", posts: 22 },
    { name: "Instagram", posts: 19 },
    { name: "TikTok", posts: 18 },
  ],
  toasts: ["Novo post de @mari.viaja · Reels", "@bruno.fit passou de 50 mil views", "Vídeo de @caio.tech aprovado", "@lu.natural publicou no TikTok"],
  note: "Painel com dados ilustrativos de uma campanha.",
  bullets: ["Views e engajamento de cada post", "CPM por creator e por rede", "Top posts para virar anúncio"],
};

/* 6b. CAMPANHA POR CPM */
// [CONFIRMAR] "CPM 360°" é a frente nº 1 do benchmark (pagamento automático por views). `badge` some se ficar vazio.
export const cpm = {
  tag: "Campanha por CPM",
  badge: "Novo",
  title: "Pague pelas views, não pelo post.",
  text: "Você define quanto paga a cada mil visualizações e o teto da campanha. Os creators postam, a Howhow mede as views sozinha e o pagamento sai por ciclo, calculado pelas views reais.",
  flow: [
    { title: "Brief por CPM", text: "R$ por mil views + teto" },
    { title: "Creators entram", text: "candidaturas abertas pelo app" },
    { title: "Posts vinculados", text: "o link do post fica na campanha" },
    { title: "Views medidas", text: "atualização automática" },
    { title: "Pagamento por ciclo", text: "calculado pelas views" },
    { title: "Relatório", text: "CPM, views e top posts" },
  ],
  calc: {
    title: "Simule a sua campanha",
    budget: { label: "Verba da campanha", min: 2000, max: 100000, step: 1000, value: 20000 },
    price: { label: "Quanto você paga por mil views (CPM)", min: 5, max: 50, step: 1, value: 20 },
    result: "views estimadas",
    note: "Estimativa: verba ÷ CPM × 1.000. Você nunca paga acima do teto, e o que sobrar volta para você.",
  },
  cycle: { title: "Ciclo de pagamento", days: "14 dias", handle: "@bruno.fit", photo: "c5", views: 3200 },
  cta: { label: "Criar campanha por CPM", href: "#contato" },
};

/* 5. CONTEÚDO REAL (vídeos: bolinha de play segue o mouse, clique toca) */
export const showcase = {
  tag: "Conteúdo real",
  title: "Conteúdo feito para viralizar.",
  text: "Vídeos que os creators da Howhow publicaram para as marcas. Clique e assista.",
  // video: N → web/public/howhow/videos/video-N.mp4 (capa: capa-N.jpg)
  // [CONFIRMAR] título e resultado de cada vídeo
  items: [
    { brand: "HBO Max", campaign: "House of the Dragon", result: "Buzz orgânico e massivo", gradient: ["#293B8F", "#0096DC"], video: 1 },
    { brand: "Kwai", campaign: "Programa Kwai Creators", result: "127 candidatos · 30 aprovados", gradient: ["#FF4D00", "#FF9A3D"], video: 2 },
    { brand: "JBL", campaign: "PartyBox", result: "Presença confirmada nas resenhas", gradient: ["#0D0E11", "#31343E"], video: 3 },
  ],
};

/* 6. CASES + DEPOIMENTOS */
// Fotos: web/public/howhow/depoimentos/<foto>.jpg e mobile/assets/howhow/depoimentos/<foto>.jpg
export type PhotoKey = "luisa" | "katia";
// [CONFIRMAR] o benchmark pede cases com views e CPM (HBO Max, JBL, OREO). Faltam esses números por case.
export const stories = {
  tag: "Cases",
  title: "Marcas que confiam na Howhow",
  quotes: [
    {
      quote: "Para House of the Dragon, precisávamos de fãs reais falando sobre a série. A curadoria foi perfeita e o buzz nas redes sociais foi orgânico e massivo.",
      name: "Luísa Dal Mas",
      role: "Social Media Manager",
      company: "HBO Max",
      initials: "LD",
      photo: "luisa" as PhotoKey, // foto do site antigo (howhow.com.br)
    },
    {
      quote: "A PartyBox virou presença confirmada nas resenhas. Os criadores de lifestyle e música que ativamos mostraram o produto no contexto real de uso.",
      name: "Kátia Dias",
      role: "Analista Comercial",
      company: "JBL",
      initials: "KD",
      photo: "katia" as PhotoKey, // foto do site antigo (howhow.com.br)
    },
  ],
};

/* 7. OBJETIVO DA CAMPANHA (abas) */
export const goals = {
  tag: "Objetivo",
  title: "Qual é o objetivo da sua campanha?",
  text: "Cresça no orgânico, gere criativos para anúncios ou leve a marca para novos públicos.",
  tabs: [
    {
      label: "Orgânico",
      title: "Crescer no orgânico",
      plan: ["Teste mais ganchos e formatos", "Descubra o que as pessoas assistem e compartilham", "Dê uma nova rodada às ideias que funcionaram"],
      example: [
        { value: "60", label: "vídeos" },
        { value: "20", label: "creators" },
        { value: "3", label: "formatos" },
      ],
      mix: [
        { label: "Rotina com o produto", n: 26 },
        { label: "Tutoriais rápidos", n: 20 },
        { label: "Trends e desafios", n: 14 },
      ],
    },
    {
      label: "Anúncios",
      title: "Criativos para anúncios",
      plan: ["Dê liberdade para os creators criarem", "Teste ganchos, ângulos e rostos", "Use nos seus anúncios o que vende"],
      example: [
        { value: "80", label: "vídeos" },
        { value: "15", label: "creators" },
        { value: "3", label: "formatos" },
      ],
      mix: [
        { label: "Novos ganchos", n: 40 },
        { label: "Depoimentos de uso", n: 24 },
        { label: "Como o produto ajuda", n: 16 },
      ],
    },
    {
      label: "Lançamento",
      title: "Lançar e gerar awareness",
      plan: ["Chegue a novos públicos pelos creators", "Mostre o produto em uso", "Dê um motivo para as pessoas lembrarem"],
      example: [
        { value: "40", label: "vídeos" },
        { value: "12", label: "creators" },
        { value: "3", label: "formatos" },
      ],
      mix: [
        { label: "Primeira impressão", n: 18 },
        { label: "Unboxing", n: 12 },
        { label: "Comparativos", n: 10 },
      ],
    },
  ],
  footnote: "Exemplo ilustrativo. Você define o orçamento.",
  cta: { label: "Começar grátis", href: "/marcas#planos" },
};

/* 8. DEVOLUÇÃO DA SOBRA (o argumento de confiança) */
export const refund = {
  tag: "Devolução da sobra",
  title: "Pagou o teto e o creator fechou por menos? A Howhow devolve.",
  text: "Você define um teto por creator. Se a negociação fecha abaixo dele, a diferença volta para a sua carteira.",
  example: [
    { label: "Teto", value: "R$ 2.000" },
    { label: "Fechou em", value: "R$ 712" },
    { label: "Devolvido para a marca", value: "R$ 1.288" },
  ],
  note: "Exemplo de extrato real de uma marca na Howhow.",
};

/* 9. PLANOS */
// Fonte: benchmark out/2026 ("validar valores com o financeiro").
export const plans = {
  tag: "Planos",
  title: "Um plano para cada fase da sua marca",
  text: "Mensalidade simples. Zero porcentagem para a marca: o cachê do creator não leva taxa por cima.",
  billing: { monthly: "Mensal", annual: "Anual", annualHint: "economize até 20%" },
  trial: {
    title: "7 dias grátis",
    text: "Toda marca testa antes de pagar a primeira mensalidade: 1 campanha e 3 convites. Depois escolhe Start, Growth ou Scale.",
    cta: { label: "Começar grátis", href: "#contato" },
  },
  items: [
    {
      name: "Start",
      for: "PME e e-commerce",
      monthly: "R$ 497",
      annual: "R$ 397",
      limits: [
        { value: "20", label: "convites/mês" },
        { value: "10", label: "creators" },
      ],
      features: ["3 campanhas ativas", "2 usuários"],
      budget: "Verba indicada: R$ 5–15 mil/mês",
      cta: "Começar grátis",
      popular: false,
    },
    {
      name: "Growth",
      for: "Marca em crescimento",
      monthly: "R$ 1.097",
      annual: "R$ 897",
      limits: [
        { value: "80", label: "convites/mês" },
        { value: "40", label: "creators" },
      ],
      features: ["Campanhas ilimitadas", "5 usuários", "1 destaque no Feed", "Nota de encaixe por IA (em breve)", "Métricas por post (em breve)", "Ads Meta/TikTok (em breve)"],
      budget: "Verba indicada: R$ 15–50 mil/mês",
      cta: "Começar grátis",
      popular: true,
    },
    {
      name: "Scale",
      for: "Grande marca",
      monthly: "R$ 2.497",
      annual: "R$ 1.997",
      limits: [
        { value: "∞", label: "convites" },
        { value: "∞", label: "creators" },
      ],
      features: ["Tudo do Growth", "Usuários ilimitados", "Gerente de conta + Eventos", "3 destaques no Feed"],
      budget: "Verba indicada: R$ 50 mil+/mês",
      cta: "Falar com vendas",
      popular: false,
    },
  ],
  included: ["Casting curado", "Pagamento protegido", "Devolução da sobra", "Contrato e direitos de uso", "Feed e chats", "Nota fiscal", "Envio de produto"],
  includedTitle: "Todos os planos incluem",
};

/* 9b. AGÊNCIAS (white-label) */
export const agency = {
  tag: "Para agências",
  title: "White-label: a Howhow com a marca da sua agência.",
  text: "Logo, cores e domínio da agência (creators.suaagencia.com.br). Traga suas marcas e seus creators pagando só a mensalidade. Usando creators da Howhow, 15% do cachê desses creators.",
  monthly: "R$ 4.990,90",
  annual: "R$ 3.990",
  cta: { label: "Falar com vendas", href: "#contato" },
};

/* 10. COMPARAÇÃO */
export const compare = {
  tag: "Compare",
  title: "Howhow × o jeito de sempre",
  columns: [
    { title: "Na DM", good: false, items: ["Caça de perfil no Instagram", "Mídia kit em PDF", "Preço diferente pro mesmo Reels", "Briefing perdido no áudio", "Ninguém sabe se deu resultado"] },
    { title: "Intermediário", good: false, items: ["Fee em cima de cada creator", "Proposta sob medida no WhatsApp", "Resposta lenta", "Relatório em PDF no fim", "Você não vê o processo"] },
    { title: "Howhow", good: true, items: ["2.246 creators com filtros únicos", "Preço no site, 7 dias grátis", "Envio de produto e nota fiscal", "Sobra devolvida para a marca", "Zero porcentagem para a marca"] },
  ],
};

/* 11. SERVIÇO GERENCIADO */
export const managed = {
  tag: "Howhow Gerenciado",
  title: "Suas campanhas com creators, nas nossas mãos.",
  text: "Mesmo software, operado pelo nosso time. Você aprova o plano e a verba; a gente cuida do resto.",
  bullets: ["Casting feito pelo nosso time", "Roteiro dos conteúdos", "Envio de produto e revisão", "Nota fiscal e pagamentos"],
  price: "20% da verba · mínimo de R$ 25 mil",
  cta: { label: "Agendar uma demo", href: "#contato" },
  // "vídeo" em motion de cada tópico (abre ao clicar): 3 legendas que acompanham as fases da animação
  hint: "Cada etapa tem um vídeo curto: passe o mouse ou toque",
  demos: [
    { steps: ["Nosso time lê o seu briefing", "Filtra creators por nicho, público e estilo", "Você recebe a shortlist pronta para aprovar"] },
    { steps: ["Cada creator recebe um roteiro", "Gancho, demonstração e chamada no ponto certo", "Você aprova antes de alguém gravar"] },
    { steps: ["O produto sai para a casa de cada creator", "O vídeo chega e a gente revisa com você", "Ajustes feitos, versão final aprovada"] },
    { steps: ["A nota fiscal de cada entrega é conferida", "Cada creator recebe pelo que entregou", "Tudo conciliado num relatório só"] },
  ],
};

/* 12. COMO COMEÇAR */
export const start = {
  tag: "Comece hoje",
  title: "Do cadastro à primeira campanha no ar.",
  steps: [
    { when: "Dia 1", title: "Escolha o plano", text: "Preço no site. Comece grátis com cartão, Pix ou boleto." },
    { when: "Em até 48h", title: "Primeira campanha no ar", text: "Onboarding guiado do briefing à publicação." }, // [CONFIRMAR] meta de 48h
    { when: "7 dias", title: "Teste completo", text: "1 campanha e 3 convites para ver a Howhow rodando com a sua marca." },
    { when: "Depois", title: "Vire plano pago", text: "Escolha Start, Growth ou Scale conforme o seu volume." },
  ],
  cta: { label: "Começar grátis", href: "/marcas#planos" },
};

/* 13. FAQ (custo, creator que some, NF, prazo) */
export const faq = {
  tag: "FAQ",
  title: "Suas dúvidas, respondidas.",
  items: [
    { q: "Como funciona a campanha por CPM?", a: "Você define quanto paga a cada mil visualizações e o teto da campanha. Os creators postam, a Howhow mede as views de cada post sozinha e o pagamento sai por ciclo, calculado pelas views reais. Nunca passa do teto." },
    { q: "Consigo ver as métricas de cada post?", a: "Sim. No painel da campanha você acompanha views, engajamento e CPM de cada post, por creator e por rede, atualizados automaticamente." },
    { q: "Quanto custa?", a: "Os planos para marcas têm mensalidade fixa e começam com 7 dias grátis; os valores estão na página Para marcas. O cachê dos creators é à parte, e a marca não paga porcentagem em cima dele." },
    { q: "Como funciona o teste grátis?", a: "São 7 dias com 1 campanha e 3 convites para creators. Depois você escolhe Start, Growth ou Scale e paga com cartão, Pix ou boleto." },
    { q: "Quanto eu pago para cada creator?", a: "Você define um teto e vê o preço de cada creator antes de fechar. Se ele fechar abaixo do teto, a diferença volta para você. Dá para pagar em permuta + cachê, valor fixo, por views ou post + bônus." },
    { q: "E se o creator sumir ou não entregar?", a: "O pagamento fica protegido: você só aprova e paga o que foi entregue do jeito combinado. Se alguém sair, é só escolher outro creator entre os candidatos." },
    { q: "Tem nota fiscal?", a: "Sim. A nota fiscal de cada creator fica registrada na campanha, junto com o pagamento. Funciona com CPF e CNPJ." },
    { q: "Em quanto tempo a campanha vai ao ar?", a: "Com o onboarding guiado, a primeira campanha pode estar no ar em até 48 horas." },
    { q: "Vocês atendem agências?", a: "Sim. O plano white-label coloca a Howhow com o logo, as cores e o domínio da sua agência. Os detalhes e o valor estão na página Para agências." },
    { q: "E se eu não quiser operar?", a: "No Howhow Gerenciado, nosso time faz casting, roteiro, envio, revisão e nota fiscal: 20% da verba, com mínimo de R$ 25 mil." },
  ],
};

/* 14. CTA FINAL */
export const finalCta = {
  tag: "Agende uma demo",
  title: "Comece grátis por 7 dias.",
  text: "Prefere conversar antes? Deixe seus dados e mostramos a Howhow rodando com a sua marca.",
};

export const contact = {
  profiles: ["Sou Marca", "Sou Agência"],
};

/* 15. CREATORS (o "For creators" da referência, no rodapé) */
export const creators = {
  title: "É creator? Usar a Howhow é grátis.",
  text: "Perfil no casting, convites de marcas, pagamento protegido e saque por Pix grátis toda semana. Tudo pelo app.",
  cta: { label: "Baixar o app", href: "https://howhow.com.br" }, // [CONFIRMAR] links da App Store / Google Play
};

export const footer = {
  columns: [
    { title: "Plataforma", links: [{ label: "Como funciona", href: "/#como-funciona" }, { label: "Métricas", href: "/#metricas" }, { label: "Planos", href: "/marcas#planos" }, { label: "Howhow Gerenciado", href: "/#gerenciado" }] },
    { title: "Howhow", links: [{ label: "Para marcas", href: "/marcas" }, { label: "Para agências", href: "/agencias" }, { label: "Para creators", href: "#creators" }, { label: "Agendar demo", href: "#contato" }] },
    { title: "Legal", links: [{ label: "Política de Privacidade", href: "/politica-de-privacidade" }, { label: "Termos de Uso", href: "/termos-de-uso" }, { label: "Exclusão de Dados", href: "/exclusao-de-dados" }] },
  ],
};

/* ================================================================================================
   PÁGINAS POR PÚBLICO: /marcas e /agencias
   Estrutura da referência (sideshift.app/solutions/brands e /for-agencies) + argumentos da página antiga
   da Howhow (howhow.com.br/brand e /agency). Números e depoimentos antigos sem confirmação ficam de fora:
   [CONFIRMAR] "10 mil+ criadores", "10k+ campanhas", "98% prazos", "100M+ movimentados", "-32% retrabalho",
   "+87% faturamento", "+40% eficiência", "-30% tempo operacional", depoimentos sem nome, creator "Exclusive",
   "uma NF para a agência", link do cliente, permissões da equipe.
   ================================================================================================ */
export type SegmentArt = "brief" | "shortlist" | "compare" | "clientBrief" | "clientShortlist" | "report";

export const brandsPage = {
  meta: {
    title: "Howhow para marcas — Seu programa de creators, dentro de casa",
    description: "Briefing, aprovação, contrato, nota fiscal e pagamento de creators num fluxo só. 7 dias grátis.",
  },
  nav: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Painel", href: "#painel" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
  ],
  navCta: { label: "Começar grátis", href: "#planos" },
  hero: {
    tag: "Howhow para marcas",
    title: "Seu programa de creators, dentro de casa.",
    text: "Briefing, aprovação, contrato, nota fiscal e pagamento num fluxo só. Cada campanha ensina o que fazer na próxima, e esse aprendizado fica com a sua marca.",
    primary: { label: "Começar grátis", href: "#planos" },
    secondary: { label: "Agendar demo", href: "#contato" },
    note: "7 dias grátis · zero porcentagem para a marca",
    bullets: ["Seu briefing e o seu padrão de aprovação", "Relacionamento direto com os creators", "O aprendizado de cada campanha fica com você"],
    board: {
      title: "O que precisa da sua atenção hoje?",
      label: "Seu programa de creators",
      rows: [
        { name: "Criativo A", who: "c1" as CreatorKey, next: "Enviar o briefing" },
        { name: "Criativo B", who: "c6" as CreatorKey, next: "Revisar o vídeo" },
        { name: "Criativo C", who: "c5" as CreatorKey, next: "Aprovar o pagamento" },
      ],
      steps: ["Tudo junto", "Próximo passo à vista", "Avance num clique"],
    },
    // notificações flutuando em volta do painel (creators fictícios, os mesmos do "Como funciona")
    toasts: {
      people: [
        { title: "Vídeo entregue", text: "@ju.looks enviou o Reels", who: "c6" as CreatorKey },
        { title: "Roteiro aprovado", text: "@duda.rotina já pode gravar", who: "c2" as CreatorKey },
        { title: "Nova candidatura", text: "@ana.pele quer participar", who: "c1" as CreatorKey },
      ],
      system: [
        { title: "Pagamento liberado", text: "Nota fiscal conferida", icon: "coin" as SolutionIcon },
        { title: "Contrato assinado", text: "Direitos de uso combinados", icon: "video" as SolutionIcon },
        { title: "Relatório pronto", text: "CPM por creator", icon: "chart" as SolutionIcon },
      ],
      counter: { start: 18, label: "vídeos aprovados na semana" },
    },
  },
  before: {
    tag: "Sem Howhow × Com Howhow",
    title: "Saia do direct, da planilha e da validação manual.",
    columns: [
      { title: "Sem Howhow", good: false, items: ["Negociações longas e inseguras", "Ajustes constantes durante a execução", "Retrabalho entre marketing, jurídico e financeiro", "Difícil comparar resultados entre campanhas", "Mais tempo gasto, menos previsibilidade"] },
      { title: "Com Howhow", good: true, items: ["Menos ajustes fora do combinado", "Briefing, entrega e público certo alinhados", "Campanhas fechadas mais rápido", "Controle do que será entregue e quando", "Contrato, gestão e faturamento unificados"] },
    ],
  },
  steps: {
    tag: "Como funciona",
    title: "Do primeiro briefing a um programa de creators da casa.",
    text: "Comece com uma campanha focada e monte o casting e o processo em volta do que a sua marca precisa.",
    items: [
      { title: "Dê à campanha um dono e um objetivo.", text: "Escolha o produto, o público e a pergunta criativa. Defina entregáveis, direitos de uso e quem aprova, para todo mundo saber o que é um bom conteúdo.", checks: ["Produto e objetivo da campanha", "Entregáveis e direitos de uso claros", "Um responsável pela aprovação"], art: "brief" as SegmentArt, label: "Defina o padrão" },
      { title: "Escolha creators que combinam com o produto.", text: "Veja quem se candidatou, compare o encaixe e combine o trabalho antes de gravar. Conversas, envios e ajustes ficam juntos.", checks: ["Creators com encaixe no produto", "Trabalho combinado antes da produção", "Feedback junto de cada envio"], art: "shortlist" as SegmentArt, label: "Monte seu casting" },
      { title: "Transforme cada campanha num briefing melhor.", text: "Compare creators e formatos com o objetivo, chame de volta quem foi bem e leve o melhor conteúdo para anúncio quando os direitos de uso permitirem.", checks: ["CPM por creator", "Recontrate os melhores", "Escolha a próxima aposta"], art: "compare" as SegmentArt, label: "Decida o próximo investimento" },
    ],
  },
  control: {
    tag: "Painel",
    title: "Acompanhe tudo numa tela só.",
    text: "Métricas, aprovações, relatórios e verba. Tudo centralizado para o seu time escalar resultados.",
    cards: [
      { title: "Visão da campanha", text: "Status das publicações, alcance e verba investida em tempo real." },
      { title: "Performance de cada post", text: "Views, engajamento e CPM por post, por creator e por rede." },
      { title: "Verba sob controle", text: "Clareza de onde cada real vai, com a sobra devolvida para você." },
      { title: "Hub de aprovação", text: "Revise roteiros e vídeos num só lugar, protegendo a sua marca." },
    ],
  },
  flow: {
    tag: "Fluxo",
    title: "Do briefing ao relatório, sem atrito.",
    text: "Desenhado para tirar o risco da operação e aproveitar melhor a sua verba de marketing.",
    steps: ["Envie seu desafio", "Receba o casting ideal", "Aprove a estratégia", "Acompanhe a produção", "Valide o conteúdo", "Mensure o resultado"],
  },
  why: {
    tag: "UGC em volume",
    title: "Um programa de creators que melhora a cada campanha.",
    text: "Rodar UGC dentro de casa é ser dono do conteúdo e do aprendizado. Comece com um briefing focado e cresça o casting em volta do que funciona.",
    cards: [
      { title: "Monte seu casting", text: "Você não precisa de um time enorme no primeiro dia. Escolha creators pelo encaixe, revise o trabalho e leve os melhores para a próxima campanha." },
      { title: "Organize o trabalho", text: "Mais conteúdo é mais aprovação e mais pagamento. Briefing, envios, notas fiscais e pagamentos ficam num lugar só." },
      { title: "Aprenda antes de gastar mais", text: "Compare creators e formatos com o objetivo e decida quais ideias merecem outro briefing ou um teste pago." },
    ],
  },
  faq: [
    { q: "Qual a diferença para contratar uma agência?", a: "Na Howhow o seu time tem as ferramentas de uma agência (casting, gestão de campanha, pagamentos e métricas) sem fee em cima de cada creator. O relacionamento com os creators e os conteúdos ficam com a sua marca." },
    { q: "Com quantos creators posso trabalhar?", a: "Depende do plano: até 10 creators no Start, 40 no Growth e sem limite no Scale." },
    { q: "Preciso de um time dedicado?", a: "Não. Briefing, candidaturas, contratos, notas fiscais e pagamentos ficam num fluxo só, pensado para times enxutos." },
    { q: "Como sei que os números dos creators são reais?", a: "Os números do How Perfil vêm das redes que o próprio creator conecta, não de print." },
    { q: "Como garanto que o conteúdo segue as diretrizes da marca?", a: "Você define o briefing e aprova roteiros e vídeos antes da publicação. Os ajustes são pedidos dentro da plataforma." },
    { q: "Como acompanho os resultados?", a: "No painel da campanha: views, engajamento e CPM de cada post, por creator e por rede." },
    { q: "O pagamento aos creators é seguro?", a: "Sim. O pagamento fica protegido e só é liberado quando você aprova a entrega, com nota fiscal." },
    { q: "Posso testar antes de assinar?", a: "Sim: 7 dias grátis com 1 campanha e 3 convites. Depois você escolhe Start, Growth ou Scale." },
  ],
  final: {
    tag: "Comece agora",
    title: "Monte um programa de creators que melhora a cada campanha.",
    text: "Comece grátis por 7 dias ou fale com o nosso time para montar a primeira campanha junto.",
  },
  profiles: ["Sou Marca"],
};

export const agenciesPage = {
  meta: {
    title: "Howhow para agências — Campanhas com creators para todos os seus clientes",
    description: "Briefings, creators, aprovações, relatórios e pagamentos de cada cliente num painel só, com white-label da sua agência.",
  },
  nav: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "White-label", href: "#white-label" },
    { label: "Painel", href: "#painel" },
    { label: "FAQ", href: "#faq" },
  ],
  navCta: { label: "Agendar demo", href: "#contato" },
  hero: {
    tag: "Howhow para agências",
    title: "Campanhas com creators para todos os seus clientes, num lugar só.",
    text: "Briefings, creators, aprovações, relatórios e pagamentos de cada cliente juntos, sem malabarismo entre ferramentas. Sua equipe foca na estratégia.",
    primary: { label: "Agendar demo", href: "#contato" },
    secondary: { label: "Ver o white-label", href: "#white-label" },
    note: "White-label com a marca da sua agência",
    bullets: ["Um briefing para cada cliente", "Trabalho e feedback dos creators juntos", "Relatório que vira a próxima campanha"],
    board: {
      title: "O que precisa da nossa atenção hoje?",
      label: "Todos os clientes. Um painel.",
      rows: [
        { name: "Cliente A", who: "c2" as CreatorKey, next: "Enviar o briefing" },
        { name: "Cliente B", who: "c4" as CreatorKey, next: "Revisar o vídeo" },
        { name: "Cliente C", who: "c8" as CreatorKey, next: "Aprovar o pagamento" },
      ],
      steps: ["Tudo junto", "Próximo passo à vista", "Avance num clique"],
    },
    toasts: {
      people: [
        { title: "Cliente B aprovou", text: "Roteiro da @ju.looks", who: "c6" as CreatorKey },
        { title: "Vídeo entregue", text: "Cliente A · @duda.rotina", who: "c2" as CreatorKey },
        { title: "Nova candidatura", text: "Cliente C · @caio.tech", who: "c4" as CreatorKey },
      ],
      system: [
        { title: "Relatório enviado", text: "Cliente A · com a sua marca", icon: "chart" as SolutionIcon },
        { title: "Faturamento unificado", text: "Pagamentos do Cliente C", icon: "coin" as SolutionIcon },
        { title: "Briefing publicado", text: "Cliente B · 2 TikToks", icon: "video" as SolutionIcon },
      ],
      counter: { start: 7, label: "entregas de clientes hoje" },
    },
  },
  before: {
    tag: "O fim do caos",
    title: "O fim do caos na gestão de influência.",
    columns: [
      { title: "Sem Howhow", good: false, items: ["Dezenas de grupos no WhatsApp", "Uma nota fiscal para cada influenciador", "Roteiros e aprovações perdidos no e-mail", "Cobrança manual de prazos e entregas", "Relatório montado do zero"] },
      { title: "Com Howhow", good: true, items: ["Comunicação centralizada num painel", "Faturamento unificado", "Aprovação de conteúdo na plataforma", "Prazos e entregas acompanhados", "Métricas atualizadas em tempo real"] },
    ],
  },
  steps: {
    tag: "Como funciona",
    title: "Repita o processo. Mantenha cada cliente com a sua cara.",
    text: "Um jeito único de coordenar creators, preservando o objetivo, a voz e o padrão de aprovação de cada conta.",
    items: [
      { title: "Uma direção criativa para cada conta.", text: "Transforme o objetivo do cliente em contexto de produto, ângulos e entregáveis. Combine direitos de uso e quem aprova antes de os creators começarem.", checks: ["Objetivo e voz de cada cliente", "Entregáveis e direitos de uso", "Responsáveis pela aprovação"], art: "clientBrief" as SegmentArt, label: "Traduza o briefing do cliente" },
      { title: "Creators certos para cada cliente, não só para a vaga.", text: "Avalie creators pelo público e pelo produto de cada cliente. Envios, revisões e conversas ficam juntos, e a próxima campanha começa de onde a outra parou.", checks: ["Encaixe para cada cliente", "Um processo único de envio", "Feedback que segue para a próxima"], art: "clientShortlist" as SegmentArt, label: "Monte o casting certo" },
      { title: "Dê ao cliente um motivo para a próxima rodada.", text: "Mostre quais creators e formatos foram melhor no objetivo, explique o aprendizado e recomende o próximo briefing, um creator de volta ou um teste pago.", checks: ["Relatório contra o objetivo do cliente", "O aprendizado criativo explicado", "Recomendação do que testar ou repetir"], art: "report" as SegmentArt, label: "Reporte e recomende" },
    ],
  },
  whiteLabel: {
    tag: "White-label",
    title: "A Howhow com a marca da sua agência.",
    text: "Seu logo, suas cores e o seu domínio. Seus clientes e creators veem a sua agência do começo ao fim.",
    domain: "creators.suaagencia.com.br",
    agencyName: "Sua Agência",
    bullets: ["Logo, cores e domínio da agência", "Traga suas marcas e seus creators: só a mensalidade", "Usando creators da Howhow: 15% do cachê desses creators"],
    monthly: "R$ 4.990,90",
    annual: "R$ 3.990",
    cta: { label: "Falar com vendas", href: "#contato" },
  },
  control: {
    tag: "Painel",
    title: "O controle de todas as campanhas numa tela só.",
    text: "Campanhas, mensagens, entregáveis e notas fiscais centralizados, para a equipe focar na estratégia.",
    cards: [
      { title: "Gestão de campanhas", text: "Status, briefings e prazos de cada cliente em tempo real." },
      { title: "Métricas sincronizadas", text: "Alcance, views e engajamento direto das redes." },
      { title: "Faturamento simplificado", text: "Faturamento e pagamentos de todos os creators numa tela." },
      { title: "Conversa direta", text: "Fale com o casting sem se perder em grupos e redes." },
    ],
  },
  flow: {
    tag: "Fluxo",
    title: "Do briefing ao relatório, sem atrito.",
    text: "Desenhado para tirar a burocracia entre a sua agência e os creators.",
    steps: ["Criar a campanha", "Encontrar creators", "Gerenciar convites", "Alinhar a execução", "Aprovar os criativos", "Acompanhar resultados"],
  },
  why: {
    tag: "UGC em volume",
    title: "Mais criativos para os clientes. Um processo que sua equipe repete.",
    text: "Clientes querem ideias novas e um motivo para continuar investindo. Um programa de creators repetível entrega os dois sem começar do zero todo mês.",
    cards: [
      { title: "Cada marca com a sua cara", text: "Um briefing e um padrão de aprovação para cada cliente. Mais conteúdo deve trazer variações úteis, não o mesmo roteiro com outro logo." },
      { title: "Repetir fica mais fácil", text: "Monte um casting de creators que já entendem o briefing. Envios, feedback e pagamentos seguem juntos conforme as campanhas crescem." },
      { title: "Mostre o que a campanha ensinou", text: "Ligue cada leva de conteúdo ao objetivo do cliente, mostre quem performou e explique o que testar ou repetir." },
    ],
  },
  faq: [
    { q: "Que tipo de agência usa a Howhow?", a: "Agências de influência, de UGC e de performance que rodam campanhas com creators para clientes e precisam de uma operação que escala." },
    { q: "Dá para usar com vários clientes?", a: "Sim. Cada cliente tem os seus briefings, creators, entregas e relatórios separados, num painel único da agência." },
    { q: "O white-label é de verdade?", a: "Sim: o seu logo, as suas cores e o seu domínio, como creators.suaagencia.com.br." },
    { q: "Quanto custa?", a: "R$ 4.990,90 por mês, ou R$ 3.990/mês no anual. Trazendo as suas marcas e os seus creators, você paga só a mensalidade; usando creators da Howhow, 15% do cachê desses creators." },
    { q: "Como gerencio creators e campanhas num lugar só?", a: "Campanhas, mensagens, entregáveis e notas fiscais ficam centralizados no painel, para a equipe focar na estratégia." },
    { q: "Quanto tempo até as primeiras postagens?", a: "Com o onboarding guiado, a primeira campanha pode estar no ar em até 48 horas." },
  ],
  final: {
    tag: "Próximo cliente",
    title: "Deixe a próxima campanha do seu cliente mais fácil de rodar.",
    text: "Traga um briefing de cliente e mostramos a operação rodando com a marca da sua agência.",
  },
  profiles: ["Sou Agência"],
};
