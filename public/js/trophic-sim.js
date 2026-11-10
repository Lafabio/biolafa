// Simulador Didático de Dinâmica Ambiental:
// - Desafio 01: Dinâmica Trófica e Bioacumulação de Microplásticos (Rio das Palmeiras)
// - Desafio 02: Eutrofização, Cianobactérias Tóxicas e Ciclo Nictemeral de Oxigênio (Lago Azul)
class TrophicSimulator {
  
  // ==========================================
  // TEIA ALIMENTAR INTERATIVA • DESAFIO 02 (PROJETO ÉDEN)
  // ==========================================
  initEdenState() {
    if (this.edenInitialized) return;
    this.edenMode = 'original'; // 'original' (Equilíbrio Pré-Invasão) ou 'bioinvasao' (Pós-Invasão)
    this.edenSelectedOrganism = 'lumivora';
    this.edenLumivoraBiomass = 100; // %
    this.edenNexovoraLoad = 0;      // 0 a 1500
    this.edenVeyrathus = false;     // bool
    this.edenActiveChallenge = 1;   // 1 a 4
    this.edenInitialized = true;
  }

  setEdenMode(mode) {
    this.initEdenState();
    this.edenMode = mode;
    if (mode === 'original') {
      this.edenLumivoraBiomass = 100;
      this.edenNexovoraLoad = 0;
      this.edenVeyrathus = false;
    } else {
      this.edenLumivoraBiomass = 28;
      this.edenNexovoraLoad = 1250;
    }
    this.render();
  }

  selectEdenOrganism(id) {
    this.initEdenState();
    this.edenSelectedOrganism = id;
    this.render();
  }

  setEdenSlider(key, val) {
    this.initEdenState();
    if (key === 'lumivora') this.edenLumivoraBiomass = parseInt(val, 10);
    if (key === 'nexovora') this.edenNexovoraLoad = parseInt(val, 10);
    this.render();
  }

  toggleEdenVeyrathus() {
    this.initEdenState();
    this.edenVeyrathus = !this.edenVeyrathus;
    this.render();
  }

  setEdenChallenge(chIdx) {
    this.initEdenState();
    this.edenActiveChallenge = chIdx;
    this.render();
  }

  calculateEdenPopulations() {
    this.initEdenState();
    const isOriginal = (this.edenMode === 'original');
    if (isOriginal) {
      return {
        lumivora: { pop: 1000, delta: 0, status: 'Equilíbrio Estável (Base Trófica)', role: 'Produtor Primário' },
        virex: { pop: 420, delta: 0, status: 'Equilíbrio Estável', role: 'Consumidor Primário (Herbívoro)' },
        thalor: { pop: 120, delta: 0, status: 'População Monitorada', role: 'Grande Herbívoro' },
        aerion: { pop: 180, delta: 0, status: 'Polinização Ativa', role: 'Polinizador & Dispersor' },
        drakon: { pop: 65, delta: 0, status: 'Regulação Normal', role: 'Predador de Topo' },
        mycora: { pop: 300, delta: 0, status: 'Ciclagem Normal', role: 'Decompositor' },
        nexovora: { pop: 0, delta: 0, status: 'Ausente (Biogeograficamente Isolado)', role: 'Exótica Invasora' },
        veyrathus: { pop: 0, delta: 0, status: 'Restrito ao Pântano de Veyra', role: 'Consumidor Especializado' }
      };
    }

    // Modo Bioinvasão Dinâmico
    const nexovoraEffect = Math.min(0.85, (this.edenNexovoraLoad / 1500) * 0.85);
    const lumivoraPop = Math.max(20, Math.round(1000 * (this.edenLumivoraBiomass / 100) * (1 - nexovoraEffect)));
    const lumivoraRatio = lumivoraPop / 1000;

    const veyrathusImpactOnNatives = this.edenVeyrathus ? 0.25 : 0;
    const virexPop = Math.max(10, Math.round(420 * Math.pow(lumivoraRatio, 1.1) * (1 - veyrathusImpactOnNatives)));
    const thalorPop = Math.max(8, Math.round(120 * lumivoraRatio));
    const aerionPop = Math.max(5, Math.round(180 * Math.pow(lumivoraRatio, 1.1) * (1 - veyrathusImpactOnNatives)));

    const preyRatio = (virexPop + aerionPop) / (420 + 180);
    const drakonPop = Math.max(4, Math.round(65 * Math.pow(preyRatio, 1.25)));

    const deadBiomass = (1000 - lumivoraPop) + (420 - virexPop) + (180 - aerionPop);
    const mycoraPop = Math.round(300 + (deadBiomass * 0.22));

    const nexovoraEffective = Math.max(0, this.edenNexovoraLoad - (this.edenVeyrathus ? 320 : 0));
    const veyrathusPop = this.edenVeyrathus ? 500 : 0;

    return {
      lumivora: { pop: lumivoraPop, delta: Math.round(((lumivoraPop - 1000) / 1000) * 100), status: lumivoraPop < 400 ? 'Sufocamento Severo (Exclusão)' : 'Sob Pressão Competitiva', role: 'Produtor Primário' },
      virex: { pop: virexPop, delta: Math.round(((virexPop - 420) / 420) * 100), status: virexPop < 150 ? 'Inanição Crítica' : 'Declínio Trófico', role: 'Consumidor Primário (Herbívoro)' },
      thalor: { pop: thalorPop, delta: Math.round(((thalorPop - 120) / 120) * 100), status: thalorPop < 50 ? 'Escassez de Pasto' : 'Sob Estresse', role: 'Grande Herbívoro' },
      aerion: { pop: aerionPop, delta: Math.round(((aerionPop - 180) / 180) * 100), status: aerionPop < 60 ? 'Perda de Florescência/Néctar' : 'Declínio Acentuado', role: 'Polinizador & Dispersor' },
      drakon: { pop: drakonPop, delta: Math.round(((drakonPop - 65) / 65) * 100), status: drakonPop < 30 ? 'Inanição Trófica de Topo' : 'Escassez de Presas', role: 'Predador de Topo' },
      mycora: { pop: mycoraPop, delta: Math.round(((mycoraPop - 300) / 300) * 100), status: 'Expansão por Necromassa', role: 'Decompositor' },
      nexovora: { pop: nexovoraEffective, delta: '+100%', status: this.edenVeyrathus ? 'Contenção Parcial (Predação de Propágulos)' : 'Biofilme Exponencial Agressivo', role: 'Bioinvasora Exótica' },
      veyrathus: { pop: veyrathusPop, delta: this.edenVeyrathus ? 'Soltura Experimental' : 'Ausente', status: this.edenVeyrathus ? 'Risco Crítico: Predação Não-Alvo' : 'Em Quarentena em Veyra', role: 'Consumidor Especializado' }
    };
  }

