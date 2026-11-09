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
// ============================================================================
// BANCO DE DADOS DO DESAFIO 02: FLORAÇÃO VERMELHA EM VALE VERDE
// Eutrofização, Cianobactérias Tóxicas e Anóxia Noturna
// Baseado rigorosamente no plano curricular oficial (desafio_floracao_vermelha_vale_verde.json)
// ============================================================================
// ============================================================================
// BANCO DE DADOS DO DESAFIO 04: FLORAÇÃO VERMELHA EM VALE VERDE (MARÉ VERMELHA)
// Eutrofização, Cianobactérias Tóxicas e Anóxia Noturna (desafio_floracao_vermelha_vale_verde.json)
// ============================================================================
const DESAFIO_04_DATA = {
  "challenge": {
    "id": "desafio-4",
    "code": "DESAFIO-04",
    "title": "Floração Vermelha em Vale Verde",
    "subtitle": "Eutrofização, cianobactérias tóxicas e anóxia noturna (Maré Vermelha)",
    "subtitulo": "Eutrofização, cianobactérias tóxicas e anóxia noturna",
    "subject": "Biologia & Ciências da Natureza",
    "level": "1ª Série do Ensino Médio • Biologia & Ciências da Natureza (BNCC)",
    "methodology": "PBL – Aprendizagem Baseada em Problemas",
    "totalLessons": 9,
    "lessonDuration": "45 minutos cada",
    "estimatedTime": "9 aulas de 45 min",
    "badge": "Eco-Toxicologista Límnico",
    "context": "O Lago Azul apresenta uma camada verde-azulada, odor intenso e mortandade de peixes percebida durante a madrugada.",
    "natureza_do_material": "Caso fictício para fins didáticos. Locais, notícias, personagens e resultados numéricos são simulados.",
    "objetivo_geral": "Investigar as causas e consequências de uma floração no Lago Azul, relacionando nutrientes, proliferação de cianobactérias e microalgas, possível produção de cianotoxinas e variações diárias do oxigênio dissolvido. Analisar evidências, confrontar hipóteses e elaborar uma explicação científica para a mortandade de peixes.",
    "generalObjective": "Investigar as causas e consequências de uma floração no Lago Azul, relacionando nutrientes, proliferação de cianobactérias e microalgas, possível produção de cianotoxinas e variações diárias do oxigênio dissolvido. Analisar evidências, confrontar hipóteses e elaborar uma explicação científica para a mortandade de peixes.",
    "questoes_investigativas": [
      "Quais organismos estão proliferando: cianobactérias, microalgas ou uma comunidade mista?",
      "Quais nutrientes favorecem a floração e quais podem ser suas fontes?",
      "Há produção de cianotoxinas, como microcistina?",
      "A mortandade está relacionada à toxicidade, à falta de oxigênio ou à combinação dos dois fatores?",
      "Por que o oxigênio pode aumentar durante o dia e cair durante a noite?",
      "O evento no lago pode ser chamado de maré vermelha? Como se diferencia de florações marinhas?"
    ],
    "organismos_para_investigar": {
      "cianobacterias_agua_doce": [
        {
          "nome": "Microcystis aeruginosa",
          "pista": "Forma colônias; algumas linhagens produzem microcistinas."
        },
        {
          "nome": "Dolichospermum spp.",
          "pista": "Forma filamentos; algumas espécies/linhagens podem produzir cianotoxinas e apresentar heterócitos."
        },
        {
          "nome": "Raphidiopsis raciborskii",
          "pista": "Cianobactéria filamentosa; algumas linhagens produzem cilindrospermopsina ou saxitoxinas."
        },
        {
          "nome": "Planktothrix agardhii",
          "pista": "Forma filamentos; algumas linhagens produzem microcistinas."
        },
        {
          "nome": "Aphanizomenon flos-aquae",
          "pista": "Cianobactéria filamentosa; investigar fixação de nitrogênio e potencial tóxico."
        }
      ],
      "microalgas_agua_doce": [
        {
          "nome": "Peridinium spp.",
          "pista": "Dinoflagelados de água doce que podem formar florações."
        },
        {
          "nome": "Euglena sanguinea",
          "pista": "Pode apresentar pigmentação avermelhada em ambientes ricos em matéria orgânica."
        },
        {
          "nome": "Chlamydomonas spp.",
          "pista": "Algas verdes unicelulares; úteis para comparação com cianobactérias."
        }
      ],
      "organismos_marinhos_para_comparacao": [
        {
          "nome": "Karenia brevis",
          "pista": "Dinoflagelado marinho associado a florações nocivas e brevetoxinas."
        },
        {
          "nome": "Alexandrium catenella",
          "pista": "Dinoflagelado marinho; algumas linhagens produzem saxitoxinas."
        },
        {
          "nome": "Pseudo-nitzschia spp.",
          "pista": "Diatomáceas marinhas; algumas espécies produzem ácido domoico."
        },
        {
          "nome": "Noctiluca scintillans",
          "pista": "Dinoflagelado associado a florações coloridas e bioluminescência; não implica necessariamente produção de toxina."
        }
      ],
      "observacao": "Os organismos são candidatos para pesquisa e comparação, não identificações antecipadas do Lago Azul. Nem toda floração é tóxica e nem toda linhagem de uma espécie produtora contém ou expressa genes de toxinas."
    },
    "cronograma_de_liberacao": [
      {
        "etapa": 1,
        "foco": "Evento misterioso",
        "documentos": [
          1,
          2
        ]
      },
      {
        "etapa": 2,
        "foco": "Nutrientes e fontes de contaminação",
        "documentos": [
          3,
          4
        ]
      },
      {
        "etapa": 3,
        "foco": "Identificação dos organismos",
        "documentos": [
          5,
          6
        ]
      },
      {
        "etapa": 4,
        "foco": "Cianotoxinas e oxigênio dissolvido",
        "documentos": [
          7,
          8
        ]
      },
      {
        "etapa": 5,
        "foco": "Mortandade, notícia enganosa e hipóteses alternativas",
        "documentos": [
          9,
          10
        ]
      },
      {
        "etapa": 6,
        "foco": "Decomposição e integração dos resultados",
        "documentos": [
          11,
          12
        ]
      }
    ],
    "cronograma_9_aulas": [
      {
        "aula": 1,
        "duracao_min": 45,
        "atividade": "Apresentação do evento e análise dos laudos 1 e 2",
        "produto": "Hipóteses iniciais"
      },
      {
        "aula": 2,
        "duracao_min": 45,
        "atividade": "Análise de nutrientes e fontes — laudos 3 e 4",
        "produto": "Mapa de fontes possíveis"
      },
      {
        "aula": 3,
        "duracao_min": 45,
        "atividade": "Microscopia e identificação — laudos 5 e 6",
        "produto": "Quadro comparativo de espécies"
      },
      {
        "aula": 4,
        "duracao_min": 45,
        "atividade": "Investigação de cianotoxinas — laudo 7",
        "produto": "Explicação sobre microcistina"
      },
      {
        "aula": 5,
        "duracao_min": 45,
        "atividade": "Interpretação do oxigênio dissolvido — laudo 8",
        "produto": "Gráfico e explicação do ciclo diário"
      },
      {
        "aula": 6,
        "duracao_min": 45,
        "atividade": "Mortandade e notícia falsa — laudos 9 e 10",
        "produto": "Análise crítica das evidências"
      },
      {
        "aula": 7,
        "duracao_min": 45,
        "atividade": "Sedimentos e decomposição — laudo 11",
        "produto": "Modelo explicativo"
      },
      {
        "aula": 8,
        "duracao_min": 45,
        "atividade": "Integração e laudo final — documento 12",
        "produto": "Parecer técnico"
      },
      {
        "aula": 9,
        "duracao_min": 45,
        "atividade": "Apresentação e avaliação",
        "produto": "Defesa científica das conclusões"
      }
    ],
    "modelo_causal_a_investigar": [
      {
        "ordem": 1,
        "evento": "Entrada excessiva de nitrogênio e fósforo",
        "fontes_possiveis": [
          "Esgoto",
          "Fertilizantes",
          "Dejetos animais",
          "Outras fontes da bacia"
        ]
      },
      {
        "ordem": 2,
        "evento": "Eutrofização",
        "descricao": "Enriquecimento de nutrientes no ambiente aquático."
      },
      {
        "ordem": 3,
        "evento": "Floração",
        "descricao": "Aumento da biomassa de cianobactérias e/ou microalgas."
      },
      {
        "ordem": 4,
        "evento": "Variação diária do oxigênio",
        "dia": "Fotossíntese pode elevar o oxigênio.",
        "noite": "Fotossíntese cessa; respiração e decomposição continuam consumindo oxigênio."
      },
      {
        "ordem": 5,
        "evento": "Hipóxia ou anóxia",
        "descricao": "Oxigênio insuficiente para os organismos aquáticos."
      },
      {
        "ordem": 6,
        "evento": "Estresse e mortandade de peixes",
        "descricao": "Pode haver contribuição adicional de cianotoxinas, dependendo da exposição."
      }
    ],
    "produto_final_dos_alunos": {
      "formato": "Parecer técnico e apresentação oral",
      "itens_obrigatorios": [
        "Identificação dos organismos e justificativa baseada nas evidências.",
        "Explicação da eutrofização e das possíveis fontes de nutrientes.",
        "Interpretação do ciclo diário do oxigênio.",
        "Análise do resultado de microcistina.",
        "Distinção entre hipóxia, anóxia e intoxicação.",
        "Comparação entre florações de água doce e marés vermelhas marinhas.",
        "Proposta de monitoramento e mitigação.",
        "Indicação das limitações e das informações ainda necessárias."
      ],
      "questao_final": "A mortandade de peixes no Lago Azul foi causada por uma toxina produzida pelas cianobactérias, pela redução noturna do oxigênio dissolvido ou pela combinação dos dois fenômenos? Que evidências sustentam a conclusão e o que ainda precisaria ser investigado?"
    },
    "orientacoes_cientificas_ao_professor": [
      "Não usar maré vermelha como sinônimo automático de floração de cianobactérias em água doce.",
      "Nem toda floração é tóxica e nem toda linhagem de uma espécie potencialmente produtora produz toxinas.",
      "A presença de microcistina não prova, por si só, que a toxina causou a mortandade.",
      "Um valor alto de oxigênio durante a tarde não exclui hipóxia ou anóxia durante a madrugada.",
      "Separar evidências observacionais, resultados analíticos, interpretações e hipóteses causais.",
      "Manter os laudos 7 e 8 em aulas diferentes para exigir revisão das hipóteses pelos grupos.",
      "Imagens ilustrativas não devem ser tratadas como fotografias reais das amostras nem como identificação taxonômica definitiva."
    ],
    "referencias_para_o_professor": [
      {
        "instituicao": "OMS",
        "tema": "Cianobactérias planctônicas de água doce e toxinas"
      },
      {
        "instituicao": "EPA",
        "tema": "Cianobactérias, florações e cianotoxinas"
      },
      {
        "instituicao": "EPA",
        "tema": "Nutrientes, temperatura, luz e circulação como fatores de florações"
      },
      {
        "instituicao": "NOAA",
        "tema": "Florações nocivas e marés vermelhas marinhas"
      },
      {
        "instituicao": "IMA/SC",
        "tema": "Nota Técnica Conjunta nº 001/2024 sobre floração de Karenia no litoral catarinense"
      },
      {
        "instituicao": "ANA",
        "tema": "Parâmetros de qualidade da água, oxigênio dissolvido e eutrofização"
      },
      {
        "bases_de_imagens": [
          "AlgaeBase — https://www.algaebase.org/",
          "GBIF — https://www.gbif.org/"
        ]
      }
    ],
    "rules": [
      "Examine cada laudo técnico e notícia oficial antes de debater com a equipe.",
      "Diferencie cianobactérias de água doce de algas verdes e de dinoflagelados marinhos (maré vermelha).",
      "Analise as concentrações de nitrogênio e fósforo e investigue suas fontes na bacia.",
      "Avalie a presença de microcistina e a variação horária do oxigênio dissolvido (anóxia noturna).",
      "Separe evidências observacionais, dados laboratoriais, notícias distratoras e hipóteses causais.",
      "Ao final, elabore um parecer técnico pericial integrando os resultados e apresente a defesa oral."
    ],
    "glossary": [
      {
        "term": "Eutrofização",
        "definition": "Enriquecimento de nutrientes (nitrogênio e fósforo) no ambiente aquático, favorecendo a proliferação excessiva de produtores primários e cianobactérias."
      },
      {
        "term": "Cianobactérias & Microcistinas",
        "definition": "Bactérias fototróficas capazes de sintetizar compostos químicos complexos. Certas linhagens (ex: Microcystis, Planktothrix) liberam microcistinas, hepatotoxinas que bloqueiam proteínas fosfatases."
      },
      {
        "term": "Anóxia Noturna",
        "definition": "Queda extrema do oxigênio dissolvido (OD < 1,5 mg/L) durante a madrugada provocada pela cessação da fotossíntese somada à contínua respiração celular e decomposição bacteriana."
      },
      {
        "term": "Heterócitos",
        "definition": "Células diferenciadas de certas cianobactérias filamentosas (ex: Dolichospermum, Aphanizomenon) especializadas na fixação biológica de nitrogênio gasoso (N2)."
      },
      {
        "term": "Maré Vermelha Marinha (Karenia brevis)",
        "definition": "Floração costeira causada por dinoflagelados marinhos produtores de brevetoxinas; é um fenômeno estritamente marinho que não ocorre em águas doces continentais."
      },
      {
        "term": "Decomposição & Sedimentos (Internal Loading)",
        "definition": "Consumo maciço de oxigênio por microrganismos decompositores na camada profunda, com potencial liberação de fósforo acumulado no sedimento sob condições anóxicas."
      }
    ]
  },
  "documents": [
    {
      "id": "doc-201",
      "number": 1,
      "style": "newspaper",
      "newspaperName": "JORNAL DO VALE",
      "edition": "Edição Especial de Verão • Registro de Ocorrência",
      "tag": "Registro de Ocorrência / Notícia",
      "title": "Lago Azul amanhece coberto por mancha verde e peixes mortos",
      "type": "Registro de ocorrência / notícia",
      "imageSrc": "assets/slides/eutrof1.jfif",
      "imageCaption": "Registro da ocorrência: densa mancha verde-azulada e avermelhada na superfície do Lago Azul, com peixes mortos na madrugada.",
      "conteudo": [
        "Mancha verde-azulada na superfície",
        "Odor intenso",
        "Mortandade de alevinos e peixes adultos entre 4h e 6h",
        "Espuma próxima à saída de um canal"
      ],
      "investigacao": [
        "A cor identifica o organismo?",
        "O odor comprova toxicidade?",
        "Por que a mortandade foi percebida de madrugada?"
      ],
      "classificacao": "Observações verdadeiras no cenário, mas insuficientes para determinar a causa.",
      "fullText": "Moradores e pescadores que frequentam o Lago Azul depararam-se com uma cena alarmante nas primeiras horas da manhã: uma densa mancha de coloração verde-azulada brilhante, com faixas de escuma espumosa e odor intenso, cobriu grande parte da enseada rasa próxima ao balneário e à desembocadura de um canal.\nEntre 4h e 6h da madrugada, foram observados centenas de alevinos e peixes adultos (lambaris, tilápias e traíras) moribundos ou já mortos boiando nas margens com as bocas escancaradas na linha d'água. Praticantes de caminhada e moradores vizinhos queixaram-se de náuseas e ardência nos olhos provocadas pelos gases liberados. A Defesa Civil isolou a orla preventivamente.",
      "sourceHint": "Registro de campo: constata a ocorrência, o odor e a mortandade na madrugada, mas não identifica o organismo nem a causa."
    },
    {
      "id": "doc-202",
      "number": 2,
      "style": "official-bulletin",
      "tag": "Boletim Meteorológico e Hidrológico",
      "title": "Calor, estiagem e água parada antecederam a ocorrência",
      "type": "Boletim meteorológico e hidrológico",
      "imageSrc": "assets/slides/eutro2.jfif",
      "imageCaption": "Amostragem de água superficial durante calmaria e estiagem em Vale Verde.",
      "dados": {
        "dias_com_baixa_precipitacao": 18,
        "temperatura_media_agua_C": 28,
        "reducao_volume_lago_percentual": 22,
        "ventos": "Fracos durante cinco dias"
      },
      "investigacao": [
        "Como temperatura e circulação influenciam florações?",
        "Calor é causa única ou fator favorável?"
      ],
      "classificacao": "Dados simulados verdadeiros; não provam causa isoladamente.",
      "fullText": "BOLETIM HIDROMETEOROLÓGICO REGIONAL:\n• Período de estiagem: 18 dias consecutivos com precipitação inferior a 2 mm.\n• Temperatura média da água superficial: 28°C (picos vespertinos de 31°C).\n• Redução do volume útil do lago: 22% abaixo da cota média histórica.\n• Regime de ventos: Calmaria e ventos fracos (< 4 km/h) mantidos nos últimos cinco dias, impedindo a mistura turbulenta das camadas de água e favorecendo a estratificação térmica.",
      "sourceHint": "O calor elevado e a calmaria são condições sinérgicas altamente favoráveis, mas não geram biomassa sem nutrientes prévios."
    },
    {
      "id": "doc-203",
      "number": 3,
      "style": "lab-report",
      "tag": "Laudo Físico-Químico • Amostragem de Água",
      "title": "Concentração elevada de nutrientes próxima ao canal",
      "type": "Laudo físico-químico",
      "dados": [
        {
          "parametro": "Fósforo total",
          "centro_mg_L": 0.09,
          "canal_mg_L": 0.31,
          "unidade": "mg/L"
        },
        {
          "parametro": "Ortofosfato",
          "centro_mg_L": 0.03,
          "canal_mg_L": 0.19,
          "unidade": "mg/L"
        },
        {
          "parametro": "Nitrato",
          "centro_mg_L": 0.42,
          "canal_mg_L": 1.85,
          "unidade": "mg/L"
        },
        {
          "parametro": "Amônio",
          "centro_mg_L": 0.08,
          "canal_mg_L": 0.72,
          "unidade": "mg/L"
        }
      ],
      "investigacao": [
        "O que é eutrofização?",
        "Qual o papel do nitrogênio e fósforo?",
        "Os dados identificam a fonte?"
      ],
      "classificacao": "Evidência de enriquecimento localizado; fonte não identificada.",
      "fullText": "RELATÓRIO DE ENSAIOS HIDROQUÍMICOS (LABORATÓRIO REGIONAL DE SANEAMENTO):\nAmostras coletadas no centro do lago e nas proximidades do canal afluente revelaram forte gradiente químico:\n• Fósforo Total: 0,09 mg/L no Centro vs 0,31 mg/L no Canal (Aumento de 3,4x).\n• Ortofosfato solúvel (forma assimilável): 0,03 mg/L no Centro vs 0,19 mg/L no Canal (Aumento de 6,3x).\n• Nitrato: 0,42 mg/L no Centro vs 1,85 mg/L no Canal (Aumento de 4,4x).\n• Amônio: 0,08 mg/L no Centro vs 0,72 mg/L no Canal (Aumento de 9,0x).\nDiagnóstico preliminar: O canal representa a rota primária de aporte de nutrientes eutrofizantes para a enseada afetada.",
      "sourceHint": "Evidência concreta de enriquecimento em nutrientes (eutrofização localizada), porém o laudo químico sozinho não diz de qual atividade econômica o fósforo veio."
    },
    {
      "id": "doc-204",
      "number": 4,
      "style": "inspection-report",
      "tag": "Relatório de Vistoria de Campo • Bacia Hidrográfica",
      "title": "Três possíveis fontes de nutrientes na bacia",
      "type": "Relatório de vistoria",
      "imageSrc": "assets/slides/Gemini_Generated_Image_fa1yxefa1yxefa1y.jfif",
      "imageLabel": "📸 <strong>Registro de Vistoria de Campo</strong>",
      "imageCaption": "Vistoria técnica nas três fontes antrópicas suspeitas da bacia hidrográfica (agricultura, efluente doméstico e pecuária).",
      "fontes_suspeitas": [
        "Área agrícola com fertilizantes e solo exposto",
        "Bairro residencial com suspeita não confirmada de ligação clandestina de esgoto",
        "Criatório de animais com esterco armazenado próximo a afluente"
      ],
      "investigacao": "Criar plano de amostragem para distinguir as fontes.",
      "classificacao": "Fontes plausíveis, nenhuma comprovada.",
      "fullText": "AUTO DE VISTORIA AMBIENTAL DA BACIA DO LAGO AZUL:\nFiscais ambientais inspecionaram as margens tributárias do canal e identificaram 3 atividades antrópicas com potencial de contaminação:\n1. Zona Agrícola de Hortaliças e Grãos: Uso intensivo de fertilizantes químicos solúveis (NPK 04-14-08 e ureia) em áreas de declive com solo desprovido de mata ciliar protetora.\n2. Bairro Vila Nova (Zona Urbana Residencial): Suspeita de lançamentos clandestinos de efluentes domésticos não tratados (ricos em detergentes fosfatados e matéria fecal) em galerias pluviais que drenam para o canal.\n3. Suinocultura e Avicultura Familiar: Esterqueiras com armazenamento a céu aberto situadas a menos de 40 metros de uma das nascentes que alimentam o afluente.\nConclusão dos fiscais: Todas as 3 fontes são ecologicamente plausíveis, necessitando de plano de amostragem específico para comprovação.",
      "sourceHint": "Aponta suspeitos plausíveis na bacia, mas reforça a necessidade de método científico para não cometer injustiças sem provas."
    },
    {
      "id": "doc-205",
      "number": 5,
      "style": "microscopy-report",
      "tag": "Laudo de Microscopia Óptica • Amostra de Superfície",
      "title": "Microscopia identifica colônias e filamentos",
      "type": "Laudo de microscopia",
      "imageSrc": "assets/slides/colonia_microcystis.jfif",
      "imageCaption": "Microfotografia óptica de campo límnico: colônias de Microcystis com envoltório mucilaginoso amorfo e aerótopos flutuantes.",
      "observacoes": [
        "Células arredondadas em colônias",
        "Material mucilaginoso",
        "Filamentos em menor quantidade",
        "Alta densidade de organismos fotossintetizantes"
      ],
      "identificacao_preliminar": "Morfologia compatível com cianobactérias, incluindo organismos semelhantes a Microcystis.",
      "investigacao": [
        "Como diferenciar cianobactérias de algas eucarióticas?",
        "O que significa identificação em nível de gênero?",
        "Todas as linhagens produzem microcistina?"
      ],
      "classificacao": "Evidência verdadeira, mas identificação preliminar; não confirma espécie ou toxicidade.",
      "fullText": "LAUDO FITOPLANCTÔNICO DE TRIAGEM:\n• Exame a fresco e com coloração (aumentos de 100x e 400x):\nObserva-se altíssima densidade de células esféricas microscópicas (3 a 5 µm de diâmetro) agregadas em colônias irregulares imersas em mucilagem amorfa incolor, morfologicamente compatíveis com o gênero Microcystis (Ordem Chroococcales).\nEm contagem preliminar, a densidade supera 85.000 células/mL, configurando florescimento algal severo. Notam-se ainda filamentos esparsos entremeados na massa celular.\nRessalva pericial: A morfologia óptica indica cianobactéria colonial, mas a confirmação da linhagem tóxica requer ensaio toxicológico ou molecular específico.",
      "sourceHint": "Comprova morfologia de colônias de cianobactérias (Microcystis), mas salienta que a microscopia óptica não atesta toxicidade por si só."
    },
    {
      "id": "doc-206",
      "number": 6,
      "style": "microscopy-report",
      "tag": "Laudo de Microscopia Óptica • Camada Profunda",
      "title": "Filamentos encontrados na região profunda",
      "type": "Laudo de microscopia",
      "imageSrc": "assets/slides/citomorfologico_perfil.jfif",
      "imageLabel": "🔬 <strong>Registro Citomorfológico</strong>",
      "imageCaption": "Perfil citomorfológico de camada profunda: filamentos heterocistados de cianobactérias e morfologia celular diferenciada.",
      "observacoes": [
        "Filamentos com estruturas diferenciadas compatíveis com cianobactérias heterocistadas"
      ],
      "hipoteses_taxonomicas": [
        "Dolichospermum spp.",
        "Aphanizomenon spp.",
        "Outros gêneros filamentosos"
      ],
      "investigacao": [
        "O que é fixação biológica de nitrogênio?",
        "O que são heterócitos?",
        "Como diferentes cianobactérias coexistem?"
      ],
      "classificacao": "Observação verdadeira; identificação inconclusiva.",
      "fullText": "ANÁLISE FITOPLANCTÔNICA DE PROFUNDIDADE (1,5 A 2,5 METROS):\nAmostragens colhidas sob a mancha superficial revelaram presença expressiva de cianobactérias filamentosas:\n• Tricomas solitários ou fasciculados, com células cilíndricas ou em barril.\n• Presença marcante de heterócitos (células especializadas maiores com paredes espessadas e sem pigmentação fotossintética ativa).\nGêneros compatíveis: Dolichospermum (antigo Anabaena) e Aphanizomenon.\nSignificado ecológico: A presença de heterócitos indica capacidade de fixação biológica de N2 atmosférico dissolvido, conferindo vantagem competitiva crucial em momentos de limitação de nitrogênio inorgânico na água.",
      "sourceHint": "Identifica cianobactérias filamentosas capazes de fixar nitrogênio graças aos heterócitos, demonstrando comunidade mista."
    },
    {
      "id": "doc-207",
      "number": 7,
      "style": "toxicology-report",
      "tag": "Laudo de Toxicologia Ambiental • Ensaio Imunoenzimático",
      "title": "Teste preliminar detecta microcistina",
      "type": "Laudo de toxicologia ambiental",
      "imageSrc": "assets/slides/laudo_ecotoxicologico_elisa.jfif",
      "imageLabel": "🧪 <strong>Laudo Toxicológico Oficial</strong>",
      "imageCaption": "Resultado do ensaio imunoenzimático ELISA: quantificação de microcistinas totais na enseada e pontos amostrais do Lago Azul.",
      "dados_microcistinas_totais_ug_L": {
        "centro": 0.35,
        "mancha_superficial": 2.4,
        "proximo_canal": 1.1
      },
      "metodo": "Ensaio imunoenzimático de triagem (ELISA); confirmação analítica necessária.",
      "investigacao": [
        "O que são microcistinas?",
        "A presença prova que a toxina matou os peixes?",
        "Ainda é necessário investigar oxigênio?"
      ],
      "classificacao": "Triagem positiva simulada; não é confirmação definitiva nem prova da causa da mortandade.",
      "fullText": "LAUDO ECOTOXICOLÓGICO PRELIMINAR (ENSAIO ELISA - KITS ESPECÍFICOS):\n• Mancha superficial concentrada: 2,4 µg/L de microcistinas totais.\n• Região próxima ao canal afluente: 1,1 µg/L.\n• Centro do Lago Azul: 0,35 µg/L.\n(Valor de referência CONAMA 357 / Portaria GM/MS 888 para água potável tratada: 1,0 µg/L).\nNota técnica: O teste ELISA é um ensaio de triagem biológica por anticorpos monoclonais que indica presença de variantes de microcistina, mas exige confirmação analítica por cromatografia líquida com espectrometria de massas (LC-MS/MS).\nA detecção comprova produção de toxina no ecossistema, mas não estabelece isoladamente nexo causal incontestável com o óbito dos peixes sem análise do oxigênio.",
      "sourceHint": "Confirma a presença de hepatotoxinas na mancha (2,4 µg/L), mas a ecotoxicologia exige avaliar a via de exposição e os demais parâmetros vitais."
    },
    {
      "id": "doc-208",
      "number": 8,
      "style": "monitoring-report",
      "tag": "Laudo de Monitoramento Nictemeral de Oxigênio Dissolvido",
      "title": "Oxigênio dissolvido cai durante a madrugada",
      "type": "Laudo de monitoramento",
      "imageSrc": "assets/slides/monitoramento_oxigenio_dissolvido.jfif",
      "imageLabel": "📊 <strong>Curva Nictemeral Contínua</strong>",
      "imageCaption": "Registro telemétrico contínuo de Oxigênio Dissolvido (OD) ao longo de 24 horas, evidenciando anóxia crítica (0,8 mg/L) na madrugada.",
      "dados_oxigenio_superficie_mg_L": [
        {
          "horario": "06h",
          "valor": 0.8
        },
        {
          "horario": "10h",
          "valor": 5.7
        },
        {
          "horario": "14h",
          "valor": 14.2
        },
        {
          "horario": "18h",
          "valor": 9.1
        },
        {
          "horario": "22h",
          "valor": 3
        },
        {
          "horario": "02h",
          "valor": 1.4
        }
      ],
      "dado_fundo": {
        "horario": "06h",
        "valor_mg_L": 0.3
      },
      "investigacao": [
        "Por que o oxigênio sobe durante o dia?",
        "O que ocorre à noite?",
        "Como respiração e decomposição consomem oxigênio?",
        "Como isso afeta os peixes?"
      ],
      "classificacao": "Evidência-chave compatível com hipóxia severa e anóxia em algumas camadas.",
      "fullText": "MONITORAMENTO CONTÍNUO DE OXIGÊNIO DISSOLVIDO (OD) AO LONGO DE 24 HORAS:\nSonda multiparâmetros instalada a 0,5 metro de profundidade na enseada da floração registrou oscilação extrema:\n• 06h: 0,8 mg/L (Hipóxia crítica / anóxia funcional na aurora)\n• 10h: 5,7 mg/L (Recuperação inicial)\n• 14h: 14,2 mg/L (Supersaturação violenta por intensa fotossíntese sob sol pleno)\n• 18h: 9,1 mg/L (Diminuição da incidência luminosa)\n• 22h: 3,0 mg/L (Consumo contínuo por respiração)\n• 02h: 1,4 mg/L (Zona de asfixia respiratória para a ictiofauna)\n• Fundo (2,5 m) às 06h: 0,3 mg/L (Anóxia total).\nInterpretação pericial: Peixes precisam de pelo menos 4 a 5 mg/L de OD para manutenção vital básica. Valores abaixo de 1,5 mg/L provocam sufocamento agudo e morte em poucas horas.",
      "sourceHint": "Evidência-chave: desvenda o mistério de por que a mortandade ocorreu exatamente entre 4h e 6h da madrugada, quando o OD atingiu 0,8 mg/L."
    },
    {
      "id": "doc-209",
      "number": 9,
      "style": "veterinary-report",
      "tag": "Relatório de Ictiopatologia e Necrópsia Animal",
      "title": "Peixes apresentam sinais de estresse respiratório",
      "type": "Relatório de ictiologia",
      "imageSrc": "assets/slides/doente.jfif",
      "imageCaption": "Exame macroscópico pericial de espécime com opérculos dilatados e lesão lamelar.",
      "observacoes": [
        "Movimentos operculares acelerados em peixes moribundos",
        "Muco nas brânquias em alguns exemplares",
        "Ausência de lesões externas específicas",
        "Coleta após a madrugada, sem observação contínua da morte"
      ],
      "investigacao": "A aparência das brânquias permite determinar a causa?",
      "classificacao": "Achados verdadeiros, porém inespecíficos; não provam intoxicação ou anóxia isoladamente.",
      "fullText": "NECRÓPSIA DE EXEMPLARES COLETADOS (LABORATÓRIO DE ICTIOLOGIA):\nExame em 35 peixes (Astyanax bimaculatus - lambaris; Oreochromis niloticus - tilápias; Hoplias malabaricus - traíras):\n• Quadro macroscópico: opérculos abertos, brânquias congestas recobertas por espessa camada de muco viscoso de reação defensiva, e bocas abertas em atitude de respiração superficial (boquejamento).\n• Lesões externas: Ausência de lesões tegumentares traumáticas, ulcerações ou parasitas evidentes.\n• Exame histopatológico branquial preliminar: fusão lamelar e edema branquial compatíveis com asfixia aguda por hipóxia e/ou irritação química por contato com algas e toxinas.\nConclusão técnica: Os achados atestam estresse respiratório agudo, porém a aparência macroscópica branquial é inespecífica e não separa por si só asfixia anóxica de intoxicação sistêmica.",
      "sourceHint": "Demonstra asfixia branquial real, porém enfatiza que os sintomas branquiais sozinhos são comuns a hipóxia e a irritação química."
    },
    {
      "id": "doc-210",
      "number": 10,
      "style": "newspaper",
      "newspaperName": "PORTAL CLIQUE NOTÍCIAS",
      "edition": "Coluna de Opinião e Polêmica • Redes Sociais",
      "tag": "Notícia Distratora / Boato Sem Sustentação",
      "title": "Especialista afirma que o lago sofre maré vermelha causada por dinoflagelados marinhos",
      "type": "Notícia distratora",
      "imageSrc": "assets/slides/materia_sensacionalista_internet.jfif",
      "imageLabel": "📰 <strong>Post Sensacionalista Viral</strong>",
      "imageCaption": "Publicação em rede social alegando maré vermelha costeira no Lago Azul, ilustrada com foto da costa da Flórida.",
      "alegacao": "Karenia brevis teria chegado ao lago por aves migratórias.",
      "investigacao": [
        "Karenia brevis é de água doce?",
        "O que são brevetoxinas?",
        "Fotografia marinha comprova ocorrência no lago?",
        "Qual a diferença entre cianobactéria e dinoflagelado?"
      ],
      "classificacao": "Notícia sem sustentação para o caso; imagem marinha não comprova a presença da espécie no lago.",
      "fullText": "MATÉRIA SENSACIONALISTA VEICULADA NA INTERNET:\nUm suposto consultor ambiental autônomo publicou em redes sociais que o desastre no Lago Azul seria uma autêntica 'Maré Vermelha', idêntica às ocorridas em oceanos e enseadas litorâneas.\nSegundo a postagem, o dinoflagelado marinho Karenia brevis teria sido transportado do litoral até a represa pelas penas de aves marinhas migratórias e estaria liberando brevetoxinas mortais na água doce. A publicação foi ilustrada com uma foto aérea de alta resolução tirada na costa da Flórida mostrando ondas com manchas avermelhadas.\nO post viralizou na cidade, causando pânico sobre contaminação pelo ar.",
      "sourceHint": "Notícia sem sustentação científica: Karenia brevis é estenohalina (organismo marinho que não tolera água doce) e a foto é de outro ecossistema."
    },
    {
      "id": "doc-211",
      "number": 11,
      "style": "geochem-report",
      "tag": "Relatório de Sedimentos e Decomposição Bêntica",
      "title": "Matéria orgânica acumulada pode ampliar o consumo de oxigênio",
      "type": "Relatório de sedimentos",
      "observacoes": [
        "Acúmulo de matéria orgânica",
        "Restos de organismos fotossintetizantes",
        "Atividade microbiana elevada",
        "Odor compatível com decomposição em áreas pouco circuladas"
      ],
      "investigacao": "Construir sequência desde o aporte de nutrientes até a mortandade.",
      "classificacao": "Evidência verdadeira; não quantifica sozinha a contribuição da decomposição.",
      "fullText": "ANÁLISE DE TESTEMUNHOS DE SEDIMENTO (LABORATÓRIO DE LIMNOLOGIA BÊNTICA):\nSondagens de fundo realizadas na enseada do Lago Azul demonstraram:\n• Espessa camada de lodo escuro (8 a 15 cm) rica em carbono orgânico e restos mortos de algas e cianobactérias senescentes.\n• Respiração microbiana heterotrófica extremamente ativa: bactérias e fungos decompositores consomem vorazmente o oxigênio da camada inferior.\n• Condição redox do sedimento: potencial de oxirredução negativo (anóxia de fundo), acompanhado de odor de sulfeto de hidrogênio (H2S).\nConclusão: O sedimento funciona como um poderoso sumidouro de oxigênio dissolvido, acelerando a anóxia noturna da coluna d'água inteira quando a fotossíntese cessa.",
      "sourceHint": "Evidência fundamental: a decomposição contínua no sedimento é o motor biológico que esgota o oxigênio durante a noite."
    },
    {
      "id": "doc-212",
      "number": 12,
      "style": "official-bulletin",
      "tag": "Relatório Técnico Integrado Final",
      "title": "Análises confirmam cianobactérias potencialmente tóxicas e oxigenação crítica",
      "type": "Relatório técnico integrado",
      "resultados": [
        "Análise molecular compatível com Microcystis e Dolichospermum",
        "LC-MS/MS confirma microcistina-LR na amostra superficial",
        "Monitoramento confirma queda noturna do oxigênio",
        "Fósforo e nitrogênio mais elevados próximo ao canal",
        "Origem dos nutrientes não atribuída a uma única fonte"
      ],
      "conclusao_preliminar": "Resultados compatíveis com eutrofização, floração de cianobactérias, presença de microcistina e episódios de hipóxia/anóxia. A contribuição relativa da toxicidade e da falta de oxigênio para a mortandade exige investigação específica.",
      "classificacao": "Conjunto forte de evidências, com limitações sobre a causa exata e a origem dos nutrientes.",
      "fullText": "PARECER INTEGRADO DOS ÓRGÃOS DE FISCALIZAÇÃO AMBIENTAL E SAÚDE PÚBLICA:\nConsolidação definitiva dos exames analíticos:\n1. Caracterização biológica: Sequenciamento genético e PCR confirmaram linhagens de Microcystis aeruginosa (com genes mcy para produção de microcistinas) e Dolichospermum circinale.\n2. Cromatografia Líquida de Alta Resolução acoplada a Espectrometria de Massas (LC-MS/MS): Confirmação inequívoca de 2,1 µg/L de microcistina-LR na água da enseada.\n3. Dinâmica de Oxigenação: Confirmação de colapso respiratório noturno com oxigênio caindo para 0,8 mg/L às 06h da madrugada, seguido de supersaturação diurna.\n4. Nutrientes e Fontes: Elevado fósforo (0,31 mg/L) e nitrogênio na foz do canal. As análises de isótopos e traçadores indicam contribuição mista: efluentes sanitários domésticos urbanos combinados com drenagem de áreas fertilizadas e dejetos.\nParecer conclusivo: Trata-se de desastre ecológico multifatorial derivado da eutrofização antrópica, com anóxia noturna severa como causa direta imediata de asfixia da ictiofauna, potencializada pelo estresse fisiológico da cianotoxina.",
      "sourceHint": "Laudo pericial final que integra todas as peças do caso: confirma a complexidade do ecossistema e refuta soluções simplistas."
    }
  ],
  "phases": [
    {
      "id": "phase-201",
      "lessonNumber": 1,
      "lessonTitle": "Aula 1: Apresentação do Evento e Análise dos Laudos 1 e 2",
      "title": "Ocorrência no Lago Azul & Hipóteses Iniciais",
      "focus": "Evento misterioso e condições meteorológicas",
      "duration": "45 min",
      "documentRefs": [
        "doc-201",
        "doc-202"
      ],
      "badge": "Etapa 1: Evento Misterioso",
      "expectedProduct": "Hipóteses iniciais sobre a mancha e a mortandade na madrugada",
      "questions": [
        {
          "id": "p1_q1_d2",
          "type": "textarea",
          "label": "1. A cor verde-azulada e avermelhada da mancha na superfície do Lago Azul identifica com certeza qual é o organismo responsável? Por que observações visuais isoladas são insuficientes para determinar a causa?",
          "placeholder": "Discuta sobre a aparência visual das águas, pigmentos de cianobactérias, algas e a necessidade de identificação laboratorial microscópica...",
          "expectedHint": "A coloração verde-azulada ou avermelhada indica alta concentração de pigmentos fotossintetizantes, mas diferentes organismos (cianobactérias, microalgas verdes, dinoflagelados ou euglenófitas) podem gerar tons parecidos. Observações visuais registram o fenômeno, mas não identificam gêneros nem confirmam se há produção de toxina."
        },
        {
          "id": "p1_q2_d2",
          "type": "textarea",
          "label": "2. O odor fétido e a presença de espuma nas margens comprovam por si sós que há produção de toxinas letais dissolvidas na água?",
          "placeholder": "Diferencie a decomposição de matéria orgânica de substâncias químicas tóxicas ativas...",
          "expectedHint": "O odor intenso e a espuma decorrem frequentemente da decomposição de matéria orgânica acumulada e liberação de gases (como sulfetos e amônia), não comprovando por si sós a presença de cianotoxinas específicas como a microcistina."
        },
        {
          "id": "p1_q3_d2",
          "type": "textarea",
          "label": "3. Por que a mortandade de alevinos e peixes adultos foi percebida especificamente entre 4h e 6h da madrugada e não ao meio-dia sob sol forte? Formule a hipótese inicial da sua equipe.",
          "placeholder": "Elabore uma hipótese sobre o que acontece com a água durante a noite na ausência de luz solar...",
          "expectedHint": "Durante a madrugada a água passa horas sem fotossíntese enquanto todos os seres vivos continuam respirando e microrganismos decompõem a biomassa, gerando suspeita de que o oxigênio possa ter caído a níveis mortais nesse horário."
        },
        {
          "id": "p1_q4_d2",
          "type": "textarea",
          "label": "4. Com base no Boletim Meteorológico (Doc 2), como a combinação de calor (28°C), 18 dias de estiagem e ventos fracos influencia o ecossistema lacustre? O calor é a causa única da floração ou um fator favorável?",
          "placeholder": "Analise o papel da temperatura na velocidade de multiplicação celular e o efeito de águas paradas na estratificação...",
          "expectedHint": "O calor acelera o metabolismo e a divisão celular, e águas paradas sem ventos formam uma camada superficial aquecida e calma onde cianobactérias boiam. O calor não cria biomassa do nada: ele é um fator ambiental favorável que potencializa a floração se houver nutrientes prévios."
        }
      ],
      "phaseNumber": 1,
      "docsInvolved": [
        "doc-201",
        "doc-202"
      ],
      "fichas": [
        "Laudo 1",
        "Laudo 2"
      ],
      "goal": "Apresentação do evento no Lago Azul e análise preliminar dos laudos 1 e 2."
    },
    {
      "id": "phase-202",
      "lessonNumber": 2,
      "lessonTitle": "Aula 2: Análise de Nutrientes e Fontes de Contaminação (Laudos 3 e 4)",
      "title": "Eutrofização & Rastreamento de Nitrogênio e Fósforo",
      "focus": "Nutrientes e fontes de contaminação",
      "duration": "45 min",
      "documentRefs": [
        "doc-203",
        "doc-204"
      ],
      "badge": "Etapa 2: Nutrientes & Fontes",
      "expectedProduct": "Mapa conceitual de fontes possíveis e plano de amostragem na bacia",
      "questions": [
        {
          "id": "p2_q1_d2",
          "type": "textarea",
          "label": "1. Compare as concentrações de fósforo total (0,31 mg/L vs 0,09 mg/L) e nitrato (1,85 mg/L vs 0,42 mg/L) entre a saída do canal e o centro do lago. O que esses dados revelam sobre o processo de eutrofização?",
          "placeholder": "Analise o gradiente espacial de nutrientes entre o canal afluente e a área aberta da represa...",
          "expectedHint": "A concentração muito mais alta na saída do canal demonstra que há enriquecimento artificial localizado em nutrientes (eutrofização), indicando que o canal atua como vetor direto de despejo de nitrogênio e fósforo na enseada."
        },
        {
          "id": "p2_q2_d2",
          "type": "textarea",
          "label": "2. Qual o papel biológico do nitrogênio e do fósforo no crescimento descontrolado de cianobactérias e microalgas em águas doces continentais?",
          "placeholder": "Explique a importância do fósforo (ATP, DNA, membranas) e nitrogênio (proteínas, clorofila)...",
          "expectedHint": "Nitrogênio e fósforo são macronutrientes essenciais para a síntese de proteínas, ácidos nucleicos (DNA/RNA) e ATP. Em águas continentais, o fósforo costuma ser o nutriente limitante: quando introduzido em excesso, quebra o equilíbrio e deflagra explosão populacional."
        },
        {
          "id": "p2_q3_d2",
          "type": "textarea",
          "label": "3. O Laudo 4 aponta três fontes suspeitas na bacia (área agrícola com adubo NPK, esgoto urbano clandestino e esterqueiras de animais). Os dados químicos do Laudo 3 comprovam isoladamente qual delas é a verdadeira culpada?",
          "placeholder": "Discuta se uma análise química de nutrientes consegue identificar a origem exata do escoamento sem amostragem nos tributários...",
          "expectedHint": "Não comprovam. O laudo químico atesta que há nitrogênio e fósforo elevados, mas todas as três fontes contêm esses elementos. Sem amostragem nos canais específicos de cada atividade, não se pode culpar uma única fonte."
        },
        {
          "id": "p2_q4_d2",
          "type": "textarea",
          "label": "4. Proponha um plano pericial de amostragem com pontos de coleta e parâmetros adicionais para conseguir distinguir cientificamente a contribuição de cada uma das três fontes suspeitas.",
          "placeholder": "Descreva pontos de coleta a montante e jusante de cada atividade, além de indicadores como coliformes fecais, cafeína ou fósforo particulado...",
          "expectedHint": "Deve-se coletar amostras a montante e jusante da lavoura, do bairro e do criatório de animais, medindo coliformes fecais e traçadores de esgoto (cafeína/resíduos farmacêuticos) para esgoto humano, e sedimentos/nitrogênio orgânico para o criatório e lavouras."
        }
      ],
      "phaseNumber": 2,
      "docsInvolved": [
        "doc-203",
        "doc-204"
      ],
      "fichas": [
        "Laudo 3",
        "Laudo 4"
      ],
      "goal": "Análise de nutrientes na água e rastreamento das três fontes suspeitas na bacia."
    },
    {
      "id": "phase-203",
      "lessonNumber": 3,
      "lessonTitle": "Aula 3: Microscopia e Identificação Taxonômica (Laudos 5 e 6)",
      "title": "Microscopia de Fitoplâncton & Comunidades Mistas",
      "focus": "Identificação dos organismos proliferantes",
      "duration": "45 min",
      "documentRefs": [
        "doc-205",
        "doc-206"
      ],
      "badge": "Etapa 3: Identificação Celular",
      "expectedProduct": "Quadro comparativo de espécies e estruturas morfológicas",
      "questions": [
        {
          "id": "p3_q1_d2",
          "type": "textarea",
          "label": "1. Como diferenciar cianobactérias (bactérias fotossintetizantes procariontes) de algas eucarióticas unicelulares (como clorofíceas ou dinoflagelados) sob a ótica da microscopia e citologia?",
          "placeholder": "Destaque ausência de carioteca, ausência de cloroplastos organizados, presença de mucilagem e pigmentos ficobilinas...",
          "expectedHint": "Cianobactérias são procariontes (não possuem núcleo delimitado por membrana nem cloroplastos individualizados, com tilacoides livres no citoplasma), além de formarem mucilagem gelatinosa e pigmentos de ficobilinas. Algas são eucariontes com núcleo visível e plastos definidos."
        },
        {
          "id": "p3_q2_d2",
          "type": "textarea",
          "label": "2. O Laudo 5 descreve células arredondadas em colônias com mucilagem, compatíveis com Microcystis. O que significa uma identificação taxonômica preliminar em nível de gênero? Todas as linhagens de Microcystis aeruginosa produzem microcistinas?",
          "placeholder": "Diferencie identificação de gênero da confirmação de espécie e discuta se a toxicidade é fixa em todas as linhagens...",
          "expectedHint": "Significa que a morfologia encaixa no gênero, mas não identifica a espécie exata nem garante toxicidade. Nem toda floração é tóxica: existem linhagens de Microcystis aeruginosa que possuem os genes mcy de síntese de toxina e outras linhagens que não os possuem ou não os expressam."
        },
        {
          "id": "p3_q3_d2",
          "type": "textarea",
          "label": "3. O Laudo 6 relata filamentos com heterócitos na região profunda do lago (compatíveis com Dolichospermum ou Aphanizomenon). O que são heterócitos e qual a importância biológica da fixação de nitrogênio nesse cenário?",
          "placeholder": "Explique a função dos heterócitos e a enzima nitrogenase sensível ao oxigênio...",
          "expectedHint": "Heterócitos são células especializadas de parede espessada onde a enzima nitrogenase converte N2 atmosférico gasoso em amônio. Isso permite que essas cianobactérias proliferem mesmo quando o nitrogênio dissolvido na água acaba, mantendo a floração."
        },
        {
          "id": "p3_q4_d2",
          "type": "textarea",
          "label": "4. Elabore um quadro comparativo contrastando cianobactérias coloniais (Microcystis) e filamentosas (Dolichospermum), explicando como ambas podem coexistir na mesma represa.",
          "placeholder": "Compare morfologia, posição na coluna de água, capacidade de flutuação por vacúolos de gás e fixação de N2...",
          "expectedHint": "Microcystis forma colônias na superfície aproveitando luz plena e regulando flutuabilidade por vesículas de gás, enquanto Dolichospermum pode fixar N2 na camada inferior; juntas constituem uma comunidade mista com nichos ecológicos complementares."
        }
      ],
      "phaseNumber": 3,
      "docsInvolved": [
        "doc-205",
        "doc-206"
      ],
      "fichas": [
        "Laudo 5",
        "Laudo 6"
      ],
      "goal": "Microscopia óptica, citologia comparativa e caracterização de cianobactérias."
    },
    {
      "id": "phase-204",
      "lessonNumber": 4,
      "lessonTitle": "Aula 4: Investigação de Cianotoxinas (Laudo 7)",
      "title": "Cianotoxinas & Ensaio de Microcistina",
      "focus": "Toxicologia ambiental e limites de segurança",
      "duration": "45 min",
      "documentRefs": [
        "doc-207"
      ],
      "badge": "Etapa 4: Cianotoxinas",
      "expectedProduct": "Parecer técnico sobre microcistina e necessidade de investigar o oxigênio",
      "questions": [
        {
          "id": "p4_q1_d2",
          "type": "textarea",
          "label": "1. O que são microcistinas, qual a sua natureza química geral e qual o mecanismo molecular de toxicidade hepática em vertebrados (animais e seres humanos)?",
          "placeholder": "Descreva peptídeos cíclicos, inibição de fosfatases proteicas celulares (PP1 e PP2A) e hemorragia hepática...",
          "expectedHint": "São heptapeptídeos cíclicos hepatotóxicos produzidos por cianobactérias. Seu mecanismo de ação consiste na inibição potente das proteínas fosfatases 1 e 2A (PP1 e PP2A) dos hepatócitos, desestruturando o citoesqueleto e provocando hemorragia hepática aguda e choque hipovolêmico."
        },
        {
          "id": "p4_q2_d2",
          "type": "textarea",
          "label": "2. O teste ELISA indicou 2,4 µg/L de microcistinas totais na mancha superficial do lago. Qual é a diferença metodológica entre um ensaio de triagem imunológico (ELISA) e um método confirmatório quantitativo (ex: LC-MS/MS)?",
          "placeholder": "Diferencie triagem baseada em ligação de anticorpos de separação cromatográfica precisa com espectrometria de massa...",
          "expectedHint": "O ELISA é um ensaio rápido de triagem baseado em anticorpos que pode acusar reações cruzadas e somar derivados semelhantes. O LC-MS/MS é um método instrumental analítico de alta especificidade que identifica e quantifica exatamente cada congênere molecular (ex: microcistina-LR)."
        },
        {
          "id": "p4_q3_d2",
          "type": "textarea",
          "label": "3. A detecção de 2,4 µg/L de microcistina na superfície prova por si só que essa toxina foi a causa direta e fatal da morte dos peixes na madrugada?",
          "placeholder": "Discuta vias de absorção, tempo necessário para morte por hepatotoxicidade crônica/aguda vs mortandade súbita em poucas horas...",
          "expectedHint": "Não prova sozinha. A presença de 2,4 µg/L na água indica risco, mas peixes precisariam ingerir ou absorver doses suficientes ao longo do tempo. Mortandade súbita em massa de centenas de peixes concentrada na madrugada aponta fortemente para outro fator imediato fulminante."
        },
        {
          "id": "p4_q4_d2",
          "type": "textarea",
          "label": "4. Por que, mesmo após confirmar a presença de toxina na água, ainda é biologicamente imprescindível investigar o oxigênio dissolvido no lago?",
          "placeholder": "Explique que fatores ambientais interagem e que a falta de ar pode ser o agente letal agudo...",
          "expectedHint": "Porque o estresse tóxico e a asfixia por falta de oxigênio frequentemente ocorrem juntos em corpos de água eutrofizados. A anóxia pode matar em minutos ou poucas horas, enquanto a hepatotoxicidade costuma ter curso clínico diferente."
        }
      ],
      "phaseNumber": 4,
      "docsInvolved": [
        "doc-207"
      ],
      "fichas": [
        "Laudo 7"
      ],
      "goal": "Investigação ecotoxicológica de microcistinas por ELISA e limites de segurança."
    },
    {
      "id": "phase-205",
      "lessonNumber": 5,
      "lessonTitle": "Aula 5: Interpretação do Oxigênio Dissolvido e Ciclo Diário (Laudo 8)",
      "title": "Dinâmica do Oxigênio Dissolvido & Anóxia Noturna",
      "focus": "Variação nictemeral do oxigênio e anóxia noturna",
      "duration": "45 min",
      "documentRefs": [
        "doc-208"
      ],
      "badge": "Etapa 5: Ciclo do Oxigênio",
      "expectedProduct": "Gráfico e modelo explicativo do ciclo nictemeral do oxigênio",
      "questions": [
        {
          "id": "p5_q1_d2",
          "type": "textarea",
          "label": "1. Analise os valores de oxigênio dissolvido na superfície do Lago Azul: 06h (0,8 mg/L), 10h (5,7 mg/L), 14h (14,2 mg/L), 18h (9,1 mg/L), 22h (3,0 mg/L) e 02h (1,4 mg/L). Por que o oxigênio atinge valores extremos de supersaturação (14,2 mg/L) às 14h?",
          "placeholder": "Explique a fotossíntese acelerada sob radiação solar máxima e temperatura de 28°C...",
          "expectedHint": "Às 14h a incidência luminosa solar e a temperatura estão no auge. A biomassa gigantesca de cianobactérias realiza fotossíntese a todo vapor, liberando grandes volumes de O2 na água muito mais rápido do que ele consegue escapar para a atmosfera."
        },
        {
          "id": "p5_q2_d2",
          "type": "textarea",
          "label": "2. Explique detalhadamente o mecanismo que faz o oxigênio despencar vertiginosamente durante a noite até atingir níveis críticos de anóxia (0,8 mg/L na superfície e 0,3 mg/L no fundo às 06h).",
          "placeholder": "Discuta a ausência de luz solar, a parada da fotossíntese e a respiração ininterrupta de trilhões de células e bactérias...",
          "expectedHint": "À noite não há luz, logo a fotossíntese cessa por completo e a produção de O2 vai a zero. Entretanto, toda a massa de organismos fotossintetizantes, bactérias decompositoras e peixes continua respirando continuamente, exaurindo quase todo o oxigênio da água."
        },
        {
          "id": "p5_q3_d2",
          "type": "textarea",
          "label": "3. Um valor alto de oxigênio medido às 14h (14,2 mg/L) descarta a ocorrência de anóxia na madrugada? Por que apresentar somente o dado das 14h atua como um distrator em avaliações ambientais?",
          "placeholder": "Mostre como coletas em horários pontuais escondem o comportamento dinâmico de 24 horas...",
          "expectedHint": "Não descarta em hipótese alguma. Esse é o principal distrator: uma amostra pontual vespertina esconde o colapso noturno. O ciclo nictemeral varia drasticamente e a mortalidade ocorre nas horas mais escuras."
        },
        {
          "id": "p5_q4_d2",
          "type": "textarea",
          "label": "4. Quais são as consequências fisiológicas imediatas de níveis de oxigênio dissolvido abaixo de 1,5 mg/L para a respiração branquial e a sobrevivência dos peixes?",
          "placeholder": "Descreva a asfixia, a incapacidade de manter o gradiente de difusão de oxigênio nas brânquias e a morte súbita...",
          "expectedHint": "A maioria dos peixes tropicais exige pelo menos 4 a 5 mg/L de OD. Abaixo de 1,5 mg/L, o gradiente de difusão de oxigênio entre a água e o sangue branquial se inverte ou cessa, provocando asfixia aguda, respiração acelerada em vão e morte por hipóxia sistêmica."
        }
      ],
      "phaseNumber": 5,
      "docsInvolved": [
        "doc-208"
      ],
      "fichas": [
        "Laudo 8"
      ],
      "goal": "Interpretação da curva nictemeral de oxigênio dissolvido e anóxia noturna."
    },
    {
      "id": "phase-206",
      "lessonNumber": 6,
      "lessonTitle": "Aula 6: Mortandade Animal e Notícia Distratora (Laudos 9 e 10)",
      "title": "Ictiopatologia & Checagem de Notícia Falsa",
      "focus": "Sintomas de estresse respiratório vs mitos de maré vermelha",
      "duration": "45 min",
      "documentRefs": [
        "doc-209",
        "doc-210"
      ],
      "badge": "Etapa 6: Ictiologia & Distrator",
      "expectedProduct": "Análise crítica de evidências e refutação científica da maré vermelha marinha",
      "questions": [
        {
          "id": "p6_q1_d2",
          "type": "textarea",
          "label": "1. O Laudo 9 relata movimentos operculares acelerados, bocas abertas e muco nas brânquias dos peixes mortos. Esses achados permitem diferenciar asfixia anóxica de intoxicação sistêmica por microcistinas?",
          "placeholder": "Explique por que esses sinais branquiais são reações inespecíficas de estresse respiratório...",
          "expectedHint": "Não permitem separar conclusivamente. Opérculos abertos, respiração à tona e muco branquial são respostas fisiológicas inespecíficas a qualquer situação de asfixia aguda (seja falta de oxigênio na água ou irritação química por cianobactérias)."
        },
        {
          "id": "p6_q2_d2",
          "type": "textarea",
          "label": "2. O Documento 10 traz a alegação de um suposto especialista afirmando que o dinoflagelado marinho Karenia brevis causou uma maré vermelha no Lago Azul após ser transportado por aves. Com base na biologia e osmorregulação, essa afirmação tem sustentação científica?",
          "placeholder": "Discuta a tolerância à salinidade (organismos marinhos estenohalinos não sobrevivem nem se multiplicam em água doce)...",
          "expectedHint": "Não tem sustentação científica alguma. Karenia brevis é um dinoflagelado estritamente marinho adaptado a altas salinidades (cerca de 35 g/L de sais). Em água doce pura de represa, as células sofrem lise celular osmótica imediata por entrada massiva de água e não conseguem proliferar."
        },
        {
          "id": "p6_q3_d2",
          "type": "textarea",
          "label": "3. O que são brevetoxinas e como se diferenciam as florações marinhas de dinoflagelados (marés vermelhas) das florações de cianobactérias em lagos continentais?",
          "placeholder": "Diferencie toxinas neurotóxicas marinhas de hepatotoxinas de cianobactérias límnicas...",
          "expectedHint": "Brevetoxinas são neurotoxinas lipídicas de dinoflagelados marinhos que afetam canais de sódio e aerossóis marinhos. Florações de lagos continentais são protagonizadas por cianobactérias (procariontes) que produzem hepatotoxinas (microcistinas), não devendo ser chamadas de marés vermelhas."
        },
        {
          "id": "p6_q4_d2",
          "type": "textarea",
          "label": "4. Por que a publicação de fotos de oceanos ou declarações alarmistas sem laudos laboratoriais confunde a opinião pública e atrapalha a gestão das crises ambientais?",
          "placeholder": "Reflita sobre fake news científicas, pânico social e desvio das causas reais de poluição local...",
          "expectedHint": "Desvia a atenção das causas reais (poluição por esgoto e fertilizantes na bacia hidrográfica) para explicações fantasiosas incontroláveis (aves marinhas), gerando pânico infundado e retardando medidas corretivas reais de saneamento."
        }
      ],
      "phaseNumber": 6,
      "docsInvolved": [
        "doc-209",
        "doc-210"
      ],
      "fichas": [
        "Laudo 9",
        "Laudo 10"
      ],
      "goal": "Ictiopatologia branquial e refutação científica do mito de maré vermelha marinha."
    },
    {
      "id": "phase-207",
      "lessonNumber": 7,
      "lessonTitle": "Aula 7: Sedimentos, Decomposição e Cadeia Causal (Laudo 11)",
      "title": "Decomposição Bêntica & Cadeia Causal",
      "focus": "Papel do sedimento de fundo e encadeamento lógico",
      "duration": "45 min",
      "documentRefs": [
        "doc-211"
      ],
      "badge": "Etapa 7: Modelo Causal",
      "expectedProduct": "Construção da sequência causal completa numerando os 6 eventos lógicos",
      "questions": [
        {
          "id": "p7_q1_d2",
          "type": "textarea",
          "label": "1. De que maneira o acúmulo de matéria orgânica no fundo do lago e a intensa atividade de microrganismos decompositores ampliam o déficit de oxigênio dissolvido?",
          "placeholder": "Explique a oxidação bacteriana heterotrófica da biomassa e a demanda bioquímica de oxigênio (DBO)...",
          "expectedHint": "As cianobactérias têm ciclo de vida curto; à medida que morrem, afundam no lodo. Bilhões de bactérias e fungos decompositores consomem vorazmente o oxigênio para quebrar essa matéria orgânica (alta DBO), criando um fundo anóxico permanente."
        },
        {
          "id": "p7_q2_d2",
          "type": "textarea",
          "label": "2. O que é a liberação interna de compostos do sedimento (internal loading) sob condições de anóxia e altas temperaturas em reservatórios?",
          "placeholder": "Explique como a falta de oxigênio no lodo libera fósforo ligado a ferro para a coluna de água...",
          "expectedHint": "Sob condições anóxicas e temperatura elevada, o ferro do sedimento se reduz e libera o fósforo que estava aprisionado nos complexos minerais. Esse fósforo sobe para a superfície e alimenta novas florações, mesmo se a entrada externa for estancada."
        },
        {
          "id": "p7_q3_d2",
          "type": "textarea",
          "label": "3. Construa a sequência lógica completa da crise numerando e descrevendo os 6 eventos causais fundamentais do Modelo Causal da investigação.",
          "placeholder": "1. Entrada de N e P -> 2. Eutrofização -> 3. Floração -> 4. Variação diária do oxigênio -> 5. Hipóxia/Anóxia -> 6. Estresse e mortandade...",
          "expectedHint": "1) Entrada excessiva de N e P na bacia; 2) Eutrofização artificial do lago; 3) Floração massiva de cianobactérias; 4) Variação diária de oxigênio (supersaturação de dia, colapso de noite); 5) Anóxia noturna severa (0,8 mg/L); 6) Estresse respiratório agudo e mortandade dos peixes na madrugada."
        },
        {
          "id": "p7_q4_d2",
          "type": "textarea",
          "label": "4. Relacione quais documentos da investigação comprovam cientificamente cada uma das etapas do modelo causal que sua equipe estruturou.",
          "placeholder": "Indique os documentos que provam nutrientes (Laudo 3), colônias (Laudo 5), toxina (Laudo 7), anóxia (Laudo 8)...",
          "expectedHint": "Etapa 1 e 2 comprovadas pelos Laudos 3 e 4; Etapa 3 comprovada pelos Laudos 5 e 6; Etapa 4 e 5 comprovadas pelos Laudos 8 e 11; Etapa 6 comprovada pelos Laudos 7, 8, 9 e 12."
        }
      ],
      "phaseNumber": 7,
      "docsInvolved": [
        "doc-211"
      ],
      "fichas": [
        "Laudo 11"
      ],
      "goal": "Decomposição bêntica e estruturação dos 6 eventos lógicos do Modelo Causal."
    },
    {
      "id": "phase-208",
      "lessonNumber": 8,
      "lessonTitle": "Aula 8: Integração Técnica dos Resultados Periciais (Documento 12)",
      "title": "Integração Pericial & Redação do Parecer Técnico",
      "focus": "Confronto de hipóteses e redação estruturada",
      "duration": "45 min",
      "documentRefs": [
        "doc-212"
      ],
      "badge": "Etapa 8: Parecer Técnico",
      "expectedProduct": "Minuta do Parecer Técnico Pericial oficial contendo os 8 itens obrigatórios",
      "questions": [
        {
          "id": "p8_q1_d2",
          "type": "textarea",
          "label": "1. O Documento 12 confirmou a presença de microcistina-LR por LC-MS/MS e confirmou anóxia noturna severa. Como sua equipe pondera a contribuição relativa de cada um desses dois fatores na mortandade de peixes?",
          "placeholder": "Analise a ação fulminante da anóxia na madrugada vs o efeito debilitante da cianotoxina...",
          "expectedHint": "A anóxia noturna severa (0,8 mg/L) atuou como causa imediata direta e determinante da asfixia, pois os peixes morreram repentinamente na madrugada. A microcistina-LR exerceu contribuição adicional ou debilitante prévia, configurando letalidade por ação sinérgica."
        },
        {
          "id": "p8_q2_d2",
          "type": "textarea",
          "label": "2. Com base na análise integrada, a crise no Lago Azul decorreu de um único poluente de uma única empresa/lavoura ou da ação sinérgica de múltiplos fatores ambientais e antrópicos na bacia hidrográfica?",
          "placeholder": "Destaque a multicausalidade: esgoto urbano, adubação de solo exposto, dejetos e onda de calor histórica...",
          "expectedHint": "A crise é de natureza multifatorial: esgoto residencial com fósforo, drenagem agrícola com fertilizantes, dejetos animais e lodo de fundo interagiram com uma onda de calor de 28°C e calmaria para deflagrar o desastre."
        },
        {
          "id": "p8_q3_d2",
          "type": "textarea",
          "label": "3. Redija o Parecer Técnico Pericial da sua equipe cobrindo os 8 itens obrigatórios: 1) identificação dos organismos; 2) eutrofização e fontes; 3) ciclo do oxigênio; 4) resultado de microcistina; 5) hipóxia vs intoxicação; 6) cianobactérias vs maré vermelha; 7) plano de mitigação; 8) limitações.",
          "placeholder": "Estruture o parecer em tópicos claros, objetivos e fundamentados cientificamente nos 12 laudos...",
          "expectedHint": "O parecer deve consolidar cianobactérias (Microcystis/Dolichospermum), eutrofização mista pelo canal, anóxia de madrugada (0,8 mg/L), microcistina de 2,1 µg/L, desmistificação de Karenia brevis marinha, e ações como aeração noturna e reflorestamento ciliar."
        },
        {
          "id": "p8_q4_d2",
          "type": "textarea",
          "label": "4. Responda conclusivamente à Questão Final Investigativa: A mortandade de peixes no Lago Azul foi causada por uma toxina produzida pelas cianobactérias, pela redução noturna do oxigênio dissolvido ou pela combinação dos dois fenômenos? Que evidências sustentam a conclusão e o que ainda precisaria ser investigado?",
          "placeholder": "Formule a tese conclusiva da equipe confrontando todas as evidências analisadas...",
          "expectedHint": "A mortandade foi provocada primariamente pela asfixia aguda por anóxia noturna combinada com a toxicidade das microcistinas. A evidência sustentadora chave é o horário das mortes (madrugada com 0,8 mg/L de OD), confirmada pela presença de microcistina e muco branquial."
        }
      ],
      "phaseNumber": 8,
      "docsInvolved": [
        "doc-212"
      ],
      "fichas": [
        "Laudo 12"
      ],
      "goal": "Integração analítica por LC-MS/MS e redação oficial do Parecer Técnico Pericial."
    },
    {
      "id": "phase-209",
      "lessonNumber": 9,
      "lessonTitle": "Aula 9: Apresentação Pericial, Defesa Científica e Autoavaliação",
      "title": "Conferência Científica & Avaliação Formativa",
      "focus": "Apresentação oral, argumentação fundamentada e metacognição",
      "duration": "45 min",
      "documentRefs": [
        "doc-201",
        "doc-212"
      ],
      "badge": "Etapa 9: Defesa & Rubrica",
      "expectedProduct": "Defesa científica oral perante a turma e autoavaliação formativa de competências",
      "questions": [
        {
          "id": "p9_q1_d2",
          "type": "textarea",
          "label": "1. Apresentação Pericial e Defesa Oral: Sintetize o discurso de 3 minutos da sua equipe para convencer a comunidade e as autoridades sobre as causas reais do evento no Lago Azul, refutando com argumentos técnicos os boatos sobre Karenia brevis.",
          "placeholder": "Escreva a fala de abertura da equipe defendendo a verdade científica com base nos laudos...",
          "expectedHint": "O discurso deve explicar que o lago sofreu eutrofização por esgoto e lavouras, gerando cianobactérias de água doce que esgotaram o oxigênio na madrugada, desmentindo categoricamente a hipótese de dinoflagelados marinhos."
        },
        {
          "id": "p9_q2_d2",
          "type": "checklist",
          "label": "2. Rubrica de Autoavaliação e Competências da 1ª Série do Ensino Médio (BNCC):",
          "options": [
            "Diferenciei conceitos de eutrofização, cianobactérias, microalgas e anóxia noturna",
            "Compreendi o paradoxo nictemeral do oxigênio dissolvido (supersaturação diurna vs anóxia noturna)",
            "Diferenciei cianobactérias límnicas de água doce de marés vermelhas marinhas por dinoflagelados",
            "Avaliei os laudos toxicológicos de microcistina sem aceitar conclusões precipitadas de causa única",
            "Identifiquei as estruturas de colônias e filamentos com heterócitos no microscópio",
            "Construí a sequência do Modelo Causal de 6 etapas interligando a bacia ao lago",
            "Redigi o Parecer Técnico Pericial cumprindo os 8 itens obrigatórios com rigor científico",
            "Colaborei ativamente, ouvindo e respeitando os argumentos dos meus colegas de equipe"
          ]
        },
        {
          "id": "p9_q3_d2",
          "type": "textarea",
          "label": "3. Reflexão Metacognitiva Final: Por que o controle da poluição hídrica e das florações de cianobactérias exige gestão integrada de toda a bacia hidrográfica e não intervenções isoladas no espelho de água?",
          "placeholder": "Conclua sobre a interconexão de rios, cidades, lavouras e reservatórios...",
          "expectedHint": "Porque o lago é o receptor final de tudo o que ocorre na bacia hidrográfica: de nada adianta aplicar saneantes no espelho de água se as nascentes e afluentes continuarem recebendo esgoto e enxurradas com fertilizantes. A gestão ecológica deve ser sistêmica."
        }
      ],
      "phaseNumber": 9,
      "docsInvolved": [
        "doc-201",
        "doc-212"
      ],
      "fichas": [
        "Parecer Técnico",
        "Rubrica"
      ],
      "goal": "Apresentação oral para a turma e rubrica formativa de autoavaliação."
    }
  ],
  "slides": [
    {
      "id": "slide_d4_1",
      "code": "LÂMINA D4-01",
      "title": "Lâmina D4-01: Fitoplâncton do Lago Azul (Colônias de Microcystis aeruginosa)",
      "location": "Lago Azul - Enseada da Floração (Mancha Superficial)",
      "category": "Arquivo Técnico Límnico",
      "src": "assets/slides/colonia_microcystis.jfif",
      "thumb": "assets/slides/colonia_microcystis.jfif",
      "count": "85.000 células/mL (Dominância de cianobactérias)",
      "typeText": "Colônias esféricas em matriz mucilaginosa amorfa",
      "description": "Amostra límnica colhida na camada superficial verde-azulada do Lago Azul. A microscopia óptica revela densas colônias arredondadas de Microcystis aeruginosa imersas em matriz mucilaginosa com aerótopos (vesículas gasosas para controle de flutuabilidade).",
      "scaleMicronsPerPixel": 0.15,
      "uvFluorescence": true
    },
    {
      "id": "slide_d4_2",
      "code": "LÂMINA D4-02",
      "title": "Lâmina D4-02: Ictiopatologia Branquial (Fusão Lamelar & Asfixia Aguda)",
      "location": "Laboratório de Ecotoxicologia e Necrópsia Ictiológica",
      "category": "Arquivo Técnico Histopatológico",
      "src": "assets/slides/lamina_d2_02_ictiopatologia.jfif",
      "thumb": "assets/slides/lamina_d2_02_ictiopatologia.jfif",
      "count": "Corte Histológico Branquial (H&E, 400x)",
      "typeText": "Hiperplasia epitelial, fusão de lamelas respiratórias e hipersecreção de muco",
      "description": "Lâmina histológica do tecido branquial de espécimes de peixes recolhidos mortos na madrugada no Lago Azul. Apresenta colapso e fusão lamelar severa, compatível com asfixia aguda por anóxia noturna (oxigênio dissolvido em 0,8 mg/L) e estresse tóxico/mecânico por biomassa algal.",
      "scaleMicronsPerPixel": 0.15,
      "uvFluorescence": true
    },
    {
      "id": "slide_d4_3",
      "code": "LÂMINA D4-03",
      "title": "Lâmina D4-03: Perfil Citomorfológico das Fontes da Bacia",
      "location": "Bacia Hidrográfica do Lago Azul - Pontos de Vistoria de Campo",
      "category": "Arquivo Técnico Citomorfológico",
      "src": "assets/slides/citomorfologico_perfil.jfif",
      "thumb": "assets/slides/citomorfologico_perfil.jfif",
      "count": "Triagem Citomorfológica Comparativa",
      "typeText": "Perfil morfológico e caracterização ambiental das amostras",
      "description": "Lâmina pericial com perfil citomorfológico comparativo das amostragens coletadas na bacia hidrográfica, permitindo aos pesquisadores correlacionar as partículas, nutrientes e microrganismos às três fontes antrópicas suspeitas da vistoria.",
      "scaleMicronsPerPixel": 0.15,
      "uvFluorescence": true
    }
  ],
  "evidenceMatrix": {
    "verdadeiras": [
      "Fósforo elevado próximo ao canal: indica enriquecimento localizado, não identifica a fonte.",
      "Temperatura elevada e água parada: condições favoráveis, não causas únicas.",
      "Colônias semelhantes a Microcystis: identificação preliminar.",
      "Microcistina detectada: evidencia toxina, mas não prova causa da mortandade.",
      "Oxigênio muito baixo de madrugada: evidência importante para hipóxia/anóxia.",
      "Matéria orgânica acumulada: decomposição pode consumir oxigênio.",
      "Oxigênio elevado à tarde: não exclui queda noturna."
    ],
    "falsas_ou_sem_sustentacao": [
      "Aves trouxeram Karenia brevis do mar e causaram a floração no lago.",
      "Toda floração verde produz microcistina.",
      "Fósforo elevado comprova contaminação agrícola.",
      "Microcistina detectada prova que ela matou os peixes.",
      "Fotografia de maré vermelha marinha representa o Lago Azul."
    ],
    "distrator_recomendado": "Apresentar somente o valor elevado de oxigênio das 14h e perguntar se isso descarta a anóxia noturna."
  },
  "teacherGuide": {
    "title": "Orientações Pedagógicas e Científicas para o Docente • Desafio 02: Floração Vermelha em Vale Verde",
    "warning": "Conteúdo restrito ao docente: orientações didáticas, BNCC, armadilhas conceituais e gabarito científico integrador.",
    "pedagogicalGoals": [
      "Alinhamento com a BNCC da 1ª Série do Ensino Médio: Habilidades EM13CNT101, EM13CNT206, EM13CNT301 e EM13CNT303.",
      "Investigar as causas e consequências da floração límnica, articulando nutrientes, proliferação celular, cianotoxinas e ciclo diário do oxigênio.",
      "Diferenciar floração de cianobactérias em água doce de marés vermelhas marinhas por dinoflagelados.",
      "Compreender o paradoxo nictemeral do oxigênio: supersaturação diurna pela fotossíntese vs hipóxia/anóxia noturna severa.",
      "Trabalhar com pensamento crítico: separar observações empíricas, dados laboratoriais, notícias distratoras e hipóteses causais.",
      "Capacitar os estudantes na elaboração de um Parecer Técnico Pericial fundamentado em evidências científicas."
    ],
    "scientificGuidelines": [
      "Não usar maré vermelha como sinônimo automático de floração de cianobactérias em água doce.",
      "Nem toda floração é tóxica e nem toda linhagem de uma espécie potencialmente produtora produz toxinas.",
      "A presença de microcistina não prova, por si só, que a toxina causou a mortandade.",
      "Um valor alto de oxigênio durante a tarde não exclui hipóxia ou anóxia durante a madrugada.",
      "Separar evidências observacionais, resultados analíticos, interpretações e hipóteses causais.",
      "Manter os laudos 7 e 8 em aulas diferentes para exigir revisão das hipóteses pelos grupos.",
      "Imagens ilustrativas não devem ser tratadas como fotografias reais das amostras nem como identificação taxonômica definitiva."
    ],
    "references": [
      {
        "instituicao": "OMS",
        "tema": "Cianobactérias planctônicas de água doce e toxinas"
      },
      {
        "instituicao": "EPA",
        "tema": "Cianobactérias, florações e cianotoxinas"
      },
      {
        "instituicao": "EPA",
        "tema": "Nutrientes, temperatura, luz e circulação como fatores de florações"
      },
      {
        "instituicao": "NOAA",
        "tema": "Florações nocivas e marés vermelhas marinhas"
      },
      {
        "instituicao": "IMA/SC",
        "tema": "Nota Técnica Conjunta nº 001/2024 sobre floração de Karenia no litoral catarinense"
      },
      {
        "instituicao": "ANA",
        "tema": "Parâmetros de qualidade da água, oxigênio dissolvido e eutrofização"
      },
      {
        "bases_de_imagens": [
          "AlgaeBase — https://www.algaebase.org/",
          "GBIF — https://www.gbif.org/"
        ]
      }
    ],
    "timelinePacing": [
      {
        "week": "Aula 1",
        "focus": "Apresentação do evento e análise dos laudos 1 e 2 (Produto: Hipóteses iniciais)"
      },
      {
        "week": "Aula 2",
        "focus": "Análise de nutrientes e fontes — laudos 3 e 4 (Produto: Mapa de fontes possíveis)"
      },
      {
        "week": "Aula 3",
        "focus": "Microscopia e identificação — laudos 5 e 6 (Produto: Quadro comparativo de espécies)"
      },
      {
        "week": "Aula 4",
        "focus": "Investigação de cianotoxinas — laudo 7 (Produto: Explicação sobre microcistina)"
      },
      {
        "week": "Aula 5",
        "focus": "Interpretação do oxigênio dissolvido — laudo 8 (Produto: Gráfico e explicação do ciclo diário)"
      },
      {
        "week": "Aula 6",
        "focus": "Mortandade e notícia falsa — laudos 9 e 10 (Produto: Análise crítica das evidências)"
      },
      {
        "week": "Aula 7",
        "focus": "Sedimentos e decomposição — laudo 11 (Produto: Modelo explicativo)"
      },
      {
        "week": "Aula 8",
        "focus": "Integração e laudo final — documento 12 (Produto: Parecer técnico)"
      },
      {
        "week": "Aula 9",
        "focus": "Apresentação e avaliação (Produto: Defesa científica das conclusões)"
      }
    ],
    "answerKey": {
      "industrialResponsibility": "Diferentemente do Desafio 01 (microplásticos industriais), no Desafio 02 a contaminação decorre de nutrientes (nitrogênio e fósforo) provenientes da bacia hidrográfica, com destaque para a proximidade com o canal, esgoto residencial, fertilizantes e dejetos, além de matéria orgânica de fundo.",
      "correlationVsCausality": "A presença de 2,4 µg/L de microcistina demonstra que houve produção de toxina, mas não prova isoladamente que ela foi a causa exclusiva da mortandade. A queda crítica do oxigênio dissolvido para 0,8 mg/L na madrugada aponta para hipóxia/anóxia severa como fator letal determinante, podendo ter havido sinergismo entre os dois fatores.",
      "biomagnificationDistinction": "A alegação de maré vermelha por dinoflagelados marinhos (Karenia brevis) é uma notícia sem sustentação: organismos marinhos não proliferam em corpos de água doce límnicos, e as cianobactérias encontradas (Microcystis e Dolichospermum) são procariontes de água doce."
    }
  }
};

