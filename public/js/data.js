// Banco de Dados do Desafio 1 e Configurações da Plataforma BioLab Explorer
const DESAFIO_01_DATA = {
  challenge: {
    id: 'desafio-1',
    code: 'DESAFIO-01',
    title: 'O Mistério do Rio das Palmeiras',
    subtitle: 'Microplásticos, Fontes de Contaminação e Teias Alimentares',
    subject: 'Biologia & Ciências da Natureza',
    level: '1ª Série do Ensino Médio • Biologia & Ciências da Natureza (BNCC)',
    methodology: 'PBL – Aprendizagem Baseada em Problemas',
    totalLessons: 9,
    lessonDuration: '45 minutos cada',
    estimatedTime: '6 a 9 aulas',
    badge: 'Detetive Ambiental',
    context: `Uma comunidade próxima ao Rio das Palmeiras (município fictício de Vale Verde) identificou pequenos resíduos na água e levantou suspeitas sobre a qualidade ambiental da região. Moradores utilizam as águas para pesca, lazer e irrigação. Próximos ao rio estão localizados: uma fábrica de tecidos sintéticos (Têxtil Aurora), um bairro residencial com ligação irregular de esgoto, uma avenida de tráfego pesado, propriedades agrícolas com uso de plásticos e uma colônia de pescadores artesanais. Sua equipe de pesquisadores recebeu o encargo de investigar as evidências, analisar amostras microscópicas, modelar a dinâmica dos resíduos e propor soluções baseadas no método científico.`,
    rules: [
      'Leia cada documento oficial e notícia antes de debater as respostas com a equipe.',
      'Diferencie fatos observados, interpretações e hipóteses.',
      'Registre tanto as evidências que sustentam quanto as que contradizem suas ideias iniciais.',
      'Não confunda proximidade geográfica com comprovação automática de responsabilidade causal.',
      'Utilize os dados das estações de monitoramento para fundamentar gráficos e cálculos.',
      'Ao final, apresente uma explicação científica sólida e uma proposta viável de intervenção comunitária.'
    ],
    glossary: [
      {
        term: 'Microplásticos',
        definition: 'Partículas de polímeros sintéticos geralmente menores que 5 mm, divididas em primárias (fabricadas já em escala diminuta, como pellets ou microesferas) e secundárias (provenientes da fragmentação mecânica, solar ou química de plásticos maiores).'
      },
      {
        term: 'Bioacumulação',
        definition: 'Processo pelo qual uma substância ou partícula se acumula em um organismo ao longo do tempo, ocorrendo quando a taxa de absorção/ingestão é superior à capacidade fisiológica do organismo de eliminá-la ou metabolizá-la.'
      },
      {
        term: 'Biomagnificação Trófica',
        definition: 'Aumento progressivo da concentração de um contaminante persistente a cada nível trófico superior de uma teia alimentar. Nem todo contaminante ou microplástico necessariamente sofre biomagnificação.'
      },
      {
        term: 'Correlação vs Causalidade',
        definition: 'Correlação é a associação estatística entre duas variáveis (ex: proximidade geográfica e contaminação). Causalidade exige comprovação empírica de mecanismo de ação que demonstre que um fator diretamente gerou o resultado observado.'
      },
      {
        term: 'Hipótese Científica',
        definition: 'Explicação preliminar testável e falseável, formulada com base nas evidências preliminares disponíveis para orientar uma investigação metódica.'
      },
      {
        term: 'Limitação dos Dados',
        definition: 'Fronteiras metodológicas (amostragem restrita, ausência de testes espectrométricos de confirmação química, variabilidade temporal de vazão e chuva) que impedem conclusões absolutas.'
      }
    ]
  },

  // As 12 Notícias / Documentos Oficiais
  documents: [
    {
      id: 'doc-1',
      number: 1,
      style: 'newspaper',
      newspaperName: 'JORNAL DO VALE',
      edition: 'Edição Regional nº 1.482 • 12 de Março de 2018 • Vale Verde',
      tag: 'Jornal do Vale • 12 de Março de 2018',
      title: 'Moradores encontram resíduos nas margens do Rio das Palmeiras',
      type: 'Recorte de Jornal Histórico',
      imageSrc: 'assets/slides/doc_titulo_1.jpg',
      imageCaption: 'Registro fotográfico: pequenos resíduos flutuantes e fibras retidos na vegetação ciliar do rio após temporal.',
      fullText: `Moradores de Vale Verde voltaram a relatar a presença de pequenos resíduos acumulados nas margens do Rio das Palmeiras. Segundo relatos de pescadores, a quantidade de materiais parece aumentar consideravelmente após períodos de chuva intensa. Os resíduos são encontrados principalmente retidos entre pedras, raízes e plantas ciliares próximas à margem.
      A prefeitura informou que realiza periodicamente a limpeza de trechos superficiais do rio, mas reconheceu que ainda não existe um levantamento técnico completo sobre a origem e a composição exata dos materiais. Um morador relatou que, em determinadas manhãs calmas, observa pequenos fragmentos claros e fibras semelhantes a fios suspensos na coluna d'água. A Secretaria Municipal de Meio Ambiente anunciou a intenção de ampliar o monitoramento.`,
      sourceHint: 'Indica transporte hídrico associado ao escoamento superficial pluvial e presença de resíduos fibrosos.'
    },
    {
      id: 'doc-2',
      number: 2,
      style: 'newspaper',
      newspaperName: 'GAZETA REGIONAL',
      edition: 'Caderno de Economia & Negócios • 17 de Agosto de 2018',
      tag: 'Gazeta Regional • 17 de Agosto de 2018',
      title: 'Fábrica de tecidos anuncia ampliação da produção próxima ao rio',
      type: 'Notícia Econômica / Industrial',
      imageSrc: 'assets/slides/Gemini_Generated_Image_5b7ta65b7ta65b7t.jfif',
      imageCaption: 'Amostra microscópica do efluente fabril contendo feixes de microfibras sintéticas de poliéster e poliamida.',
      fullText: `A empresa Têxtil Aurora anunciou a ampliação de sua unidade industrial fabril, localizada a aproximadamente 400 metros da margem do Rio das Palmeiras. A empresa fabrica tecidos esportivos de alto desempenho, uniformes e malhas industriais, utilizando em larga escala fibras sintéticas (poliéster, elastano e poliamida).
      Segundo a direção, a modernização elevará a capacidade produtiva em cerca de 35%. A empresa destacou que utiliza tanques de decantação e tratamento de efluentes em conformidade com as licenças ambientais vigentes. Moradores locais manifestaram preocupação com o aumento da carga de resíduos industriais, ao passo que a empresa declarou que inexistem dados técnicos que provem relação causal direta entre suas operações e os resíduos encontrados na bacia.`,
      sourceHint: 'Cria uma suspeita por proximidade geográfica e uso intensivo de fibras sintéticas, mas não prova descarte irregular.'
    },
    {
      id: 'doc-3',
      number: 3,
      style: 'newspaper',
      newspaperName: 'JORNAL DO VALE',
      edition: 'Edição Policial & Meio Ambiente • 3 de Novembro de 2018',
      tag: 'Jornal do Vale • 3 de Novembro de 2018',
      title: 'Fiscalização identifica ligação irregular de esgoto residencial',
      type: 'Relatório de Fiscalização Sanitária',
      imageSrc: 'assets/slides/Gemini_Generated_Image_3v7oin3v7oin3v7o.jfif',
      imageCaption: 'Efluente do afluente residencial: microfibras finas de lavagem de roupas carreadas pelo esgoto clandestino.',
      fullText: `Uma equipe de fiscalização ambiental e sanitária identificou uma ligação clandestina de esgoto conectada a um pequeno afluente que desemboca diretamente no Rio das Palmeiras. Segundo dados cadastrais da prefeitura, o duto recebia efluentes domésticos sem qualquer tratamento prévio de uma área residencial contígua com aproximadamente 3 mil habitantes.
      O despejo bruto foi lacrado provisoriamente para adequação às redes coletoras. Moradores mais antigos informaram que o problema de infraestrutura sanitária já perdurava há muitos anos. Os fiscais registraram que não foram realizadas análises microscópicas específicas para quantificação de microplásticos naquela data.`,
      sourceHint: 'Identifica uma fonte residencial concreta de efluentes não tratados conectada ao rio.'
    },
    {
      id: 'doc-4',
      number: 4,
      style: 'newspaper',
      newspaperName: 'CIÊNCIA HOJE REGIONAL',
      edition: 'Divulgação Científica Universitária • Volume 14 • 2019',
      tag: 'Ciência Hoje Regional • 2019',
      title: 'Fibras de roupas sintéticas alcançam corpos d’água durante a lavagem',
      type: 'Artigo Científico de Divulgação',
      imageSrc: 'assets/slides/Gemini_Generated_Image_atl2c3atl2c3atl2.jfif',
      imageCaption: 'Microfilamentos desprendidos mecanicamente em ciclos de lavagem de vestuário sintético.',
      fullText: `Pesquisadores investigam a emissão massiva de microfibras têxteis durante o ciclo mecânico de lavagem de roupas cotidianas feitas de tecidos sintéticos (fleece, náilon, poliéster). Parte substancial dessas partículas ultrafinas é carreada junto com a água residual para a rede de esgoto.
      A eficiência dos sistemas convencionais de tratamento de esgoto na retenção de microfibras varia de 70% a 95%, mas frações microscópicas passam livremente pelos filtros convencionais e alcançam rios e mananciais. Os pesquisadores salientam: a presença de microfibras na água não permite, por si só, distinguir se o emissor original foi uma lavanderia industrial, residências ou despejos clandestinos sem análise química de polímeros.`,
      sourceHint: 'Mostra o elo entre esgoto doméstico comum e a presença de fibras de vestuário na água.'
    },
    {
      id: 'doc-5',
      number: 5,
      style: 'newspaper',
      newspaperName: 'DIÁRIO AMBIENTAL',
      edition: 'Boletim de Engenharia Urbana & Poluição • Ano 9 • 2020',
      tag: 'Diário Ambiental • 2020',
      title: 'Desgaste de pneus automotivos entra na rota da investigação',
      type: 'Boletim de Engenharia de Tráfego',
      imageSrc: 'assets/slides/Gemini_Generated_Image_7zo9hs7zo9hs7zo9.jfif',
      imageCaption: 'Material particulado retido no canal pluvial da rodovia: grânulos pretos de borracha e betume.',
      fullText: `Especialistas em ecotoxicologia passaram a quantificar as partículas geradas pelo atrito contínuo entre pneus de veículos rodoviários e o pavimento asfáltico em rodovias de grande fluxo. Esse desgaste contínuo gera pó de borracha sintética misturado a hidrocarbonetos betuminosos.
      A água das chuvas enxágua as pistas e carreia tais partículas diretamente para as galerias de drenagem pluvial urbana, que deságuam sem tratamento nos cursos fluviais mais próximos. A Rodovia dos Ipês, que registra tráfego diário superior a 15 mil veículos pesados e de passeio, passa a menos de 500 metros do Rio das Palmeiras e possui saída de bueiros pluviais conectada a um canal direto para a calha do rio.`,
      sourceHint: 'Apresenta a hipótese das partículas opacas escuras carreadas pela drenagem pluvial rodoviária.'
    },
    {
      id: 'doc-6',
      number: 6,
      style: 'newspaper',
      newspaperName: 'GAZETA DO VALE',
      edition: 'Comunidade & Tradições Ribeirinhas • Junho de 2021',
      tag: 'Gazeta do Vale • 2021',
      title: 'Pescadores relatam acúmulo de resíduos plásticos próximo ao antigo porto',
      type: 'Reportagem Comunitária',
      imageSrc: 'assets/slides/Gemini_Generated_Image_hqqy4lhqqy4lhqqy.jfif',
      imageCaption: 'Redes de pesca de poliamida rompidas e desfiadas por atrito mecânico em troncos e pedras.',
      fullText: `Trabalhadores da pesca artesanal que utilizam o trecho próximo ao antigo porto relataram acúmulo de fragmentos plásticos e pedaços de cordoalha presos aos remos e às redes de pesca. A Associação de Pescadores de Vale Verde admitiu que apetrechos de pesca fabricados com fios de poliamida e polietileno sofrem abrasão constante nas pedras do fundo do rio e se deterioram.
      Equipamentos acidentalmente perdidos ou descartados de forma indevida ao longo de décadas continuam se desfazendo lentamente em fragmentos menores. A associação informou que promove mutirões voluntários de retirada de entulho aquático, mas ainda carece de dados sobre o real volume de microplásticos oriundos dos apetrechos de pesca.`,
      sourceHint: 'Identifica a atividade pesqueira local como potencial geradora de fragmentos de redes e linhas.'
    },
    {
      id: 'doc-7',
      number: 7,
      style: 'newspaper',
      newspaperName: 'JORNAL RURAL',
      edition: 'Tecnologia Agrícola & Horticultura • Setembro de 2021',
      tag: 'Jornal Rural • 2021',
      title: 'Uso de coberturas plásticas (mulching) se expande na horticultura local',
      type: 'Informativo Agropecuário',
      imageSrc: 'assets/slides/Gemini_Generated_Image_djayl3djayl3djay.jfif',
      imageCaption: 'Filmes plásticos agrícolas expostos ao intemperismo solar e desprendimento de fragmentos no solo.',
      fullText: `Produtores hortifrutigranjeiros de Vale Verde vêm adotando filmes plásticos pretos de polietileno (técnica de mulching) nos canteiros para retenção de umidade do solo e inibição de plantas invasoras. A associação rural orienta que os filmes devam ser integralmente removidos e encaminhados à reciclagem após a colheita.
      No entanto, duas chácaras situadas nas encostas do Córrego das Tabocas (afluente do Rio das Palmeiras) apresentaram fragmentos plásticos ressecados pelo sol e parcialmente enterrados. Técnicos agrícolas alertam que o intemperismo solar associado ao escoamento superficial pluvial pode transportar pequenas lascas de filme plástico para as calhas fluviais.`,
      sourceHint: 'Adiciona a agricultura intensiva como fonte de fragmentos laminares de polietileno.'
    },
    {
      id: 'doc-8',
      number: 8,
      style: 'lab_report',
      protocolNumber: 'LAA-2022/0842-MONIT',
      labName: 'LABORATÓRIO MUNICIPAL DE ANÁLISES AMBIENTAIS',
      tag: 'Boletim Técnico Municipal • 2022',
      title: 'LAUDO TÉCNICO PERICIAL: Monitoramento de Partículas no Rio das Palmeiras',
      type: 'Relatório Técnico Didático de Monitoramento',
      imageSrc: 'assets/slides/Gemini_Generated_Image_38gdz338gdz338gd.jfif',
      imageCaption: 'Amostra de controle (Ponto A) - malha de triagem padronizada de 300 µm.',
      fullText: `Uma força-tarefa multidisciplinar realizou campanhas de coleta de água superficial em cinco pontos estratégicos ao longo de 18 km do Rio das Palmeiras, utilizando redes de plâncton de malha fina (300 µm) e contagem microscópica padronizada.
      
      TABELA OFICIAL DE MONITORAMENTO (Partículas por Litro de Água):
      • Estação Ponto A (Montante / Mata Ciliar Preservada): 6 partículas/L
      • Estação Ponto B (Próximo à Área Residencial e Esgoto): 18 partículas/L
      • Estação Ponto C (Jusante Imediata da Fábrica Têxtil Aurora): 47 partículas/L
      • Estação Ponto D (Cruzamento Rodovia dos Ipês / Canal de Drenagem): 39 partículas/L
      • Estação Ponto E (Entrada do Lago Azul / Área Recreativa): 28 partículas/L
      
      PARECER TÉCNICO & RESSALVA: As partículas foram quantificadas por triagem óptica morfológica. Não foram efetuadas análises químicas por espectroscopia FTIR (Infravermelho por Transformada de Fourier) para validar se 100% dos grânulos e filamentos correspondem a polímeros sintéticos, resíduos de carvão ou detritos biominerais.`,
      sourceHint: 'Dados quantitativos espaciais essenciais: mostram salto no Ponto C e Ponto D, com queda no Ponto E.'
    },
    {
      id: 'doc-9',
      number: 9,
      style: 'lab_report',
      protocolNumber: 'CITO-2022/1093-REV',
      labName: 'CENTRO INTEGRADO DE CITOLOGIA & MICROSCOPIA AMBIENTAL',
      tag: 'Revista Ciência & Ambiente • 2022',
      title: 'LAUDO DE MORFOLOGIA MICROSCÓPICA: Triagem de Partículas Fluviais',
      type: 'Relatório Laboratorial Citomorfológico',
      imageSrc: 'assets/slides/laminas_slide1.bmp',
      imageCaption: 'Dossiê Fotomicrográfico Oficial: caracterização morfológica comparativa de filamentos e grânulos.',
      fullText: `O laboratório de microscopia ambiental concluiu a classificação visual das partículas retidas nas amostras do Rio das Palmeiras. Foram identificados três grupos morfológicos predominantes:
      1. Microfibras alongadas flexíveis (azuis, vermelhas e transparentes): dominantes nas proximidades dos Pontos B e C.
      2. Fragmentos pretos opacos e grânulos amorfos: altamente prevalentes nas amostras do Ponto D.
      3. Fragmentos laminares delgados e transparentes: observados em baixas densidades nos Pontos A, C e no Lago.
      Os microscopistas enfatizam que a morfologia oferece pistas investigativas importantes, mas a identificação conclusiva requer espectroscopia para determinar a composição polimérica.`,
      sourceHint: 'Conecta formas microscópicas específicas às fontes suspeitas (fibras = têxtil/esgoto; preto opaco = pneu; filmes = agricultura).'
    },
    {
      id: 'doc-10',
      number: 10,
      style: 'lab_report',
      protocolNumber: 'ICTIO-2023/0411-TOX',
      labName: 'LABORATÓRIO DE ECOTOXICOLOGIA AQUÁTICA & ICTIOLOGIA',
      tag: 'Jornal Ciência Local • 2023',
      title: 'LAUDO DE NECROPSIA & CONTEÚDO GASTROINTESTINAL DE ICTIOFAUNA',
      type: 'Estudo Ecotoxicológico Ictiológico',
      imageSrc: 'assets/slides/histopatologia_peixe.jpg',
      imageCaption: 'Corte histológico das vilosidades intestinais de espécime com sinais de atrito mecânico por micropartículas sintéticas (H&E, 200x).',
      fullText: `Durante projeto de biomonitoramento ictiológico, pesquisadores analisaram o conteúdo gastrointestinal de duas espécies de peixes coletados no Rio das Palmeiras: o lambari (espécie onívora de pequeno porte) e a traíra (predadora de topo da cadeia local).
      Pequenas partículas filamentosas e grânulos foram detectados no trato de aproximadamente 38% dos lambaris e 62% das traíras dissecadas. Os pesquisadores salientam que a ingestão acidental demonstra a biodisponibilidade ambiental dos resíduos, mas a mera presença estomacal não comprova toxicidade crônica, translocação para o tecido muscular comestível ou biomagnificação trófica sistemática, requerendo análises histológicas aprofundadas.`,
      sourceHint: 'Comprova ingestão por organismos aquáticos, diferenciando presença física de prova de biomagnificação.'
    },
    {
      id: 'doc-11',
      number: 11,
      style: 'newspaper',
      newspaperName: 'JORNAL DO VALE',
      edition: 'Caderno de Ciência & Meio Ambiente • Outubro de 2023',
      tag: 'Jornal do Vale • 2023',
      title: 'Partículas alcançam o Lago Azul: pesquisadores debatem transporte ambiental',
      type: 'Nota de Oceanografia / Limnologia',
      imageSrc: 'assets/slides/Gemini_Generated_Image_9gnx1r9gnx1r9gnx.jfif',
      imageCaption: 'Amostra límnica do Lago Azul: biofilmes bacterianos agregados a resíduos em processo de decantação.',
      fullText: `Coletas periódicas no Lago Azul (reservatório localizado 5 km após a foz do Rio das Palmeiras) confirmaram a presença contínua de partículas, porém com densidade média (28 part/L) menor do que nos Pontos C e D do canal principal.
      Os cientistas discutem quatro mecanismos físicos e ecológicos para explicar o fenômeno:
      1. Diluição hidrológica pelo grande volume de água e confluência de riachos afluentes limpos;
      2. Decantação e deposição das partículas mais densas junto ao lodo de fundo do leito;
      3. Retenção mecânica por densos bancos de macrófitas aquáticas e vegetação marginal;
      4. Ingestão por organismos aquáticos ao longo da cadeia alimentar (fitoplâncton, zooplâncton e peixes).
      A diminuição na água límpida superficial não significa eliminação do contaminante do ecossistema, mas sim redistribuição entre compartimentos ambientais (água, sedimento e biota).`,
      sourceHint: 'Explica a dinâmica ambiental de transporte, sedimentação e compartimentação de poluentes.'
    },
    {
      id: 'doc-12',
      number: 12,
      style: 'lab_report',
      protocolNumber: 'AUDIT-2024/0991-IND',
      labName: 'COMISSÃO REGIONAL DE CONTROLE AMBIENTAL & AUDITORIA DE EFLUENTES',
      tag: 'Gazeta Regional • 2024',
      title: 'LAUDO DE AVALIAÇÃO DE EFICÁCIA: Ultrafiltração Industrial na Têxtil Aurora',
      type: 'Relatório Técnico de Controle e Mitigação',
      imageSrc: 'assets/slides/Gemini_Generated_Image_ke1ouvke1ouvke1o.jfif',
      imageCaption: 'Efluente fabril pós-ultrafiltração: retenção de 53,2% da carga inicial de microfibras.',
      fullText: `Após debates na câmara técnica do comitê de bacia e recomendações de pesquisadores, a empresa Têxtil Aurora investiu na instalação de filtros de microretenção e ultrafiltração na saída de seus efluentes industriais. Seis meses após a operação dos novos filtros, foi realizada uma nova campanha padronizada de amostragem nos mesmos pontos do rio.
      
      COMPARAÇÃO DE CONTAGEM (Antes da Instalação vs Depois da Instalação - part/L):
      • Ponto A (Montante / Antes da Fábrica): Antes = 6 | Depois = 6 (Variação: 0)
      • Ponto B (Próximo à Fábrica / Residencial): Antes = 18 | Depois = 17 (Variação: -1)
      • Ponto C (Jusante Imediata da Fábrica): Antes = 47 | Depois = 22 (Redução absoluta de 25 part/L = queda de 53,2%!)
      • Ponto D (Rodovia / Pneus): Antes = 39 | Depois = 36 (Variação: -3)
      • Ponto E (Lago Azul): Antes = 28 | Depois = 24 (Variação: -4)
      
      DISCUSSÃO CIENTÍFICA: A queda expressiva no Ponto C (de 47 para 22) reforça fortemente que a fábrica contribuía substancialmente para a carga de partículas. No entanto, o fato de o Ponto C ainda apresentar 22 partículas/L (e os outros pontos continuarem com valores elevados) demonstra empiricamente a existência de MÚLTIPLAS FONTES confluentes (esgoto doméstico, desgaste de pneus e dispersão secundária) que não cessaram.`,
      sourceHint: 'Evidência experimental de intervenção decisiva: comprova contribuição industrial sem isentar as demais fontes.'
    }
  ],

  // As 9 Fases da Investigação com suas respectivas Fichas e Questões
  phases: [
    {
      phaseNumber: 1,
      lessonTitle: 'Aula 1: Abertura do Caso & Formulação de Hipóteses',
      fichas: ['Ficha 1', 'Ficha 2'],
      badge: 'Fase 1: O Enigma Inicial',
      duration: '45 minutos',
      goal: 'Compreender a denúncia da comunidade, examinar os recortes de jornais de 2018 e formular hipóteses preliminares sem pré-julgamentos.',
      docsInvolved: ['doc-1', 'doc-2'],
      questions: [
        {
          id: 'p1_q1',
          type: 'textarea',
          label: '1. O que foi observado no Rio das Palmeiras segundo os moradores e pescadores?',
          placeholder: 'Descreva os resíduos encontrados, a relação com as chuvas e os trechos onde foram vistos...',
          expectedHint: 'Presença de pequenos resíduos e fibras flutuantes acumulados nas margens e plantas ciliares, aumentando após fortes chuvas.'
        },
        {
          id: 'p1_q2',
          type: 'textarea',
          label: '2. O que a equipe de pesquisadores ainda precisa descobrir para entender o problema?',
          placeholder: 'Quais perguntas científicas não estão respondidas na reportagem?',
          expectedHint: 'A composição química exata dos resíduos, suas origens, se são tóxicos e qual o caminho que percorrem até o rio.'
        },
        {
          id: 'p1_q3',
          type: 'dual_hypothesis',
          label: '3. Formule duas hipóteses iniciais para a origem desses resíduos:',
          fields: [
            { key: 'hip_a', label: 'Hipótese A:', placeholder: 'Ex: Os resíduos podem ter origem na fábrica têxtil porque...' },
            { key: 'hip_b', label: 'Hipótese B:', placeholder: 'Ex: Os resíduos podem ser transportados pelas águas pluviais a partir de...' }
          ]
        },
        {
          id: 'p1_q4',
          type: 'textarea',
          label: '4. A proximidade geográfica da fábrica de tecidos (400 m) e sua expansão provam sua culpa? Justifique cientificamente.',
          placeholder: 'Lembre-se da regra: proximidade não comprova responsabilidade causal...',
          expectedHint: 'Não provam. Proximidade é apenas correlação espacial. Podem existir outras fontes a montante ou na mesma bacia; são necessárias amostragens antes e depois da fábrica.'
        }
      ]
    },
    {
      phaseNumber: 2,
      lessonTitle: 'Aula 2: Fontes Alternativas & Esgoto Doméstico',
      fichas: ['Ficha 3'],
      badge: 'Fase 2: Efluentes Domésticos',
      duration: '45 minutos',
      goal: 'Analisar o impacto do saneamento básico, da ligação clandestina de esgoto e da lavagem cotidiana de tecidos sintéticos.',
      docsInvolved: ['doc-3', 'doc-4'],
      questions: [
        {
          id: 'p2_q1',
          type: 'textarea',
          label: '1. Que nova fonte potencial de partículas surge com a fiscalização relatada no Documento 3?',
          placeholder: 'Identifique o local e a população atendida por esse despejo irregular...',
          expectedHint: 'Uma ligação irregular de esgoto residencial bruto proveniente de um bairro com 3 mil moradores.'
        },
        {
          id: 'p2_q2',
          type: 'textarea',
          label: '2. De acordo com o Documento 4, como as atividades domésticas cotidianas liberam fibras sintéticas no meio ambiente?',
          placeholder: 'Explique o que ocorre durante a lavagem de roupas e a eficiência das estações de tratamento...',
          expectedHint: 'A lavagem mecânica de tecidos sintéticos (fleece, náilon, poliéster) desprende milhares de microfibras que seguem para o esgoto e escapam de filtros comuns.'
        },
        {
          id: 'p2_q3',
          type: 'table_compare',
          label: '3. Quadro Comparativo: Indústria Têxtil vs. Esgoto Doméstico',
          headers: ['Critério', 'Indústria Têxtil Aurora', 'Esgoto Residencial'],
          rows: [
            { id: 'evid', label: 'Qual evidência favorece a hipótese?', industrial: 'Fabrica tecidos com fibras sintéticas a 400m do rio e ampliou produção.', domestic: 'Despejo clandestino direto de 3 mil habitantes sem tratamento.' },
            { id: 'falt', label: 'Qual informação ainda falta?', industrial: 'Testar os efluentes na saída dos tanques industriais.', domestic: 'Contar microfibras específicas na tubulação residencial.' },
            { id: 'test', label: 'Como testar empiricamente?', industrial: 'Amostragem microscópica e química a montante e a jusante da fábrica.', domestic: 'Instalar filtros de retenção na saída do esgoto do bairro.' }
          ]
        },
        {
          id: 'p2_q4',
          type: 'textarea',
          label: '4. Atualize a explicação provisória da sua equipe: a culpa pode ser dividida?',
          placeholder: 'Como essa nova informação altera ou refina suas hipóteses iniciais?',
          expectedHint: 'A suspeita agora se divide: tanto a fábrica quanto os lares podem liberar fibras indistinguíveis a olho nu.'
        }
      ]
    },
    {
      phaseNumber: 3,
      lessonTitle: 'Aula 3: Tráfego de Veículos, Desgaste de Pneus e Pesca',
      fichas: ['Ficha 4'],
      badge: 'Fase 3: Mapeamento de Fontes',
      duration: '45 minutos',
      goal: 'Incorporar fontes difusas do tráfego rodoviário e petrechos de pesca à matriz investigativa.',
      docsInvolved: ['doc-5', 'doc-6'],
      questions: [
        {
          id: 'p3_q1',
          type: 'textarea',
          label: '1. Como o tráfego de veículos na Rodovia dos Ipês pode fazer com que partículas cheguem ao rio?',
          placeholder: 'Descreva o mecanismo físico e o papel da drenagem pluvial urbana...',
          expectedHint: 'O atrito dos pneus no asfalto gera pó de borracha sintética. A chuva lava as pistas e a drenagem pluvial canaliza o material ao rio sem retenção.'
        },
        {
          id: 'p3_q2',
          type: 'textarea',
          label: '2. Como um pesquisador em laboratório pode distinguir visualmente uma partícula de pneu de uma fibra têxtil?',
          placeholder: 'Pense em cor, formato e flexibilidade observados no microscópio...',
          expectedHint: 'Partículas de pneu são grânulos ou fragmentos pretos/escuros, opacos e angulares, enquanto fibras têxteis são filamentos longos, flexíveis e coloridos/translúcidos.'
        },
        {
          id: 'p3_q3',
          type: 'source_map',
          label: '3. Construção do Mapa Mental de Fontes Potenciais:',
          sources: [
            { name: 'Indústria Têxtil', material: 'Microfibras sintéticas (poliéster/náilon)', path: 'Canal de efluentes industriais' },
            { name: 'Bairro Residencial', material: 'Fibras de lavagem de roupas', path: 'Esgoto sanitário / drenagem' },
            { name: 'Rodovia dos Ipês', material: 'Borracha de pneus desgastados', path: 'Galerias pluviais de enxurrada' },
            { name: 'Atividade Pesqueira', material: 'Fios e redes de poliamida rompidas', path: 'Perda/deterioração direta no leito' }
          ]
        }
      ]
    },
    {
      phaseNumber: 4,
      lessonTitle: 'Aula 4: Indicadores Ambientais & Monitoramento Numérico',
      fichas: ['Ficha 5'],
      badge: 'Fase 4: Análise Quantitativa',
      duration: '45 minutos',
      goal: 'Interpretar os dados numéricos de contagem de partículas das 5 estações fluviais e construir o gráfico de monitoramento.',
      docsInvolved: ['doc-7', 'doc-8'],
      questions: [
        {
          id: 'p4_q1',
          type: 'calc',
          label: '1. Identifique o ponto com maior e menor contagem de partículas e calcule a diferença absoluta:',
          fields: [
            { key: 'p_max', label: 'Ponto com Maior Contagem:', answer: 'Ponto C (47 partículas/L)' },
            { key: 'p_min', label: 'Ponto com Menor Contagem:', answer: 'Ponto A (6 partículas/L)' },
            { key: 'p_diff', label: 'Diferença Absoluta (C - A):', answer: '41 partículas/L' }
          ]
        },
        {
          id: 'p4_q2',
          type: 'chart_builder',
          label: '2. Gráfico Interativo de Monitoramento Ambiental (5 Pontos do Rio)',
          chartType: 'bar',
          dataPoints: [
            { point: 'Ponto A (Montante)', value: 6, color: '#10b981' },
            { point: 'Ponto B (Residencial)', value: 18, color: '#3b82f6' },
            { point: 'Ponto C (Indústria Têxtil)', value: 47, color: '#ef4444' },
            { point: 'Ponto D (Rodovia/Pneus)', value: 39, color: '#f59e0b' },
            { point: 'Ponto E (Lago Azul)', value: 28, color: '#8b5cf6' }
          ]
        },
        {
          id: 'p4_q3',
          type: 'textarea',
          label: '3. O Ponto C apresenta a maior contagem (47 part/L). Isso é uma prova conclusiva e irrefutável de que a fábrica é a única responsável? Explique com rigor científico.',
          placeholder: 'Considere a ressalva do boletim técnico e a contribuição cumulativa...',
          expectedHint: 'Não é prova irrefutável de culpa exclusiva. A montante (B) já havia 18 part/L. O Ponto C reflete a soma acumulada de tudo o que veio antes mais a fábrica, e as partículas não foram testadas quimicamente por FTIR.'
        }
      ]
    },
    {
      phaseNumber: 5,
      lessonTitle: 'Aula 5: Microscopia Óptica & Ingestão por Organismos',
      fichas: ['Ficha 6'],
      badge: 'Fase 5: O Trato Digestório',
      duration: '45 minutos',
      goal: 'Explorar as lâminas no Microscópio Virtual, diferenciar fibras de grânulos e compreender as implicações biológicas da ingestão por peixes.',
      docsInvolved: ['doc-9', 'doc-10'],
      questions: [
        {
          id: 'p5_q1',
          type: 'microscope_task',
          label: '1. Atividade de Microscopia Virtual: Inspecione as Lâminas dos Pontos B, C, D e o Estômago do Peixe',
          instruction: 'Abra a aba do Microscópio Virtual, selecione as lâminas indicadas, ajuste o foco micrométrico, use a régua micrométrica e capture uma fotomicrografia para o relatório.'
        },
        {
          id: 'p5_q2',
          type: 'textarea',
          label: '2. A presença de partículas no estômago de 38% dos lambaris e 62% das traíras comprova que ocorreu biomagnificação trófica? Explique a diferença entre ingestão e biomagnificação.',
          placeholder: 'Diferencie bioacumulação individual de biomagnificação ao longo dos níveis tróficos...',
          expectedHint: 'Não comprova. Comprova apenas ingestão (biodisponibilidade). Biomagnificação exigiria provar aumento de concentração de tecidos ao longo da cadeia trófica com retenção celular.'
        },
        {
          id: 'p5_q3',
          type: 'sequence',
          label: '3. Ordene logicamente a cadeia causal de investigação científica:',
          steps: [
            '1. Fonte potencial emite material sintético no ambiente.',
            '2. Transporte hídrico e dispersão pluvial carreiam as partículas pelo rio.',
            '3. Organismos aquáticos ingerem partículas confundi-las com alimento.',
            '4. Exame espectroscópico (FTIR) confirma composição polimérica exata.'
          ]
        }
      ]
    },
    {
      phaseNumber: 6,
      lessonTitle: 'Aula 6: Transporte Hidrológico, Lago Azul & Simulação Trófica',
      fichas: ['Ficha 7'],
      badge: 'Fase 6: Dinâmica e Modelagem',
      duration: '45 minutos',
      goal: 'Investigar por que a contagem cai no Lago Azul (28 part/L) e explorar o modelo matemático da cadeia alimentar simulada.',
      docsInvolved: ['doc-11'],
      questions: [
        {
          id: 'p6_q1',
          type: 'checkbox_group',
          label: '1. A contagem no Lago Azul caiu para 28 part/L. Quais explicações físicas/ecológicas são plausíveis para isso?',
          options: [
            { text: 'Diluição pelo grande volume de água limpa de afluentes do lago', correct: true },
            { text: 'Sedimentação e decantação das partículas mais pesadas no lodo do fundo', correct: true },
            { text: 'Retenção mecânica em raízes de plantas aquáticas e macrófitas', correct: true },
            { text: 'Desaparecimento mágico de todo o plástico sem deixar resíduos', correct: false },
            { text: 'Ingestão e retenção transitória por organismos da teia alimentar', correct: true }
          ]
        },
        {
          id: 'p6_q2',
          type: 'trophic_simulation_task',
          label: '2. Simulador Interativo da Cadeia Trófica: Cenário A (Inicial) vs Cenário B (Maior Emissão)',
          description: 'Acesse o Simulador Trófico abaixo para comparar como o índice de partículas varia entre Algas, Zooplâncton, Peixe Pequeno e Peixe Predador.'
        },
        {
          id: 'p6_q3',
          type: 'calc',
          label: '3. Na simulação, qual organismo teve o maior aumento absoluto do índice entre o Cenário A e o Cenário B?',
          fields: [
            { key: 'sim_algas', label: 'Algas: de 10 para 20 -> Aumento:', answer: '+10' },
            { key: 'sim_zoo', label: 'Zooplâncton: de 18 para 39 -> Aumento:', answer: '+21' },
            { key: 'sim_peixe_p', label: 'Peixe Pequeno: de 31 para 74 -> Aumento:', answer: '+43' },
            { key: 'sim_peixe_g', label: 'Peixe Predador: de 57 para 141 -> Aumento:', answer: '+84 (Maior Aumento Absoluto)' }
          ]
        }
      ]
    },
    {
      phaseNumber: 7,
      lessonTitle: 'Aula 7: Teste das Hipóteses & Eficácia do Filtro Industrial',
      fichas: ['Ficha 8'],
      badge: 'Fase 7: A Matriz de Evidências',
      duration: '45 minutos',
      goal: 'Analisar os dados de 2024 após a instalação do sistema de ultrafiltração da fábrica e preencher a Matriz de Evidências.',
      docsInvolved: ['doc-12'],
      questions: [
        {
          id: 'p7_q1',
          type: 'calc',
          label: '1. Cálculo da Redução Percentual no Ponto C (Jusante da Fábrica):',
          formula: 'Redução % = ((Valor Inicial - Valor Final) / Valor Inicial) * 100',
          initialVal: 47,
          finalVal: 22,
          stepCalculation: '((47 - 22) / 47) * 100 = (25 / 47) * 100 = 53,19%',
          result: '53,2%'
        },
        {
          id: 'p7_q2',
          type: 'evidence_matrix',
          label: '2. Matriz de Evidências Científicas (Classifique: F = Favorece | E = Enfraquece | I = Inconclusivo):',
          hypotheses: [
            'Indústria Têxtil',
            'Esgoto Doméstico',
            'Pneus e Rodovia',
            'Pesca Local',
            'Agricultura',
            'Múltiplas Fontes'
          ],
          rows: [
            { docId: 'doc-1', docTitle: '1. Resíduos após Chuva', defaults: ['I', 'F', 'F', 'I', 'F', 'F'] },
            { docId: 'doc-2', docTitle: '2. Ampliação da Fábrica', defaults: ['F', 'I', 'I', 'I', 'I', 'I'] },
            { docId: 'doc-3', docTitle: '3. Esgoto Irregular Lacrado', defaults: ['I', 'F', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-4', docTitle: '4. Fibras em Lavagens', defaults: ['I', 'F', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-5', docTitle: '5. Desgaste de Pneus', defaults: ['I', 'I', 'F', 'I', 'I', 'F'] },
            { docId: 'doc-6', docTitle: '6. Resíduos da Pesca', defaults: ['I', 'I', 'I', 'F', 'I', 'F'] },
            { docId: 'doc-7', docTitle: '7. Plásticos Agrícolas', defaults: ['I', 'I', 'I', 'I', 'F', 'F'] },
            { docId: 'doc-8', docTitle: '8. Contagem Espacial 5 Pontos', defaults: ['F', 'F', 'F', 'I', 'I', 'F'] },
            { docId: 'doc-9', docTitle: '9. Análise Microscópica', defaults: ['F', 'F', 'F', 'I', 'F', 'F'] },
            { docId: 'doc-10', docTitle: '10. Partículas em Peixes', defaults: ['I', 'I', 'I', 'I', 'I', 'I'] },
            { docId: 'doc-11', docTitle: '11. Partículas no Lago', defaults: ['I', 'I', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-12', docTitle: '12. Filtragem Industrial (Queda)', defaults: ['F', 'I', 'I', 'I', 'I', 'F'] }
          ]
        },
        {
          id: 'p7_q3',
          type: 'textarea',
          label: '3. Decisão da Equipe: A redução de 53,2% no Ponto C inocenta ou condena a fábrica? E o que ela revela sobre as outras fontes?',
          placeholder: 'Justifique demonstrando que uma única fonte não explica toda a contaminação...',
          expectedHint: 'Comprova que a fábrica era uma fonte importante e causava um pico acentuado, mas como ainda restam 22 part/L e os demais pontos mantêm valores altos, a contaminação é MÚLTIPLA.'
        }
      ]
    },
    {
      phaseNumber: 8,
      lessonTitle: 'Aula 8: Conclusão Científica & Proposta de Intervenção',
      fichas: ['Ficha 9'],
      badge: 'Fase 8: Solução Cidadã',
      duration: '45 minutos',
      goal: 'Redigir a síntese conclusiva da equipe fundamentada em evidências e desenhar uma proposta de intervenção para a bacia hidrográfica.',
      docsInvolved: ['doc-1', 'doc-8', 'doc-12'],
      questions: [
        {
          id: 'p8_q1',
          type: 'textarea',
          label: '1. Conclusão Científica da Equipe: Como os microplásticos chegam ao Rio das Palmeiras e quais são suas fontes comprovadas?',
          placeholder: 'Apresente a explicação mais bem sustentada citando dados concretos dos documentos...',
          expectedHint: 'A contaminação é multicausal: a indústria têxtil contribuía expressivamente com fibras sintéticas (comprovado pela queda pós-filtro), somada ao esgoto doméstico não tratado (fibras residenciais) e à drenagem rodoviária (pó de borracha de pneus no Ponto D).'
        },
        {
          id: 'p8_q2',
          type: 'textarea',
          label: '2. Qual evidência gerou mais dúvida ou contradição durante a investigação?',
          placeholder: 'Discuta limites dos dados, como a ausência de testes químicos (FTIR)...',
          expectedHint: 'A contagem no Ponto C ser alta antes do filtro levantou suspeita exclusiva, mas a persistência de 22 part/L após o filtro e a presença de 18 part/L antes da fábrica provaram que ela não agia sozinha.'
        },
        {
          id: 'p8_q3',
          type: 'intervention_plan',
          label: '3. Proposta de Intervenção Comunitária e Mitigação:',
          fields: [
            { key: 'plan_name', label: 'Nome do Projeto:', placeholder: 'Ex: Projeto Rio Limpo Vale Verde' },
            { key: 'plan_target', label: 'Fontes Prioritárias:', placeholder: 'Ex: Esgoto doméstico e canalização pluvial da rodovia' },
            { key: 'plan_action', label: 'Como a medida funcionará?', placeholder: 'Descreva a tecnologia ou ação cidadã (ex: bacias de biofiltração na rodovia, conexão à ETE)...' },
            { key: 'plan_indicator', label: 'Indicador de Sucesso:', placeholder: 'Ex: Queda das partículas nos Pontos B e D para menos de 10 part/L em 1 ano' }
          ]
        }
      ]
    },
    {
      phaseNumber: 9,
      lessonTitle: 'Aula 9: Conferência Científica & Autoavaliação Individual',
      fichas: ['Ficha 10', 'Ficha 11'],
      badge: 'Fase 9: Simpósio Final',
      duration: '45 minutos',
      goal: 'Preparar a apresentação para os pares, defender a coerência causal das evidências e realizar a autoavaliação metacognitiva.',
      docsInvolved: [],
      questions: [
        {
          id: 'p9_q1',
          type: 'presentation_prep',
          label: '1. Roteiro Sintético de Apresentação da Equipe (Conferência Científica):',
          fields: [
            { key: 'prep_problem', label: 'O Problema Central:', placeholder: 'Resuma o que aflige Vale Verde em 2 frases...' },
            { key: 'prep_strongest_evid', label: 'Evidência Mais Forte:', placeholder: 'Qual dado numérico ou lâmina foi decisivo?' },
            { key: 'prep_solution', label: 'Proposta de Intervenção:', placeholder: 'Qual solução vocês apresentarão à prefeitura?' }
          ]
        },
        {
          id: 'p9_q2',
          type: 'self_assessment_rubric',
          label: '2. Autoavaliação Individual do Pesquisador (Marque Sim, Parcialmente ou Não):',
          criteria: [
            'Formulei e reformulei hipóteses conforme novos dados surgiram',
            'Analisei notícias com olhar crítico sem aceitar conclusões precipitadas',
            'Diferenciei suspeita de evidência empírica comprovada',
            'Interpretei tabelas e gráficos quantitativos corretamente',
            'Explorei lâminas no microscópio virtual identificando morfologias',
            'Compreendi o modelo de cadeia alimentar e dinâmica trófica',
            'Colaborei ativamente com meus colegas de equipe',
            'Ajudei a fundamentar a proposta de intervenção ecológica'
          ]
        },
        {
          id: 'p9_q3',
          type: 'textarea',
          label: '3. Reflexão Metacognitiva Final: Por que a ciência exige evidências e não aceita acusações baseadas apenas em proximidade geográfica?',
          placeholder: 'Escreva sua conclusão sobre a importância do método científico...',
          expectedHint: 'Porque culpar uma entidade por proximidade pode levar à punição injusta de um ator enquanto a verdadeira contaminação (esgoto, pneus, lixo) continua degradando o ambiente sem ser tratada.'
        }
      ]
    }
  ],

  // Dados das Lâminas do Microscópio Virtual (Exclusivamente Lâmina 1 e Lâmina 2)
  slides: [
    {
      id: 'slide_1',
      code: 'LÂMINA 01',
      title: 'Lâmina 1: Dossiê Microscópico Oficial (Campo / Coletas)',
      location: 'Rio das Palmeiras - Estações de Monitoramento',
      category: 'Arquivo Técnico Original',
      src: 'assets/slides/laminas_slide1.bmp',
      thumb: 'assets/slides/laminas_slide1.bmp',
      count: 'Amostras de Campo Fluviais',
      typeText: 'Triagem de micropartículas e filamentos em suspensão',
      description: 'Lâmina 1 do arquivo oficial de investigação. Permite explorar sob diferentes aumentos as partículas retidas nas amostragens do rio.',
      scaleMicronsPerPixel: 0.15,
      uvFluorescence: true
    },
    {
      id: 'slide_2',
      code: 'LÂMINA 02',
      title: 'Lâmina 2: Dossiê Citomorfológico Comparativo',
      location: 'Laboratório de Limnologia & Citologia',
      category: 'Arquivo Técnico Original',
      src: 'assets/slides/laminas_slide2.bmp',
      thumb: 'assets/slides/laminas_slide2.bmp',
      count: 'Painel Morfológico Diferencial',
      typeText: 'Fibras sintéticas, fragmentos angulares e matriz biológica',
      description: 'Lâmina 2 do arquivo oficial. Exibe a comparação morfológica entre fibras filiformes, fragmentos opacos e agregados celulares.',
      scaleMicronsPerPixel: 0.15,
      uvFluorescence: true
    }
  ],

  // Guia Pedagógico Completo para o Professor
  teacherGuide: {
    title: 'Orientações Pedagógicas para o Docente • 1ª Série do Ensino Médio',
    warning: 'Este conteúdo contém diretrizes didáticas e o gabarito orientador calibrado para estudantes da 1ª Série do Ensino Médio. Mantenha em modo restrito aos alunos.',
    pedagogicalGoals: [
      'Alinhamento com a BNCC da 1ª Série do Ensino Médio: Habilidades EM13CNT206, EM13CNT301 e EM13CNT303 (Área de Ciências da Natureza).',
      'Desenvolver o letramento científico e o pensamento crítico na leitura de mídias, gráficos e relatórios técnicos.',
      'Diferenciar empiricamente os conceitos de correlação, proximidade espacial e causalidade física.',
      'Capacitar os alunos a lidar com incertezas e limitações dos dados (ex: ausência de espectroscopia FTIR).',
      'Compreender os mecanismos de bioacumulação e a dinâmica de poluentes em cadeias e teias alimentares aquáticas.',
      'Estimular a argumentação científica fundamentada em evidências em vez de pré-julgamentos intuitivos.'
    ],
    timelinePacing: [
      { week: 'Aulas 1-2', focus: 'Abertura do caso, leitura crítica das notícias 1 a 4 e quebra do viés de culpar apenas a fábrica.' },
      { week: 'Aulas 3-4', focus: 'Expansão para tráfego e agricultura, cálculo de indicadores numéricos e gráfico dos 5 pontos.' },
      { week: 'Aulas 5-6', focus: 'Prática no Microscópio Virtual, inspeção do trato de peixes e simulação computacional trófica.' },
      { week: 'Aulas 7-8', focus: 'Cálculo de redução pós-filtro (53,2%), Matriz de Evidências completa e redação da proposta de intervenção.' },
      { week: 'Aula 9', focus: 'Conferência científica (apresentação dos grupos), debate com a turma e autoavaliação.' }
    ],
    answerKey: {
      industrialResponsibility: 'A fábrica contribuía substancialmente (provado pela redução de 53,2% após o filtro no Ponto C), mas NÃO ERA a única responsável. O Ponto C ainda manteve 22 part/L e os Pontos B (18) e D (39) comprovam que esgoto e tráfego rodoviário continuam ativos.',
      correlationVsCausality: 'Proximidade geográfica (400 m) é correlação espacial. A causalidade só foi fortalecida após a intervenção controlada (instalação do filtro e medição pós-intervenção).',
      biomagnificationDistinction: 'A presença de partículas no estômago de peixes comprova ingestão e biodisponibilidade, mas não biomagnificação. Para biomagnificar, o poluente precisa ser absorvido pelas células dos tecidos e aumentar sua concentração nos níveis tróficos superiores.'
    }
  }
};

// ============================================================================
// BANCO DE DADOS DO DESAFIO 02: FLORAÇÃO VERMELHA EM VALE VERDE
// Eutrofização Artificial, Cianobactérias Tóxicas e Anóxia Noturna
// ============================================================================
const DESAFIO_02_DATA = {
  challenge: {
    id: 'desafio-2',
    code: 'DESAFIO-02',
    title: 'Floração Vermelha em Vale Verde',
    subtitle: 'Eutrofização Artificial, Cianobactérias Tóxicas e Anóxia Noturna',
    subject: 'Biologia & Ciências da Natureza',
    level: '1ª Série do Ensino Médio • Biologia & Ciências da Natureza (BNCC)',
    methodology: 'PBL – Aprendizagem Baseada em Problemas',
    totalLessons: 9,
    lessonDuration: '45 minutos cada',
    estimatedTime: '6 a 9 aulas',
    badge: 'Eco-Toxicologista Límnico',
    context: `No auge do verão, as águas calmas do Lago Azul e do trecho represado de Vale Verde amanheceram cobertas por uma espessa camada de espuma com coloração avermelhada e verde-azulada e odor fétido. Frequentadores do balneário e praticantes de esportes aquáticos relataram queimação nos olhos, irritação na pele e náuseas após o contato. Simultaneamente, centenas de peixes (alevinos, lambaris e tilápias) foram encontrados mortos boiando nas margens com as brânquias inflamadas e bocas escancaradas. A cidade entrou em estado de emergência ambiental. Três suspeitas principais foram levantadas pela população: o despejo de esgoto doméstico com alta carga de fósforo e detergentes pela estação municipal sobrecarregada, o escoamento superficial de fertilizantes agrícolas solúveis (adubação NPK) após tempestades, e a liberação de compostos orgânicos do lodo anaeróbio do fundo da antiga represa sob forte onda de calor. Sua equipe de pesquisadores periciais deve analisar laudos periciais, inspecionar lâminas ao microscópio, quantificar os nutrientes nas estações de monitoramento, modelar o ciclo diurno-noturno do oxigênio dissolvido e propor um plano de intervenção ecológica para recuperar a bacia.`,
    rules: [
      'Examine cada laudo técnico e notícia oficial antes de debater com a equipe.',
      'Diferencie floração inofensiva de microalgas de florescimento de cianobactérias produtoras de toxinas.',
      'Compreenda a relação estequiométrica entre nitrogênio (N) e fósforo (P) na limitação do crescimento fitoplanctônico.',
      'Analise a dinâmica do oxigênio dissolvido: entenda por que picos de fotossíntese diurna geram anóxia mortal na madrugada.',
      'Utilize os dados das 5 estações do lago e da bacia para fundamentar cálculos e gráficos.',
      'Ao final, elabore um plano pericial de contenção de nutrientes e restauração da bacia hidrográfica.'
    ],
    glossary: [
      {
        term: 'Eutrofização Artificial',
        definition: 'Processo antrópico de enriquecimento das águas por nutrientes inorgânicos (especialmente fósforo e nitrogênio), provocando proliferação excessiva e descontrolada de organismos fotossintetizantes (fitoplâncton e cianobactérias).'
      },
      {
        term: 'Cianobactérias & Microcistinas',
        definition: 'Bactérias fototróficas capazes de sintetizar compostos químicos complexos. Certas linhagens (ex: Microcystis aeruginosa) liberam microcistinas, hepatotoxinas potentes que bloqueiam proteínas fosfatases e causam hemorragia hepática em animais e humanos.'
      },
      {
        term: 'Anóxia Noturna',
        definition: 'Queda extrema do oxigênio dissolvido (OD < 2 mg/L) que ocorre durante a madrugada em corpos d\'água eutrofizados, quando a fotossíntese cessa e a respiração contínua da biomassa algal somada à decomposição bacteriana consome todo o oxigênio.'
      },
      {
        term: 'Demanda Bioquímica de Oxigênio (DBO)',
        definition: 'Medida indireta da matéria orgânica biodegradável na água, expressa pela quantidade de oxigênio consumida por microrganismos aeróbios para oxidá-la ao longo de 5 dias a 20°C (DBO5).'
      },
      {
        term: 'Fósforo como Nutriente Limitante',
        definition: 'Princípio ecológico (Lei do Mínimo de Liebig) que estabelece que, em águas doces continentais, o fósforo disponível é o nutriente que mais restringe o crescimento das algas. Pequenos aportes provocam explosões populacionais.'
      },
      {
        term: 'Carga Interna de Sedimento (Internal Loading)',
        definition: 'Liberação de fósforo e outros nutrientes estocados no sedimento de fundo para a coluna d\'água sob condições de anóxia e altas temperaturas, perpetuando florações mesmo quando as fontes externas cessam.'
      }
    ]
  },
  documents: [
    {
      id: 'doc-201',
      number: 1,
      style: 'newspaper',
      newspaperName: 'JORNAL DO VALE',
      edition: 'Edição Especial de Verão • 14 de Janeiro de 2024 • Vale Verde',
      tag: 'Jornal do Vale • 14 de Janeiro de 2024',
      title: 'Lago Azul amanhece coberto por manto verde-azulado e moradores relatam mal-estar',
      type: 'Notícia de Alerta Comunitário',
      imageSrc: 'assets/slides/Gemini_Generated_Image_9gnx1r9gnx1r9gnx.jfif',
      imageCaption: 'Registro fotográfico: densa escuma esverdeada e avermelhada acumulada nas margens do balneário municipal.',
      fullText: `Moradores e turistas que frequentam a represa do Lago Azul foram surpreendidos por uma drástica alteração nas águas: uma espessa mancha de cor verde-azulada brilhante, com faixas avermelhadas e forte odor de matéria em decomposição, cobriu toda a área rasa próxima à orla.
      Banhistas que entraram na água pela manhã relataram coceira intensa na pele, ardência nos olhos e sintomas de náusea. O Corpo de Bombeiros e a Defesa Civil isolaram provisoriamente a praia pública e desaconselharam qualquer contato com a água ou consumo de pescados. A Secretaria Municipal de Meio Ambiente anunciou o início de coletas periciais emergenciais para identificar a natureza da substância.`,
      sourceHint: 'Identifica o início súbito da floração na época mais quente do ano e efeitos agudos de contato na população.'
    },
    {
      id: 'doc-202',
      number: 2,
      style: 'newspaper',
      newspaperName: 'GAZETA REGIONAL',
      edition: 'Caderno Regional de Meio Ambiente • 17 de Janeiro de 2024',
      tag: 'Gazeta Regional • 17 de Janeiro de 2024',
      title: 'Centenas de peixes amanhecem mortos boiando na represa municipal',
      type: 'Reportagem Investigativa',
      imageSrc: 'assets/slides/Gemini_Generated_Image_bk2ce8bk2ce8bk2c.jfif',
      imageCaption: 'Massa de tilápias e lambaris mortos recolhidos pelas equipes de limpeza urbana nas margens da represa.',
      fullText: `Pescadores artesanais e trabalhadores da represa registraram uma cena alarmante na manhã de ontem: centenas de quilos de peixes de diversas espécies e idades (alevinos, lambaris e tilápias adultas) amanheceram flutuando mortos nas águas calmas do Lago Azul.
      Segundo os relatos dos pescadores mais experientes, muitos peixes vinham à tona boquejando na superfície d'água no final da madrugada, aparentando sufocamento. Especialistas ouvidos pelo jornal alertam que mortandades súbitas com essas características podem estar associadas à queda severa de oxigênio ou à presença de toxinas biológicas potentes. Amostras foram recolhidas para necrópsia veterinária.`,
      sourceHint: 'Destaca a asfixia aparente no final da madrugada, sugerindo mecanismo de anóxia noturna ou intoxicação branquial.'
    },
    {
      id: 'doc-203',
      number: 3,
      style: 'lab_report',
      protocolNumber: 'AGRO-2024/0122-FISCAL',
      labName: 'SECRETARIA DE DESENVOLVIMENTO AGROPECUÁRIO & MEIO AMBIENTE',
      tag: 'Relatório de Fiscalização Rural • 22 de Janeiro de 2024',
      title: 'AUTO DE INSPEÇÃO AGROPECUÁRIA: Escoamento de Adubação NPK no Córrego das Tabocas',
      type: 'Relatório de Fiscalização Agrícola',
      imageSrc: 'assets/slides/Gemini_Generated_Image_djayl3djayl3djay.jfif',
      imageCaption: 'Talhões agrícolas em declive com sulcos de erosão e arraste de solo fertilizado em direção ao leito do riacho.',
      fullText: `Fiscais ambientais inspecionaram propriedades de cultivo intensivo de milho e hortaliças situadas na microbacia do Córrego das Tabocas, tributário que deságua no Rio das Palmeiras a montante do Lago Azul. Constatou-se que, dias antes do florescimento no lago, ocorreram temporais de alta intensidade (85 mm de precipitação em 3 horas).
      As chuvas torrenciais lavaram solos que haviam recebido adubação mineral solúvel pesada com formulação NPK (Nitrogênio, Fósforo e Potássio), além de esterco de aviário curtido. Foram identificados sulcos de erosão laminar descarregando enxurradas turvas diretamente no riacho, sem passagem por faixas ripárias de contenção ou bacias de retenção pluvial.`,
      sourceHint: 'Apresenta a fonte difusa agrícola: fertilizantes minerais solúveis e matéria orgânica carreados por fortes temporais.'
    },
    {
      id: 'doc-204',
      number: 4,
      style: 'lab_report',
      protocolNumber: 'SAN-2024/0128-ETE',
      labName: 'COMPANHIA REGIONAL DE SANEAMENTO & ÁGUAS DE VALE VERDE',
      tag: 'Boletim de Engenharia Sanitária • 28 de Janeiro de 2024',
      title: 'AUDITORIA OPERACIONAL DA ETE CENTRAL: Carga de Fósforo e Detergentes em Efluentes',
      type: 'Laudo de Auditoria Sanitária',
      imageSrc: 'assets/slides/Gemini_Generated_Image_3v7oin3v7oin3v7o.jfif',
      imageCaption: 'Canal de descarga de efluentes tratados da ETE Municipal com turbidez residual e formação de espumas.',
      fullText: `Uma comissão técnica auditou o desempenho da Estação de Tratamento de Esgoto (ETE) Central de Vale Verde durante os primeiros meses do ano. A planta, projetada para atender 40 mil habitantes, operou com sobrecarga volumétrica média de 38% em razão do crescimento urbano recente.
      O laudo constatou que a ETE utiliza processo de lodos ativados secundários convencionais, eficiente na remoção de matéria carbonácea (DBO), porém carece de etapa terciária de precipitação físico-química de fósforo. Como consequência, o efluente lançado no rio manteve concentração média de Fósforo Total de 4,2 mg/L, impulsionado pelo consumo domiciliar massivo de detergentes em pó convencionais ricos em polifosfatos e descargas sanitárias brutas.`,
      sourceHint: 'Identifica uma fonte pontual contínua de fósforo doméstico não retido pelo sistema secundário da ETE.'
    },
    {
      id: 'doc-205',
      number: 5,
      style: 'newspaper',
      newspaperName: 'CIÊNCIA HOJE REGIONAL',
      edition: 'Artigo de Divulgação Científica • Volume 19 • Fevereiro de 2024',
      tag: 'Ciência Hoje Regional • 2024',
      title: 'Florescimentos algais e o fósforo como nutriente limitante em águas continentais',
      type: 'Artigo Científico de Divulgação',
      imageSrc: 'assets/slides/Gemini_Generated_Image_d84jsrd84jsrd84j.jfif',
      imageCaption: 'Estrutura celular microscópica de cianobactérias exibindo vesículas de gás (aerótopos) para flutuação na coluna d’água.',
      fullText: `Pesquisadores do Centro de Recursos Hídricos explicam os mecanismos ecológicos da eutrofização em reservatórios subtropicais. Em ecossistemas de água doce, o fósforo atua historicamente como o nutriente limitante (relação N:P alta). Quando aportes volumosos de fósforo biodisponível ocorrem em corpos d'água calmos e ensolarados, o freio limitante é rompido.
      Cianobactérias possuem vesículas gasosas internas (aerótopos) que lhes permitem regular a flutuabilidade, subindo à superfície para captar luz solar intensa durante o dia e sombreando as microalgas verdes benéficas. Algumas espécies são capazes de fixar nitrogênio atmosférico, garantindo vantagem competitiva absoluta em ambientes desequilibrados.`,
      sourceHint: 'Explica a biologia das cianobactérias: adaptação de flutuação por vesículas gasosas e papel disparador do fósforo.'
    },
    {
      id: 'doc-206',
      number: 6,
      style: 'lab_report',
      protocolNumber: 'METEO-2024/0203-CLIMA',
      labName: 'INSTITUTO METEOROLÓGICO & CLIMATOLÓGICO ESTADUAL',
      tag: 'Boletim Hidrometeorológico • Fevereiro de 2024',
      title: 'BOLETIM DE ONDA DE CALOR & ESTAGNAÇÃO TÉRMICA NO RESERVATÓRIO',
      type: 'Boletim Meteorológico',
      imageSrc: 'assets/slides/doc_titulo_1.jpg',
      imageCaption: 'Termografia da superfície do Lago Azul revelando aquecimento anômalo das águas marginais rasas.',
      fullText: `O monitoramento climatológico registrou uma das mais intensas ondas de calor das últimas três décadas na região de Vale Verde. Entre 5 e 15 de janeiro, as temperaturas máximas do ar permaneceram continuamente entre 34°C e 37°C, acompanhadas por ventos fracos (calmaria média < 4 km/h) e ausência de nebulosidade.
      A água superficial do Lago Azul atingiu 29,4°C. Esse aquecimento reduziu fisicamente a solubilidade do oxigênio molecular no líquido e provocou forte estratificação térmica (termoclina acentuada), impedindo a circulação vertical e transformando o lago em um reator estagnado ideal para cinéticas biológicas aceleradas de cianobactérias.`,
      sourceHint: 'Apresenta os catalisadores climáticos abióticos: temperatura alta, calmaria do vento e menor solubilidade do O2.'
    },
    {
      id: 'doc-207',
      number: 7,
      style: 'lab_report',
      protocolNumber: 'LIMNO-2024/0219-MONIT',
      labName: 'LABORATÓRIO MUNICIPAL DE QUALIDADE DAS ÁGUAS & LIMNOLOGIA',
      tag: 'Laudo Pericial Oficial • 2024',
      title: 'LAUDO TÉCNICO PERICIAL: Mapeamento Físico-Químico em 5 Estações da Bacia',
      type: 'Laudo Analítico Espacial',
      imageSrc: 'assets/slides/Gemini_Generated_Image_38gdz338gdz338gd.jfif',
      imageCaption: 'Coletas com sonda multiparâmetros padronizada calibrada a 25°C ao longo dos 5 pontos do sistema fluvial-lacustre.',
      fullText: `A equipe pericial de limnologia realizou coletas de água superficial nas 5 estações do sistema durante a crise ambiental:
      
      TABELA OFICIAL DE MONITORAMENTO DE QUALIDADE DA ÁGUA:
      • Estação Ponto 1 (Montante / Mata Ciliar Preservada): Fósforo Total = 0,02 mg/L | Nitrogênio Total = 0,8 mg/L | DBO5 = 1,8 mg/L | OD = 7,8 mg/L
      • Estação Ponto 2 (Jusante da Descarga da ETE Urbana): Fósforo Total = 0,38 mg/L | Nitrogênio Total = 4,2 mg/L | DBO5 = 24,0 mg/L | OD = 3,9 mg/L
      • Estação Ponto 3 (Confluência do Córrego das Tabocas / Agrícola): Fósforo Total = 0,31 mg/L | Nitrogênio Total = 6,8 mg/L | DBO5 = 19,5 mg/L | OD = 4,2 mg/L
      • Estação Ponto 4 (Entrada do Lago Azul / Área do Bloom): Fósforo Total = 0,48 mg/L | Nitrogênio Total = 8,1 mg/L | DBO5 = 42,0 mg/L | OD Diurno (14h) = 10,8 mg/L (Supersaturação) | OD Noturno (04h) = 1,1 mg/L (Anóxia Crítica!)
      • Estação Ponto 5 (Vertedouro de Saída do Lago): Fósforo Total = 0,22 mg/L | Nitrogênio Total = 4,5 mg/L | DBO5 = 16,0 mg/L | OD = 4,0 mg/L
      
      PARECER TÉCNICO: O Ponto 4 registra o colapso do sistema: enquanto a fotossíntese explosiva ao meio-dia gera oxigênio supersaturado (10,8 mg/L), a respiração maciça na madrugada derruba o oxigênio para níveis asfixiantes (1,1 mg/L).`,
      sourceHint: 'Dados numéricos essenciais: revelam aportes combinados de esgoto (Ponto 2) e adubo (Ponto 3), culminando na anóxia noturna no Ponto 4.'
    },
    {
      id: 'doc-208',
      number: 8,
      style: 'lab_report',
      protocolNumber: 'CITO-2024/0288-FIT',
      labName: 'CENTRO INTEGRADO DE CITOLOGIA & TAXONOMIA VEGETAL',
      tag: 'Laudo Citomorfológico • 2024',
      title: 'LAUDO DE MICROSCOPIA ÓPTICA: Densidade Celular e Taxonomia de Cianobactérias',
      type: 'Laudo de Análise Microscópica',
      imageSrc: 'assets/slides/laminas_slide1.bmp',
      imageCaption: 'Fotomicrografia pericial: colônias maciças esféricas de Microcystis aeruginosa envolvidas por mucilagem translúcida.',
      fullText: `A análise fitoplanctônica realizada com câmara de Sedgewick-Rafter e microscopia de contraste óptico revelou uma alteração comunitária severa nas amostras do Lago Azul. As diatomáceas e clorofíceas nativas foram quase totalmente suprimidas.
      A comunidade passou a ser dominada (91,5% dos indivíduos contados) por colônias esféricas a irregulares de Microcystis aeruginosa, espécie célebre por sua capacidade de biossíntese de cianotoxinas. A contagem celular alcançou a marca recorde de 85.000 células/mL, superando em mais de quatro vezes o limite máximo de segurança estipulado pela Resolução CONAMA nº 357/2005 (20.000 cél/mL) para águas doces destinadas à recreação primária.`,
      sourceHint: 'Identificação taxonômica decisiva: Microcystis aeruginosa a 85.000 cél/mL (4x acima do limite legal do CONAMA).'
    },
    {
      id: 'doc-209',
      number: 9,
      style: 'lab_report',
      protocolNumber: 'ICTIO-2024/0315-TOX',
      labName: 'LABORATÓRIO DE ICTIOPATOLOGIA & ECOTOXICOLOGIA VETERINÁRIA',
      tag: 'Laudo de Necrópsia Animal • 2024',
      title: 'LAUDO DE NECRÓPSIA DE ICTIOFAUNA: Avaliação Histopatológica Branquial e Hepática',
      type: 'Laudo de Ictiopatologia',
      imageSrc: 'assets/slides/histopatologia_peixe.jpg',
      imageCaption: 'Corte histológico das lamelas branquiais exibindo fusão e hiperplasia epitelial, com muco denso retendo células algais (H&E, 400x).',
      fullText: `Foi realizada a necrópsia de 25 espécimes de tilápias e 30 lambaris recolhidos mortos na calha do Lago Azul. A análise anatomopatológica revelou:
      1. Sistema Respiratório (Brânquias): Filamentos branquiais com hiperplasia celular severa, dilatação vascular e secreção mucosa abundante com aderência de colônias mucilaginosas. Esse quadro, somado aos relatos de boquejo na madrugada, confirma asfixia mecânica aguda provocada pela anóxia noturna (OD = 1,1 mg/L).
      2. Sistema Digestório e Fígado: Parênquima hepático apresentando necrose focal com perda da arquitetura celular habitual, hemorragia e congestão venosa, lesões clássicas e características da ação de hepatotoxinas cíclicas (microcistinas).`,
      sourceHint: 'Demonstra a dupla causa da mortandade: asfixia física pela anóxia noturna + necrose hepática por hepatotoxina microcistina.'
    },
    {
      id: 'doc-210',
      number: 10,
      style: 'lab_report',
      protocolNumber: 'NOTIF-SAN-2024/044',
      labName: 'VIGILÂNCIA EM SAÚDE AMBIENTAL & ABASTECIMENTO PÚBLICO',
      tag: 'Notificação Sanitária • 2024',
      title: 'NOTIFICAÇÃO SANITÁRIA EMERGENCIAL: Dosagem de Microcistina por Ensaio ELISA',
      type: 'Alerta de Saúde Pública',
      imageSrc: 'assets/slides/Gemini_Generated_Image_atl2c3atl2c3atl2.jfif',
      imageCaption: 'Ensaio de imunoabsorção enzimática (ELISA) em placa com leitura espectrofotométrica para quantificação de microcistina-LR.',
      fullText: `A Secretaria Municipal de Saúde, em ação conjunta com a Vigilância Sanitária Estadual, submeteu alíquotas de água bruta captada no Lago Azul a ensaios imunoenzimáticos padronizados (ELISA) específicos para a variante tóxica Microcistina-LR.
      O resultado analítico apontou uma concentração média de 4,8 µg/L de microcistina-LR livre na água. A Portaria GM/MS nº 888 do Ministério da Saúde estabelece o limite máximo de 1,0 µg/L para água potável tratada. Diante do risco iminente de toxicidade aguda e crônica para a população humana, a prefeitura decretou a interrupção imediata da captação de água na represa e interditou o acesso às margens.`,
      sourceHint: 'Prova a toxicidade química: 4,8 µg/L de microcistina-LR, justificando o fechamento do abastecimento público.'
    },
    {
      id: 'doc-211',
      number: 11,
      style: 'lab_report',
      protocolNumber: 'GEO-2024/0512-SED',
      labName: 'INSTITUTO DE GEOCIÊNCIAS & GEOQUÍMICA DE SEDIMENTOS',
      tag: 'Estudo Geoquímico do Sedimento • 2024',
      title: 'LAUDO GEOQUÍMICO: Liberação Interna de Fósforo pelo Sedimento Lacustre (Internal Loading)',
      type: 'Estudo Geoquímico',
      imageSrc: 'assets/slides/Gemini_Generated_Image_7zo9hs7zo9hs7zo9.jfif',
      imageCaption: 'Amostrador de sedimento de fundo tipo testemunhador revelando estrato de lodo negro anaeróbio enriquecido em matéria orgânica.',
      fullText: `Geocientistas investigaram o histórico deposicional do fundo do Lago Azul. A antiga represa municipal acumula, ao longo de mais de 40 anos, um estrato de lodo fino e escuro com espessura variando de 0,8 a 1,4 metro, rico em fósforo inorgânico complexado com oxi-hidróxidos de ferro (Fe-P).
      Sob as condições anaeróbias e quentes registradas na crise (potencial redox Eh < -150 mV), o ferro férrico (Fe3+) reduz-se a ferro ferroso (Fe2+), quebrando a ligação iônica e liberando ortofosfato solúvel diretamente na coluna d'água. Essa "carga interna" respondeu por cerca de 28% do fósforo disponível durante a calmaria, explicando por que a floração persistiu mesmo após a diminuição das enxurradas pluviais.`,
      sourceHint: 'Revela a fonte interna de fósforo: o lodo do fundo libera fosfatos estocados sob anóxia, perpetuando o bloom.'
    },
    {
      id: 'doc-212',
      number: 12,
      style: 'lab_report',
      protocolNumber: 'AUDIT-2024/0620-LAGO',
      labName: 'CÂMARA TÉCNICA DE SANEAMENTO & RECUPERAÇÃO LÍMNICA',
      tag: 'Relatório Técnico de Controle e Mitigação • 2024',
      title: 'LAUDO DE AVALIAÇÃO DE EFICÁCIA: Precipitação de Fósforo e Aeração Noturna',
      type: 'Relatório de Eficácia de Intervenção',
      imageSrc: 'assets/slides/Gemini_Generated_Image_ke1ouvke1ouvke1o.jfif',
      imageCaption: 'Equipamento de aeração superficial mecânica em operação noturna conjugado à aplicação de coagulante mineral ecológico.',
      fullText: `A força-tarefa ambiental implementou um plano emergencial de contingência no Lago Azul consistindo em duas ações imediatas:
      1. Aplicação controlada de coagulante/precipitador ecológico (policloreto de alumínio com bentonita modificada) para flocular e precipitar o fósforo dissolvido no fundo;
      2. Instalação de baterias de aeradores mecânicos operando continuamente durante o período noturno (das 22h às 07h) no braço represado.
      
      COMPARAÇÃO DE PARÂMETROS (Antes da Intervenção vs 30 Dias Pós-Intervenção):
      • Fósforo Total: de 0,48 mg/L para 0,07 mg/L (Queda drástica de 85,4%)
      • Densidade de Microcystis: de 85.000 cél/mL para 30.600 cél/mL (Redução absoluta de 54.400 cél/mL = queda de 64,0%!)
      • Oxigênio Dissolvido Noturno: de 1,1 mg/L para 5,4 mg/L (Recuperação da faixa segura para a ictiofauna)
      • Microcistina-LR: reduziu para 0,8 µg/L (Abaixo do teto legal de 1,0 µg/L)
      
      DISCUSSÃO CIENTÍFICA: A redução de 64% na contagem e o fim da mortandade comprovam o papel disparador do fósforo e da anóxia noturna, demonstrando que a recuperação sustentável exige conter tanto o esgoto urbano quanto as enxurradas agrícolas NPK.`,
      sourceHint: 'Evidência empírica final: comprova que neutralizar o fósforo e oxigenar a noite cessa a mortandade e reduz o bloom em 64%.'
    }
  ],
  phases: [
    {
      phaseNumber: 1,
      lessonTitle: 'Aula 1: A Emergência no Lago Azul & Hipóteses Iniciais',
      fichas: ['Ficha 1', 'Ficha 2'],
      badge: 'Fase 1: O Lago em Crise',
      duration: '45 minutos',
      goal: 'Compreender o alerta dos moradores e a mortandade súbita de peixes, examinando os recortes de jornal e formulando duas hipóteses científicas preliminares.',
      docsInvolved: ['doc-201', 'doc-202'],
      questions: [
        {
          id: 'p1_q1_d2',
          type: 'textarea',
          label: '1. Quais foram as queixas da população de Vale Verde e que fenômeno foi observado nas águas do Lago Azul?',
          placeholder: 'Descreva a cor da água, odor, queixas clínicas de banhistas e a mortandade de peixes...',
          expectedHint: 'Água verde-azulada e avermelhada com odor fétido, queimação nos olhos e coceira em banhistas, e mortandade maciça de tilápias e lambaris.'
        },
        {
          id: 'p1_q2_d2',
          type: 'textarea',
          label: '2. Por que os peixes foram vistos boquejando na superfície especificamente no final da madrugada?',
          placeholder: 'Pense na relação entre luz solar, fotossíntese e respiração biológica...',
          expectedHint: 'Durante a noite a fotossíntese para e todos os organismos aquáticos apenas respiram, consumindo o oxigênio dissolvido até níveis asfixiantes antes do nascer do sol.'
        },
        {
          id: 'p1_q3_d2',
          type: 'dual_hypothesis',
          label: '3. Formule duas hipóteses iniciais para explicar o florescimento e a morte da fauna:',
          fields: [
            { key: 'hip_a_d2', label: 'Hipótese A (Química/Nutrientes):', placeholder: 'Ex: A proliferação foi provocada pelo excesso de nutrientes como fósforo vindo de...' },
            { key: 'hip_b_d2', label: 'Hipótese B (Clima/Tóxica):', placeholder: 'Ex: A mortandade foi acelerada pela onda de calor extremo que gerou toxinas bacterianas...' }
          ]
        },
        {
          id: 'p1_q4_d2',
          type: 'textarea',
          label: '4. É cientificamente correto culpar apenas uma fazenda ou apenas a estação de esgoto logo no primeiro dia? Justifique.',
          placeholder: 'Lembre-se do método científico: investigar antes de concluir...',
          expectedHint: 'Não. É uma correlação precipitada. Bacias hidrográficas recebem efluentes urbanos e agrícolas múltiplos que precisam ser medidos antes de apontar culpados.'
        }
      ]
    },
    {
      phaseNumber: 2,
      lessonTitle: 'Aula 2: Fontes de Nutrientes: Esgoto Urbano vs Adubação NPK',
      fichas: ['Ficha 3'],
      badge: 'Fase 2: As Fontes de Nutrientes',
      duration: '45 minutos',
      goal: 'Investigar a contribuição do esgoto doméstico com detergentes e do escoamento agrícola de fertilizantes solúveis.',
      docsInvolved: ['doc-203', 'doc-204'],
      questions: [
        {
          id: 'p2_q1_d2',
          type: 'textarea',
          label: '1. O que a fiscalização agropecuária constatou nas lavouras do Córrego das Tabocas após os temporais?',
          placeholder: 'Analise o Documento 3 sobre o arraste de adubo NPK e ausência de faixas ripárias...',
          expectedHint: 'Fortes chuvas lavaram lavouras com excesso de adubação mineral NPK e esterco, descarregando enxurradas com nitrogênio e fósforo no afluente.'
        },
        {
          id: 'p2_q2_d2',
          type: 'textarea',
          label: '2. Qual limitação operacional da Estação de Tratamento de Esgoto (ETE) foi revelada na auditoria do Documento 4?',
          placeholder: 'A ETE remove fósforo? Qual a sua capacidade de atendimento?...',
          expectedHint: 'A ETE operava 38% acima da capacidade e seu processo de lodos ativados secundários não possui tratamento terciário para remoção de fósforo e detergentes.'
        },
        {
          id: 'p2_q3_d2',
          type: 'select_concept',
          label: '3. Qual a diferença entre fonte pontual e fonte difusa de poluição na bacia?',
          options: [
            'A ETE é fonte pontual (lançamento localizado por tubulação) e as lavouras são fonte difusa (escoamento espalhado pelas chuvas).',
            'Ambas são fontes pontuais porque ocorrem no mesmo município.',
            'A agricultura é fonte pontual e o esgoto é fonte natural sem impacto biológico.'
          ],
          correctIdx: 0
        }
      ]
    },
    {
      phaseNumber: 3,
      lessonTitle: 'Aula 3: Efeito do Clima e Estagnação Límnica',
      fichas: ['Ficha 4'],
      badge: 'Fase 3: O Reator Térmico',
      duration: '45 minutos',
      goal: 'Compreender como temperaturas extremas e ausência de ventos alteram a física e a química das águas e favorecem cianobactérias.',
      docsInvolved: ['doc-205', 'doc-206'],
      questions: [
        {
          id: 'p3_q1_d2',
          type: 'textarea',
          label: '1. De acordo com o Artigo Científico (Doc 5), por que o fósforo é chamado de "nutriente limitante" em águas doces?',
          placeholder: 'Explique o princípio ecológico da limitação por nutrientes...',
          expectedHint: 'Porque o fósforo é o elemento menos abundante naturalmente em relação à demanda biológica. Quando fornecido em excesso, destrava o crescimento exponencial das algas.'
        },
        {
          id: 'p3_q2_d2',
          type: 'textarea',
          label: '2. Que vantagem adaptativa as cianobactérias possuem em relação às microalgas verdes comuns em águas quentes e calmas?',
          placeholder: 'Considere as vesículas gasosas (aerótopos) e a flutuabilidade...',
          expectedHint: 'Possuem vesículas gasosas internas que lhes permitem flutuar até a superfície para absorver luz máxima, sombreando as outras espécies e proliferando velozmente.'
        },
        {
          id: 'p3_q3_d2',
          type: 'checkbox_group',
          label: '3. Quais efeitos a onda de calor de 35°C (Doc 6) produziu nas águas do Lago Azul?',
          options: [
            { text: 'Aquecimento da água para 29,4°C, acelerando as taxas de divisão celular', correct: true },
            { text: 'Diminuição da solubilidade física do oxigênio dissolvido na água quente', correct: true },
            { text: 'Estratificação térmica e estagnação por ausência de ventos', correct: true },
            { text: 'Congelamento instantâneo do fundo do lago', correct: false }
          ]
        }
      ]
    },
    {
      phaseNumber: 4,
      lessonTitle: 'Aula 4: Monitoramento Físico-Químico em 5 Estações',
      fichas: ['Ficha 5'],
      badge: 'Fase 4: Mapeamento Espacial',
      duration: '45 minutos',
      goal: 'Analisar o laudo oficial dos 5 pontos do sistema hidrográfico e comparar as concentrações de Fósforo Total e DBO.',
      docsInvolved: ['doc-207'],
      questions: [
        {
          id: 'p4_q1_d2',
          type: 'chart_builder',
          label: '1. Gráfico de Fósforo Total nas 5 Estações de Monitoramento (mg/L):',
          chartType: 'bar',
          dataPoints: [
            { point: 'Ponto 1 (Controle Mata Ciliar)', value: 0.02, color: '#10b981' },
            { point: 'Ponto 2 (Efluente ETE Urbana)', value: 0.38, color: '#3b82f6' },
            { point: 'Ponto 3 (Agrícola NPK Tabocas)', value: 0.31, color: '#f59e0b' },
            { point: 'Ponto 4 (Braço do Lago Azul)', value: 0.48, color: '#ef4444' },
            { point: 'Ponto 5 (Foz / Saída do Lago)', value: 0.22, color: '#8b5cf6' }
          ]
        },
        {
          id: 'p4_q2_d2',
          type: 'textarea',
          label: '2. Compare o valor de Fósforo no Ponto 1 (0,02 mg/L) com o Ponto 4 (0,48 mg/L). Quantas vezes a concentração aumentou?',
          placeholder: 'Realize o cálculo: 0,48 dividido por 0,02...',
          expectedHint: 'Aumentou 24 vezes! Mostra uma carga maciça recebida ao longo do percurso urbano e rural.'
        },
        {
          id: 'p4_q3_d2',
          type: 'textarea',
          label: '3. No Ponto 4, o oxigênio dissolvido foi de 10,8 mg/L às 14h, mas desabou para 1,1 mg/L às 04h. Explique essa contradição diurna/noturna.',
          placeholder: 'Ligue fotossíntese de dia com respiração celular e decomposição bacteriana à noite...',
          expectedHint: 'De dia a densa massa algal faz fotossíntese sob sol forte gerando supersaturação de O2. À noite, sem luz, todas as células respiram e bactérias decompõem matéria orgânica, zerando o oxigênio disponível.'
        }
      ]
    },
    {
      phaseNumber: 5,
      lessonTitle: 'Aula 5: Microscopia Óptica de Fitoplâncton & Necrópsia Animal',
      fichas: ['Ficha 6'],
      badge: 'Fase 5: Microscopia e Patologia',
      duration: '45 minutos',
      goal: 'Inspecionar as lâminas virtuais de cianobactérias e a histologia branquial dos peixes asfixiados.',
      docsInvolved: ['doc-208', 'doc-209'],
      questions: [
        {
          id: 'p5_q1_d2',
          type: 'microscope_task',
          label: '1. Atividade no Microscópio Virtual: Inspecione a Amostra do Bloom e a Lâmina Histológica dos Peixes',
          instruction: 'Acesse o Microscópio Virtual, calibre o foco fino, observe as colônias de Microcystis e o corte das brânquias com muco espesso, e capture a foto pericial.'
        },
        {
          id: 'p5_q2_d2',
          type: 'textarea',
          label: '2. A contagem celular de Microcystis atingiu 85.000 cél/mL. Qual o limite estabelecido pelo CONAMA e o que isso significa para a população?',
          placeholder: 'Consulte o Documento 8 sobre a Resolução CONAMA...',
          expectedHint: 'O limite do CONAMA é 20.000 cél/mL. A contagem foi mais de 4 vezes superior, indicando perigo crítico de intoxicação por contato primário e captação de água.'
        },
        {
          id: 'p5_q3_d2',
          type: 'textarea',
          label: '3. A necrópsia do Documento 9 revelou duas causas simultâneas para a morte dos peixes. Quais foram elas?',
          placeholder: 'Identifique o que ocorreu nas brânquias e o que ocorreu no fígado...',
          expectedHint: 'Asfixia mecânica aguda por anóxia noturna (OD = 1,1 mg/L) e hemorragia/necrose hepática provocada pela toxina microcistina.'
        }
      ]
    },
    {
      phaseNumber: 6,
      lessonTitle: 'Aula 6: Hepatotoxinas & O Alerta Sanitário de Microcistinas',
      fichas: ['Ficha 7'],
      badge: 'Fase 6: Alerta Toxicológico',
      duration: '45 minutos',
      goal: 'Analisar o laudo imunológico ELISA, comparar os valores de microcistina com os padrões do Ministério da Saúde e entender o risco à saúde pública.',
      docsInvolved: ['doc-210'],
      questions: [
        {
          id: 'p6_q1_d2',
          type: 'textarea',
          label: '1. Qual foi a concentração de Microcistina-LR detectada no ensaio ELISA e qual o teto legal estabelecido pelo Ministério da Saúde?',
          placeholder: 'Consulte o Documento 10...',
          expectedHint: 'Concentração de 4,8 µg/L, superando quase 5 vezes o limite máximo permitido pelo Ministério da Saúde para consumo humano (1,0 µg/L).'
        },
        {
          id: 'p6_q2_d2',
          type: 'checkbox_group',
          label: '2. Por que ferver a água da torneira NÃO elimina as microcistinas?',
          options: [
            { text: 'Microcistinas são toxinas peptídicas termoestáveis que não se degradam com fervura doméstica comum', correct: true },
            { text: 'A fervura concentra as toxinas ao evaporar parte da água líquida', correct: true },
            { text: 'Ferver a água transforma as toxinas em oxigênio puro', correct: false },
            { text: 'Apenas processos avançados de oxidação ou adsorção em carvão ativado removem a toxina', correct: true }
          ]
        },
        {
          id: 'p6_q3_d2',
          type: 'textarea',
          label: '3. Quais medidas de precaução a Secretaria de Saúde adotou acertadamente para proteger os cidadãos?',
          placeholder: 'Identifique as ações no Documento 10...',
          expectedHint: 'Suspensão imediata da captação de água para a rede potável e interdição completa de banho, pesca e recreação na represa.'
        }
      ]
    },
    {
      phaseNumber: 7,
      lessonTitle: 'Aula 7: Carga Interna do Sedimento & Eficácia da Intervenção',
      fichas: ['Ficha 8'],
      badge: 'Fase 7: Matriz de Evidências',
      duration: '45 minutos',
      goal: 'Analisar o papel do lodo anaeróbio do fundo, calcular a redução percentual pós-intervenção e preencher a Matriz de Evidências.',
      docsInvolved: ['doc-211', 'doc-212'],
      questions: [
        {
          id: 'p7_q1_d2',
          type: 'calc',
          label: '1. Cálculo da Redução Percentual na Densidade de Microcystis (Doc 12):',
          formula: 'Redução % = ((Valor Inicial - Valor Final) / Valor Inicial) * 100',
          initialVal: 85000,
          finalVal: 30600,
          stepCalculation: '((85.000 - 30.600) / 85.000) * 100 = (54.400 / 85.000) * 100 = 64,0%',
          result: '64,0%'
        },
        {
          id: 'p7_q2_d2',
          type: 'evidence_matrix',
          label: '2. Matriz de Evidências Científicas do Desafio 02 (Classifique: F = Favorece | E = Enfraquece | I = Inconclusivo):',
          hypotheses: [
            'Esgoto Urbano e ETE',
            'Adubação Agrícola NPK',
            'Onda de Calor e Clima',
            'Carga Interna do Lodo',
            'Origem Exclusivamente Natural',
            'Causa Multicausal Integrada'
          ],
          rows: [
            { docId: 'doc-201', docTitle: '1. Alerta Verde no Lago', defaults: ['I', 'I', 'F', 'I', 'I', 'F'] },
            { docId: 'doc-202', docTitle: '2. Mortandade de Peixes', defaults: ['I', 'I', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-203', docTitle: '3. Arraste de Adubo NPK', defaults: ['I', 'F', 'I', 'I', 'E', 'F'] },
            { docId: 'doc-204', docTitle: '4. Fósforo da ETE Municipal', defaults: ['F', 'I', 'I', 'I', 'E', 'F'] },
            { docId: 'doc-205', docTitle: '5. Mecânica do Fósforo', defaults: ['F', 'F', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-206', docTitle: '6. Onda de Calor (35°C)', defaults: ['I', 'I', 'F', 'I', 'I', 'F'] },
            { docId: 'doc-207', docTitle: '7. Laudo das 5 Estações', defaults: ['F', 'F', 'I', 'I', 'E', 'F'] },
            { docId: 'doc-208', docTitle: '8. Microcystis (85 mil)', defaults: ['I', 'I', 'F', 'I', 'I', 'F'] },
            { docId: 'doc-209', docTitle: '9. Necrópsia Brânquias/Fígado', defaults: ['I', 'I', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-210', docTitle: '10. ELISA Microcistina (4,8)', defaults: ['I', 'I', 'I', 'I', 'I', 'F'] },
            { docId: 'doc-211', docTitle: '11. Carga Interna do Sedimento', defaults: ['I', 'I', 'F', 'F', 'E', 'F'] },
            { docId: 'doc-212', docTitle: '12. Eficácia da Intervenção (64%)', defaults: ['F', 'F', 'I', 'F', 'E', 'F'] }
          ]
        },
        {
          id: 'p7_q3_d2',
          type: 'textarea',
          label: '3. A redução de 64% na contagem e a recuperação do oxigênio para 5,4 mg/L provam que apenas uma fonte era culpada?',
          placeholder: 'Sintetize a interação entre esgoto, lavouras e calor...',
          expectedHint: 'Não. Provam que controlar o fósforo e oxigenar o lago conteve o colapso, mas a carga de fósforo veio tanto da ETE urbana quanto da enxurrada agrícola somada à liberação do sedimento.'
        }
      ]
    },
    {
      phaseNumber: 8,
      lessonTitle: 'Aula 8: Síntese Conclusiva & Plano de Gestão da Bacia',
      fichas: ['Ficha 9'],
      badge: 'Fase 8: Plano de Ação',
      duration: '45 minutos',
      goal: 'Redigir o laudo de diagnóstico final fundamentado em evidências empíricas e propor o Plano de Recuperação Límnica de Vale Verde.',
      docsInvolved: ['doc-201', 'doc-207', 'doc-212'],
      questions: [
        {
          id: 'p8_q1_d2',
          type: 'textarea',
          label: '1. Conclusão Pericial da Equipe: Qual foi a cadeia de causas comprovada que gerou a floração tóxica e a mortandade de peixes?',
          placeholder: 'Estruture: Aporte de fósforo (ETE + adubos) -> onda de calor -> floração de Microcystis -> anóxia noturna e toxina microcistina -> mortandade...',
          expectedHint: 'O evento foi multicausal: sobrecarga de fósforo pela ETE (esgoto) e lavagem de fertilizantes NPK, potencializados por onda de calor e calmaria, disparando bloom de Microcystis (85 mil cél/mL) que produziu anóxia noturna severa (1,1 mg/L) e liberação de microcistina tóxica.'
        },
        {
          id: 'p8_q2_d2',
          type: 'textarea',
          label: '2. Qual aspecto da investigação gerou maior aprendizado ou quebrou uma ideia preconcebida da equipe?',
          placeholder: 'Pense no ciclo noturno do oxigênio ou no papel do sedimento de fundo...',
          expectedHint: 'A compreensão de que a floração gera oxigênio de dia mas mata por asfixia à noite, ou que o próprio lodo acumulado no fundo pode liberar fósforo mesmo sem chuva recente.'
        },
        {
          id: 'p8_q3_d2',
          type: 'intervention_plan',
          label: '3. Plano de Recuperação Límnica Sustentável de Vale Verde:',
          fields: [
            { key: 'plan_d2_name', label: 'Nome do Projeto:', placeholder: 'Ex: Projeto Lago Vivo & Bacia Saudável' },
            { key: 'plan_d2_target', label: 'Fontes Prioritárias:', placeholder: 'Ex: Tratamento terciário na ETE, recomposição de mata ciliar agrícola e aeração noturna' },
            { key: 'plan_d2_action', label: 'Medidas Técnicas e Sociais:', placeholder: 'Descreva a precipitação de fósforo na ETE, exigência de curvas de nível nas lavouras e bio-remediação do sedimento...' },
            { key: 'plan_d2_indicator', label: 'Indicador de Sucesso:', placeholder: 'Ex: Fósforo total < 0,05 mg/L, Microcystis < 10.000 cél/mL e oxigênio noturno > 5,0 mg/L em 12 meses' }
          ]
        }
      ]
    },
    {
      phaseNumber: 9,
      lessonTitle: 'Aula 9: Conferência Científica & Autoavaliação da Turma',
      fichas: ['Ficha 10', 'Ficha 11'],
      badge: 'Fase 9: Conferência Final',
      duration: '45 minutos',
      goal: 'Preparar a defesa oral dos resultados da equipe para os gestores municipais e realizar a autoavaliação metacognitiva.',
      docsInvolved: [],
      questions: [
        {
          id: 'p9_q1_d2',
          type: 'presentation_prep',
          label: '1. Roteiro Sintético de Apresentação da Equipe (Conferência Científica):',
          fields: [
            { key: 'prep_d2_problem', label: 'O Problema Central:', placeholder: 'Resuma o colapso do Lago Azul em 2 frases...' },
            { key: 'prep_d2_evidence', label: 'Evidência Mais Forte:', placeholder: 'Qual dado numérico (fósforo, ELISA, contagem celular) foi mais decisivo?' },
            { key: 'prep_d2_solution', label: 'Proposta aos Cidadãos:', placeholder: 'Qual medida de intervenção garantirá água limpa e segura?' }
          ]
        },
        {
          id: 'p9_q2_d2',
          type: 'self_assessment_rubric',
          label: '2. Autoavaliação Individual do Pesquisador Límnico:',
          criteria: [
            'Diferenciei conceitos de eutrofização, cianobactérias e anóxia noturna',
            'Analisei tabelas de qualidade da água sem aceitar culpados únicos prematuros',
            'Compreendi a diferença entre fontes pontuais (ETE) e difusas (agricultura)',
            'Identifiquei as alterações patológicas e morfológicas no microscópio',
            'Calculei a taxa de redução percentual (64,0%) com exatidão',
            'Preenchi a Matriz de Evidências com rigor lógico',
            'Colaborei respeitosamente e ativamente com meus colegas de equipe',
            'Ajudei a fundamentar o plano de recuperação sustentável da bacia'
          ]
        },
        {
          id: 'p9_q3_d2',
          type: 'textarea',
          label: '3. Reflexão Metacognitiva Final: Por que o controle da poluição hídrica exige atuação integrada em toda a bacia e não apenas no lago?',
          placeholder: 'Conclua sobre a interconexão de rios, cidades, lavouras e reservatórios...',
          expectedHint: 'Porque o lago é o receptor final de tudo o que ocorre na bacia hidrográfica: de nada adianta tratar as águas do reservatório se os afluentes continuarem recebendo esgoto sem remoção de fósforo e enxurradas com fertilizantes.'
        }
      ]
    }
  ],
  slides: [
    {
      id: 'slide_d2_1',
      code: 'LÂMINA D2-01',
      title: 'Lâmina D2-01: Fitoplâncton do Lago Azul (Floração de Microcystis)',
      location: 'Lago Azul - Estação Ponto 4',
      category: 'Arquivo Técnico Límnico',
      src: 'assets/slides/laminas_slide1.bmp',
      thumb: 'assets/slides/laminas_slide1.bmp',
      count: '85.000 células/mL (Dominância de Microcystis)',
      typeText: 'Triagem fitoplanctônica e colônias com mucilagem',
      description: 'Amostra límnica colhida no ápice da floração. Revela densas colônias celulares de cianobactérias produtoras de hepatotoxinas.',
      scaleMicronsPerPixel: 0.15,
      uvFluorescence: true
    },
    {
      id: 'slide_d2_2',
      code: 'LÂMINA D2-02',
      title: 'Lâmina D2-02: Ictiopatologia Branquial e Hepática',
      location: 'Laboratório de Ecotoxicologia e Necrópsia',
      category: 'Arquivo Técnico Límnico',
      src: 'assets/slides/histopatologia_peixe.jpg',
      thumb: 'assets/slides/histopatologia_peixe.jpg',
      count: 'Corte Histológico (H&E, 400x)',
      typeText: 'Hiperplasia branquial obstrutiva e congestão hepática',
      description: 'Lâmina histopatológica do tecido branquial e hepático dos espécimes mortos, demonstrando lesões por asfixia anóxica e ação de microcistinas.',
      scaleMicronsPerPixel: 0.15,
      uvFluorescence: true
    }
  ],
  teacherGuide: {
    title: 'Orientações Pedagógicas para o Docente • Desafio 02: Floração Vermelha em Vale Verde',
    warning: 'Conteúdo restrito ao professor: diretrizes didáticas, objetivos BNCC e gabarito orientador para a 1ª Série do Ensino Médio.',
    pedagogicalGoals: [
      'Alinhamento com a BNCC da 1ª Série do Ensino Médio: Habilidades EM13CNT101, EM13CNT206, EM13CNT301 e EM13CNT303.',
      'Compreender o conceito de eutrofização artificial e o papel do fósforo como nutriente limitante em águas continentais.',
      'Diferenciar fontes pontuais contínuas (esgoto doméstico urbano) de fontes difusas intermitentes (adubação agrícola NPK).',
      'Desmistificar o paradoxo do oxigênio dissolvido: supersaturação diurna por fotossíntese vs anóxia noturna mortal.',
      'Capacitar os alunos a lidar com ecotoxicologia aplicada (cianotoxinas, microcistinas e limites legais CONAMA/Ministério da Saúde).',
      'Construir visão de bacia hidrográfica integrada para propor soluções sustentáveis sistêmicas.'
    ],
    timelinePacing: [
      { week: 'Aulas 1-2', focus: 'Abertura do caso no Lago Azul, análise das queixas clínicas e rastreamento preliminar de fontes de nutrientes.' },
      { week: 'Aulas 3-4', focus: 'Impacto da onda de calor e estagnação, leitura do laudo das 5 estações e gráfico comparativo de fósforo e DBO.' },
      { week: 'Aulas 5-6', focus: 'Prática de microscopia de cianobactérias, contagem celular (85.000 cél/mL), patologia branquial e laudo ELISA de microcistinas.' },
      { week: 'Aulas 7-8', focus: 'Cálculo de eficácia da precipitação de fósforo e aeração (64%), Matriz de Evidências e elaboração do plano de ação.' },
      { week: 'Aula 9', focus: 'Conferência Científica com a turma e autoavaliação formativa.' }
    ],
    answerKey: {
      eutrophicationMechanism: 'O florescimento decorreu da quebra do limite de fósforo provocada pela combinação de efluentes da ETE (ricos em detergentes com fosfatos) com enxurradas agrícolas de adubação NPK após temporais.',
      nocturnalAnoxia: 'O paradoxo do oxigênio decorre do ciclo biológico: enquanto a luz solar promove fotossíntese maciça de dia (OD = 10,8 mg/L), a escuridão noturna cessa a produção e a respiração ininterrupta somada à oxidação bacteriana exaure o oxigênio até 1,1 mg/L, asfixiando os peixes na madrugada.',
      multicausality: 'A crise não teve um causador único: esgoto sem tratamento terciário, adubação agrícola sem mata ciliar, onda de calor histórica e liberação de fósforo do lodo do fundo atuaram sinergicamente.'
    }
  }
};

// ============================================================================
// CATÁLOGO GERAL DE DESAFIOS E COMPATIBILIDADE REGRESSIVA
// ============================================================================
const CHALLENGES_DATABASE = {
  'desafio-1': DESAFIO_01_DATA,
  'desafio-2': DESAFIO_02_DATA
};

// Por padrão, BIO_DATA inicializa com o Desafio 1 (100% de compatibilidade)
let BIO_DATA = DESAFIO_01_DATA;

// Disponibilizar no escopo global do navegador
if (typeof window !== 'undefined') {
  window.DESAFIO_01_DATA = DESAFIO_01_DATA;
  window.DESAFIO_02_DATA = DESAFIO_02_DATA;
  window.CHALLENGES_DATABASE = CHALLENGES_DATABASE;
  window.BIO_DATA = BIO_DATA;
}

// Exportar para Node.js / testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BIO_DATA;
  module.exports.CHALLENGES_DATABASE = CHALLENGES_DATABASE;
  module.exports.DESAFIO_01_DATA = DESAFIO_01_DATA;
  module.exports.DESAFIO_02_DATA = DESAFIO_02_DATA;
}
