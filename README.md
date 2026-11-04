# 🔬 BioLafa — Estação de Investigação Científica Escolar

> **Ambiente Interativo de Aprendizagem Baseada em Problemas (PBL)** desenvolvido para simular a atuação de uma equipe de pesquisadores e cientistas ambientais do Ensino Médio.

---

## 🎯 Desafio 1: O Mistério do Rio das Palmeiras
**Microplásticos, Fontes de Contaminação e Teias Alimentares**
* **Componente Curricular:** Biologia / Ciências da Natureza
* **Metodologia:** PBL (*Problem-Based Learning*)
* **Carga Horária:** 9 aulas de 45 minutos (ou ritmo flexível)
* **Equipe de Pesquisadores:** 4 papéis colaborativos (Investigador Principal, Especialista em Microscopia, Analista de Dados & Gráficos, Relator & Redator Científico)

---

## 🌟 Principais Módulos do Aplicativo

### 1. 🎯 Centro de Missões & Desafios
* Hub de desafios científicos com arquitetura modular.
* **Desafio 1 (Ativo)** com barra de progresso individual da equipe.
* Espaço reservado para expansão com novos desafios (ex: *Eutrofização & Cianobactérias*, *Resistência Antimicrobiana em Efluentes*).

### 2. 🔬 Microscópio Virtual de Alta Resolução
* **Óptica Realista:** Objetivas 4x (varredura), 10x (médio alcance), 40x (grande aumento) e 100x (imersão em óleo).
* **Foco Real:** Botões macrométrico e micrométrico com simulação de desfoque gaussiano óptico e indicador de "Foco Nítido".
* **Navegação na Platina:** Controle de arrasto X/Y do campo de visão.
* **Filtros de Luz:** Campo Claro, Contraste de Fase e Fluorescência UV (ressalta polímeros plásticos).
* **Régua Micrométrica Calibrada:** Ferramenta interativa de medição de partículas diretamente em micrômetros ($\mu m$).
* **Fotomicrografias:** Captura de fotos da lâmina com anotações de campo integradas ao relatório final.
* **12 Lâminas Preparadas:** Pontos fluviais A a E, tratos digestórios de lambaris e traíras, zooplâncton (*Daphnia*), microalgas e cortes histológicos de vilosidades intestinais.

### 3. 📖 Caderno Digital de Investigação (As 9 Aulas & 11 Fichas)
* **Aula 1 (Fichas 1 e 2):** Abertura do caso, leitura dos recortes de jornais de 2018 e formulação de Hipóteses A e B sem viés.
* **Aula 2 (Ficha 3):** Esgoto doméstico clandestino e liberação de microfibras na lavagem mecânica de roupas.
* **Aula 3 (Ficha 4):** Tráfego na Rodovia dos Ipês, desgaste de pneus e descarte de petrechos de pesca.
* **Aula 4 (Ficha 5):** Análise quantitativa do Boletim Técnico (Pontos A a E) e gerador de gráfico de barras interativo.
* **Aula 5 (Ficha 6):** Análise microscópica das partículas e diferenciação crítica entre ingestão e biomagnificação trófica.
* **Aula 6 (Ficha 7):** Transporte hídrico, decantação no Lago Azul e atividade de modelagem.
* **Aula 7 (Ficha 8):** Eficácia da ultrafiltração industrial (cálculo de 53,2% de redução no Ponto C) e preenchimento da Matriz de Evidências (Favorece / Enfraquece / Inconclusivo).
* **Aula 8 (Ficha 9):** Redação da conclusão científica baseada em dados e formulação da proposta de intervenção comunitária.
* **Aula 9 (Fichas 10 e 11):** Simpósio científico entre equipes e rubrica individual de autoavaliação metacognitiva.

### 4. 🗺️ Mapa Cartográfico Interativo da Bacia
* Desenho cartográfico vetorial com a nascente, área urbana residencial, Fábrica Têxtil Aurora, Rodovia dos Ipês e o Lago Azul.
* Clique nos pontos de monitoramento para abrir o dossiê da estação com dados de contagem e atalho direto para a lâmina no microscópio.

### 5. 📊 Simulador de Teia Trófica & Dinâmica de Poluentes
* Modelagem computacional da cadeia alimentar:
  $$\text{Algas} \longrightarrow \text{Zooplâncton} \longrightarrow \text{Peixe Pequeno} \longrightarrow \text{Peixe Predador}$$
* Slider dinâmico de taxa de emissão de resíduos (30% a 300%) e comparação entre Cenário A (Inicial) e Cenário B (Carga Elevada).
* Alerta pedagógico sobre a diferença entre modelos matemáticos simplificados e a fisiologia animal real.

### 6. 🎓 Painel do Professor / Modo Docente
* Gabarito orientador completo de todas as 9 aulas.
* Orientações pedagógicas para condução do PBL sem antecipar respostas.
* Salvamento automático no navegador (`localStorage`) e exportação do **Relatório Científico Oficial** em formato PDF ou impresso.

---

## 🚀 Como Executar o Aplicativo

### Opção 1: Direto no Navegador (Sem Instalação)
Basta dar dois cliques no arquivo:
```
abrir_direto_no_navegador.bat
```
Ou abrir o arquivo `public/index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

### Opção 2: Servidor Local (Node.js)
Dê dois cliques no arquivo:
```
iniciar_servidor.bat
```
Ou execute via terminal:
```bash
node server.js
```
E acesse no navegador: [http://localhost:3000](http://localhost:3000)