const DESAFIO_02_DATA = DESAFIO_04_DATA;

const CHALLENGES_DATABASE = {
  'desafio-1': DESAFIO_01_DATA,
  'desafio-2': DESAFIO_04_DATA,
  'desafio-4': DESAFIO_04_DATA
};

// Por padrão, BIO_DATA inicializa com o Desafio 1 (100% de compatibilidade)
var BIO_DATA = DESAFIO_01_DATA;

function setActiveChallenge(challengeId) {
  if (CHALLENGES_DATABASE && CHALLENGES_DATABASE[challengeId]) {
    BIO_DATA = CHALLENGES_DATABASE[challengeId];
    if (typeof window !== 'undefined') {
      window.BIO_DATA = BIO_DATA;
    }
  }
  return BIO_DATA;
}

// Disponibilizar no escopo global do navegador
if (typeof window !== 'undefined') {
  window.DESAFIO_01_DATA = DESAFIO_01_DATA;
  window.DESAFIO_02_DATA = DESAFIO_02_DATA;
  window.DESAFIO_04_DATA = DESAFIO_04_DATA;
  window.CHALLENGES_DATABASE = CHALLENGES_DATABASE;
  window.BIO_DATA = BIO_DATA;
  window.setActiveChallenge = setActiveChallenge;
}

// Exportar para Node.js / testes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BIO_DATA;
  module.exports.CHALLENGES_DATABASE = CHALLENGES_DATABASE;
  module.exports.DESAFIO_01_DATA = DESAFIO_01_DATA;
  module.exports.DESAFIO_02_DATA = DESAFIO_02_DATA;
  module.exports.DESAFIO_04_DATA = DESAFIO_04_DATA;
  module.exports.setActiveChallenge = setActiveChallenge;
}