  renderDesafio2Eden() {
    this.initEdenState();
    const pops = this.calculateEdenPopulations();
    const isOriginal = (this.edenMode === 'original');
    const selectedOrgId = this.edenSelectedOrganism;

    const orgData = {
      lumivora: {
        name: 'Lumivora',
        level: 'Produtor Primário',
        img: 'assets/eden/07_organismo_lumivora.png',
        desc: 'Base energética da Floresta Cristalina. Produz matéria orgânica fotossintetizante sobre rochas e quartzo luminescente.',
        eats: 'Nutrientes Minerais reciclados por Mycora + Luz Solar',
        eatenBy: 'Virex (herbivoria), Thalor (biomassa foliar), Aerion (néctar/pólen)',
        interactsWith: 'Compete com Nexovora por espaço de ancoragem e luz solar (Gause). Mutualismo potencial com Aerion.',
        color: '#10b981'
      },
      virex: {
        name: 'Virex',
        level: 'Consumidor Primário (Herbívoro)',
        img: 'assets/eden/08_organismo_virex.png',
        desc: 'Herbívoro de pequeno porte altamente especializado em tecidos tenros de Lumivora. Não digere o biofilme de sílica de Nexovora.',
        eats: 'Lumivora',
        eatenBy: 'Drakon (predador de topo)',
        interactsWith: 'Sofre inanição direta quando Lumivora é excluída.',
        color: '#3b82f6'
      },
      thalor: {
        name: 'Thalor',
        level: 'Grande Herbívoro',
        img: 'assets/eden/11_organismo_thalor.png',
        desc: 'Herbívoro de grande biomassa que pasteja estrato vegetal e realiza bioturbação de nutrientes no solo da floresta.',
        eats: 'Biomassa vegetal de Lumivora',
        eatenBy: 'Drakon juvenil (ocasionalmente) / Carcaça decompõe via Mycora',
        interactsWith: 'Dispersa propágulos vegetais e recicla matéria orgânica.',
        color: '#8b5cf6'
      },
      aerion: {
        name: 'Aerion',
        level: 'Polinizador & Dispersor',
        img: 'assets/eden/09_organismo_aerion.png',
        desc: 'Organismo voador que utiliza recursos reprodutivos (néctar e estruturas polínicas) de Lumivora, promovendo polinização cruzada.',
        eats: 'Néctar e exudatos reprodutivos de Lumivora',
        eatenBy: 'Drakon (predação aérea oportunista)',
        interactsWith: 'Relação de provável mutualismo com Lumivora.',
        color: '#06b6d4'
      },
      drakon: {
        name: 'Drakon',
        level: 'Consumidor Terciário (Predador Topo)',
        img: 'assets/eden/10_organismo_drakon.png',
        desc: 'Predador de topo carnívoro responsável pelo controle demográfico de consumidores herbívoros da Floresta Cristalina.',
        eats: 'Virex e Aerion (presas comprovadas)',
        eatenBy: 'Nenhum predador natural (Topo de cadeia) / Decompõe via Mycora',
        interactsWith: 'Sofre cascata trófica por escassez de presas quando Lumivora colapsa.',
        color: '#ef4444'
      },
      mycora: {
        name: 'Mycora',
        level: 'Decompositor',
        img: 'assets/eden/12_organismo_mycora.png',
        desc: 'Rede fúngico-bacteriana essencial para decompor carcaças, fezes e restos vegetais, devolvendo minerais solúveis ao solo.',
        eats: 'Matéria orgânica morta de todos os organismos',
        eatenBy: 'Libera nutrientes inorgânicos para Lumivora (Ciclagem da matéria)',
        interactsWith: 'Aumenta significativamente na bioinvasão devido ao excesso de necromassa.',
        color: '#f59e0b'
      },
      nexovora: {
        name: 'Nexovora rapidans',
        level: 'Bioinvasora Exótica',
        img: 'assets/eden/04_floresta_bioinvasao.png',
        desc: 'Organismo pantanoso pioneiro dotado de alta aderência mineral e cistos resistentes. Forma biofilmes sufocantes e libera substâncias inibidoras.',
        eats: 'Minerais brutos de quartzo + Radiação livre',
        eatenBy: 'Veyrathus (consome estruturas reprodutivas no pântano)',
        interactsWith: 'Exclusão competitiva direta de Lumivora por espaço e luz solar.',
        color: '#f43f5e'
      },
      veyrathus: {
        name: 'Veyrathus',
        level: 'Consumidor Especializado (Pântano)',
        img: 'assets/eden/13_organismo_veyrathus.png',
        desc: 'Invertebrado raspador do Pântano de Veyra proposto para controle biológico de Nexovora.',
        eats: 'Estruturas reprodutivas de Nexovora (no pântano) e brotos tenros / ovos nativos (na floresta)',
        eatenBy: 'Predadores aquáticos do pântano (ausentes na Floresta Cristalina)',
        interactsWith: 'Risco crítico de predação não-alvo sobre a fauna nativa remanescente.',
        color: '#d97706'
      }
    };

    const sel = orgData[selectedOrgId] || orgData.lumivora;
    const selPop = pops[selectedOrgId] || { pop: 0, delta: 0, status: '' };

    this.container.innerHTML = `
      <div class="trophic-sim-card border border-cyan-500/40 bg-slate-950 p-6 rounded-2xl shadow-2xl">
        <!-- HEADER DA TEIA TRÓFICA DE NÉBULA-7 -->
        <div class="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-slate-800 pb-5">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge-tag-cyan bg-cyan-950/80 text-cyan-300 border-cyan-500/40">🪐 NÉBULA-7 • DESAFIO 02</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${isOriginal ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse'}">
                ${isOriginal ? '● EQUILÍBRIO ECOLÓGICO ORIGINAL' : '⚠️ PERTURBAÇÃO POR BIOINVASÃO ATIVA'}
              </span>
            </div>
            <h3 class="text-xl font-bold text-white flex items-center gap-2">
              <span>🕸️</span> Teia Alimentar Interativa da Floresta Cristalina
            </h3>
            <p class="text-xs text-slate-300 max-w-3xl leading-relaxed mt-1">
              Explore o fluxo de matéria e energia (alimento → consumidor), as relações ecológicas e os efeitos cascata provocados pela expansão de <em>Nexovora rapidans</em>.
            </p>
          </div>

          <!-- BOTÕES DE SELEÇÃO DE MODO -->
          <div class="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${isOriginal ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}"
              onclick="window.trophicSim.setEdenMode('original')">
              <span>🌱</span> Teia Original
            </button>
            <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${!isOriginal ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}"
              onclick="window.trophicSim.setEdenMode('bioinvasao')">
              <span>⚠️</span> Teia Pós-Bioinvasão
            </button>
          </div>
        </div>

        <!-- PAINEL PRINCIPAL: GRAFO DA TEIA + PAINEL LATERAL DE DETALHES -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <!-- COLUNA ESQUERDA: GRAFO INTERATIVO DA TEIA (8 COLS) -->
          <div class="lg:col-span-8 space-y-4">

            <!-- LEGENDA INTERATIVA DAS 3 DIMENSÕES -->
            <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center text-xs font-mono gap-2">
              <span class="text-slate-400">Dimensões da Teia:</span>
              <span class="flex items-center gap-1.5 text-emerald-400"><span class="w-3 h-0.5 bg-emerald-400"></span> Herbivoria</span>
              <span class="flex items-center gap-1.5 text-cyan-400"><span class="w-3 h-0.5 bg-cyan-400 border-b border-dashed"></span> Mutualismo</span>
              <span class="flex items-center gap-1.5 text-rose-400"><span class="w-3 h-0.5 bg-rose-400"></span> Predação</span>
              <span class="flex items-center gap-1.5 text-amber-400"><span class="w-3 h-0.5 bg-amber-400 border-b border-dotted"></span> Decomposição / Ciclagem</span>
              <span class="flex items-center gap-1.5 text-rose-500 font-bold"><span class="w-3 h-0.5 bg-rose-500 border-b border-dashed"></span> Competição (Invasão)</span>
            </div>

            <!-- TABULEIRO VISUAL DA TEIA COM CARDS EM CAMADAS TRÓFICAS -->
            <div class="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-6 overflow-hidden">

              <!-- CAMADA 4: PREDADOR DE TOPO -->
              <div class="flex justify-center mb-6">
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'drakon' ? 'border-red-400 bg-red-950/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center w-48"
                  onclick="window.trophicSim.selectEdenOrganism('drakon')">
                  <img src="assets/eden/10_organismo_drakon.png" alt="Drakon" class="w-14 h-14 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Drakon</div>
                  <div class="text-[10px] text-red-400 font-mono">Predador de Topo</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Pop: <span class="${pops.drakon.delta < 0 ? 'text-red-400' : 'text-emerald-400'}">${pops.drakon.pop}</span>
                    ${pops.drakon.delta !== 0 ? `<span class="text-[9px] text-red-400">(${pops.drakon.delta}%)</span>` : ''}
                  </div>
                </div>
              </div>

              <!-- SETAS INDICATIVAS PARA HERBÍVOROS -->
              <div class="flex justify-around text-center text-xs text-slate-500 font-mono mb-2">
                <span>▲ Predação (Consumo de Herbívoros) ▲</span>
              </div>

              <!-- CAMADA 3: CONSUMIDORES PRIMÁRIOS (HERBÍVOROS E POLINIZADORES) -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <!-- Virex -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'virex' ? 'border-blue-400 bg-blue-950/60 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('virex')">
                  <img src="assets/eden/08_organismo_virex.png" alt="Virex" class="w-12 h-12 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Virex</div>
                  <div class="text-[10px] text-blue-400 font-mono">Consumidor 1º</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Pop: <span class="${pops.virex.delta < 0 ? 'text-red-400' : 'text-emerald-400'}">${pops.virex.pop}</span>
                    ${pops.virex.delta !== 0 ? `<span class="text-[9px] text-red-400">(${pops.virex.delta}%)</span>` : ''}
                  </div>
                </div>

                <!-- Thalor -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'thalor' ? 'border-purple-400 bg-purple-950/60 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('thalor')">
                  <img src="assets/eden/11_organismo_thalor.png" alt="Thalor" class="w-12 h-12 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Thalor</div>
                  <div class="text-[10px] text-purple-400 font-mono">Grande Herbívoro</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Pop: <span class="${pops.thalor.delta < 0 ? 'text-red-400' : 'text-emerald-400'}">${pops.thalor.pop}</span>
                    ${pops.thalor.delta !== 0 ? `<span class="text-[9px] text-red-400">(${pops.thalor.delta}%)</span>` : ''}
                  </div>
                </div>

                <!-- Aerion -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'aerion' ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('aerion')">
                  <img src="assets/eden/09_organismo_aerion.png" alt="Aerion" class="w-12 h-12 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Aerion</div>
                  <div class="text-[10px] text-cyan-400 font-mono">Polinizador / Mutualista</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Pop: <span class="${pops.aerion.delta < 0 ? 'text-red-400' : 'text-emerald-400'}">${pops.aerion.pop}</span>
                    ${pops.aerion.delta !== 0 ? `<span class="text-[9px] text-red-400">(${pops.aerion.delta}%)</span>` : ''}
                  </div>
                </div>
              </div>

              <!-- SETAS INDICATIVAS PARA PRODUTOR -->
              <div class="flex justify-around text-center text-xs text-slate-500 font-mono mb-2">
                <span>▲ Herbivoria e Néctar (Fluxo de Energia do Produtor) ▲</span>
              </div>

              <!-- CAMADA 2: PRODUTOR PRIMÁRIO + BIOINVASOR -->
              <div class="grid grid-cols-2 gap-6 mb-6 p-4 rounded-xl ${isOriginal ? 'bg-emerald-950/20 border border-emerald-900/40' : 'bg-rose-950/30 border border-rose-900/50'}">
                <!-- Lumivora -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-4 rounded-xl border ${selectedOrgId === 'lumivora' ? 'border-emerald-400 bg-emerald-950/70 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-700 bg-slate-950/90'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('lumivora')">
                  <img src="assets/eden/07_organismo_lumivora.png" alt="Lumivora" class="w-16 h-16 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-sm">Lumivora</div>
                  <div class="text-[11px] text-emerald-400 font-mono font-bold">🌿 Produtor Primário (Base Trófica)</div>
                  <div class="text-xs font-mono font-bold mt-1 text-slate-200">
                    Biomassa: <span class="${pops.lumivora.delta < 0 ? 'text-red-400' : 'text-emerald-400'}">${pops.lumivora.pop}</span>
                    ${pops.lumivora.delta !== 0 ? `<span class="text-xs text-red-400">(${pops.lumivora.delta}%)</span>` : ''}
                  </div>
                </div>

                <!-- Nexovora rapidans -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-4 rounded-xl border ${selectedOrgId === 'nexovora' ? 'border-rose-400 bg-rose-950/70 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : (isOriginal ? 'border-slate-800 bg-slate-950/40 opacity-50' : 'border-rose-600/70 bg-rose-950/60')} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('nexovora')">
                  <img src="assets/eden/04_floresta_bioinvasao.png" alt="Nexovora" class="w-16 h-16 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-sm">Nexovora rapidans</div>
                  <div class="text-[11px] text-rose-400 font-mono font-bold">⚠️ Bioinvasora Exótica</div>
                  <div class="text-xs font-mono font-bold mt-1 text-slate-200">
                    Carga: <span class="text-rose-400">${pops.nexovora.pop}</span>
                    <span class="text-[10px] text-slate-400 block mt-0.5">${isOriginal ? 'Ausente no Pântano' : 'Competição por Espaço / Luz'}</span>
                  </div>
                </div>
              </div>

              <!-- CAMADA 1: DECOMPOSIÇÃO & CICLAGEM (MYCORA) + CONTROLE BIOLÓGICO (VEYRATHUS) -->
              <div class="grid grid-cols-2 gap-6">
                <!-- Mycora -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'mycora' ? 'border-amber-400 bg-amber-950/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('mycora')">
                  <img src="assets/eden/12_organismo_mycora.png" alt="Mycora" class="w-12 h-12 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Mycora (Decompositor)</div>
                  <div class="text-[10px] text-amber-400 font-mono">Ciclagem de Nutrientes Minerais ➔ Lumivora</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Pop: <span class="text-amber-400">${pops.mycora.pop}</span>
                    ${pops.mycora.delta !== 0 ? `<span class="text-[10px] text-emerald-400">(+${pops.mycora.delta}%)</span>` : ''}
                  </div>
                </div>

                <!-- Veyrathus -->
                <div class="cursor-pointer transition-transform hover:scale-105 p-3 rounded-xl border ${selectedOrgId === 'veyrathus' ? 'border-orange-400 bg-orange-950/60 shadow-[0_0_15px_rgba(217,119,6,0.3)]' : 'border-slate-700 bg-slate-950/80'} text-center"
                  onclick="window.trophicSim.selectEdenOrganism('veyrathus')">
                  <img src="assets/eden/13_organismo_veyrathus.png" alt="Veyrathus" class="w-12 h-12 mx-auto rounded-lg object-cover mb-2 border border-slate-700">
                  <div class="font-bold text-white text-xs">Veyrathus (Agente de Controle)</div>
                  <div class="text-[10px] text-orange-400 font-mono">${this.edenVeyrathus ? 'Soltura Experimental (Risco Não-Alvo)' : 'Em Quarentena no Pântano'}</div>
                  <div class="text-[11px] font-mono font-bold mt-1 text-slate-200">
                    Status: <span class="${this.edenVeyrathus ? 'text-amber-400' : 'text-slate-400'}">${this.edenVeyrathus ? 'Ativo na Floresta (500)' : 'Não Introduzido'}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CONTROLES EXPERIMENTAIS DE PERTURBAÇÃO TRÓFICA -->
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <span>🧪</span> Laboratório de Simulação: Perturbações em Tempo Real
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-300">Biomassa de Lumivora:</span>
                    <strong class="text-emerald-400">${this.edenLumivoraBiomass}%</strong>
                  </div>
                  <input type="range" min="0" max="150" value="${this.edenLumivoraBiomass}" class="w-full accent-emerald-500"
                    oninput="window.trophicSim.setEdenSlider('lumivora', this.value)">
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-300">Biofilme de Nexovora:</span>
                    <strong class="text-rose-400">${this.edenNexovoraLoad} un.</strong>
                  </div>
                  <input type="range" min="0" max="1500" step="50" value="${this.edenNexovoraLoad}" class="w-full accent-rose-500"
                    oninput="window.trophicSim.setEdenSlider('nexovora', this.value)">
                </div>

                <div class="flex flex-col justify-end">
                  <button class="w-full py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${this.edenVeyrathus ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'}"
                    onclick="window.trophicSim.toggleEdenVeyrathus()">
                    <span>${this.edenVeyrathus ? '⚠️' : '🧪'}</span> ${this.edenVeyrathus ? 'Veyrathus Solto (Desativar)' : 'Testar Soltura de Veyrathus'}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- COLUNA DIREITA: DOSSIÊ ECOLÓGICO DO ORGANISMO SELECIONADO & DESAFIOS (4 COLS) -->
          <div class="lg:col-span-4 space-y-4">

            <!-- CARD DE DETALHES DO ORGANISMO SELECIONADO -->
            <div class="p-5 bg-slate-900 rounded-2xl border border-slate-700 shadow-xl">
              <div class="flex items-center gap-3 mb-3 border-b border-slate-800 pb-3">
                <img src="${sel.img}" alt="${sel.name}" class="w-14 h-14 rounded-xl object-cover border border-cyan-500/40">
                <div>
                  <h4 class="font-bold text-white text-base">${sel.name}</h4>
                  <span class="text-xs font-mono font-bold" style="color: ${sel.color}">${sel.level}</span>
                </div>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                ${sel.desc}
              </p>

              <!-- TELEMETRIA POPULACIONAL NO CENÁRIO ATIVO -->
              <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-4 font-mono text-xs">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-slate-400">População Simulada:</span>
                  <strong class="text-base text-white">${selPop.pop} un.</strong>
                </div>
                <div class="flex justify-between items-center text-[11px]">
                  <span class="text-slate-400">Impacto da Bioinvasão:</span>
                  <span class="${selPop.delta < 0 ? 'text-red-400 font-bold' : (selPop.delta > 0 ? 'text-emerald-400 font-bold' : 'text-slate-300')}">
                    ${selPop.delta > 0 ? '+' : ''}${selPop.delta}%
                  </span>
                </div>
                <div class="text-[10px] text-cyan-300 mt-1 border-t border-slate-800/80 pt-1">
                  Status: ${selPop.status}
                </div>
              </div>

              <!-- RELAÇÕES ECOLÓGICAS DIRETAS -->
              <div class="space-y-2 text-xs">
                <div class="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <strong class="text-cyan-400 block mb-0.5">🌾 De quem se alimenta (Entrada):</strong>
                  <span class="text-slate-300">${sel.eats}</span>
                </div>
                <div class="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <strong class="text-emerald-400 block mb-0.5">🍽️ Quem o consome (Saída):</strong>
                  <span class="text-slate-300">${sel.eatenBy}</span>
                </div>
                <div class="p-2 rounded bg-slate-950/60 border border-slate-800">
                  <strong class="text-amber-400 block mb-0.5">⚡ Interação Ecológica Chave:</strong>
                  <span class="text-slate-300">${sel.interactsWith}</span>
                </div>
              </div>
            </div>

            <!-- OS 4 DESAFIOS PEDAGÓGICOS DA TEIA -->
            <div class="p-5 bg-slate-900 rounded-2xl border border-cyan-500/30">
              <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                <span>🎯</span> Os 4 Desafios Investigativos da Teia
              </h4>
              <div class="space-y-2 text-xs">
                <div class="p-2.5 rounded-lg border ${this.edenActiveChallenge === 1 ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-950 text-slate-400'} cursor-pointer"
                  onclick="window.trophicSim.setEdenChallenge(1)">
                  <strong>1. Reconstrução Trófica:</strong> Identifique produtores, consumidores e monte o fluxo original.
                </div>
                <div class="p-2.5 rounded-lg border ${this.edenActiveChallenge === 2 ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-950 text-slate-400'} cursor-pointer"
                  onclick="window.trophicSim.setEdenChallenge(2)">
                  <strong>2. Classificação de Interações:</strong> Mapeie herbivoria, mutualismo, predação e decomposição.
                </div>
                <div class="p-2.5 rounded-lg border ${this.edenActiveChallenge === 3 ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-950 text-slate-400'} cursor-pointer"
                  onclick="window.trophicSim.setEdenChallenge(3)">
                  <strong>3. Teste de Perturbação:</strong> Reduza Lumivora no slider e observe o efeito cascata.
                </div>
                <div class="p-2.5 rounded-lg border ${this.edenActiveChallenge === 4 ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200' : 'border-slate-800 bg-slate-950 text-slate-400'} cursor-pointer"
                  onclick="window.trophicSim.setEdenChallenge(4)">
                  <strong>4. Avaliação de Restauração:</strong> Teste Veyrathus e analise os riscos de predação não-alvo.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Estado da simulação - Desafio 01 (Microplásticos)
    this.baseScenario = 'A'; // 'A', 'B' ou 'custom'
    this.emissionRate = 100; // Porcentagem (100% = Cenário A)
    this.eliminationEfficiency = 65; // Taxa de depuração fisiológica pelo organismo (%)
    
    // Níveis tróficos - Desafio 01
    this.levels = [
      { id: 'algae', name: 'Algas (Fitoplâncton)', role: 'Produtor Primário', baseA: 10, baseB: 20, color: '#10b981', icon: '🌿' },
      { id: 'zooplankton', name: 'Zooplâncton (Daphnia)', role: 'Consumidor Primário', baseA: 18, baseB: 39, color: '#3b82f6', icon: '🦐' },
      { id: 'small_fish', name: 'Peixe Pequeno (Lambari)', role: 'Consumidor Secundário', baseA: 31, baseB: 74, color: '#f59e0b', icon: '🐟' },
      { id: 'top_predator', name: 'Peixe Predador (Traíra)', role: 'Consumidor Terciário (Topo)', baseA: 57, baseB: 141, color: '#ef4444', icon: '🦈' }
    ];

    // Estado da simulação - Desafio 02 (Eutrofização & Anóxia Noturna no Lago Azul)
    this.d2Scenario = 'atual'; // 'preservado', 'atual', 'mitigado'
    this.d2NutrientLoad = 100; // % da carga atual de N & P
    this.d2WaterTemp = 28;     // Graus Celsius (°C)
    this.d2Hour = 4;           // 04:00 da madrugada (momento do pico de anóxia e mortandade)
    this.d2AnimationTimer = null;

    this.render();
  }

  // ==========================================
  // CONTROLES DESAFIO 01 (MICROPLÁSTICOS)
  // ==========================================
  setScenario(scen) {
    this.baseScenario = scen;
    if (scen === 'A') {
      this.emissionRate = 100;
    } else if (scen === 'B') {
      this.emissionRate = 220;
    }
    this.render();
  }

  setEmissionRate(rate) {
    this.emissionRate = parseInt(rate, 10);
    this.baseScenario = 'custom';
    this.render();
  }

  calculateValues() {
    const factor = this.emissionRate / 100;
    return this.levels.map(l => {
      let val = Math.round(l.baseA * factor);
      if (this.baseScenario === 'B') val = l.baseB;
      if (this.baseScenario === 'A') val = l.baseA;
      return {
        ...l,
        currentValue: val,
        increaseOverA: val - l.baseA,
        ratioToAlgae: (val / (this.levels[0].baseA * factor)).toFixed(1)
      };
    });
  }

  // ==========================================
  // CONTROLES DESAFIO 02 (EUTROFIZAÇÃO & ANÓXIA)
  // ==========================================
  setD4Scenario(scen) {
    this.d2Scenario = scen;
    if (scen === 'preservado') {
      this.d2NutrientLoad = 25;
      this.d2WaterTemp = 24;
    } else if (scen === 'atual') {
      this.d2NutrientLoad = 100;
      this.d2WaterTemp = 28;
    } else if (scen === 'mitigado') {
      this.d2NutrientLoad = 40;
      this.d2WaterTemp = 26;
    }
    this.render();
  }

  setD2NutrientLoad(val) {
    this.d2NutrientLoad = parseInt(val, 10);
    this.d2Scenario = 'custom';
    this.render();
  }

  setD2WaterTemp(val) {
    this.d2WaterTemp = parseInt(val, 10);
    this.d2Scenario = 'custom';
    this.render();
  }

  setD2Hour(val) {
    this.d2Hour = parseInt(val, 10);
    this.render();
  }

  toggleD2Animation() {
    if (this.d2AnimationTimer) {
      clearInterval(this.d2AnimationTimer);
      this.d2AnimationTimer = null;
      this.render();
      return;
    }

    this.d2AnimationTimer = setInterval(() => {
      this.d2Hour = (this.d2Hour + 1) % 24;
      this.render();
    }, 600);
  }

  calculateD2Values(hour = this.d2Hour) {
    const nFactor = this.d2NutrientLoad / 100;
    const tempFactor = (this.d2WaterTemp - 18) / 10; // maior temp = maior consumo e proliferação
    
    // Densidade de células de cianobactérias (células/mL)
    const cellDensity = Math.round(85000 * nFactor * Math.max(0.4, (this.d2WaterTemp / 28)));
    
    // Microcistina (µg/L)
    const microcystin = +(2.4 * nFactor).toFixed(1);

    // Curva Nictemeral (24h) de Oxigênio Dissolvido (OD em mg/L)
    // Às 14h: pico fotossintético (supersaturação)
    // Às 04h: vale da respiração/decomposição (anóxia severa)
    const rad = ((hour - 14) / 24) * 2 * Math.PI;
    const diurnalSwing = Math.cos(rad); // +1 às 14h, -1 às 02h/04h

    let baseOD = 7.5 - (nFactor * 1.5 * tempFactor);
    let amplitude = (nFactor * 5.8) + (tempFactor * 0.8);

    let odVal = +(baseOD + (diurnalSwing * amplitude)).toFixed(1);
    if (odVal < 0.2) odVal = 0.2; // limite físico

    // Diagnóstico do estado dos peixes e ecossistema
    let status = 'Normal';
    let statusColor = '#10b981';
    let fishRisk = 'Baixo Risco';

    if (odVal >= 11.0) {
      status = 'Supersaturação Fotossintética Diurna (Bolhas de O₂)';
      statusColor = '#06b6d4';
      fishRisk = 'Estresse Ocular / Gas Bubble Disease pontual';
    } else if (odVal >= 5.0) {
      status = 'Nível Satisfatório de Oxigênio';
      statusColor = '#10b981';
      fishRisk = 'Normal / Sem mortalidade';
    } else if (odVal >= 2.0) {
      status = 'Hipóxia Moderada (Estresse Respiratório)';
      statusColor = '#f59e0b';
      fishRisk = 'Respiração na superfície (pipocando)';
    } else {
      status = '🚨 ANÓXIA CRÍTICA NOTURNA (OD < 2.0 mg/L)';
      statusColor = '#ef4444';
      fishRisk = '💀 ASFIXIA AGUDA & MORTANDADE MACIÇA';
    }

    return {
      cellDensity,
      microcystin,
      odVal,
      status,
      statusColor,
      fishRisk,
      hour
    };
  }

  // ==========================================
  // RENDERIZAÇÃO PRINCIPAL
  // ==========================================
  render() {
    if (!this.container) return;

    const isDesafio2 = (window.app && window.app.activeChallengeId === 'desafio-2');
    const isDesafio4 = (window.app && window.app.activeChallengeId === 'desafio-4');
    if (isDesafio2) {
      this.renderDesafio2Eden();
    } else if (isDesafio4) {
      this.renderDesafio4();
    } else {
      this.renderDesafio1();
    }
  }

  renderDesafio1() {
    const computed = this.calculateValues();
    const maxVal = Math.max(...computed.map(c => c.currentValue), 150);

    this.container.innerHTML = `
      <div class="trophic-sim-card">
        <div class="trophic-header">
          <div class="trophic-title-group">
            <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span class="icon-chip">📊</span> Modelo Didático de Teia Trófica Fluvial • Desafio 01
            </h3>
            <p class="text-xs text-slate-400">
              Simulação de comportamento de microplásticos ao longo dos níveis tróficos (Algas → Zooplâncton → Lambari → Traíra) no Rio das Palmeiras.
            </p>
          </div>
          
          <div class="scenario-buttons">
            <button class="btn-scen ${this.baseScenario === 'A' ? 'active' : ''}" onclick="window.trophicSim.setScenario('A')">
              Cenário A (Condição Inicial)
            </button>
            <button class="btn-scen ${this.baseScenario === 'B' ? 'active' : ''}" onclick="window.trophicSim.setScenario('B')">
              Cenário B (Maior Entrada de Partículas)
            </button>
          </div>
        </div>

        <!-- Slider de Entrada de Carga de Resíduos -->
        <div class="slider-control-box">
          <div class="flex justify-between items-center mb-1 text-sm font-semibold">
            <span class="text-slate-300">Carga de Partículas Entrando na Bacia Hidrográfica:</span>
            <span class="text-cyan-400 font-mono text-base">${this.emissionRate}% da Carga Padrão</span>
          </div>
          <input type="range" min="30" max="300" step="5" value="${this.emissionRate}" 
            class="sim-range-slider" 
            oninput="window.trophicSim.setEmissionRate(this.value)">
          <div class="flex justify-between text-xs text-slate-500 font-mono">
            <span>30% (Baixa Carga)</span>
            <span>100% (Cenário A Padrão)</span>
            <span>220% (Cenário B Severo)</span>
            <span>300% (Carga Extrema)</span>
          </div>
        </div>

        <!-- Visualização Gráfica dos Níveis Tróficos -->
        <div class="trophic-bars-grid">
          ${computed.map((item) => {
            const heightPercent = Math.min(100, Math.round((item.currentValue / maxVal) * 100));
            return `
              <div class="trophic-bar-col">
                <div class="bar-value-badge" style="color: ${item.color}">
                  ${item.currentValue} <span class="unit">índice</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="height: ${heightPercent}%; background: linear-gradient(to top, ${item.color}88, ${item.color})">
                    <span class="bar-watermark">${item.icon}</span>
                  </div>
                </div>
                <div class="bar-info">
                  <div class="font-bold text-xs text-slate-200">${item.name}</div>
                  <div class="text-[10px] text-slate-400 font-mono">${item.role}</div>
                  ${this.baseScenario === 'B' || this.emissionRate !== 100 ? `
                    <div class="text-[11px] font-bold mt-1 ${item.increaseOverA >= 0 ? 'text-amber-400' : 'text-emerald-400'}">
                      ${item.increaseOverA >= 0 ? '+' : ''}${item.increaseOverA} vs Cen. A
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Tabela Comparativa de Cálculo Didático -->
        <div class="trophic-calc-table mt-4">
          <table class="w-full text-xs text-left">
            <thead>
              <tr class="text-slate-400 border-b border-slate-700">
                <th class="py-1">Nível Trófico</th>
                <th class="py-1 text-center">Índice no Modelo</th>
                <th class="py-1 text-center">Aumento Absoluto</th>
                <th class="py-1 text-right">Razão Produtor-Consumidor</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 font-mono">
              ${computed.map(c => `
                <tr>
                  <td class="py-2 text-slate-200 font-sans flex items-center gap-1.5">
                    <span>${c.icon}</span> <strong>${c.name}</strong>
                  </td>
                  <td class="py-2 text-center text-cyan-300 font-bold">${c.currentValue}</td>
                  <td class="py-2 text-center text-amber-400 font-bold">${c.increaseOverA >= 0 ? '+' : ''}${c.increaseOverA}</td>
                  <td class="py-2 text-right text-slate-300">${c.ratioToAlgae}x</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Alerta Pedagógico de Pensamento Crítico -->
        <div class="mt-4 p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs flex gap-2.5 items-start">
          <span class="text-base">⚠️</span>
          <div>
            <strong>Atenção Metodológica (Ciência Real vs Modelo Didático):</strong>
            Estes índices são dados hipotéticos simulados para comparar o comportamento de um modelo de acumulação. Na natureza, os microplásticos <em>não necessariamente biomagnificam</em> em todos os níveis tróficos, pois muitas partículas são eliminadas pelas fezes dos animais ou retidas no muco sem passar para o tecido celular. O comportamento biológico depende da anatomia do animal, do tamanho da partícula e da taxa de excreção.
          </div>
        </div>
      </div>
    `;
  }

  renderDesafio4() {
    const cur = this.calculateD2Values(this.d2Hour);
    const hourLabel = `${String(this.d2Hour).padStart(2, '0')}:00`;
    const isNight = (this.d2Hour >= 19 || this.d2Hour <= 5);

    this.container.innerHTML = `
      <div class="trophic-sim-card">
        <!-- Cabeçalho do Simulador de Eutrofização -->
        <div class="trophic-header">
          <div class="trophic-title-group">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span class="icon-chip">🌿</span> Simulador de Eutrofização, Cianobactérias e Ciclo Nictemeral do Oxigênio • Desafio 02
            </h3>
            <p class="text-xs text-slate-400">
              Investigação experimental no Lago Azul: relacione aportes de nitrogênio e fósforo com a proliferação celular, a produção de toxinas e a anóxia noturna aguda.
            </p>
          </div>

          <div class="scenario-buttons">
            <button class="btn-scen ${this.d2Scenario === 'preservado' ? 'active' : ''}" onclick="window.trophicSim.setD4Scenario('preservado')">
              Lago Preservado (Baixo N&P)
            </button>
            <button class="btn-scen ${this.d2Scenario === 'atual' ? 'active' : ''}" onclick="window.trophicSim.setD4Scenario('atual')">
              Situação Atual (Floração Crítica)
            </button>
            <button class="btn-scen ${this.d2Scenario === 'mitigado' ? 'active' : ''}" onclick="window.trophicSim.setD4Scenario('mitigado')">
              Pós-Mitigação (Contenção)
            </button>
          </div>
        </div>

        <!-- Painel de Controles e Sliders de Simulação -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <!-- Slider 1: Carga de Nutrientes (Fósforo e Nitrogênio) -->
          <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80">
            <div class="flex justify-between items-center mb-1 text-xs font-semibold">
              <span class="text-slate-300">Aporte de Fósforo & Nitrogênio:</span>
              <span class="text-emerald-400 font-mono font-bold">${this.d2NutrientLoad}%</span>
            </div>
            <input type="range" min="20" max="250" step="5" value="${this.d2NutrientLoad}" 
              class="sim-range-slider" 
              oninput="window.trophicSim.setD2NutrientLoad(this.value)">
            <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>20% (Limpo)</span>
              <span>100% (Atual)</span>
              <span>250% (Crítico)</span>
            </div>
          </div>

          <!-- Slider 2: Temperatura da Água -->
          <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80">
            <div class="flex justify-between items-center mb-1 text-xs font-semibold">
              <span class="text-slate-300">Temperatura da Água:</span>
              <span class="text-amber-400 font-mono font-bold">${this.d2WaterTemp}°C</span>
            </div>
            <input type="range" min="18" max="34" step="1" value="${this.d2WaterTemp}" 
              class="sim-range-slider" 
              oninput="window.trophicSim.setD2WaterTemp(this.value)">
            <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>18°C (Inverno)</span>
              <span>28°C (Verão Atual)</span>
              <span>34°C (Onda de Calor)</span>
            </div>
          </div>

          <!-- Slider 3: Hora do Dia (Ciclo 24 Horas) -->
          <div class="p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80">
            <div class="flex justify-between items-center mb-1 text-xs font-semibold">
              <span class="text-slate-300 flex items-center gap-1.5">
                <span>${isNight ? '🌙' : '☀️'}</span> Horário da Amostragem:
              </span>
              <span class="text-cyan-400 font-mono font-bold">${hourLabel}</span>
            </div>
            <input type="range" min="0" max="23" step="1" value="${this.d2Hour}" 
              class="sim-range-slider" 
              oninput="window.trophicSim.setD2Hour(this.value)">
            <div class="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1">
              <span>00h</span>
              <button class="text-xs text-cyan-300 hover:underline font-bold" onclick="window.trophicSim.toggleD2Animation()">
                ${this.d2AnimationTimer ? '⏸ Pausar Ciclo' : '▶ Animar 24h'}
              </button>
              <span>23h</span>
            </div>
          </div>
        </div>

        <!-- Cards com Indicadores Biofísicos Calculados -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <!-- 1. Densidade Celular -->
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span class="text-[11px] text-slate-400 font-mono uppercase block">Fitoplâncton / Cianobactérias</span>
            <div class="text-xl font-black text-emerald-400 font-mono mt-1">${cur.cellDensity.toLocaleString('pt-BR')}</div>
            <span class="text-[10px] text-slate-400">células/mL (Microcystis / Dolichos.)</span>
          </div>

          <!-- 2. Microcistina -->
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span class="text-[11px] text-slate-400 font-mono uppercase block">Microcistina Total</span>
            <div class="text-xl font-black ${cur.microcystin > 1.0 ? 'text-rose-400' : 'text-emerald-400'} font-mono mt-1">${cur.microcystin} µg/L</div>
            <span class="text-[10px] ${cur.microcystin > 1.0 ? 'text-rose-300' : 'text-slate-400'}">
              ${cur.microcystin > 1.0 ? '⚠️ Ultrapassa Portaria MS 888 (1,0 µg/L)' : '✓ Dentro do VMP potável'}
            </span>
          </div>

          <!-- 3. Oxigênio Dissolvido (OD) no Horário -->
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center" style="border-color: ${cur.statusColor}66">
            <span class="text-[11px] text-slate-400 font-mono uppercase block">Oxigênio Dissolvido (${hourLabel})</span>
            <div class="text-2xl font-black font-mono mt-1" style="color: ${cur.statusColor}">${cur.odVal} mg/L</div>
            <span class="text-[10px] font-bold" style="color: ${cur.statusColor}">${cur.status}</span>
          </div>

          <!-- 4. Risco para a Ictiofauna -->
          <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span class="text-[11px] text-slate-400 font-mono uppercase block">Condição dos Peixes</span>
            <div class="text-sm font-black mt-2" style="color: ${cur.statusColor}">${cur.fishRisk}</div>
            <span class="text-[10px] text-slate-400">Observação clínica das brânquias</span>
          </div>
        </div>

        <!-- Gráfico Vetorial da Curva Nictemeral de 24 Horas de Oxigênio Dissolvido -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 mb-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h4 class="text-sm font-bold text-white flex items-center gap-2">
                <span>📈</span> Curva de Variação de Oxigênio Dissolvido ao Longo das 24 Horas
              </h4>
              <p class="text-[11px] text-slate-400">
                A linha vertical pontilhada indica o horário selecionado (${hourLabel}). A faixa vermelha representa a zona de anóxia letal (&lt; 2,0 mg/L).
              </p>
            </div>
            <span class="text-xs font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              OD às ${hourLabel}: <strong>${cur.odVal} mg/L</strong>
            </span>
          </div>

          <div class="w-full h-48 relative bg-slate-950 rounded-lg p-2 border border-slate-800 overflow-hidden">
            <canvas id="d2-oxygen-curve-canvas" width="800" height="180" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Explicação Científica das Evidências -->
        <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs space-y-2">
          <div class="font-bold flex items-center gap-1.5 text-amber-300">
            <span>🔬</span> Evidência Chave para o Parecer Pericial (Aulas 4, 5 e 6):
          </div>
          <p class="leading-relaxed">
            Note como o oxigênio atinge valores elevadíssimos durante a tarde (fotossíntese sob sol pleno), mas despenca violentamente na madrugada (cessação da luz somada à intensa respiração bacteriana e do fitoplâncton). 
            Às <strong>04:00 da manhã</strong>, o oxigênio cai para <strong>0,8 mg/L</strong>, provocando asfixia aguda na fauna aquática. 
            A microcistina detectada (2,4 µg/L) comprova a presença de cepas produtoras de toxina, mas a mortandade em massa súbita durante a madrugada tem na <strong>anóxia noturna</strong> o fator fisiológico fulminante determinante.
          </p>
        </div>
      </div>
    `;

    setTimeout(() => this.drawD2OxygenCurveCanvas(), 50);
  }

  drawD2OxygenCurveCanvas() {
    const canvas = document.getElementById('d2-oxygen-curve-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padL = 40;
    const padR = 20;
    const padT = 20;
    const padB = 30;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const maxOD = 16;

    // Zona Vermelha Crítica de Anóxia (< 2.0 mg/L)
    const critY = padT + plotH - (2.0 / maxOD) * plotH;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(padL, critY, plotW, padT + plotH - critY);

    // Linha limite crítica (2.0 mg/L)
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, critY);
    ctx.lineTo(padL + plotW, critY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#fca5a5';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Limite Letal Peixes (2 mg/L)', padL + plotW - 6, critY - 4);

    // Linhas de Grade de Oxigênio (0, 4, 8, 12, 16 mg/L)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';

    for (let od = 0; od <= 16; od += 4) {
      const y = padT + plotH - (od / maxOD) * plotH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
      ctx.fillText(`${od}`, padL - 6, y + 3);
    }

    // Traçado da Curva de 24 horas
    const points = [];
    for (let hr = 0; hr <= 24; hr++) {
      const calc = this.calculateD2Values(hr % 24);
      const x = padL + (hr / 24) * plotW;
      const y = padT + plotH - (calc.odVal / maxOD) * plotH;
      points.push({ x, y, od: calc.odVal, hr: hr % 24 });
    }

    // Gradiente da linha
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Rótulos do Eixo X (Horas do dia)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    for (let hr = 0; hr <= 24; hr += 4) {
      const x = padL + (hr / 24) * plotW;
      ctx.fillText(`${String(hr % 24).padStart(2, '0')}h`, x, h - 10);
    }

    // Marcador da Hora Selecionada (Linha vertical pontilhada com esfera)
    const selX = padL + (this.d2Hour / 24) * plotW;
    const curCalc = this.calculateD2Values(this.d2Hour);
    const selY = padT + plotH - (curCalc.odVal / maxOD) * plotH;

    ctx.strokeStyle = '#34d399';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(selX, padT);
    ctx.lineTo(selX, padT + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = curCalc.statusColor;
    ctx.beginPath();
    ctx.arc(selX, selY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

window.TrophicSimulator = TrophicSimulator;
