// Banco de Dados do Desafio 1 e Configurações da Plataforma BioLab Explorer
const BIO_DATA = {
  challenge: {
    id: 'desafio-1',
    code: 'DESAFIO-01',
    title: 'O Mistério do Rio das Palmeiras',
    subtitle: 'Microplásticos, Fontes de Contaminação e Teias Alimentares',
    subject: 'Biologia & Ciências da Natureza',
    level: 'Ensino Médio / Anos Finais',
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
      imageSrc: 'assets/slides/doente.jfif',
      imageCaption: 'Corte histológico das vilosidades intestinais de espécime com sinais de atrito mecânico por micropartículas.',
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
    title: 'Orientações Pedagógicas para o Docente',
    warning: 'Este conteúdo contém diretrizes didáticas e o gabarito orientador. Mantenha em modo restrito aos estudantes.',
    pedagogicalGoals: [
      'Desenvolver o letramento científico e o pensamento crítico na leitura de mídias e relatórios.',
      'Diferenciar empiricamente os conceitos de correlação, proximidade e causalidade.',
      'Capacitar os alunos a lidar com incertezas e limitações dos dados (ex: ausência de FTIR).',
      'Compreender os mecanismos de bioacumulação e a dinâmica de contaminantes em teias alimentares.',
      'Estimular a argumentação baseada em evidências (evitar juízos morais prévios sobre os agentes sociais).'
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

// Exportar globalmente
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BIO_DATA;
}
