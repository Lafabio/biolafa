// Aplicação Principal: BioLab Explorer - Plataforma de Investigação Científica Escolar
class BioLabApp {
  constructor() {
    this.currentTab = 'desafios'; // 'desafios', 'investigacao', 'microscopio', 'mapa', 'simulador', 'professor'
    this.currentPhaseIndex = 0;
    if (challengeId === 'desafio-2' && this.currentTab === 'microscopio') {
      this.currentTab = 'investigacao';
    } // 0 a 8 (9 fases)
    
    // Autenticação Exclusiva do Professor (login: biolafa / senha: lilica10)
    this.teacherAuth = (localStorage.getItem('biolafa_teacher_auth') === 'true');
    this.teacherMode = this.teacherAuth;
    
    // Lista de Avatares disponíveis para as Equipes
    this.avatarsList = ['🔬', '🧬', '🌿', '🧪', '🐟', '🌊', '🧫', '🔍', '🦅', '🐢', '🍃', '⚡'];
    this.selectedNewAvatar = '🔬';

    // Sistema de Equipes Multi-Tenant
    this.teamsRegistry = [];
    this.activeTeamId = null;
    this.pendingPinTeamId = null;

    // Dados da Equipe de Pesquisadores Ativa (inicia vazio; cadastrada pelos alunos ao iniciar)
    this.team = null;

    // Respostas dos estudantes às Fichas (isoladas por equipe)
    this.studentAnswers = {};

    // Matriz de Evidências (isolada por equipe)
    this.evidenceMatrix = {};

    // Autoavaliação da Ficha 11 (isolada por equipe)
    this.selfAssessment = {};

    // Sincronização em Tempo Real (Multi-Dispositivos: Alunos e Professor)
    this.teacherSyncTimer = null;
    this.studentHeartbeatTimer = null;
    this.syncDebounceTimer = null;
    this.serverTeamsCache = {};
    this.teacherSearchFilter = '';

    // Inicializar Sistema de Equipes e Carregar Dados Isolados
    this.initTeamsSystem();
    // Sistema Multi-Desafios e Controle Pedagógico Docente
    this.activeChallengeId = localStorage.getItem('biolafa_active_challenge_id') || 'desafio-1';
    this.isChallenge04Unlocked = (localStorage.getItem('biolafa_challenge_04_unlocked') === 'true');
    this.isChallenge02Unlocked = true; // Desafio 02 (Projeto ÉDEN) é totalmente desbloqueado
    // Se o Desafio 04 estiver ativo mas estiver bloqueado e o usuário não for professor, reverte para Desafio 01
    if (this.activeChallengeId === 'desafio-4' && !this.isChallenge04Unlocked && !this.teacherAuth) {
      this.activeChallengeId = 'desafio-1';
      localStorage.setItem('biolafa_active_challenge_id', 'desafio-1');
    }

    if (typeof window !== 'undefined' && typeof window.setActiveChallenge === 'function') {
      window.setActiveChallenge(this.activeChallengeId);
    } else if (typeof window !== 'undefined' && window.CHALLENGES_DATABASE && window.CHALLENGES_DATABASE[this.activeChallengeId]) {
      window.BIO_DATA = window.CHALLENGES_DATABASE[this.activeChallengeId];
    }


    // Inicializar sub-módulos
    this.initAudio();
    this.initApp();
  }

  get currentData() {
    const id = this.activeChallengeId;
    if (typeof window !== 'undefined' && window.CHALLENGES_DATABASE && window.CHALLENGES_DATABASE[id]) {
      return window.CHALLENGES_DATABASE[id];
    }
    if (typeof window !== 'undefined' && window.BIO_DATA) {
      return window.BIO_DATA;
    }
    return (typeof window !== 'undefined' && window.DESAFIO_01_DATA) || null;
  }

  initAudio() {
    // Síntese de áudio procedural via Web Audio API (zero dependências externas!)
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    } catch (e) {
      this.audioCtx = null;
    }
  }

  playSound(type) {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const t = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.start(t);
      osc.stop(t + 0.04);
    } else if (type === 'shutter') {
      // Som mecânico de captura de foto
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.linearRampToValueAtTime(120, t + 0.08);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === 'focus_snap') {
      // Chime suave ao atingir foco perfeito
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    } else if (type === 'tab') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  }

  initApp() {
    this.loadCustomSlides();
    this.renderHeader();
    this.renderChallengesHub();
    this.switchTab(this.currentTab, false);
    this.checkServerForNewSlides();

    // Fechar modais ao clicar no fundo escuro ou apertar ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
      }
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    // Inicializar o Microscópio quando o DOM estiver pronto
    setTimeout(() => {
      if (document.getElementById('micro-canvas')) {
        window.microscope = new VirtualMicroscope('micro-canvas');
        if (this.currentData && this.currentData.slides && this.currentData.slides.length > 0) {
          window.microscope.loadSlide(this.currentData.slides[0]);
        }
        this.renderSlidesShelf();
      }
      if (document.getElementById('trophic-sim-container')) {
        window.trophicSim = new TrophicSimulator('trophic-sim-container');
      }
      if (document.getElementById('microfilm-container')) {
        window.microfilmReader = new MicrofilmReader('microfilm-container');
      }

      // Se nenhuma equipe estiver cadastrada, abrir o modal para os alunos criarem a sua equipe
      if (!this.activeTeamId || !this.team) {
        this.openTeamAccessModal('create');
      }

      // Iniciar heartbeat do estudante e sincronização em tempo real do professor
      this.startStudentHeartbeat();
      if (this.teacherAuth && this.currentTab === 'professor') {
        this.startTeacherLiveSync();
      }
    }, 150);
  }

  
  getTeamDataKey(teamId, challengeId = this.activeChallengeId) {
    if (!challengeId || challengeId === 'desafio-1') {
      return `biolafa_team_${teamId}_data`;
    }
    if (challengeId === 'desafio-2') {
      return `biolafa_team_${teamId}_data_desafio-2`;
    }
    if (challengeId === 'desafio-4') {
      return `biolafa_team_${teamId}_data_desafio-4`;
    }
    return `biolafa_team_${teamId}_data_${challengeId}`;
  }

  renderChallengesHub() {
    const grid = document.getElementById('challenges-grid');
    if (!grid) return;

    const isCh1Active = (this.activeChallengeId === 'desafio-1');
    const isCh2Active = (this.activeChallengeId === 'desafio-2');
    const isCh2Unlocked = this.isChallenge02Unlocked;
    const isCh4Active = (this.activeChallengeId === 'desafio-4');
    const isCh4Unlocked = this.isChallenge04Unlocked;

    grid.innerHTML = `
      <!-- Desafio 1 (Microplásticos) -->
      <div class="challenge-card ${isCh1Active ? 'challenge-card-active' : 'border-slate-700 bg-slate-900/60'} flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="${isCh1Active ? 'badge-tag-cyan' : 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono'}">
              ${isCh1Active ? 'DESAFIO 01 • ATIVO' : 'DESAFIO 01'}
            </span>
            <span class="text-xs text-emerald-400 font-mono font-bold">9 Aulas • PBL</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">O Mistério do Rio das Palmeiras</h3>
          <p class="text-xs text-cyan-300 font-semibold mb-3">Microplásticos, Fontes de Contaminação e Teias Alimentares</p>
          <p class="text-xs text-slate-300 leading-relaxed mb-4">
            Uma comunidade identifica pequenos resíduos na água. Uma fábrica têxtil, ligações irregulares de esgoto, uma rodovia movimentada e resíduos de pesca estão na região. Analise notícias, lâminas microscópicas e dados de monitoramento para formular uma explicação científica baseada em evidências.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-800">12 Notícias</span>
            <span class="px-2 py-0.5 rounded bg-slate-800">Lâminas Ópticas</span>
            <span class="px-2 py-0.5 rounded bg-slate-800">Simulador Trófico</span>
          </div>
        </div>
        <div class="mt-2 space-y-2">
          ${isCh1Active ? `
            <button class="btn-primary w-full justify-center py-2.5" onclick="window.app.switchTab('investigacao')">
              🔬 Entrar na Missão de Investigação →
            </button>
          ` : `
            <button class="btn-secondary w-full justify-center py-2.5 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40 font-bold" onclick="window.app.selectChallenge('desafio-1')">
              ↩️ Alternar para o Desafio 01
            </button>
          `}
          <a href="FICHA_DE_ORIENTACAO_ALUNOS.pdf" download="FICHA_DE_ORIENTACAO_ALUNOS.pdf" target="_blank" class="btn-secondary w-full justify-center text-xs py-1.5 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40 flex items-center gap-1.5">
            <span>📥</span> Baixar Ficha do Estudante (PDF)
          </a>
        </div>
      </div>

      <!-- Desafio 2 (Projeto ÉDEN — A Bioinvasão de Nébula-7) -->
      <div class="challenge-card ${isCh2Active ? 'challenge-card-active border-cyan-500/60 shadow-[0_0_25px_rgba(83,185,213,0.2)]' : (isCh2Unlocked ? 'border-cyan-700/50 bg-slate-900/80' : 'border-slate-700 bg-slate-900/50')} flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            ${isCh2Unlocked ? `
              <span class="${isCh2Active ? 'badge-tag-cyan bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold' : 'px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 text-[10px] font-mono border border-cyan-700/50'}">
                ${isCh2Active ? '🪐 DESAFIO 02 • ATIVO' : '🪐 DESAFIO 02 • LIBERADO'}
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800/60 text-[10px] font-mono font-bold">
                DESAFIO 02 • 🔒 BLOQUEADO
              </span>
            `}
            <span class="text-xs ${isCh2Unlocked ? 'text-cyan-400' : 'text-slate-500'} font-mono font-bold">9 Aulas • AECP 2189</span>
          </div>
          <h3 class="text-lg font-bold ${isCh2Unlocked ? 'text-white' : 'text-slate-300'} mb-2">Projeto ÉDEN: A Bioinvasão de Nébula-7</h3>
          <p class="text-xs ${isCh2Unlocked ? 'text-teal-300' : 'text-amber-400/90'} font-semibold mb-3">Desequilíbrio Ecológico, Exclusão de Gause e Restauração Planetária</p>
          <p class="text-xs ${isCh2Unlocked ? 'text-slate-300' : 'text-slate-400'} leading-relaxed mb-4">
            No ano de 2189, mineradoras introduziram acidentalmente Nexovora rapidans na Floresta Cristalina. Investigue a rota de dispersão, o colapso trófico (-72% Lumivora), o efeito fundador genético, os riscos de introduzir o predador Veyrathus e elabore o plano de restauração da AECP.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-800/40">12 Relatórios AECP</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-teal-800/40">Cascata Trófica</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-800/40">Exclusão de Gause</span>
          </div>
        </div>
        <div class="mt-2 space-y-2">
          ${isCh2Unlocked ? `
            ${isCh2Active ? `
              <button class="btn-primary w-full justify-center py-2.5 bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white font-bold" onclick="window.app.switchTab('investigacao')">
                🪐 Entrar na Missão do Desafio 02 →
              </button>
            ` : `
              <button class="btn-primary w-full justify-center py-2.5 bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white font-bold" onclick="window.app.selectChallenge('desafio-2')">
                🪐 Entrar no Desafio 02 →
              </button>
            `}
            ${this.teacherAuth ? `
              <button class="btn-secondary w-full justify-center text-xs py-1.5 text-rose-300 border-rose-500/40 hover:bg-rose-950/40" onclick="window.app.toggleChallenge02Lock()">
                🔒 Bloquear Desafio 02
              </button>
            ` : ''}
            <a href="FICHA_DE_ORIENTACAO_DESAFIO_02.pdf" download="FICHA_DE_ORIENTACAO_DESAFIO_02.pdf" target="_blank" class="btn-secondary w-full justify-center text-xs py-1.5 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40 flex items-center gap-1.5 font-semibold">
              <span>📥</span> Baixar Ficha do Estudante Desafio 02 (PDF)
            </a>
          ` : `
            <button class="btn-secondary w-full justify-center py-2.5 text-xs text-rose-300 border-rose-500/40 hover:bg-rose-950/40 font-bold cursor-pointer" onclick="window.app.alertChallengeLocked('desafio-2')">
              🔒 Desafio 02 Bloqueado (Clique para Liberar)
            </button>
          `}
        </div>
      </div>

      <!-- Desafio 3 (Expansão Futura) -->
      <div class="challenge-card challenge-card-locked flex flex-col justify-between opacity-80">
        <div>
          <div class="flex justify-between items-center mb-3">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">DESAFIO 03 • BLOQUEADO</span>
            <span class="text-xs text-slate-500 font-mono">Em Breve</span>
          </div>
          <h3 class="text-lg font-bold text-slate-300 mb-2">Ameaça Invisível no Efluente</h3>
          <p class="text-xs text-rose-400 font-semibold mb-3">Superbactérias & Resistência Genômica</p>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            Rastreamento de plasmídeos de resistência antimicrobiana em corpos hídricos que recebem resíduos de hospitais e granjas avícolas.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-800">Genômica</span>
            <span class="px-2 py-0.5 rounded bg-slate-800">Resistência</span>
          </div>
        </div>
        <button class="btn-secondary w-full justify-center opacity-50 cursor-not-allowed">
          🔒 Desafio Reservado
        </button>
      </div>

      <!-- Desafio 4 (Floração Vermelha / Maré Vermelha / Eutrofização) -->
      <div class="challenge-card ${isCh4Active ? 'challenge-card-active border-emerald-500/50' : (isCh4Unlocked ? 'border-emerald-600/40 bg-slate-900/80' : 'border-rose-900/40 bg-slate-900/50')} flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-3">
            ${isCh4Unlocked ? `
              <span class="${isCh4Active ? 'badge-tag-cyan bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px] font-mono border border-emerald-700/50'}">
                ${isCh4Active ? 'DESAFIO 04 • ATIVO' : 'DESAFIO 04 • LIBERADO'}
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800/60 text-[10px] font-mono font-bold">
                DESAFIO 04 • 🔒 BLOQUEADO
              </span>
            `}
            <span class="text-xs ${isCh4Unlocked ? 'text-emerald-400' : 'text-slate-500'} font-mono font-bold">9 Aulas • PBL</span>
          </div>
          <h3 class="text-lg font-bold ${isCh4Unlocked ? 'text-white' : 'text-slate-200'} mb-2">Desafio 04: Floração Vermelha em Vale Verde</h3>
          <p class="text-xs ${isCh4Unlocked ? 'text-emerald-300' : 'text-amber-400/90'} font-semibold mb-3">Eutrofização, Cianobactérias Tóxicas e Anóxia Noturna (Maré Vermelha)</p>
          <p class="text-xs ${isCh4Unlocked ? 'text-slate-300' : 'text-slate-400'} leading-relaxed mb-4">
            O Lago Azul amanhece com uma camada verde-azulada e odor característico. Mortandade de alevinos e peixes adultos é observada na madrugada. Os alunos investigarão descarte de fósforo, nitrogênio, cianotoxinas (microcistina) e o ciclo noturno de oxigênio.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-[11px] font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-800">12 Laudos & Notícias</span>
            <span class="px-2 py-0.5 rounded bg-slate-800">Lâminas Ópticas</span>
            <span class="px-2 py-0.5 rounded bg-slate-800">Anóxia Noturna</span>
          </div>
        </div>

        <div class="mt-2 space-y-2">
          ${isCh4Unlocked ? `
            ${isCh4Active ? `
              <button class="btn-primary w-full justify-center py-2.5 bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white font-bold" onclick="window.app.switchTab('investigacao')">
                🔬 Entrar na Missão do Desafio 04 →
              </button>
            ` : `
              <button class="btn-primary w-full justify-center py-2.5 bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white font-bold" onclick="window.app.selectChallenge('desafio-4')">
                🔬 Entrar no Desafio 04 →
              </button>
            `}
            ${this.teacherAuth ? `
              <button class="btn-secondary w-full justify-center text-xs py-1.5 text-rose-300 border-rose-500/40 hover:bg-rose-950/40" onclick="window.app.toggleChallenge04Lock()">
                🔒 Bloquear Desafio 04 Novamente
              </button>
            ` : ''}
            <a href="FICHA_DE_ORIENTACAO_DESAFIO_04.pdf" download="FICHA_DE_ORIENTACAO_DESAFIO_04.pdf" target="_blank" class="btn-secondary w-full justify-center text-xs py-1.5 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/40 flex items-center gap-1.5 font-semibold">
              <span>📥</span> Baixar Ficha do Estudante Desafio 04 (PDF)
            </a>
          ` : `
            <button class="btn-secondary w-full justify-center py-2.5 text-xs text-rose-300 border-rose-500/40 hover:bg-rose-950/40 font-bold cursor-pointer" onclick="window.app.alertChallengeLocked()">
              🔒 Desafio 04 Bloqueado (Clique para Liberar)
            </button>
            ${this.teacherAuth ? `
              <button class="btn-primary w-full justify-center py-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white font-bold text-xs" onclick="window.app.toggleChallenge04Lock()">
                🔓 Liberar Desafio 04 para a Turma Agora
              </button>
            ` : `
              <button class="text-[11px] text-amber-400 hover:text-amber-300 underline mt-1 w-full text-center block cursor-pointer" onclick="window.app.openTeacherLoginModal()">
                É professor? Faça login para liberar o Desafio 04 para a turma
              </button>
            `}
          `}
        </div>
      </div>
    `;
  }

  selectChallenge(challengeId) {
    if (challengeId === 'desafio-2' && !this.isChallenge02Unlocked && !this.teacherAuth) {
      this.alertChallengeLocked('desafio-2');
      return;
    }
    if (challengeId === 'desafio-4' && !this.isChallenge04Unlocked && !this.teacherAuth) {
      this.alertChallengeLocked();
      return;
    }

    if (!window.CHALLENGES_DATABASE || !window.CHALLENGES_DATABASE[challengeId]) {
      return;
    }

    this.activeChallengeId = challengeId;
    localStorage.setItem('biolafa_active_challenge_id', challengeId);
    if (typeof window.setActiveChallenge === 'function') {
      window.setActiveChallenge(challengeId);
    } else {
      window.BIO_DATA = window.CHALLENGES_DATABASE[challengeId];
    }

    // Resetar índice para o início do novo desafio
    this.currentPhaseIndex = 0;

    // Recarregar os dados isolados da equipe para o desafio ativo
    if (this.activeTeamId) {
      this.loadTeamData(this.activeTeamId, false);
    }

    // Carregar primeira lâmina do microscópio para o desafio ativo
    if (window.microscope && this.currentData.slides && this.currentData.slides.length > 0) {
      window.microscope.loadSlide(this.currentData.slides[0]);
    }
    this.renderSlidesShelf();

    // Sincronizar frames do leitor de microfilmes
    if (window.microfilmReader && typeof window.microfilmReader.initFrames === 'function') {
      window.microfilmReader.initFrames();
    }

    // Atualizar mapa interativo
    this.renderInteractiveMap();

    // Atualizar simulador se instanciado
    if (window.trophicSim && typeof window.trophicSim.render === 'function') {
      window.trophicSim.render();
    }

    this.renderHeader();
    this.renderChallengesHub();
    this.renderPhase(0);
    this.switchTab('investigacao');
    this.playSound('focus_snap');
  }

  toggleChallenge04Lock() {
    if (!this.teacherAuth) {
      this.openTeacherLoginModal();
      return;
    }

    this.isChallenge04Unlocked = !this.isChallenge04Unlocked;
    this.isChallenge02Unlocked = this.isChallenge04Unlocked;
    localStorage.setItem('biolafa_challenge_04_unlocked', this.isChallenge04Unlocked ? 'true' : 'false');
    localStorage.setItem('biolafa_challenge_02_unlocked', this.isChallenge04Unlocked ? 'true' : 'false');
    this.playSound(this.isChallenge04Unlocked ? 'focus_snap' : 'tab');

    if (this.isChallenge04Unlocked) {
      alert('🔓 Desafio 04 LIBERADO com sucesso pelo professor!\n\nA partir de agora, os estudantes podem acessar a investigação "Floração Vermelha em Vale Verde".');
    } else {
      alert('🔒 Desafio 04 BLOQUEADO novamente pelo professor.\n\nO acesso para os alunos foi restrito até nova autorização.');
      if (this.activeChallengeId === 'desafio-4' || this.activeChallengeId === 'desafio-2') {
        this.selectChallenge('desafio-1');
      }
    }

    this.renderChallengesHub();
    if (this.currentTab === 'professor') {
      this.renderTeacherSection();
    }
  }

  toggleChallenge02Lock() {
    this.toggleChallenge04Lock();
  }

  alertChallengeLocked() {
    this.playSound('tab');
    if (confirm('🔒 O Desafio 04 (Floração Vermelha em Vale Verde) está bloqueado pelo professor para a turma.\n\nSe você é o professor (usuário: biolafa), deseja fazer login agora para liberar este desafio para os estudantes?')) {
      this.openTeacherLoginModal();
    }
  }

  switchTab(tabId, playFx = true) {
    // Proteger acesso ao Painel do Professor: exclusivo para login "biolafa"
    if (tabId === 'professor' && !this.teacherAuth) {
      this.openTeacherLoginModal();
      return;
    }

    if (playFx) this.playSound('tab');
    this.currentTab = tabId;

    // Atualizar botões da barra superior
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active-nav-tab');
      } else {
        btn.classList.remove('active-nav-tab');
      }
    });

    // Ocultar todas as seções e exibir a ativa
    document.querySelectorAll('.app-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const activeSec = document.getElementById(`section-${tabId}`);
    if (activeSec) {
      activeSec.classList.remove('hidden');
    }

    if (tabId === 'microscopio' && this.activeChallengeId === 'desafio-2') {
      alert('🔬 O Microscópio Óptico não se aplica ao Projeto ÉDEN (Nébula-7).\n\nEste desafio é uma investigação macroecológica e pericial de bioinvasão. Utilize o Caderno Pericial, o Mapa Ecológico, a Teia Alimentar Interativa e o Terminal AECP.');
      this.switchTab('investigacao');
      return;
    }

    if (tabId === 'desafios') {
      this.renderChallengesHub();
    } else if (tabId === 'investigacao') {
      this.renderPhase(this.currentPhaseIndex);
    } else if (tabId === 'microscopio') {
      if (window.microscope) {
        window.microscope.render();
      }
    } else if (tabId === 'microfilme') {
      if (window.microfilmReader) {
        window.microfilmReader.render();
      }
    } else if (tabId === 'mapa') {
      this.renderInteractiveMap();
    } else if (tabId === 'simulador') {
      if (window.trophicSim) {
        window.trophicSim.render();
      }
    } else if (tabId === 'professor') {
      this.renderTeacherSection();
      this.startTeacherLiveSync();
    } else {
      this.stopTeacherLiveSync();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderHeader() {
    // Ajustar visibilidade e títulos das abas conforme o Desafio ativo
    const microTabBtn = document.querySelector('button[data-tab="microscopio"]');
    const microfilmTabBtn = document.querySelector('button[data-tab="microfilme"]');
    const mapaTabBtn = document.querySelector('button[data-tab="mapa"]');
    const simTabBtn = document.querySelector('button[data-tab="simulador"]');

    if (this.activeChallengeId === 'desafio-2') {
      if (microTabBtn) microTabBtn.style.display = 'none'; // Desafio 02 NÃO TEM microscópio
      if (microfilmTabBtn) microfilmTabBtn.innerHTML = '<span>🛰️</span> Terminal AECP';
      if (mapaTabBtn) mapaTabBtn.innerHTML = '<span>🪐</span> Mapa Nébula-7';
      if (simTabBtn) simTabBtn.innerHTML = '<span>🕸️</span> Teia Ecológica';
    } else if (this.activeChallengeId === 'desafio-4') {
      if (microTabBtn) {
        microTabBtn.style.display = '';
        microTabBtn.innerHTML = '<span>🔬</span> Microscópio (Fitoplâncton)';
      }
      if (microfilmTabBtn) microfilmTabBtn.innerHTML = '<span>📑</span> Laudos Periciais';
      if (mapaTabBtn) mapaTabBtn.innerHTML = '<span>🗺️</span> Bacia do Lago Azul';
      if (simTabBtn) simTabBtn.innerHTML = '<span>📉</span> Dinâmica de Anóxia';
    } else {
      if (microTabBtn) {
        microTabBtn.style.display = '';
        microTabBtn.innerHTML = '<span>🔬</span> Microscópio Virtual';
      }
      if (microfilmTabBtn) microfilmTabBtn.innerHTML = '<span>🎞️</span> Hemeroteca';
      if (mapaTabBtn) mapaTabBtn.innerHTML = '<span>🗺️</span> Rio das Palmeiras';
      if (simTabBtn) simTabBtn.innerHTML = '<span>📊</span> Simulador Trófico';
    }
    
    const chalInfo = document.getElementById('global-challenge-info');
    if (chalInfo && this.currentData && this.currentData.challenge) {
      const ch = this.currentData.challenge;
      chalInfo.innerHTML = `
        <span class="status-led status-green"></span>
        <strong>${ch.code} Ativo:</strong> ${ch.title} (${ch.subtitle || ch.subtitulo})
      `;
    }

    const teamBadge = document.getElementById('header-team-badge');
    if (teamBadge) {
      if (this.team && this.team.name) {
        teamBadge.innerHTML = `
          <div class="team-badge-pill" onclick="window.app.openTeamModal()" title="Ver e Editar Integrantes da Equipe">
            <span class="icon-avatar">${this.team.avatar || '🔬'}</span>
            <div class="text-left">
              <div class="team-badge-name">${this.team.name}</div>
              <div class="team-badge-sub">${this.team.turma} • ${this.team.members ? this.team.members.length : 0} Pesquisadores</div>
            </div>
            <span class="badge-edit-hint">✎ Editar</span>
          </div>
        `;
      } else {
        teamBadge.innerHTML = `
          <div class="team-badge-pill" onclick="window.app.openTeamAccessModal('create')" title="Clique para cadastrar a sua equipe">
            <span class="icon-avatar">➕</span>
            <div class="text-left">
              <div class="team-badge-name">Cadastrar Equipe</div>
              <div class="team-badge-sub">Clique para iniciar</div>
            </div>
            <span class="badge-edit-hint">Começar →</span>
          </div>
        `;
      }
    }

    const teacherBtn = document.getElementById('btn-teacher-toggle');
    if (teacherBtn) {
      if (this.teacherAuth) {
        teacherBtn.innerHTML = '<span>🎓</span> Professor (biolafa) • <span class="underline text-amber-200">Sair</span>';
        teacherBtn.className = 'btn-secondary text-xs py-1.5 px-3 border-amber-500 bg-amber-950/70 text-amber-200 hover:bg-amber-900/60 flex items-center gap-1.5 font-bold';
        teacherBtn.title = 'Sessão de Professor Ativa. Clique para encerrar a sessão.';
      } else {
        teacherBtn.innerHTML = '<span>🔒</span> Modo Professor';
        teacherBtn.className = 'btn-secondary text-xs py-1.5 px-3 border-amber-500/40 text-amber-300 hover:bg-amber-950/40 flex items-center gap-1.5';
        teacherBtn.title = 'Acesso Exclusivo do Professor (Login: biolafa)';
      }
    }

        const studentGuideLink = document.getElementById('header-student-guide-link');
    if (studentGuideLink) {
      const guideText = document.getElementById('header-student-guide-text');
      if (this.activeChallengeId === 'desafio-2') {
        studentGuideLink.href = 'FICHA_DE_ORIENTACAO_DESAFIO_02.pdf';
        studentGuideLink.setAttribute('download', 'FICHA_DE_ORIENTACAO_DESAFIO_02.pdf');
        studentGuideLink.title = 'Baixar Ficha de Orientação do Aluno - Desafio 02 (Projeto ÉDEN: Nébula-7) em PDF';
        if (guideText) guideText.textContent = 'Ficha Desafio 02 (PDF)';
      } else if (this.activeChallengeId === 'desafio-4') {
        studentGuideLink.href = 'FICHA_DE_ORIENTACAO_DESAFIO_04.pdf';
        studentGuideLink.setAttribute('download', 'FICHA_DE_ORIENTACAO_DESAFIO_04.pdf');
        studentGuideLink.title = 'Baixar Ficha de Orientação do Aluno - Desafio 04 (Floração de Vale Verde) em PDF';
        if (guideText) guideText.textContent = 'Ficha Desafio 04 (PDF)';
      } else {
        studentGuideLink.href = 'FICHA_DE_ORIENTACAO_ALUNOS.pdf';
        studentGuideLink.setAttribute('download', 'FICHA_DE_ORIENTACAO_ALUNOS.pdf');
        studentGuideLink.title = 'Baixar Ficha de Orientação do Aluno - Desafio 01 (Microplásticos) em PDF';
        if (guideText) guideText.textContent = 'Ficha Desafio 01 (PDF)';
      }
    }

    this.updateGlobalProgress();
  }

  updateGlobalProgress() {
    if (!this.currentData || !this.currentData.phases) return;
    const totalQuestions = this.currentData.phases.reduce((acc, p) => acc + (p.questions ? p.questions.length : 0), 0);
    const answeredCount = Object.keys(this.studentAnswers).filter(k => {
      const v = this.studentAnswers[k];
      return v && (typeof v === 'string' ? v.trim().length > 0 : Object.keys(v).length > 0);
    }).length;

    const percent = Math.min(100, Math.round((answeredCount / (totalQuestions || 1)) * 100));

    const barEl = document.getElementById('global-progress-bar');
    const textEl = document.getElementById('global-progress-text');
    if (barEl) barEl.style.width = `${percent}%`;
    if (textEl) textEl.textContent = `${percent}% Concluído (${this.currentPhaseIndex + 1}/${this.currentData.phases.length} Aulas)`;
  }

  // ==========================================
  // SEÇÃO: INVESTIGAÇÃO (AS 9 FASES / FICHAS)
  // ==========================================
  renderPhase(phaseIdx) {
    this.currentPhaseIndex = phaseIdx;
    if (!this.currentData || !this.currentData.phases) return;
    const phase = this.currentData.phases[phaseIdx];
    if (!phase) return;

    // Atualizar a régua de fases (timeline)
    const timelineEl = document.getElementById('phases-timeline');
    if (timelineEl) {
      timelineEl.innerHTML = this.currentData.phases.map((p, idx) => `
        <button class="phase-step-btn ${idx === phaseIdx ? 'active-phase' : ''} ${idx < phaseIdx ? 'done-phase' : ''}" 
          onclick="window.app.renderPhase(${idx})">
          <div class="phase-step-num">${idx + 1}</div>
          <div class="phase-step-label">Aula ${idx + 1}</div>
        </button>
      `).join('');
    }

    // Documentos da fase
    const phaseDocIds = phase.docsInvolved || phase.documentRefs || [];
    let docs = (this.currentData.documents || []).filter(d => phaseDocIds.includes(d.id));
    if (docs.length === 0 && phase.documents && phase.documents.length > 0) {
      docs = phase.documents;
    }

    const contentEl = document.getElementById('phase-content-container');
    if (contentEl) {
      const fichasLabel = (phase.fichas && Array.isArray(phase.fichas)) ? phase.fichas.join(' e ') : (phase.expectedProduct || 'Registro de Campo');
      const goalText = phase.goal || phase.focus || 'Investigação pericial dos laudos da fase.';
      contentEl.innerHTML = `
        <!-- Cabeçalho da Fase -->
        <div class="phase-banner mb-6">
          <div class="flex flex-wrap justify-between items-center gap-4 mb-2">
            <span class="badge-tag-cyan">${phase.badge || ('Aula ' + (phaseIdx + 1))}</span>
            <div class="flex items-center gap-3 text-xs text-slate-400">
              <span>⏱️ Duração: ${phase.duration || '45 min'}</span>
              <span>📋 ${fichasLabel}</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">${phase.lessonTitle}</h2>
          <p class="text-slate-300 text-sm leading-relaxed">${goalText}</p>
        </div>

        <!-- Dossiê de Documentos Oficiais & Notícias da Fase -->
        ${docs.length > 0 ? `
          <div class="docs-dossier-box mb-8">
            <h3 class="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center justify-between">
              <span class="flex items-center gap-2"><span>📰</span> Evidências Oficiais da Fase: Recortes de Imprensa & Laudos Periciais</span>
              <span class="text-xs text-slate-400 font-mono">${docs.length} ${docs.length === 1 ? 'Documento Anexado' : 'Documentos Anexados'}</span>
            </h3>
            <div class="grid grid-cols-1 ${docs.length > 1 ? 'lg:grid-cols-2' : ''} gap-6">
              ${docs.map(doc => this.renderDocumentItem(doc)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Caderno Digital de Respostas da Equipe -->
        <div class="questions-dossier-box">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>✍️</span> Registros Científicos da Equipe • ${(phase.fichas && Array.isArray(phase.fichas)) ? phase.fichas.join(' / ') : (phase.expectedProduct || 'Caderno de Campo')}
            </h3>
            <span class="text-xs text-emerald-400 font-mono">💾 Salvamento Automático Ativo</span>
          </div>

          <div class="questions-list space-y-6">
            ${phase.questions.map((q, qIdx) => this.renderQuestionInput(q, qIdx)).join('')}
          </div>

          <!-- Controles de Navegação Entre Aulas -->
          <div class="phase-nav-footer mt-8 pt-6 border-t border-slate-700/60 flex justify-between items-center">
            <button class="btn-secondary" ${phaseIdx === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed"' : ''} 
              onclick="window.app.renderPhase(${phaseIdx - 1})">
              ← Aula Anterior (${phaseIdx > 0 ? phaseIdx : ''})
            </button>

            <span class="text-xs text-slate-400">
              Aula ${phaseIdx + 1} de 9
            </span>

            ${phaseIdx < 8 ? `
              <button class="btn-primary" onclick="window.app.renderPhase(${phaseIdx + 1})">
                Próxima Aula (${phaseIdx + 2}) →
              </button>
            ` : `
              <button class="btn-primary bg-emerald-600 hover:bg-emerald-500" onclick="window.app.openReportModal()">
                🎓 Finalizar & Exportar Relatório Científico
              </button>
            `}
          </div>
        </div>
      `;

      // Renderizar gráficos ou tabelas especiais se estiver na Fase 4 ou 7
      if (phaseIdx === 3) {
        setTimeout(() => this.renderMonitoringChart(), 100);
      }
    }
  }

  // ==========================================
  // RENDERIZADOR REALISTA DE DOCUMENTOS
  // (RECORTES DE JORNAL E LAUDOS DE LABORATÓRIO)
  // ==========================================
  renderDocumentItem(doc) {
    if (doc.style === 'newspaper') {
      return `
        <article class="newspaper-clipping" id="card-${doc.id}">
          <!-- Cabeçalho do Periódico -->
          <div class="newspaper-masthead">
            <div class="newspaper-top-bar">
              <span>ARQUIVO DA IMPRENSA REGIONAL</span>
              <span>ANO XVIII • REGISTRO Nº 0${doc.number}</span>
            </div>
            <h2 class="newspaper-name">${doc.newspaperName || 'JORNAL DO VALE'}</h2>
            <div class="newspaper-edition-bar">
              ${doc.edition || doc.tag}
            </div>
          </div>

          <!-- Manchete com Tipografia Editorial -->
          <h3 class="newspaper-headline">${doc.title}</h3>

          <!-- Foto Real de Imprensa com Legenda -->
          ${doc.imageSrc ? `
            <figure class="newspaper-figure">
              <div class="newspaper-img-frame">
                <img src="${doc.imageSrc}" alt="${doc.title}" class="newspaper-img">
              </div>
              <figcaption class="newspaper-caption">
                📷 <strong>Registro de Imprensa:</strong> ${doc.imageCaption || doc.title}
              </figcaption>
            </figure>
          ` : ''}

          <!-- Corpo do Texto em Colunas de Jornal -->
          <div class="newspaper-body">
            <p>${doc.fullText.replace(/\n\s+/g, '</p><p class="mt-2">')}</p>
          </div>

          <!-- Registro Investigativo (Análise Pedagógica restrita ao Modo Professor) -->
          ${this.teacherMode ? `
            <div class="newspaper-footer-hint bg-amber-950/40 border border-amber-500/40 text-amber-200">
              <strong>🎓 Análise Pedagógica Docente:</strong> ${doc.sourceHint}
            </div>
          ` : `
            <div class="newspaper-footer-hint">
              <strong>📋 Registro de Campo:</strong> Discuta com sua equipe as informações deste documento e confronte-as com as hipóteses formuladas.
            </div>
          `}
          <div class="mt-3 flex justify-end">
            <button class="btn-secondary text-[11px] py-1 px-3 border-cyan-500/40 text-cyan-300 flex items-center gap-1.5" 
              onclick="window.app.switchTab('microfilme'); window.microfilmReader.goToDocFrame('${doc.id}')">
              🎞️ Examinar no Leitor de Microfilmes da Hemeroteca →
            </button>
          </div>
        </article>
      `;
    } else {
      // Estilo Laudo de Laboratório / Boletim Técnico
      return `
        <article class="lab-report-sheet" id="card-${doc.id}">
          <!-- Cabeçalho Oficial do Laudo -->
          <div class="lab-report-header">
            <div class="lab-report-gov-band">
              <span>SISTEMA DE VIGILÂNCIA AMBIENTAL • PROGRAMA DE MONITORAMENTO AQUÁTICO</span>
              <span class="font-mono font-bold">DOC. OFICIAL #${doc.number}</span>
            </div>
            <div class="lab-report-title-row">
              <div class="lab-logo-emblem">🔬</div>
              <div>
                <h2 class="lab-report-institution">${doc.labName || 'LABORATÓRIO DE ANÁLISES AMBIENTAIS & LIMNOLOGIA'}</h2>
                <div class="lab-report-protocol">PROTOCOLO Nº <strong>${doc.protocolNumber || 'LAA-2022-EXP'}</strong> • MATRIZ: ÁGUA FLUVIO-LACUSTRE</div>
              </div>
            </div>
          </div>

          <!-- Carimbo de Homologação Laboratorial -->
          <div class="lab-stamp-seal">
            <span>LAUDO CONFERIDO</span>
            <small>RESULTADO HOMOLOGADO</small>
          </div>

          <!-- Título Oficial do Laudo -->
          <h3 class="lab-report-title">${doc.title}</h3>

          <!-- Imagem Técnica da Lâmina Anexada ao Laudo -->
          ${(doc.imageSrc || doc.image) ? `
            <div class="lab-report-figure-box">
              <div class="lab-report-img-wrapper">
                <img src="${doc.imageSrc || doc.image}" alt="${doc.title}" class="lab-report-img">
                <span class="lab-magnification-stamp">${doc.style === 'inspection-report' ? 'VISTORIA TÉCNICA OFICIAL' : (doc.style === 'veterinary-report' ? 'NECRÓPSIA ICTIOLÓGICA' : (doc.style === 'toxicology-report' ? 'LAUDO TOXICOLÓGICO' : (doc.style === 'monitoring-report' ? 'MONITORAMENTO CONTÍNUO' : (doc.labName && doc.labName.includes('AECP') ? 'DOSSIÊ PERICIAL AECP' : 'EVIDÊNCIA ÓPTICA OFICIAL'))))}</span>
              </div>
              <div class="lab-report-caption">
                ${doc.imageLabel ? `${doc.imageLabel}:` : '🔬 <strong>Registro Pericial:</strong>'} ${doc.imageCaption || doc.title}
              </div>
            </div>
          ` : ''}

          <!-- Tabela de Dados e Evidências Numéricas (quando houver) -->
          ${doc.dados ? `
            <div class="my-3 p-3 rounded-lg bg-slate-950/80 border border-cyan-500/30 font-mono text-xs">
              <div class="text-[10px] uppercase font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span>📊</span> Registros & Dados Telemétricos Oficiais:
              </div>
              <div class="space-y-1 text-slate-300">
                ${Object.entries(doc.dados).map(([k, v]) => `
                  <div class="flex flex-wrap justify-between border-b border-slate-800/80 pb-0.5">
                    <span class="text-slate-400">${k.replace(/_/g, ' ')}:</span>
                    <strong class="text-cyan-200">${typeof v === 'object' ? JSON.stringify(v) : v}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Conteúdo Analítico do Laudo -->
          <div class="lab-report-text">
            ${(doc.fullText || doc.content || doc.summary || '').replace(/\n\s+/g, '<br><br>')}
          </div>

          <!-- Rodapé com Assinatura Técnica e Ressalva -->
          <div class="lab-report-footer">
            <div class="lab-footer-meta">
              <strong>Procedimento:</strong> ${doc.metodo || (doc.labName && doc.labName.includes('AECP') ? 'Protocolo Pericial AECP • Nébula-7' : (doc.style === 'veterinary-report' ? 'Necrópsia Ictiológica e Análise Macroscópica Branquial' : (doc.style === 'monitoring-report' ? 'Sonda Multiparâmetros Telemétrica Contínua' : (doc.style === 'toxicology-report' ? 'Ensaio Imunoenzimático ELISA de Triagem' : 'Triagem Óptica Padronizada (Rede 300 µm)'))))}<br>
              ${this.teacherMode ? `
                <strong class="text-amber-800">🎓 Análise Pedagógica Docente:</strong> <span class="text-amber-900 font-bold">${doc.sourceHint}</span>
              ` : `
                <strong>Registro Pericial:</strong> Interprete os dados analíticos na Ficha correspondente do Caderno de Campo.
              `}
            </div>
            <div class="lab-signature-box">
              <div class="lab-sign-line"></div>
              <div class="text-[10px] font-bold text-slate-900">${(doc.labName && doc.labName.includes('AECP')) ? 'Cmdte. V. Kaelen' : 'Dra. M. V. Sampaio'}</div>
              <div class="text-[9px] text-slate-600 font-mono">${(doc.labName && doc.labName.includes('AECP')) ? 'Inspetor Científico • AECP 2189' : 'Bióloga Responsável • CRBio 42.119'}</div>
            </div>
          </div>
        </article>
      `;
    }
  }

  renderQuestionInput(q, qIdx) {
    const savedVal = this.studentAnswers[q.id] || '';

    if (q.type === 'textarea') {
      return `
        <div class="question-block" id="block-${q.id}">
          <label class="question-label">${q.label}</label>
          <textarea class="lab-textarea" rows="4" 
            placeholder="${q.placeholder || 'Digite a resposta fundamentada da sua equipe...'}"
            oninput="window.app.saveAnswer('${q.id}', this.value)">${savedVal}</textarea>
          ${this.teacherMode && q.expectedHint ? `
            <div class="teacher-answer-peek mt-2 p-2 rounded bg-amber-950/60 border border-amber-600/40 text-xs text-amber-200">
              <strong>Gabarito Esperado:</strong> ${q.expectedHint}
            </div>
          ` : ''}
        </div>
      `;
    }

    if (q.type === 'dual_hypothesis') {
      const hipA = (this.studentAnswers[q.id] && this.studentAnswers[q.id].hip_a) || '';
      const hipB = (this.studentAnswers[q.id] && this.studentAnswers[q.id].hip_b) || '';
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div class="p-3 bg-slate-900/60 rounded-lg border border-slate-700">
              <span class="text-xs font-bold text-cyan-400 block mb-1">Hipótese A:</span>
              <textarea class="lab-textarea" rows="3" 
                placeholder="Ex: Resíduos oriundos da fábrica têxtil..."
                oninput="window.app.saveNestedAnswer('${q.id}', 'hip_a', this.value)">${hipA}</textarea>
            </div>
            <div class="p-3 bg-slate-900/60 rounded-lg border border-slate-700">
              <span class="text-xs font-bold text-amber-400 block mb-1">Hipótese B:</span>
              <textarea class="lab-textarea" rows="3" 
                placeholder="Ex: Resíduos carreados pelo esgoto urbano ou enxurrada..."
                oninput="window.app.saveNestedAnswer('${q.id}', 'hip_b', this.value)">${hipB}</textarea>
            </div>
          </div>
        </div>
      `;
    }

    if (q.type === 'table_compare') {
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          <div class="overflow-x-auto mt-2">
            <table class="w-full text-xs text-left border border-slate-700 rounded-lg overflow-hidden">
              <thead class="bg-slate-800 text-slate-300">
                <tr>
                  <th class="p-2.5">Critério de Investigação</th>
                  <th class="p-2.5 text-cyan-300">Indústria Têxtil Aurora</th>
                  <th class="p-2.5 text-amber-300">Esgoto Residencial</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800 bg-slate-900/50">
                ${q.rows.map(r => `
                  <tr>
                    <td class="p-2.5 font-semibold text-slate-300">${r.label}</td>
                    <td class="p-2.5 text-slate-400 font-mono">${r.industrial}</td>
                    <td class="p-2.5 text-slate-400 font-mono">${r.domestic}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (q.type === 'calc') {
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          ${q.formula ? `<div class="text-xs text-cyan-400 font-mono mb-2 p-2 bg-slate-900 rounded border border-cyan-500/20">Fórmula: ${q.formula}</div>` : ''}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            ${q.fields.map(f => {
              const fVal = (this.studentAnswers[q.id] && this.studentAnswers[q.id][f.key]) || '';
              return `
                <div class="p-2.5 bg-slate-900/70 border border-slate-700 rounded-lg">
                  <span class="text-xs text-slate-400 block mb-1">${f.label}</span>
                  <input type="text" class="lab-input font-mono" value="${fVal}" 
                    placeholder="Digite o valor..."
                    oninput="window.app.saveNestedAnswer('${q.id}', '${f.key}', this.value)">
                  ${this.teacherMode && f.answer ? `
                    <span class="text-[10px] text-emerald-400 block mt-1 font-mono">Gabarito: ${f.answer}</span>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (q.type === 'chart_builder') {
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 mt-2">
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-sm font-bold text-slate-200">Partículas por Litro de Água (Boletim Técnico 2022)</h4>
              <span class="text-xs text-slate-400 font-mono">Unidade: part/L</span>
            </div>
            <div class="w-full h-56 flex items-center justify-center">
              <canvas id="monitoring-canvas" width="600" height="220" class="max-w-full"></canvas>
            </div>
          </div>
        </div>
      `;
    }

    if (q.type === 'microscope_task') {
      return `
        <div class="question-block p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
          <div class="flex justify-between items-center mb-2">
            <span class="badge-tag-cyan text-xs">🔬 Prática Laboratorial</span>
            <button class="btn-primary text-xs py-1 px-3" onclick="window.app.switchTab('microscopio')">
              Abrir Bancada do Microscópio →
            </button>
          </div>
          <h4 class="font-bold text-white text-sm mb-1">${q.label}</h4>
          <p class="text-xs text-slate-300">${q.instruction}</p>
        </div>
      `;
    }

    if (q.type === 'evidence_matrix') {
      return this.renderEvidenceMatrixInput(q);
    }

    if (q.type === 'intervention_plan') {
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            ${q.fields.map(f => {
              const val = (this.studentAnswers[q.id] && this.studentAnswers[q.id][f.key]) || '';
              return `
                <div class="p-3 bg-slate-900 rounded-lg border border-slate-700">
                  <label class="text-xs font-bold text-cyan-400 block mb-1">${f.label}</label>
                  <textarea class="lab-textarea" rows="2" placeholder="${f.placeholder}"
                    oninput="window.app.saveNestedAnswer('${q.id}', '${f.key}', this.value)">${val}</textarea>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (q.type === 'self_assessment_rubric') {
      return `
        <div class="question-block">
          <label class="question-label">${q.label}</label>
          <div class="space-y-2 mt-3">
            ${q.criteria.map((c, cIdx) => {
              const sel = this.selfAssessment[cIdx] || '';
              return `
                <div class="flex flex-wrap justify-between items-center p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <span class="text-slate-300 flex-1 pr-4">${cIdx + 1}. ${c}</span>
                  <div class="flex items-center gap-2">
                    ${['Sim', 'Parcialmente', 'Não'].map(opt => `
                      <button class="rubric-btn ${sel === opt ? 'rubric-selected' : ''}" 
                        onclick="window.app.saveSelfAssessment(${cIdx}, '${opt}')">
                        ${opt}
                      </button>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    if (q.type === 'checklist') {
      const savedList = (this.studentAnswers[q.id] && Array.isArray(this.studentAnswers[q.id])) ? this.studentAnswers[q.id] : [];
      return `
        <div class="question-block" id="block-${q.id}">
          <label class="question-label">${q.label}</label>
          <div class="space-y-2.5 mt-3">
            ${(q.options || []).map((opt, oIdx) => {
              const isChecked = savedList.includes(oIdx);
              return `
                <label class="flex items-center gap-3 p-2.5 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-700/80 rounded-lg cursor-pointer transition">
                  <input type="checkbox" class="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-600 bg-slate-800" 
                    ${isChecked ? 'checked' : ''}
                    onchange="window.app.toggleChecklistOption('${q.id}', ${oIdx})">
                  <span class="text-xs text-slate-200 leading-relaxed">${opt}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Fallback universal para qualquer formato de questão
    return `
      <div class="question-block" id="block-${q.id}">
        <label class="question-label">${q.label || q.prompt || `Questão ${qIdx + 1}`}</label>
        <textarea class="lab-textarea" rows="4" 
          placeholder="${q.placeholder || q.guidance || 'Digite a resposta fundamentada da sua equipe...'}"
          oninput="window.app.saveAnswer('${q.id}', this.value)">${savedVal}</textarea>
        ${this.teacherMode && (q.expectedHint || q.rubric) ? `
          <div class="teacher-answer-peek mt-2 p-2 rounded bg-amber-950/60 border border-amber-600/40 text-xs text-amber-200">
            <strong>Gabarito Esperado:</strong> ${q.expectedHint || q.rubric}
          </div>
        ` : ''}
      </div>
    `;
  }

  toggleChecklistOption(questionId, optIndex) {
    let list = this.studentAnswers[questionId];
    if (!Array.isArray(list)) list = [];
    if (list.includes(optIndex)) {
      list = list.filter(i => i !== optIndex);
    } else {
      list.push(optIndex);
    }
    this.saveAnswer(questionId, list);
  }

  // ==========================================
  // MATRIZ DE EVIDÊNCIAS INTERATIVA (FASE 7)
  // ==========================================
  renderEvidenceMatrixInput(q) {
    return `
      <div class="question-block">
        <div class="flex justify-between items-center mb-2">
          <label class="question-label">${q.label}</label>
          <div class="flex gap-2 text-[10px] font-mono">
            <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">F: Favorece</span>
            <span class="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/40">E: Enfraquece</span>
            <span class="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40">I: Inconclusivo</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border border-slate-700 rounded-xl overflow-hidden matrix-table">
            <thead class="bg-slate-800 text-slate-300 text-[11px]">
              <tr>
                <th class="p-2 border-b border-r border-slate-700">Documento Oficial</th>
                ${q.hypotheses.map(h => `
                  <th class="p-2 border-b border-r border-slate-700 text-center font-bold text-cyan-300">${h}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 bg-slate-900/80">
              ${q.rows.map((row, rIdx) => `
                <tr>
                  <td class="p-2 font-semibold text-slate-200 border-r border-slate-800">${row.docTitle}</td>
                  ${q.hypotheses.map((h, hIdx) => {
                    const key = `${row.docId}_${hIdx}`;
                    const currentVal = this.evidenceMatrix[key] || row.defaults[hIdx] || 'I';
                    return `
                      <td class="p-1.5 text-center border-r border-slate-800">
                        <button class="matrix-cell-btn cell-${currentVal}" 
                          title="Clique para alternar F / E / I"
                          onclick="window.app.cycleMatrixCell('${key}')">
                          ${currentVal}
                        </button>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  cycleMatrixCell(key) {
    this.playSound('click');
    const order = ['F', 'E', 'I'];
    const current = this.evidenceMatrix[key] || 'F';
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    this.evidenceMatrix[key] = order[nextIdx];
    this.saveToStorage();
    this.renderPhase(this.currentPhaseIndex);
  }

  saveSelfAssessment(idx, val) {
    this.playSound('click');
    this.selfAssessment[idx] = val;
    this.saveToStorage();
    this.renderPhase(this.currentPhaseIndex);
  }

  // Gráfico da Aula 4 no Canvas
  renderMonitoringChart() {
    const canvas = document.getElementById('monitoring-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const data = [
      { label: 'Ponto A (Montante)', val: 6, color: '#10b981' },
      { label: 'Ponto B (Residencial)', val: 18, color: '#3b82f6' },
      { label: 'Ponto C (Indústria)', val: 47, color: '#ef4444' },
      { label: 'Ponto D (Rodovia)', val: 39, color: '#f59e0b' },
      { label: 'Ponto E (Lago Azul)', val: 28, color: '#8b5cf6' }
    ];

    const maxVal = 55;
    const padL = 50;
    const padB = 40;
    const padT = 20;
    const padR = 20;
    const chartW = w - padL - padR;
    const chartH = h - padB - padT;

    // Linhas de grade
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';

    for (let v = 0; v <= 50; v += 10) {
      const y = padT + chartH - (v / maxVal) * chartH;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();
      ctx.fillText(`${v}`, padL - 8, y + 3);
    }

    // Barras
    const barW = chartW / data.length - 24;
    data.forEach((d, i) => {
      const x = padL + i * (chartW / data.length) + 12;
      const barH = (d.val / maxVal) * chartH;
      const y = padT + chartH - barH;

      // Barra com degradê
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, d.color);
      grad.addColorStop(1, `${d.color}66`);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, barH);
      ctx.strokeStyle = d.color;
      ctx.strokeRect(x, y, barW, barH);

      // Valor no topo
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${d.val}`, x + barW / 2, y - 5);

      // Rótulo
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Pt ${String.fromCharCode(65 + i)}`, x + barW / 2, h - 22);
    });
  }

  // ==========================================
  // BANCADA DO MICROSCÓPIO (PRATELEIRA DE LÂMINAS)
  // ==========================================
  renderSlidesShelf() {
    const shelfEl = document.getElementById('micro-slides-shelf');
    if (!shelfEl || !this.currentData) return;

    const slidesList = this.currentData.slides || [];
    const slidesHtml = slidesList.map(slide => `
      <div class="slide-item-card ${window.microscope && window.microscope.currentSlide && window.microscope.currentSlide.id === slide.id ? 'active-slide' : ''}" 
        onclick="window.app.loadSlideIntoMicroscope('${slide.id}')">
        <div class="slide-thumb-wrap">
          <img src="${slide.thumb}" alt="${slide.title}" class="slide-thumb">
          <span class="slide-badge">${slide.code}</span>
        </div>
        <div class="slide-info">
          <div class="slide-title-text">${slide.title}</div>
          <div class="slide-cat-text">${slide.category} • ${slide.count}</div>
        </div>
      </div>
    `).join('');

    // Botão para carregar novas lâminas dinamicamente
    const uploadBtnHtml = `
      <div class="mt-3 pt-3 border-t border-slate-800">
        <input type="file" id="input-new-slide-file" accept="image/*" style="display: none;" onchange="window.app.handleNewSlideUpload(event)">
        <button class="btn-secondary w-full text-xs py-2 justify-center border-dashed border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/30 flex items-center gap-1.5" 
          onclick="document.getElementById('input-new-slide-file').click()">
          <span>➕</span> Carregar Nova Lâmina (Arquivo)
        </button>
      </div>
    `;

    shelfEl.innerHTML = slidesHtml + uploadBtnHtml;
  }

  handleNewSlideUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file || !this.currentData) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const num = (this.currentData.slides || []).length + 1;
      const title = prompt('Digite o título para esta nova lâmina:', `Lâmina 0${num}: Amostra Adicionada`);
      if (!title) return;

      const newSlide = {
        id: 'slide_custom_' + Date.now(),
        code: `LÂMINA 0${num}`,
        title: title,
        location: 'Amostra de Bancada',
        category: 'Lâmina Adicionada',
        src: dataUrl,
        thumb: dataUrl,
        count: 'Nova Preparação',
        typeText: 'Amostra carregada pelo pesquisador',
        description: 'Lâmina personalizada adicionada ao arquivo do laboratório.',
        scaleMicronsPerPixel: 0.15,
        uvFluorescence: true
      };

      if (!this.currentData.slides) this.currentData.slides = [];
      this.currentData.slides.push(newSlide);
      this.saveCustomSlides();
      this.renderSlidesShelf();
      this.loadSlideIntoMicroscope(newSlide.id);
      this.playSound('focus_snap');
      alert(`Lâmina "${title}" montada na platina do microscópio com sucesso!`);
    };
    reader.readAsDataURL(file);
  }

  saveCustomSlides() {
    if (!this.currentData || !this.currentData.slides) return;
    const customSlides = this.currentData.slides.filter(s => s.id.startsWith('slide_custom_'));
    try {
      localStorage.setItem(`biolab_custom_slides_${this.activeChallengeId}`, JSON.stringify(customSlides));
    } catch(e) {
      console.warn('LocalStorage limit for images:', e);
    }
  }

  loadCustomSlides() {
    try {
      const saved = localStorage.getItem(`biolab_custom_slides_${this.activeChallengeId}`);
      if (saved && this.currentData) {
        const list = JSON.parse(saved);
        if (!this.currentData.slides) this.currentData.slides = [];
        list.forEach(item => {
          if (!this.currentData.slides.some(s => s.id === item.id)) {
            this.currentData.slides.push(item);
          }
        });
      }
    } catch(e) {}
  }

  async checkServerForNewSlides() {
    // Isolamento estrito entre packs de missão: nenhum arquivo arbitrário do servidor é injetado nas lâminas oficiais.
    return;
  }

  loadSlideIntoMicroscope(slideId) {
    this.playSound('click');
    if (!this.currentData || !this.currentData.slides) return;
    const slide = this.currentData.slides.find(s => s.id === slideId || 
      (slideId === 'slide_d4_1' && (s.id === 'slide_d4_1' || s.id === 'slide_d2_1')) ||
      (slideId === 'slide_d2_1' && (s.id === 'slide_d4_1' || s.id === 'slide_d2_1')) ||
      (slideId === 'slide_d4_2' && (s.id === 'slide_d4_2' || s.id === 'slide_d2_2')) ||
      (slideId === 'slide_d2_2' && (s.id === 'slide_d4_2' || s.id === 'slide_d2_2')));
    if (slide && window.microscope) {
      window.microscope.loadSlide(slide);
      this.renderSlidesShelf();

      // Atualizar informações do slide no painel lateral
      const infoBox = document.getElementById('current-slide-dossier');
      if (infoBox) {
        infoBox.innerHTML = `
          <div class="p-3 bg-slate-900/80 rounded-xl border border-slate-700">
            <div class="flex justify-between items-center mb-1">
              <span class="badge-tag-cyan text-[10px]">${slide.code}</span>
              <span class="text-xs text-amber-400 font-mono">${slide.count}</span>
            </div>
            <h4 class="font-bold text-white text-xs mb-1">${slide.title}</h4>
            <p class="text-[11px] text-slate-300 leading-relaxed mb-2">${slide.description}</p>
            <div class="text-[10px] text-slate-400 font-mono">
              📍 Localização: ${slide.location}<br>
              🔬 Amostra: ${slide.typeText}
            </div>
          </div>
        `;
      }
    }
  }

  captureMicroscopeSnapshot() {
    if (!window.microscope) return;
    this.playSound('shutter');
    const note = prompt('Digite uma anotação de campo para esta fotomicrografia:', 'Partículas identificadas sob microscopia.');
    const snap = window.microscope.takeSnapshot(note);
    if (snap) {
      this.saveToStorage();
      this.renderSnapshotsGallery();
      alert('Fotomicrografia registrada com sucesso no Caderno de Investigação!');
    }
  }

  renderSnapshotsGallery() {
    const galEl = document.getElementById('micro-snapshots-container');
    if (!galEl || !window.microscope) return;

    if (window.microscope.snapshots.length === 0) {
      galEl.innerHTML = '<div class="text-xs text-slate-500 italic">Nenhuma fotomicrografia capturada ainda.</div>';
      return;
    }

    galEl.innerHTML = window.microscope.snapshots.map(s => `
      <div class="snapshot-polaroid">
        <img src="${s.dataUrl}" alt="Fotomicrografia">
        <div class="p-2">
          <div class="font-bold text-[11px] text-slate-200">${s.slideCode} • ${s.objective}</div>
          <div class="text-[10px] text-slate-400">${s.timestamp}</div>
          <p class="text-[10px] text-slate-300 mt-1 italic">"${s.note}"</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // MAPA CARTOGRÁFICO INTERATIVO
  // ==========================================
  renderInteractiveMap() {
    if (this.activeChallengeId === 'desafio-2') {
      this.renderInteractiveMapDesafio2();
    } else if (this.activeChallengeId === 'desafio-4') {
      this.renderInteractiveMapDesafio4();
    } else {
      this.renderInteractiveMapDesafio1();
    }
  }

  renderInteractiveMapDesafio1() {
    const mapContainer = document.getElementById('interactive-map-container');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-wrapper relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Bacia Hidrográfica do Rio das Palmeiras (Vale Verde) • Desafio 01
            </h3>
            <p class="text-xs text-slate-400">
              Clique nos pontos das estações de monitoramento e instalações humanas para inspecionar os dossiês ambientais de microplásticos.
            </p>
          </div>
          <div class="map-legend flex gap-3 text-xs font-mono">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Controle</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Indústria</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Rodovia/Pneus</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Residencial</span>
          </div>
        </div>

        <!-- Desenho Cartográfico Vetorial SVG Interativo -->
        <div class="relative w-full aspect-[16/9] max-h-[500px] bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 900 500" class="w-full h-full">
            <defs>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="50%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
              </linearGradient>
            </defs>

            <!-- Terreno e Relevo -->
            <rect width="900" height="500" fill="#0f172a" />
            
            <!-- Mata Ciliar e Montanhas de Montante -->
            <circle cx="80" cy="80" r="70" fill="#064e3b" opacity="0.4" />
            <circle cx="160" cy="50" r="50" fill="#064e3b" opacity="0.4" />
            <text x="80" y="50" fill="#34d399" font-size="12" font-family="sans-serif">Serra das Palmeiras</text>

            <!-- Rodovia dos Ipês (Cinza) -->
            <path d="M 120 480 Q 420 380 780 20" stroke="#475569" stroke-width="16" fill="none" stroke-dasharray="10 6"/>
            <text x="460" y="320" fill="#94a3b8" font-size="11" font-family="monospace" transform="rotate(-30 460 320)">Rodovia dos Ipês (Tráfego Pesado)</text>

            <!-- Canal de Drenagem da Rodovia -->
            <path d="M 520 280 L 520 220" stroke="#f59e0b" stroke-width="4" stroke-dasharray="4 3" fill="none"/>

            <!-- Rio das Palmeiras (Curvas Hidrográficas) -->
            <path d="M 40 70 C 180 80, 220 240, 360 220 S 540 220, 650 300 S 760 360, 840 400" 
              stroke="url(#riverGrad)" stroke-width="32" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            
            <!-- Afluente Residencial Córrego dos Ipês -->
            <path d="M 280 440 Q 320 320 360 220" stroke="#0ea5e9" stroke-width="12" fill="none" stroke-linecap="round"/>
            <text x="260" y="380" fill="#7dd3fc" font-size="10" font-family="sans-serif">Córrego dos Ipês (Esgoto)</text>

            <!-- Lago Azul (Corpo Léntico) -->
            <ellipse cx="820" cy="400" rx="90" ry="70" fill="#0369a1" opacity="0.85"/>
            <text x="790" y="405" fill="#e0f2fe" font-weight="bold" font-size="13" font-family="sans-serif">Lago Azul</text>

            <!-- Pontos de Monitoramento (Marcadores Clicáveis) -->
            <!-- Ponto A -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('ponto_a')">
              <circle cx="100" cy="75" r="14" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
              <text x="100" y="80" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">A</text>
              <text x="100" y="105" fill="#34d399" font-size="10" text-anchor="middle">Pt A (6 part/L)</text>
            </g>

            <!-- Ponto B (Residencial) -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('ponto_b')">
              <circle cx="340" cy="220" r="14" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <text x="340" y="225" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">B</text>
              <text x="340" y="248" fill="#93c5fd" font-size="10" text-anchor="middle">Pt B (18 part/L)</text>
            </g>

            <!-- Têxtil Aurora (Fábrica) -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('fabrica')">
              <rect x="420" y="110" width="70" height="50" rx="6" fill="#be123c" stroke="#f43f5e" stroke-width="2"/>
              <text x="455" y="135" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">Têxtil</text>
              <text x="455" y="148" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">Aurora</text>
              <!-- Duto de Efluente da Fábrica -->
              <path d="M 455 160 L 455 220" stroke="#f43f5e" stroke-width="4" stroke-dasharray="4 2"/>
            </g>

            <!-- Ponto C (Jusante Industrial) -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('ponto_c')">
              <circle cx="455" cy="220" r="16" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <text x="455" y="225" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">C</text>
              <text x="455" y="252" fill="#fca5a5" font-weight="bold" font-size="10" text-anchor="middle">Pt C (47 part/L)</text>
            </g>

            <!-- Ponto D (Rodovia) -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('ponto_d')">
              <circle cx="560" cy="240" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
              <text x="560" y="245" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">D</text>
              <text x="560" y="270" fill="#fde68a" font-size="10" text-anchor="middle">Pt D (39 part/L)</text>
            </g>

            <!-- Ponto E (Lago) -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('ponto_e')">
              <circle cx="760" cy="360" r="14" fill="#8b5cf6" stroke="#ffffff" stroke-width="2"/>
              <text x="760" y="365" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">E</text>
              <text x="760" y="388" fill="#ddd6fe" font-size="10" text-anchor="middle">Pt E (28 part/L)</text>
            </g>
          </svg>
        </div>

        <div id="map-popup-dossier" class="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 hidden"></div>
      </div>
    `;
  }

  renderInteractiveMapDesafio4() {
    const mapContainer = document.getElementById('interactive-map-container');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-wrapper relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Bacia Hidrográfica do Lago Azul & Vale Verde • Desafio 04
            </h3>
            <p class="text-xs text-slate-400">
              Inspecione as estações de monitoramento limnológico e as fontes potenciais de nutrientes da bacia do Lago Azul.
            </p>
          </div>
          <div class="map-legend flex gap-3 text-xs font-mono">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Floração / Lago</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Canal Agrícola</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Esgoto Vila Nova</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span> Captação ETA</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Ictiopatologia</span>
          </div>
        </div>

        <!-- Desenho Cartográfico Vetorial SVG Interativo do Lago Azul -->
        <div class="relative w-full aspect-[16/9] max-h-[500px] bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 900 500" class="w-full h-full">
            <defs>
              <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="40%" stop-color="#059669"/>
                <stop offset="100%" stop-color="#047857"/>
              </linearGradient>
              <radialGradient id="bloomGlow" cx="45%" cy="50%" r="55%">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.85"/>
                <stop offset="50%" stop-color="#047857" stop-opacity="0.7"/>
                <stop offset="85%" stop-color="#991b1b" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#0369a1" stop-opacity="0.3"/>
              </radialGradient>
            </defs>

            <!-- Terreno de Fundo -->
            <rect width="900" height="500" fill="#0b1329" />

            <!-- Relevo e Morros da Bacia -->
            <circle cx="120" cy="80" r="90" fill="#064e3b" opacity="0.3" />
            <circle cx="280" cy="60" r="70" fill="#064e3b" opacity="0.3" />
            <text x="70" y="50" fill="#34d399" font-size="11" font-family="sans-serif">Encostas Agrícolas (Hortaliças e NPK)</text>

            <!-- Zona Urbana Bairro Vila Nova -->
            <rect x="520" y="50" width="170" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
            <text x="605" y="75" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">Bairro Vila Nova</text>
            <text x="605" y="92" fill="#64748b" font-size="9" text-anchor="middle">(Esgoto Clandestino / Galerias Pluviais)</text>

            <!-- Criatório e Granjas -->
            <rect x="360" y="70" width="120" height="60" rx="6" fill="#78350f" opacity="0.4" stroke="#d97706" stroke-width="1.5"/>
            <text x="420" y="95" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Granja Suína / Aves</text>
            <text x="420" y="110" fill="#f59e0b" font-size="8" text-anchor="middle">(Esterqueiras a 40m de nascentes)</text>

            <!-- Canal de Drenagem Norte -->
            <path d="M 180 120 Q 300 180 440 200 T 560 260" stroke="#f59e0b" stroke-width="8" fill="none" stroke-linecap="round"/>
            <path d="M 520 130 L 520 230 L 560 260" stroke="#38bdf8" stroke-width="5" fill="none" stroke-dasharray="6 3"/>
            <text x="300" y="170" fill="#fde68a" font-size="10" font-family="monospace">Canal de Drenagem Norte (P = 0,31 mg/L)</text>

            <!-- Lago Azul (Corpo Léntico Central com Mancha de Floração) -->
            <path d="M 460 250 C 600 220 840 240 860 380 C 870 460 680 480 520 460 C 420 440 380 340 460 250 Z" 
              fill="url(#lakeGrad)" stroke="#38bdf8" stroke-width="3"/>
            
            <!-- Mancha de Floração e Anóxia na Enseada Rasa -->
            <ellipse cx="580" cy="340" rx="130" ry="65" fill="url(#bloomGlow)"/>
            <text x="580" y="340" fill="#ecfdf5" font-weight="black" font-size="13" text-anchor="middle">Lago Azul • Enseada Rasa</text>
            <text x="580" y="356" fill="#a7f3d0" font-size="10" text-anchor="middle">Floração de Cianobactérias (85.000 cél/mL)</text>

            <!-- Pontos Clicáveis -->
            <!-- Ponto 1: Lago Enseada Central -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('lago_enseada')">
              <circle cx="580" cy="385" r="16" fill="#10b981" stroke="#ffffff" stroke-width="2.5"/>
              <text x="580" y="390" fill="#ffffff" font-weight="bold" font-size="12" text-anchor="middle">01</text>
              <text x="580" y="415" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Enseada (OD: 0,8 mg/L)</text>
            </g>

            <!-- Ponto 2: Canal Agrícola -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('canal_agricola')">
              <circle cx="280" cy="175" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
              <text x="280" y="180" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">02</text>
              <text x="280" y="202" fill="#fde68a" font-size="10" text-anchor="middle">Canal Norte (Fertilizantes)</text>
            </g>

            <!-- Ponto 3: Esgoto Vila Nova -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('bairro_esgoto')">
              <circle cx="620" cy="140" r="14" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
              <text x="620" y="145" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">03</text>
              <text x="620" y="168" fill="#93c5fd" font-size="10" text-anchor="middle">Vila Nova (Esgoto Doméstico)</text>
            </g>

            <!-- Ponto 4: Captação ETA Sul -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('eta_captacao')">
              <circle cx="780" cy="420" r="14" fill="#06b6d4" stroke="#ffffff" stroke-width="2"/>
              <text x="780" y="425" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">04</text>
              <text x="780" y="448" fill="#67e8f9" font-size="10" text-anchor="middle">Captação ETA (Toxina 2,4 µg/L)</text>
            </g>

            <!-- Ponto 5: Laboratório de Necrópsia -->
            <g class="cursor-pointer group" onclick="window.app.openMapPopup('lab_necropsia')">
              <circle cx="430" cy="420" r="14" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <text x="430" y="425" fill="#ffffff" font-weight="bold" font-size="11" text-anchor="middle">05</text>
              <text x="430" y="448" fill="#fca5a5" font-size="10" text-anchor="middle">Ictiopatologia (Asfixia Branquial)</text>
            </g>
          </svg>
        </div>

        <div id="map-popup-dossier" class="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 hidden"></div>
      </div>
    `;
  }

  openMapPopup(pointKey) {
    this.playSound('click');
    const dossier = document.getElementById('map-popup-dossier');
    if (!dossier) return;

    const mapData = {
      // Pontos do Desafio 02 (Projeto ÉDEN - Nébula-7)
      floresta_cristalina: {
        title: '🌲 Floresta Cristalina • Zona de Bioinvasão Crítica',
        count: 'Nexovora: 62% cobertura do dossel • Declínio Lumivora: -58% • Bioma sob Risco',
        slideId: null,
        docId: 'doc-e01',
        text: 'Ecossistema outrora equilibrado com alta diversidade trófica. A proliferação descontrolada do biofilme epifítico de Nexovora rapidans causou sombreamento e asfixia mecânica em Lumivora, desencadeando colapso trófico em cascata sobre Virex, Thalor e Aerion.'
      },
      pantano_veyra: {
        title: '🌾 Pântano de Veyra • Ecossistema Nativo de Origem',
        count: 'Nexovora: 8% (Estável) • Veyrathus: 42 ind/ha (Controle Natural) • Salinidade Moderada',
        slideId: null,
        docId: 'doc-e04',
        text: 'Bioma nativo de onde Nexovora se originou há milênios. No pântano úmido, Nexovora coexiste em equilíbrio com o consumidor biológico especializado Veyrathus, além de estar adaptada a águas ricas em ferro e silicato.'
      },
      rota_mineracao: {
        title: '🚚 Rota de Mineração Veyra-Cristalina • Vetor de Dispersão Antrópica',
        count: '185 km de extensão terrestre • 24 comboios/dia • Biofilmes em rodas, eixos e tanques de lama',
        slideId: null,
        docId: 'doc-e03',
        text: 'Caminhões pesados e tanques de transbordo de águas minerais entre a mineradora de Veyra e as fundições da Floresta Cristalina transportaram esporos e fragmentos viáveis de Nexovora sem qualquer protocolo de contenção ou quarentena.'
      },
      base_aecp: {
        title: '🛰️ Base Científica ÉDEN • Agência Espacial de Controle Planetário (AECP)',
        count: 'Operação ÉDEN • 12 Relatórios Técnicos • 9 Fases Ativas • Carga Horária: 405 min',
        slideId: null,
        docId: 'doc-e02',
        text: 'Quartel-general das equipes de investigação da AECP. Equipada com cromatógrafos, microscópios de varredura planetária e simuladores de perturbação trófica para desenhar a intervenção ecológica de restauração.'
      },
      // Pontos do Desafio 01
      ponto_a: {
        title: 'Estação de Monitoramento A • Montante (Controle)',
        count: '6 partículas por litro',
        slideId: 'slide_ponto_a',
        docId: 'doc-1',
        text: 'Área com cobertura de mata ciliar nativa preservada. Ausência de descarte industrial ou residencial. Serve como linha de base (controle experimental) da bacia.'
      },
      ponto_b: {
        title: 'Estação de Monitoramento B • Bairro Residencial / Esgoto',
        count: '18 partículas por litro (+12 sobre o controle)',
        slideId: 'slide_ponto_b',
        docId: 'doc-3',
        text: 'Trecho impactado pela ligação clandestina de esgoto não tratado de 3 mil habitantes. Alta presença de microfibras oriundas da lavagem de roupas sintéticas.'
      },
      fabrica: {
        title: 'Fábrica Têxtil Aurora (Unidade Industrial)',
        count: 'Capacidade ampliada em 35%',
        slideId: 'slide_ponto_c',
        docId: 'doc-2',
        text: 'Instalação a 400 m do rio especializada em vestuário esportivo de poliéster e poliamida. Em 2024, instalou sistema de ultrafiltração reduzindo em 53,2% sua carga.'
      },
      ponto_c: {
        title: 'Estação de Monitoramento C • Jusante Imediata da Fábrica',
        count: '47 part/L (Antes do Filtro) → 22 part/L (Depois do Filtro)',
        slideId: 'slide_ponto_c',
        docId: 'doc-6',
        text: 'Ponto com a maior contagem inicial da bacia. A queda expressiva para 22 part/L após os filtros comprovou a contribuição da fábrica, mas os 22 residuais provam que ela não era a única poluidora.'
      },
      ponto_d: {
        title: 'Estação de Monitoramento D • Rodovia dos Ipês',
        count: '39 partículas por litro',
        slideId: 'slide_ponto_d',
        docId: 'doc-7',
        text: 'Receptor das águas de drenagem pluvial da rodovia com fluxo de 15 mil veículos/dia. Dominância morfológica de grânulos pretos angulares de desgaste de borracha de pneus.'
      },
      ponto_e: {
        title: 'Estação de Monitoramento E • Desembocadura no Lago Azul',
        count: '28 partículas por litro',
        slideId: 'slide_ponto_e',
        docId: 'doc-8',
        text: 'Área lêntica onde o escoamento diminui de velocidade. Ocorre diluição pelo volume do lago, sedimentação das partículas no lodo do fundo e ingestão por peixes e plâncton.'
      },

      // Pontos do Desafio 04 / 02
      lago_enseada: {
        title: 'Estação Central • Enseada Rasa do Lago Azul (Zona da Mancha & Anóxia)',
        count: 'Microcystis: 85.000 cél/mL • OD às 04h: 0,8 mg/L • Microcistina: 2,4 µg/L',
        slideId: 'slide_d4_1',
        docId: 'doc-201',
        text: 'Área límnica rasa com densa mancha verde-azulada e avermelhada. Notou-se mortandade concentrada na madrugada entre 4h e 6h. A sonda registrou supersaturação diurna (14,2 mg/L) e anóxia noturna crítica (0,8 mg/L).'
      },
      canal_agricola: {
        title: 'Canal de Drenagem Norte • Foz Tributária da Zona Agrícola',
        count: 'Fósforo Total: 0,31 mg/L • Nitrato: 1,85 mg/L • Ortofosfato: 0,19 mg/L',
        slideId: null,
        docId: 'doc-203',
        text: 'Principal vetor de entrada de nutrientes no Lago Azul. Drena encostas agrícolas com cultivo intensivo de hortaliças e grãos onde há aplicação de adubos NPK e solo exposto a erosão pós-chuvas.'
      },
      bairro_esgoto: {
        title: 'Bairro Vila Nova • Rede de Galerias e Esgoto Residencial',
        count: 'Amônio: 0,72 mg/L • Fósforo de detergentes • Matéria Orgânica',
        slideId: null,
        docId: 'doc-204',
        text: 'Núcleo urbano com ligações clandestinas de esgoto doméstico despejando em galerias pluviais que desembocam no canal tributário. Fonte contínua de fósforo presente em sabões e matéria orgânica fecal.'
      },
      eta_captacao: {
        title: 'Estação de Captação e Tratamento de Água (ETA Enseada Sul)',
        count: 'Microcistina na Captação: 2,4 µg/L (VMP Portaria MS 888: 1,0 µg/L)',
        slideId: null,
        docId: 'doc-207',
        text: 'Ponto municipal de captação de água potável. O teste ELISA acusou níveis de microcistina superiores ao padrão máximo de potabilidade (1,0 µg/L), exigindo monitoramento urgente e suspensão preventiva.'
      },
      lab_necropsia: {
        title: 'Laboratório de Ecotoxicologia e Ictiopatologia',
        count: '35 espécimes examinados (Tilápias, Lambaris, Traíras)',
        slideId: 'slide_d4_2',
        docId: 'doc-209',
        text: 'Necrópsia revelou opérculos abertos e intensa hiperplasia e edema nas lamelas branquiais, compatíveis com asfixia aguda por anóxia noturna na madrugada somada a estresse tecidual por cianobactérias.'
      }
    };

    const item = mapData[pointKey];
    if (!item) return;

    dossier.classList.remove('hidden');
    dossier.innerHTML = `
      <div class="flex flex-wrap justify-between items-start gap-4">
        <div class="flex-1 min-w-[280px]">
          <h4 class="font-bold text-white text-sm mb-1">${item.title}</h4>
          <span class="text-xs text-cyan-400 font-mono block mb-2">📊 Concentração / Indicadores: ${item.count}</span>
          <p class="text-xs text-slate-300 leading-relaxed">${item.text}</p>
        </div>
        <div class="flex flex-col gap-2">
          ${item.slideId ? `
            <button class="btn-primary text-xs py-1.5 px-3 whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 font-bold" 
              onclick="window.app.switchTab('microscopio'); window.app.loadSlideIntoMicroscope('${item.slideId}')">
              🔬 Ver Lâmina no Microscópio →
            </button>
          ` : ''}
          ${item.docId ? `
            <button class="btn-secondary text-xs py-1 px-3 whitespace-nowrap text-cyan-300 border-cyan-500/40" 
              onclick="window.app.switchTab('microfilme'); window.microfilmReader.goToDocFrame('${item.docId}')">
              🎞️ Ver Documento no Microfilme →
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ==========================================
  // SEÇÃO DO PROFESSOR / ORIENTAÇÕES PBL & MONITORAMENTO
  // ==========================================
  renderTeacherSection() {
    const sec = document.getElementById('teacher-guide-container');
    if (!sec) return;

    const g = (this.currentData && this.currentData.teacherGuide) || (window.BIO_DATA && window.BIO_DATA.teacherGuide) || {};
    const isDesafio4 = (this.activeChallengeId === 'desafio-4' || this.activeChallengeId === 'desafio-2');

    sec.innerHTML = `
      <div class="teacher-dashboard space-y-6">
        <!-- Barra de Status do Professor -->
        <div class="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/40">
          <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
            <div class="flex items-center gap-2">
              <span class="badge-tag-amber">🎓 Painel Docente Autenticado (biolafa)</span>
              <span id="teacher-live-sync-indicator" class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sincronização ao Vivo (4s)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button class="btn-secondary text-xs py-1 px-3 border-cyan-500/50 text-cyan-200 hover:bg-cyan-900/60 font-bold" 
                onclick="window.app.fetchTeacherTeams(false)">
                🔄 Sincronizar Agora
              </button>
              <button class="btn-secondary text-xs py-1 px-3 border-amber-500/50 text-amber-200 hover:bg-amber-900/60" 
                onclick="window.app.exportAllTeams()">
                📦 Exportar Todas as Equipes (.json)
              </button>
              <button class="btn-secondary text-xs py-1 px-3 border-rose-500/50 text-rose-300 hover:bg-rose-950/60" 
                onclick="window.app.logoutTeacher()">
                🚪 Encerrar Sessão
              </button>
            </div>
          </div>
          <h2 class="text-xl font-bold text-white mb-1">${g.title || 'Guia Pedagógico'}</h2>
          <p class="text-xs text-amber-200/90 leading-relaxed mb-4">${g.warning || ''}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
              <h4 class="font-bold text-sm text-white mb-2">🎯 Objetivos de Aprendizagem</h4>
              <ul class="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                ${(g.pedagogicalGoals || []).map(o => `<li>${o}</li>`).join('')}
              </ul>
            </div>

            <div class="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
              <h4 class="font-bold text-sm text-white mb-2">📅 Cronograma Sugerido (9 Aulas)</h4>
              <div class="space-y-1.5 text-xs text-slate-300">
                ${(g.timelinePacing || []).map(t => `
                  <div><strong class="text-cyan-400 font-mono">${t.week}:</strong> ${t.focus}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        
        <!-- CONTROLE PEDAGÓGICO DE LIBERAÇÃO DE DESAFIOS -->
        <div class="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30">
          <div class="flex flex-wrap justify-between items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>🔐</span> Controle Pedagógico de Desafios da Turma
              </h3>
              <p class="text-xs text-slate-400">
                Gerencie a liberação gradual dos desafios de investigação para garantir o avanço sincronizado da turma.
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Desafio 01 -->
            <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">DESAFIO 01 • ATIVO</span>
                <h4 class="font-bold text-sm text-white mt-1">O Mistério do Rio das Palmeiras</h4>
                <p class="text-xs text-slate-400">Microplásticos & Teias Alimentares (9 Aulas)</p>
              </div>
              <button class="btn-secondary text-xs py-1.5 px-3" onclick="window.app.selectChallenge('desafio-1')">
                ${this.activeChallengeId === 'desafio-1' ? '✓ Em Andamento' : 'Selecionar'}
              </button>
            </div>

            <!-- Desafio 04 (Floração / Maré Vermelha) -->
            <div class="p-4 bg-slate-950 rounded-xl border ${this.isChallenge04Unlocked ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-rose-500/40 bg-rose-950/20'} flex justify-between items-center">
              <div>
                <span class="text-[10px] font-mono ${this.isChallenge04Unlocked ? 'text-emerald-400 bg-emerald-950 border-emerald-800' : 'text-rose-400 bg-rose-950 border-rose-800'} px-2 py-0.5 rounded border font-bold">
                  ${this.isChallenge04Unlocked ? '🔓 DESAFIO 04 • LIBERADO' : '🔒 DESAFIO 04 • BLOQUEADO'}
                </span>
                <h4 class="font-bold text-sm text-white mt-1">Floração Vermelha em Vale Verde</h4>
                <p class="text-xs text-slate-400">Eutrofização & Cianobactérias Tóxicas (9 Aulas)</p>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn-secondary text-xs py-1.5 px-3 ${this.isChallenge04Unlocked ? 'border-rose-500/50 text-rose-300 hover:bg-rose-950' : 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-950 font-bold'}"
                  onclick="window.app.toggleChallenge04Lock()">
                  ${this.isChallenge04Unlocked ? '🔒 Bloquear' : '🔓 Liberar para a Turma'}
                </button>
                ${this.isChallenge04Unlocked ? `
                  <button class="btn-primary text-xs py-1.5 px-3" onclick="window.app.selectChallenge('desafio-4')">
                    ${isDesafio4 ? '✓ Em Andamento' : 'Entrar'}
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- PAINEL DE MONITORAMENTO DAS EQUIPES DA TURMA EM TEMPO REAL -->
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-700" id="teacher-teams-card">
          <div class="flex flex-wrap justify-between items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>👥</span> Monitoramento das Equipes da Turma
                <span id="teacher-teams-count-badge" class="text-xs bg-slate-800 text-cyan-300 px-2.5 py-0.5 rounded-full border border-slate-700 font-mono">
                  ${this.teamsRegistry.length} cadastradas
                </span>
              </h3>
              <p class="text-xs text-slate-400">
                Recepção em tempo real de celulares, tablets e computadores dos estudantes. Acompanhe o andamento por aula, inspecione anotações ou emita relatórios.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" id="teacher-teams-search" placeholder="🔍 Filtrar por equipe ou turma..." 
                value="${this.teacherSearchFilter || ''}" 
                oninput="window.app.filterTeacherTeams(this.value)"
                class="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-56">
              <button class="btn-primary text-xs py-1.5 px-3" onclick="window.app.openTeamAccessModal('create')">
                + Cadastrar Equipe
              </button>
            </div>
          </div>

          <!-- Métricas Rápidas no Topo do Painel de Equipes -->
          <div id="teacher-quick-stats-bar" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"></div>

          <!-- Coleta Manual de Arquivos de Múltiplos Dispositivos (Modo Sem Internet) -->
          <div class="mb-4 p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>📥</span> Coleta Manual de Arquivos (Modo Sem Internet na Escola):
              </span>
              <p class="text-[11px] text-slate-400 mt-0.5">
                Se os aparelhos não tiverem acesso à rede, os alunos baixam o arquivo <strong>.json</strong> no final da aula e o professor carrega todos juntos aqui.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <input type="file" id="teacher-batch-upload-input" accept=".json" multiple class="hidden" onchange="window.app.handleBatchTeamUpload(event)">
              <button class="btn-secondary text-xs py-1.5 px-3 border-cyan-500/50 text-cyan-300 hover:bg-cyan-950/40 font-bold" 
                onclick="document.getElementById('teacher-batch-upload-input').click()">
                📂 Carregar Arquivo(s) de Equipes (.json)
              </button>
            </div>
          </div>

          <!-- Tabela de Equipes Monitoradas em Tempo Real -->
          <div class="overflow-x-auto" id="teacher-teams-table-wrapper"></div>
        </div>

        <!-- Gabarito Orientador das Hipóteses -->
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span>🔑</span> Gabarito Didático Interpretativo (${isDesafio4 ? 'Desafio 04: Floração Vermelha' : 'Desafio 01: Rio das Palmeiras'})
          </h3>

          <div class="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-cyan-500">
              <strong class="text-cyan-300 block mb-1">
                ${isDesafio4 ? '1. Fontes de Nutrientes na Bacia (Esgoto + Agricultura + Dejetos):' : '1. Responsabilidade Industrial (Têxtil Aurora):'}
              </strong>
              ${g.answerKey ? g.answerKey.industrialResponsibility : ''}
            </div>

            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-amber-500">
              <strong class="text-amber-300 block mb-1">
                ${isDesafio4 ? '2. Anóxia Noturna Crítica vs. Cianotoxinas (Microcistina):' : '2. Correlação vs Causalidade:'}
              </strong>
              ${g.answerKey ? g.answerKey.correlationVsCausality : ''}
            </div>

            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-emerald-500">
              <strong class="text-emerald-300 block mb-1">
                ${isDesafio4 ? '3. Floração Límnica (Água Doce) vs. "Maré Vermelha Marinha" (Karenia brevis):' : '3. Ingestão vs Biomagnificação Trófica:'}
              </strong>
              ${g.answerKey ? g.answerKey.biomagnificationDistinction : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Renderiza os dados imediatos da tabela de equipes
    this.renderTeacherTeamsTable();
  }

  // ==========================================
  // SISTEMA DE GESTÃO DE EQUIPES (MULTI-TENANT)
  // ==========================================
  initTeamsSystem() {
    // Limpeza rigorosa: remove dados ilustrativos, mockados ou de demonstração prévia
    localStorage.removeItem('biolab_plano_sc_data');
    localStorage.removeItem('biolafa_team_team_alpha_data');

    try {
      const regRaw = localStorage.getItem('biolafa_teams_registry');
      if (regRaw) {
        this.teamsRegistry = JSON.parse(regRaw);
      }
    } catch (e) {
      this.teamsRegistry = [];
    }

    // Descartar qualquer equipe de demonstração (team_alpha)
    this.teamsRegistry = (this.teamsRegistry || []).filter(t => t.id !== 'team_alpha');
    localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));

    // Identificar e carregar equipe real ativa se existir
    const savedActiveId = localStorage.getItem('biolafa_active_team_id');
    const targetTeam = this.teamsRegistry.find(t => t.id === savedActiveId);

    if (targetTeam) {
      this.activeTeamId = targetTeam.id;
      this.loadTeamData(this.activeTeamId, false);
    } else if (this.teamsRegistry.length > 0) {
      this.activeTeamId = this.teamsRegistry[0].id;
      this.loadTeamData(this.activeTeamId, false);
    } else {
      // Estado 100% LIMPO: sem equipes ilustrativas e sem spoilers
      this.activeTeamId = null;
      this.team = null;
      this.studentAnswers = {};
      this.evidenceMatrix = {};
      this.selfAssessment = {};
      this.currentPhaseIndex = 0;
      localStorage.removeItem('biolafa_active_team_id');
    }
  }

  loadTeamData(teamId, reRender = true) {
    const teamMeta = this.teamsRegistry.find(t => t.id === teamId);
    if (!teamMeta) return;

    this.activeTeamId = teamId;
    this.team = Object.assign({}, teamMeta);
    localStorage.setItem('biolafa_active_team_id', teamId);

    // Carregar os dados isolados da equipe
    try {
      const raw = localStorage.getItem(this.getTeamDataKey(teamId));
      if (raw) {
        const parsed = JSON.parse(raw);
        this.studentAnswers = parsed.answers || {};
        this.evidenceMatrix = parsed.evidenceMatrix || {};
        this.selfAssessment = parsed.selfAssessment || {};
        this.currentPhaseIndex = (typeof parsed.currentPhase === 'number') ? parsed.currentPhase : 0;
        
        if (window.microscope) {
          window.microscope.snapshots = parsed.snapshots || [];
        }
      } else {
        this.studentAnswers = {};
        this.evidenceMatrix = {};
        this.selfAssessment = {};
        this.currentPhaseIndex = 0;
        if (window.microscope) {
          window.microscope.snapshots = [];
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados isolados da equipe:', e);
    }

    // Atualizar último acesso da equipe
    teamMeta.lastActive = new Date().toISOString();
    try {
      localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));
    } catch (e) {}

    // Notificar servidor imediatamente sobre a conexão da equipe
    this.syncTeamToServer();

    if (reRender) {
      this.renderHeader();
      this.updateGlobalProgress();
      this.switchTab(this.currentTab, false);
    }
  }

  saveToStorage() {
    if (!this.activeTeamId) return;

    const payload = {
      team: this.team,
      answers: this.studentAnswers,
      evidenceMatrix: this.evidenceMatrix,
      selfAssessment: this.selfAssessment,
      currentPhase: this.currentPhaseIndex,
      snapshots: (window.microscope && window.microscope.snapshots) || [],
      lastSaved: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.getTeamDataKey(this.activeTeamId), JSON.stringify(payload));
      
      const idx = this.teamsRegistry.findIndex(t => t.id === this.activeTeamId);
      if (idx !== -1) {
        this.teamsRegistry[idx].name = this.team.name;
        this.teamsRegistry[idx].turma = this.team.turma;
        this.teamsRegistry[idx].avatar = this.team.avatar || '🔬';
        this.teamsRegistry[idx].members = this.team.members;
        this.teamsRegistry[idx].pin = this.team.pin || '';
        this.teamsRegistry[idx].lastActive = new Date().toISOString();
        localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));
      }
    } catch (e) {
      console.warn('LocalStorage limit:', e);
    }

    // Sincronização automática para o servidor em segundo plano (sem travar digitação)
    this.triggerDebouncedSync();
  }

  calculateTeamProgress(teamId) {
    try {
      const raw = localStorage.getItem(this.getTeamDataKey(teamId));
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      const answers = parsed.answers || {};
      const phasesList = (this.currentData && this.currentData.phases) || [];
      const totalQuestions = phasesList.reduce((acc, p) => acc + (p.questions ? p.questions.length : 0), 0) || 36;
      const answeredCount = Object.keys(answers).filter(k => {
        const v = answers[k];
        return v && (typeof v === 'string' ? v.trim().length > 0 : Object.keys(v).length > 0);
      }).length;
      return Math.min(100, Math.round((answeredCount / totalQuestions) * 100));
    } catch (e) {
      return 0;
    }
  }

  // ==========================================
  // SINCRONIZAÇÃO EM TEMPO REAL (CLIENTE <-> SERVIDOR)
  // ==========================================
  triggerDebouncedSync() {
    if (this.syncDebounceTimer) clearTimeout(this.syncDebounceTimer);
    this.syncDebounceTimer = setTimeout(() => {
      this.syncTeamToServer(false);
    }, 700);
  }

  startStudentHeartbeat() {
    if (this.studentHeartbeatTimer) clearInterval(this.studentHeartbeatTimer);
    // Envia presença a cada 20 segundos para manter status verde (Online) no painel do professor
    this.studentHeartbeatTimer = setInterval(() => {
      if (this.activeTeamId && !this.teacherMode) {
        this.syncTeamToServer(true);
      }
    }, 20000);
  }

  async syncTeamToServer(isHeartbeat = false) {
    if (!this.activeTeamId || !this.team) return;

    const currentPhaseIndex = (typeof this.currentPhaseIndex === 'number') ? this.currentPhaseIndex : 0;
    const currentChallengeDb = (window.CHALLENGES_DATABASE && window.CHALLENGES_DATABASE[this.activeChallengeId]) || window.BIO_DATA;
    const phases = (currentChallengeDb && currentChallengeDb.phases) || [];
    const currentPhaseName = (phases[currentPhaseIndex] && phases[currentPhaseIndex].title) 
      ? phases[currentPhaseIndex].title 
      : `Aula ${currentPhaseIndex + 1}`;
    
    const totalQuestions = phases.reduce((acc, p) => acc + (p.questions ? p.questions.length : 0), 0);
    const answeredCount = Object.keys(this.studentAnswers || {}).filter(k => {
      const v = this.studentAnswers[k];
      return v && (typeof v === 'string' ? v.trim().length > 0 : (typeof v === 'object' ? Object.keys(v).length > 0 : true));
    }).length;
    const progress = totalQuestions > 0 ? Math.min(100, Math.round((answeredCount / totalQuestions) * 100)) : 0;

    const payload = {
      team: {
        id: this.team.id,
        name: this.team.name,
        turma: this.team.turma,
        avatar: this.team.avatar || '🔬',
        members: this.team.members || [],
        pin: this.team.pin || '',
        lastActive: Date.now()
      },
      challengeId: this.activeChallengeId || 'desafio-1',
      answers: this.studentAnswers || {},
      evidenceMatrix: this.evidenceMatrix || {},
      selfAssessment: this.selfAssessment || {},
      currentPhase: currentPhaseIndex,
      currentPhaseName: currentPhaseName,
      progress: progress,
      answeredCount: answeredCount,
      totalQuestions: totalQuestions,
      snapshots: (window.microscope && window.microscope.snapshots) ? window.microscope.snapshots.slice(-10) : [],
      snapshotsCount: (window.microscope && window.microscope.snapshots) ? window.microscope.snapshots.length : 0,
      isHeartbeat: isHeartbeat
    };

    try {
      await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // Modo offline resiliente: se falhar, os dados locais em localStorage permanecem seguros
    }
  }

  startTeacherLiveSync() {
    this.stopTeacherLiveSync();
    // Busca inicial imediata
    this.fetchTeacherTeams(true);
    // Polling contínuo a cada 4 segundos
    this.teacherSyncTimer = setInterval(() => {
      if (this.currentTab === 'professor' && this.teacherAuth) {
        this.fetchTeacherTeams(true);
      }
    }, 4000);
  }

  stopTeacherLiveSync() {
    if (this.teacherSyncTimer) {
      clearInterval(this.teacherSyncTimer);
      this.teacherSyncTimer = null;
    }
  }

  async fetchTeacherTeams(silent = true) {
    try {
      const res = await fetch('/api/teams?t=' + Date.now());
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !Array.isArray(data.teams)) return;

      data.teams.forEach(serverTeam => {
        if (!serverTeam || !serverTeam.id) return;
        this.serverTeamsCache[serverTeam.id] = serverTeam;

        let regIdx = this.teamsRegistry.findIndex(t => t.id === serverTeam.id);
        if (regIdx === -1) {
          this.teamsRegistry.push({
            id: serverTeam.id,
            name: serverTeam.name,
            turma: serverTeam.turma,
            avatar: serverTeam.avatar || '🔬',
            members: serverTeam.members || [],
            pin: serverTeam.pin || '',
            lastActive: serverTeam.lastActive || new Date().toISOString()
          });
        } else {
          const local = this.teamsRegistry[regIdx];
          local.name = serverTeam.name;
          local.turma = serverTeam.turma;
          local.avatar = serverTeam.avatar || local.avatar;
          local.members = serverTeam.members || local.members;
          local.pin = (typeof serverTeam.pin !== 'undefined') ? serverTeam.pin : local.pin;
          local.lastActive = serverTeam.lastActive || local.lastActive;
        }

        // Armazena dados no cache do storage local para inspeção instantânea
        const targetChId = serverTeam.challengeId || 'desafio-1';
        const storageKey = this.getTeamDataKey(serverTeam.id, targetChId);
        
        let existing = {};
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) existing = JSON.parse(raw);
        } catch (e) {}

        const teamPayload = {
          team: serverTeam,
          answers: (serverTeam.answers && Object.keys(serverTeam.answers).length > 0) ? serverTeam.answers : (existing.answers || {}),
          evidenceMatrix: (serverTeam.evidenceMatrix && Object.keys(serverTeam.evidenceMatrix).length > 0) ? serverTeam.evidenceMatrix : (existing.evidenceMatrix || {}),
          selfAssessment: (serverTeam.selfAssessment && Object.keys(serverTeam.selfAssessment).length > 0) ? serverTeam.selfAssessment : (existing.selfAssessment || {}),
          currentPhase: (typeof serverTeam.currentPhase === 'number') ? serverTeam.currentPhase : (existing.currentPhase || 0),
          snapshots: (Array.isArray(serverTeam.snapshots) && serverTeam.snapshots.length > 0) ? serverTeam.snapshots : (existing.snapshots || []),
          challengeId: targetChId,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem(storageKey, JSON.stringify(teamPayload));
      });

      localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));

      if (this.currentTab === 'professor') {
        this.renderTeacherTeamsTable();
      }
    } catch (e) {
      if (!silent) console.warn('Erro ao atualizar equipes do servidor:', e);
    }
  }

  filterTeacherTeams(searchTerm) {
    this.teacherSearchFilter = (searchTerm || '').trim().toLowerCase();
    this.renderTeacherTeamsTable();
  }

  renderTeacherTeamsTable() {
    const wrapper = document.getElementById('teacher-teams-table-wrapper');
    const statsBar = document.getElementById('teacher-quick-stats-bar');
    const countBadge = document.getElementById('teacher-teams-count-badge');
    if (!wrapper) return;

    const allTeams = this.teamsRegistry || [];
    const now = Date.now();

    // Cálculo das métricas gerais da turma
    let onlineCount = 0;
    let totalProgressSum = 0;
    let totalAnsweredSum = 0;

    allTeams.forEach(t => {
      const serverTeam = this.serverTeamsCache[t.id] || {};
      const lastActiveTime = serverTeam.lastActive ? new Date(serverTeam.lastActive).getTime() : (t.lastActive ? new Date(t.lastActive).getTime() : 0);
      const isOnline = (now - lastActiveTime) < 45000;
      if (isOnline) onlineCount++;

      const progress = (typeof serverTeam.progress === 'number') ? serverTeam.progress : this.calculateTeamProgress(t.id);
      totalProgressSum += progress;

      const answered = (typeof serverTeam.answeredCount === 'number') ? serverTeam.answeredCount : 0;
      totalAnsweredSum += answered;
    });

    const avgProgress = allTeams.length > 0 ? Math.round(totalProgressSum / allTeams.length) : 0;

    if (countBadge) {
      countBadge.innerHTML = `${allTeams.length} cadastradas • <span class="text-emerald-400 font-bold">${onlineCount} online</span>`;
    }

    if (statsBar) {
      statsBar.innerHTML = `
        <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase font-mono tracking-wider text-slate-400">Equipes na Sala</div>
            <div class="text-lg font-black text-white">${allTeams.length}</div>
          </div>
          <span class="text-2xl">👥</span>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase font-mono tracking-wider text-emerald-400">Online Agora</div>
            <div class="text-lg font-black text-emerald-400 flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 ${onlineCount > 0 ? 'animate-ping' : ''}"></span>
              ${onlineCount}
            </div>
          </div>
          <span class="text-2xl">🟢</span>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase font-mono tracking-wider text-cyan-400">Média de Avanço</div>
            <div class="text-lg font-black font-mono text-cyan-400">${avgProgress}%</div>
          </div>
          <span class="text-2xl">📊</span>
        </div>

        <div class="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="text-[10px] uppercase font-mono tracking-wider text-amber-400">Total de Respostas</div>
            <div class="text-lg font-black text-amber-400">${totalAnsweredSum}</div>
          </div>
          <span class="text-2xl">✍️</span>
        </div>
      `;
    }

    // Filtrar equipes
    const filter = this.teacherSearchFilter || '';
    const filteredTeams = allTeams.filter(t => {
      if (!filter) return true;
      const nameMatch = (t.name || '').toLowerCase().includes(filter);
      const turmaMatch = (t.turma || '').toLowerCase().includes(filter);
      const memberMatch = (t.members || []).some(m => (m.name || '').toLowerCase().includes(filter));
      return nameMatch || turmaMatch || memberMatch;
    });

    if (filteredTeams.length === 0) {
      if (allTeams.length === 0) {
        wrapper.innerHTML = `
          <div class="p-8 text-center bg-slate-950 rounded-xl border border-dashed border-slate-800">
            <span class="text-4xl block mb-2">📡</span>
            <h4 class="text-base font-bold text-white mb-1">Aguardando Conexão das Equipes dos Alunos...</h4>
            <p class="text-xs text-slate-400 max-w-lg mx-auto mb-4 leading-relaxed">
              Os estudantes devem acessar o link <strong>biolafa.vercel.app</strong> em seus celulares, tablets ou computadores e cadastrar suas equipes. As equipes e seu andamento aparecerão aqui automaticamente em tempo real!
            </p>
            <div class="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-700">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Sincronização Ativa com a Sala de Aula
            </div>
          </div>
        `;
      } else {
        wrapper.innerHTML = `
          <div class="p-6 text-center bg-slate-950 rounded-xl border border-slate-800">
            <p class="text-xs text-slate-400">Nenhuma equipe encontrada para o filtro "<strong>${this.teacherSearchFilter}</strong>".</p>
          </div>
        `;
      }
      return;
    }

    wrapper.innerHTML = `
      <table class="table-lab">
        <thead>
          <tr>
            <th>Equipe & Turma</th>
            <th>Presença</th>
            <th>Desafio & Etapa (Aula)</th>
            <th>Integrantes</th>
            <th>Andamento / Respostas</th>
            <th>PIN</th>
            <th class="text-right">Ações Pedagógicas</th>
          </tr>
        </thead>
        <tbody>
          ${filteredTeams.map(t => {
            const serverTeam = this.serverTeamsCache[t.id] || {};
            const lastActiveTime = serverTeam.lastActive ? new Date(serverTeam.lastActive).getTime() : (t.lastActive ? new Date(t.lastActive).getTime() : 0);
            const diffSec = Math.round((now - lastActiveTime) / 1000);

            let statusBadge = '';
            if (diffSec < 45) {
              statusBadge = `
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-600/50">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Online Agora
                </span>
              `;
            } else if (diffSec < 600) {
              const mins = Math.max(1, Math.round(diffSec / 60));
              statusBadge = `
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-950 text-amber-300 border border-amber-600/40">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Há ${mins} min
                </span>
              `;
            } else {
              statusBadge = `
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] text-slate-400 bg-slate-800 border border-slate-700">
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Inativo
                </span>
              `;
            }

            const isCurrentInTeacherDevice = (t.id === this.activeTeamId);
            const challengeId = serverTeam.challengeId || 'desafio-1';
            const isCh2 = (challengeId === 'desafio-2');
            
            const currentPhase = (typeof serverTeam.currentPhase === 'number') ? serverTeam.currentPhase : 0;
            const currentPhaseName = serverTeam.currentPhaseName || `Aula ${currentPhase + 1}`;

            const progress = (typeof serverTeam.progress === 'number') ? serverTeam.progress : this.calculateTeamProgress(t.id);
            const answeredCount = (typeof serverTeam.answeredCount === 'number') ? serverTeam.answeredCount : 0;
            const totalQuestions = (typeof serverTeam.totalQuestions === 'number' && serverTeam.totalQuestions > 0) ? serverTeam.totalQuestions : 29;
            const snapsCount = (typeof serverTeam.snapshotsCount === 'number') ? serverTeam.snapshotsCount : (serverTeam.snapshots ? serverTeam.snapshots.length : 0);

            const lastFormatted = lastActiveTime ? new Date(lastActiveTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-';

            return `
              <tr class="${isCurrentInTeacherDevice ? 'bg-cyan-950/20' : ''}">
                <td>
                  <div class="flex items-center gap-2.5">
                    <span class="text-2xl">${t.avatar || '🔬'}</span>
                    <div>
                      <strong class="text-white block text-sm">${t.name}</strong>
                      <span class="text-xs text-slate-400">${t.turma}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    ${statusBadge}
                    <div class="text-[10px] text-slate-500 mt-1 font-mono">Último: ${lastFormatted}</div>
                  </div>
                </td>
                <td>
                  <div class="space-y-1">
                    <span class="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${isCh2 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-cyan-950 text-cyan-300 border-cyan-800'}">
                      ${isCh2 ? '🌿 Desafio 02' : '🔬 Desafio 01'}
                    </span>
                    <div class="text-xs font-semibold text-slate-200">
                      Aula ${currentPhase + 1}: <span class="text-slate-400 font-normal">${currentPhaseName}</span>
                    </div>
                  </div>
                </td>
                <td class="text-slate-400 text-xs max-w-[200px]">
                  ${(t.members && t.members.length > 0) ? t.members.map(m => m.name).join(', ') : 'Não informados'}
                </td>
                <td>
                  <div class="space-y-1.5 min-w-[130px]">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-mono text-cyan-400 font-bold">${progress}%</span>
                      <span class="text-[11px] text-slate-400">${answeredCount}/${totalQuestions} q.</span>
                    </div>
                    <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                    ${snapsCount > 0 ? `
                      <div class="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                        <span>📷</span> ${snapsCount} foto(s) microscópio
                      </div>
                    ` : ''}
                  </div>
                </td>
                <td>
                  <span class="font-mono text-amber-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded text-xs border border-slate-700">
                    ${t.pin && t.pin.trim().length > 0 ? t.pin : 'Livre'}
                  </span>
                </td>
                <td class="text-right whitespace-nowrap">
                  <button class="btn-primary text-xs py-1 px-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold mr-1" 
                    onclick="window.app.openTeacherInspectTeam('${t.id}')" title="Inspecionar Anotações e Respostas desta Equipe">
                    📋 Ver Respostas
                  </button>
                  <button class="btn-secondary text-xs py-1 px-2 text-emerald-400 border-emerald-500/40 hover:bg-emerald-950/40 mr-1 font-bold" 
                    onclick="window.app.openReportModal('${t.id}')" title="Visualizar Relatório Oficial desta Equipe">
                    📄 Relatório
                  </button>
                  <button class="btn-secondary text-xs py-1 px-2 mr-1 text-slate-300 hover:text-white" 
                    onclick="window.app.enterAsTeam('${t.id}')" title="Navegar no Caderno desta Equipe">
                    📖 Caderno
                  </button>
                  <button class="btn-secondary text-xs py-1 px-2 mr-1 text-slate-300 hover:text-white" 
                    onclick="window.app.exportTeamById('${t.id}')" title="Baixar JSON desta Equipe">
                    📥 Backup
                  </button>
                  ${this.teamsRegistry.length > 1 ? `
                    <button class="btn-secondary text-xs py-1 px-2 text-rose-400 border-rose-500/30 hover:bg-rose-950/40" 
                      onclick="window.app.deleteTeam('${t.id}')" title="Excluir Equipe">
                      🗑️
                    </button>
                  ` : ''}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  // ==========================================
  // MODAL DE SELEÇÃO & CRIAÇÃO DE EQUIPES
  // ==========================================
  openTeamAccessModal(defaultTab = 'select') {
    const modal = document.getElementById('team-access-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    this.switchTeamModalTab(defaultTab);
  }

  switchTeamModalTab(tab) {
    const tabs = ['select', 'create', 'import'];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-team-${t}-btn`);
      const pane = document.getElementById(`team-modal-tab-${t}`);
      if (t === tab) {
        if (btn) btn.classList.add('active-nav-tab');
        if (pane) pane.classList.remove('hidden');
      } else {
        if (btn) btn.classList.remove('active-nav-tab');
        if (pane) pane.classList.add('hidden');
      }
    });

    if (tab === 'select') {
      this.renderTeamsRegistryList();
    } else if (tab === 'create') {
      this.renderNewTeamForm();
    }
  }

  renderTeamsRegistryList() {
    const container = document.getElementById('teams-registry-list');
    if (!container) return;

    if (this.teamsRegistry.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-center py-6 text-slate-400">
          Nenhuma equipe cadastrada ainda. Clique em "Nova Equipe" para criar a primeira!
        </div>
      `;
      return;
    }

    container.innerHTML = this.teamsRegistry.map(t => {
      const isActive = (t.id === this.activeTeamId);
      const progress = this.calculateTeamProgress(t.id);
      const hasPin = (t.pin && t.pin.trim().length > 0);
      const lastActiveFormatted = t.lastActive ? new Date(t.lastActive).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Recente';

      return `
        <div class="team-card ${isActive ? 'active-team' : ''}" onclick="window.app.trySelectTeam('${t.id}')">
          <div class="flex items-start gap-3">
            <div class="team-avatar-badge">${t.avatar || '🔬'}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1 mb-0.5">
                <h4 class="font-bold text-white text-sm truncate">${t.name}</h4>
                ${hasPin ? '<span class="text-xs" title="Protegida por PIN">🔒</span>' : ''}
              </div>
              <div class="text-[11px] text-slate-400 truncate">${t.turma} • ${t.members.length} alunos</div>
              
              <div class="mt-2 flex items-center gap-2">
                <div class="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-cyan-500 h-full rounded-full" style="width: ${progress}%"></div>
                </div>
                <span class="text-[10px] font-mono text-cyan-400 font-bold">${progress}%</span>
              </div>

              <div class="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>Ativo: ${lastActiveFormatted}</span>
                ${isActive ? '<span class="text-emerald-400 font-bold">● Equipe Ativa</span>' : '<span class="text-cyan-400 font-bold hover:underline">Entrar →</span>'}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  trySelectTeam(teamId) {
    if (teamId === this.activeTeamId) {
      this.closeModal('team-access-modal');
      return;
    }

    const team = this.teamsRegistry.find(t => t.id === teamId);
    if (!team) return;

    if (team.pin && team.pin.trim().length > 0) {
      this.pendingPinTeamId = teamId;
      document.getElementById('pin-prompt-team-name').textContent = `${team.avatar || '🔬'} ${team.name}`;
      const pinInput = document.getElementById('team-pin-input');
      pinInput.value = '';
      document.getElementById('team-pin-error').classList.add('hidden');
      
      const pinModal = document.getElementById('team-pin-modal');
      pinModal.classList.remove('hidden');
      pinModal.style.display = 'flex';
      setTimeout(() => pinInput.focus(), 100);
    } else {
      this.loginTeam(teamId);
    }
  }

  confirmTeamPin() {
    if (!this.pendingPinTeamId) return;
    const team = this.teamsRegistry.find(t => t.id === this.pendingPinTeamId);
    if (!team) return;

    const enteredPin = document.getElementById('team-pin-input').value.trim();
    if (enteredPin === team.pin.trim() || (this.teacherAuth && enteredPin === 'biolafa')) {
      const targetId = this.pendingPinTeamId;
      this.pendingPinTeamId = null;
      this.closeModal('team-pin-modal');
      this.loginTeam(targetId);
    } else {
      document.getElementById('team-pin-error').classList.remove('hidden');
      this.playSound('click');
    }
  }

  loginTeam(teamId) {
    this.playSound('tab');
    this.saveToStorage(); // Preserva dados da equipe anterior antes de alternar
    this.loadTeamData(teamId, true);
    this.closeModal('team-access-modal');
  }

  renderNewTeamForm() {
    const nameInput = document.getElementById('new-team-name');
    const turmaInput = document.getElementById('new-team-turma');
    const pinInput = document.getElementById('new-team-pin');
    if (nameInput) nameInput.value = '';
    if (turmaInput) turmaInput.value = '1ª Série A - Ensino Médio';
    if (pinInput) pinInput.value = '';

    const grid = document.getElementById('new-team-avatar-grid');
    if (grid) {
      grid.innerHTML = this.avatarsList.map(av => `
        <button type="button" class="avatar-picker-btn ${av === this.selectedNewAvatar ? 'selected' : ''}" 
          onclick="window.app.selectNewAvatar('${av}')">
          ${av}
        </button>
      `).join('');
    }

    const membersCont = document.getElementById('new-team-members-container');
    if (membersCont) {
      membersCont.innerHTML = `
        <div class="flex gap-2 mb-2">
          <input type="text" class="lab-input flex-1 new-member-name" placeholder="Nome do Aluno 1" value="">
          <input type="text" class="lab-input flex-1 text-slate-400 new-member-role" placeholder="Função" value="Investigador Principal">
        </div>
        <div class="flex gap-2 mb-2">
          <input type="text" class="lab-input flex-1 new-member-name" placeholder="Nome do Aluno 2" value="">
          <input type="text" class="lab-input flex-1 text-slate-400 new-member-role" placeholder="Função" value="Especialista em Microscopia">
        </div>
        <div class="flex gap-2 mb-2">
          <input type="text" class="lab-input flex-1 new-member-name" placeholder="Nome do Aluno 3" value="">
          <input type="text" class="lab-input flex-1 text-slate-400 new-member-role" placeholder="Função" value="Analista de Dados & Gráficos">
        </div>
        <div class="flex gap-2 mb-2">
          <input type="text" class="lab-input flex-1 new-member-name" placeholder="Nome do Aluno 4" value="">
          <input type="text" class="lab-input flex-1 text-slate-400 new-member-role" placeholder="Função" value="Relator & Redator Científico">
        </div>
      `;
    }
  }

  selectNewAvatar(av) {
    this.selectedNewAvatar = av;
    document.querySelectorAll('.avatar-picker-btn').forEach(btn => {
      if (btn.textContent.trim() === av) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });
  }

  addNewMemberField(name = '', role = '') {
    const cont = document.getElementById('new-team-members-container');
    if (!cont) return;
    const div = document.createElement('div');
    div.className = 'flex gap-2 mb-2';
    div.innerHTML = `
      <input type="text" class="lab-input flex-1 new-member-name" placeholder="Nome do Integrante" value="${name}">
      <input type="text" class="lab-input flex-1 text-slate-400 new-member-role" placeholder="Papel na Pesquisa" value="${role}">
    `;
    cont.appendChild(div);
  }

  createAndLoginNewTeam() {
    const nameInput = document.getElementById('new-team-name');
    const turmaInput = document.getElementById('new-team-turma');
    const pinInput = document.getElementById('new-team-pin');

    const name = (nameInput && nameInput.value.trim()) || `Equipe Investigadora ${this.teamsRegistry.length + 1}`;
    const turma = (turmaInput && turmaInput.value.trim()) || 'Turma de Biologia';
    const pin = (pinInput && pinInput.value.trim()) || '';

    const nameEls = document.querySelectorAll('.new-member-name');
    const roleEls = document.querySelectorAll('.new-member-role');
    const members = [];
    nameEls.forEach((el, idx) => {
      const val = el.value.trim();
      if (val) {
        members.push({
          name: val,
          role: (roleEls[idx] && roleEls[idx].value.trim()) || 'Pesquisador'
        });
      }
    });

    if (members.length === 0) {
      members.push({ name: 'Pesquisador Responsável', role: 'Investigador Principal' });
    }

    const newTeam = {
      id: `team_${Date.now()}`,
      name: name,
      turma: turma,
      avatar: this.selectedNewAvatar || '🔬',
      pin: pin,
      date: new Date().toLocaleDateString('pt-BR'),
      members: members,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    this.teamsRegistry.push(newTeam);
    localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));

    const initialPayload = {
      team: newTeam,
      answers: {},
      evidenceMatrix: {},
      selfAssessment: {},
      currentPhase: 0,
      snapshots: [],
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(this.getTeamDataKey(newTeam.id), JSON.stringify(initialPayload));

    this.loginTeam(newTeam.id);
  }

  deleteTeam(teamId) {
    if (this.teamsRegistry.length <= 1) {
      alert('Não é possível excluir a única equipe cadastrada.');
      return;
    }

    const team = this.teamsRegistry.find(t => t.id === teamId);
    const confirmMsg = `Tem certeza que deseja excluir a equipe "${team ? team.name : teamId}" e todas as suas respostas salvas? Esta ação não pode ser desfeita.`;
    if (!confirm(confirmMsg)) return;

    this.teamsRegistry = this.teamsRegistry.filter(t => t.id !== teamId);
    delete this.serverTeamsCache[teamId];
    localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));
    localStorage.removeItem(this.getTeamDataKey(teamId, 'desafio-1'));
    localStorage.removeItem(this.getTeamDataKey(teamId, 'desafio-2'));

    // Notifica servidor para excluir equipe sincronizada
    fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', teamId })
    }).catch(() => {});

    if (this.activeTeamId === teamId) {
      this.loginTeam(this.teamsRegistry[0].id);
    } else {
      if (this.currentTab === 'professor') {
        this.renderTeacherTeamsTable();
      }
      this.renderTeamsRegistryList();
    }
  }

  // ==========================================
  // EXPORTAÇÃO & IMPORTAÇÃO DE BACKUPS (.JSON)
  // ==========================================
  exportCurrentTeamFile() {
    this.exportTeamById(this.activeTeamId);
  }

  exportTeamById(teamId) {
    const team = this.teamsRegistry.find(t => t.id === teamId);
    if (!team) return;

    let payload = null;
    try {
      const raw = localStorage.getItem(this.getTeamDataKey(teamId));
      if (raw) payload = JSON.parse(raw);
    } catch (e) {}

    if (!payload) {
      payload = {
        team: team,
        answers: {},
        evidenceMatrix: {},
        selfAssessment: {},
        currentPhase: 0,
        snapshots: []
      };
    }

    payload.system = 'BioLafa - Estação de Investigação Científica';
    payload.exportTimestamp = new Date().toISOString();

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = team.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    a.href = url;
    a.download = `biolafa_equipe_${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.playSound('click');
  }

  exportAllTeams() {
    const allData = {
      system: 'BioLafa - Relatório Consolidado de Todas as Equipes',
      exportTimestamp: new Date().toISOString(),
      teams: this.teamsRegistry.map(t => {
        let teamData = {};
        try {
          const raw = localStorage.getItem(this.getTeamDataKey(t.id));
          if (raw) teamData = JSON.parse(raw);
        } catch (e) {}
        return {
          meta: t,
          progress: this.calculateTeamProgress(t.id),
          data: teamData
        };
      })
    };

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biolafa_turma_completa_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  handleTeamFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.team || !parsed.team.name) {
          alert('Arquivo inválido: o formato do arquivo não corresponde a um backup do BioLafa.');
          return;
        }

        const importedTeam = Object.assign({}, parsed.team, {
          id: `team_imported_${Date.now()}`,
          lastActive: new Date().toISOString()
        });

        this.teamsRegistry.push(importedTeam);
        localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));

        const payload = {
          team: importedTeam,
          answers: parsed.answers || {},
          evidenceMatrix: parsed.evidenceMatrix || {},
          selfAssessment: parsed.selfAssessment || {},
          currentPhase: (typeof parsed.currentPhase === 'number') ? parsed.currentPhase : 0,
          snapshots: parsed.snapshots || [],
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem(this.getTeamDataKey(importedTeam.id), JSON.stringify(payload));

        alert(`Equipe "${importedTeam.name}" importada com sucesso!`);
        this.loginTeam(importedTeam.id);
      } catch (err) {
        alert('Erro ao processar arquivo: certifique-se de selecionar um arquivo .json válido.');
      }
    };
    reader.readAsText(file);
  }

  // ==========================================
  // AUTENTICAÇÃO DO PROFESSOR (biolafa / lilica10)
  // ==========================================
  openTeacherLoginModal() {
    const modal = document.getElementById('teacher-login-modal');
    if (!modal) return;
    document.getElementById('teacher-user-input').value = 'biolafa';
    document.getElementById('teacher-pass-input').value = '';
    document.getElementById('teacher-auth-error').classList.add('hidden');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    setTimeout(() => {
      const pass = document.getElementById('teacher-pass-input');
      if (pass) pass.focus();
    }, 100);
  }

  authenticateTeacher() {
    const userEl = document.getElementById('teacher-user-input');
    const passEl = document.getElementById('teacher-pass-input');
    const user = (userEl && userEl.value.trim().toLowerCase()) || '';
    const pass = (passEl && passEl.value) || '';

    if (user === 'biolafa' && pass === 'lilica10') {
      this.teacherAuth = true;
      this.teacherMode = true;
      localStorage.setItem('biolafa_teacher_auth', 'true');
      this.closeModal('teacher-login-modal');
      this.renderHeader();
      this.renderChallengesHub();
      this.switchTab('professor');
      this.playSound('tab');
    } else {
      document.getElementById('teacher-auth-error').classList.remove('hidden');
      this.playSound('click');
    }
  }

  logoutTeacher() {
    this.stopTeacherLiveSync();
    this.teacherAuth = false;
    this.teacherMode = false;
    localStorage.removeItem('biolafa_teacher_auth');
    this.renderHeader();
    this.renderChallengesHub();
    if (this.currentTab === 'professor') {
      this.switchTab('desafios');
    } else {
      this.switchTab(this.currentTab, false);
    }
  }

  toggleTeacherMode() {
    if (!this.teacherAuth) {
      this.openTeacherLoginModal();
    } else {
      if (confirm('Deseja encerrar a sessão de Professor e retornar ao Modo Estudante?')) {
        this.logoutTeacher();
      }
    }
  }

  // ==========================================
  // PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
  // ==========================================
  saveAnswer(id, val) {
    this.studentAnswers[id] = val;
    this.saveToStorage();
    this.updateGlobalProgress();
  }

  saveNestedAnswer(id, subKey, val) {
    if (!this.studentAnswers[id] || typeof this.studentAnswers[id] !== 'object') {
      this.studentAnswers[id] = {};
    }
    this.studentAnswers[id][subKey] = val;
    this.saveToStorage();
    this.updateGlobalProgress();
  }

  // ==========================================
  // MODAIS: EDIÇÃO DE EQUIPE & RELATÓRIO FINAL
  // ==========================================
  closeModal(modalId) {
    this.playSound('click');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  }

  openTeamModal() {
    if (!this.team) {
      this.openTeamAccessModal('create');
      return;
    }

    const modal = document.getElementById('team-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    document.getElementById('input-team-name').value = this.team.name || '';
    document.getElementById('input-team-turma').value = this.team.turma || '1ª Série A - Ensino Médio';
    
    const membersBox = document.getElementById('team-members-inputs');
    membersBox.innerHTML = (this.team.members || []).map((m, idx) => `
      <div class="flex gap-2 mb-2">
        <input type="text" class="lab-input flex-1" value="${m.name || ''}" placeholder="Nome do Aluno" id="member-name-${idx}">
        <input type="text" class="lab-input flex-1 text-slate-400" value="${m.role || ''}" placeholder="Papel na Pesquisa" id="member-role-${idx}">
      </div>
    `).join('');
  }

  saveTeamModal() {
    this.team.name = document.getElementById('input-team-name').value || 'Equipe Científica';
    this.team.turma = document.getElementById('input-team-turma').value || 'Turma de Biologia';

    this.team.members = this.team.members.map((m, idx) => {
      const nameEl = document.getElementById(`member-name-${idx}`);
      const roleEl = document.getElementById(`member-role-${idx}`);
      return {
        name: nameEl ? nameEl.value : m.name,
        role: roleEl ? roleEl.value : m.role
      };
    });

    this.saveToStorage();
    this.renderHeader();
    document.getElementById('team-modal').classList.add('hidden');
  }


  openTeacherInspectTeam(teamId) {
    const team = this.teamsRegistry.find(t => t.id === teamId);
    if (!team) return;

    const serverTeam = this.serverTeamsCache[teamId] || {};
    const targetChallengeId = serverTeam.challengeId || this.activeChallengeId;
    const challengeDb = (window.CHALLENGES_DATABASE && window.CHALLENGES_DATABASE[targetChallengeId]) || window.BIO_DATA;
    const ch = (challengeDb && challengeDb.challenge) || { title: 'Desafio' };
    const phases = (challengeDb && challengeDb.phases) || [];

    let teamData = {};
    try {
      const raw = localStorage.getItem(this.getTeamDataKey(teamId, targetChallengeId));
      if (raw) teamData = JSON.parse(raw);
    } catch (e) {}

    const answers = (teamData.answers && Object.keys(teamData.answers).length > 0) ? teamData.answers : (serverTeam.answers || {});
    const snaps = (teamData.snapshots && teamData.snapshots.length > 0) ? teamData.snapshots : (serverTeam.snapshots || []);
    const evidenceMatrix = (teamData.evidenceMatrix && Object.keys(teamData.evidenceMatrix).length > 0) ? teamData.evidenceMatrix : (serverTeam.evidenceMatrix || {});
    const progress = (typeof serverTeam.progress === 'number') ? serverTeam.progress : this.calculateTeamProgress(teamId);
    const isCh4 = (targetChallengeId === 'desafio-4' || targetChallengeId === 'desafio-2');
    const currentPhase = (typeof serverTeam.currentPhase === 'number') ? serverTeam.currentPhase : (teamData.currentPhase || 0);
    const currentPhaseName = serverTeam.currentPhaseName || (phases[currentPhase] ? (phases[currentPhase].lessonTitle || phases[currentPhase].title) : `Aula ${currentPhase + 1}`);

    const modal = document.getElementById('teacher-inspect-team-modal');
    const content = document.getElementById('teacher-inspect-modal-content');
    const titleEl = document.getElementById('teacher-inspect-modal-title');
    if (!modal || !content) return;

    if (titleEl) {
      titleEl.innerHTML = `<span>🎓</span> Registros Pedagógicos da Equipe: <span class="text-white">${team.name}</span> (${team.turma})`;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    content.innerHTML = `
      <div class="space-y-6">
        <!-- Barra de Resumo da Equipe -->
        <div class="p-4 bg-slate-900 rounded-xl border border-slate-700 flex flex-wrap justify-between items-center gap-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${team.avatar || '🔬'}</span>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-base font-bold text-white">${team.name}</span>
                <span class="text-xs font-mono font-normal bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-slate-700">PIN: ${team.pin || 'Livre'}</span>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${isCh4 ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-cyan-950 text-cyan-300 border-cyan-800'}">
                  ${isCh4 ? '🌿 Desafio 04: Floração Vermelha' : '🔬 Desafio 01: Rio das Palmeiras'}
                </span>
              </div>
              <p class="text-xs text-slate-400">
                <strong>Turma:</strong> ${team.turma} • 
                <strong>Integrantes:</strong> ${(team.members && team.members.length > 0) ? team.members.map(m => m.name + (m.role ? ' (' + m.role + ')' : '')).join(', ') : 'Não informados'}
              </p>
              <div class="text-xs text-cyan-300 mt-1">
                📍 <strong>Posição Atual na Atividade:</strong> Aula ${currentPhase + 1} (${currentPhaseName})
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-xs text-slate-400 font-mono">Progresso Geral</div>
              <div class="text-lg font-black font-mono text-cyan-400">${progress}%</div>
            </div>
            <div class="flex gap-2">
              <button class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold" 
                onclick="window.app.openReportModal('${team.id}')">
                <span>📄</span> Ver Relatório Oficial
              </button>
              <button class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 text-cyan-300 border-cyan-500/40 font-bold" 
                onclick="window.app.enterAsTeam('${team.id}')">
                <span>📖</span> Navegar no Caderno
              </button>
              <button class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5" 
                onclick="window.app.exportTeamById('${team.id}')">
                <span>📥</span> Baixar JSON
              </button>
            </div>
          </div>
        </div>

        <!-- 1. RESPOSTAS & ANOTAÇÕES DAS 9 AULAS -->
        <div class="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div class="flex justify-between items-center border-b border-slate-800 pb-2">
            <h4 class="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>✍️</span> Caderno de Campo: Respostas dos Estudantes (${phases.length} Aulas)
            </h4>
            <span class="text-xs text-slate-400">${ch.title}</span>
          </div>

          <div class="space-y-4">
            ${phases.map(phase => {
              return `
                <div class="p-3 bg-slate-950/70 rounded-lg border border-slate-800 space-y-2">
                  <div class="flex items-center justify-between text-xs font-bold text-cyan-400 border-b border-slate-800/80 pb-1">
                    <span>${phase.lessonTitle}</span>
                    <span class="text-[11px] text-slate-500 font-mono">${phase.badge || ''}</span>
                  </div>

                  <div class="space-y-3 pt-1">
                    ${phase.questions.map(q => {
                      const ans = answers[q.id];
                      let ansDisplay = '';
                      let hasAnswer = false;

                      if (q.type === 'dual_hypothesis') {
                        const hipA = ans && (ans.hip_a || ans.hip_a_d2);
                        const hipB = ans && (ans.hip_b || ans.hip_b_d2);
                        hasAnswer = !!(hipA || hipB);
                        ansDisplay = `
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div class="p-2 bg-slate-900 rounded border border-slate-800">
                              <span class="text-cyan-300 font-bold block mb-1">Hipótese A:</span>
                              <span class="${hipA ? 'text-slate-200' : 'text-slate-500 italic'}">${hipA || '(Em branco)'}</span>
                            </div>
                            <div class="p-2 bg-slate-900 rounded border border-slate-800">
                              <span class="text-cyan-300 font-bold block mb-1">Hipótese B:</span>
                              <span class="${hipB ? 'text-slate-200' : 'text-slate-500 italic'}">${hipB || '(Em branco)'}</span>
                            </div>
                          </div>
                        `;
                      } else if (q.type === 'intervention_plan') {
                        const planName = ans && (ans.plan_name || ans.plan_d2_name);
                        const planTarget = ans && (ans.plan_target || ans.plan_d2_target);
                        const planAction = ans && (ans.plan_action || ans.plan_d2_action);
                        const planInd = ans && (ans.plan_indicator || ans.plan_d2_indicator);
                        hasAnswer = !!(planName || planTarget || planAction);
                        ansDisplay = `
                          <div class="p-2.5 bg-slate-900 rounded border border-slate-800 text-xs space-y-1">
                            <div><strong>Projeto:</strong> <span class="text-cyan-300">${planName || '(Em branco)'}</span></div>
                            <div><strong>Alvos Prioritários:</strong> <span class="text-slate-300">${planTarget || '(Em branco)'}</span></div>
                            <div><strong>Medidas:</strong> <span class="text-slate-300">${planAction || '(Em branco)'}</span></div>
                            <div><strong>Indicador:</strong> <span class="text-slate-300">${planInd || '(Em branco)'}</span></div>
                          </div>
                        `;
                      } else if (typeof ans === 'string' && ans.trim().length > 0) {
                        hasAnswer = true;
                        ansDisplay = `<div class="p-2.5 bg-slate-900 rounded border border-cyan-500/30 text-xs text-slate-200 whitespace-pre-line leading-relaxed">${ans}</div>`;
                      } else {
                        ansDisplay = `<div class="p-2 bg-slate-900/60 rounded border border-dashed border-slate-800 text-xs text-slate-500 italic">Questão ainda não respondida pela equipe.</div>`;
                      }

                      return `
                        <div class="space-y-1.5 text-xs">
                          <div class="font-bold text-slate-300 flex items-start gap-1.5">
                            <span class="${hasAnswer ? 'text-emerald-400' : 'text-slate-600'}">●</span>
                            <span>${q.label}</span>
                          </div>
                          
                          <div class="pl-3">
                            ${ansDisplay}
                          </div>

                          ${q.expectedHint ? `
                            <div class="ml-3 p-2 bg-amber-950/20 border-l-2 border-amber-500/60 text-[11px] text-amber-200/90 rounded-r">
                              <strong>💡 Gabarito / Expectativa Pedagógica:</strong> ${q.expectedHint}
                            </div>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 2. EVIDÊNCIAS MICROSCÓPICAS COLETADAS PELA EQUIPE -->
        <div class="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div class="flex justify-between items-center border-b border-slate-800 pb-2">
            <h4 class="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>🔬</span> Fotomicrografias Capturadas pela Equipe (${snaps.length})
            </h4>
          </div>

          ${snaps.length > 0 ? `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              ${snaps.map(s => `
                <div class="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <img src="${s.dataUrl}" alt="Foto" class="w-full aspect-square object-cover rounded border border-slate-700 mb-1.5">
                  <div class="text-[11px] font-bold text-white">${s.slideCode || 'LÂMINA'}</div>
                  <div class="text-[10px] text-cyan-400 font-mono">${s.objective || '400x'}</div>
                  <div class="text-[10px] text-slate-400 italic mt-1 line-clamp-2">"${s.note || 'Sem anotações'}"</div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="p-4 bg-slate-950 rounded-lg border border-dashed border-slate-800 text-center text-xs text-slate-500 italic">
              Esta equipe ainda não capturou fotos no microscópio virtual.
            </div>
          `}
        </div>

        <!-- 3. MATRIZ DE EVIDÊNCIAS -->
        <div class="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div class="flex justify-between items-center border-b border-slate-800 pb-2">
            <h4 class="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>⚖️</span> Matriz de Evidências Preenchida pela Equipe
            </h4>
          </div>

          ${Object.keys(evidenceMatrix).length > 0 ? `
            <div class="text-xs text-slate-300">
              <p class="mb-2 text-slate-400">Classificações registradas pela equipe [ F = Favorece | E = Enfraquece | I = Inconclusivo ]:</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                ${Object.keys(evidenceMatrix).map(k => `
                  <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center">
                    <span class="text-[10px] text-slate-500 block truncate">${k}</span>
                    <strong class="text-sm font-mono ${evidenceMatrix[k] === 'F' ? 'text-emerald-400' : (evidenceMatrix[k] === 'E' ? 'text-rose-400' : 'text-amber-400')}">${evidenceMatrix[k]}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="p-4 bg-slate-950 rounded-lg border border-dashed border-slate-800 text-center text-xs text-slate-500 italic">
              A Matriz de Evidências ainda não foi preenchida pela equipe (Aula 7 • Ficha 8).
            </div>
          `}
        </div>
      </div>
    `;
  }

  enterAsTeam(teamId) {
    this.closeModal('teacher-inspect-team-modal');
    this.loginTeam(teamId);
    this.switchTab('investigacao');
  }

  handleBatchTeamUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let loadedCount = 0;
    let errorCount = 0;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.team && parsed.team.name) {
            const teamMeta = Object.assign({}, parsed.team, {
              id: parsed.team.id || ('team_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
              lastActive: new Date().toISOString()
            });

            // Adiciona ou atualiza no registro
            const existingIdx = this.teamsRegistry.findIndex(t => t.id === teamMeta.id || (t.name === teamMeta.name && t.turma === teamMeta.turma));
            if (existingIdx !== -1) {
              this.teamsRegistry[existingIdx] = teamMeta;
            } else {
              this.teamsRegistry.push(teamMeta);
            }
            localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));

            const payload = {
              team: teamMeta,
              answers: parsed.answers || {},
              evidenceMatrix: parsed.evidenceMatrix || {},
              selfAssessment: parsed.selfAssessment || {},
              currentPhase: (typeof parsed.currentPhase === 'number') ? parsed.currentPhase : 0,
              snapshots: parsed.snapshots || [],
              lastSaved: new Date().toISOString()
            };
            localStorage.setItem(this.getTeamDataKey(teamMeta.id), JSON.stringify(payload));
            loadedCount++;
          } else {
            errorCount++;
          }
        } catch (err) {
          errorCount++;
        }

        // Ao finalizar todos os arquivos
        if (loadedCount + errorCount === files.length) {
          this.renderTeacherSection();
          this.playSound('focus_snap');
          alert(`✅ ${loadedCount} caderno(s) de equipe importado(s) com sucesso para o Painel do Professor!` + (errorCount > 0 ? ` (${errorCount} arquivo(s) ignorados por formato inválido)` : ''));
        }
      };
      reader.readAsText(file);
    });
  }

  openReportModal(targetTeamId = null) {
    let reportTeam = this.team;
    let reportAnswers = this.studentAnswers;
    let reportSnaps = (window.microscope && window.microscope.snapshots) || [];
    let targetChallengeId = this.activeChallengeId;

    if (targetTeamId) {
      const found = this.teamsRegistry.find(t => t.id === targetTeamId);
      if (found) {
        reportTeam = found;
        const serverTeam = this.serverTeamsCache[targetTeamId] || {};
        targetChallengeId = serverTeam.challengeId || this.activeChallengeId;

        try {
          const raw = localStorage.getItem(this.getTeamDataKey(targetTeamId, targetChallengeId));
          if (raw) {
            const parsed = JSON.parse(raw);
            reportAnswers = parsed.answers || serverTeam.answers || {};
            reportSnaps = parsed.snapshots || serverTeam.snapshots || [];
          } else if (serverTeam.answers) {
            reportAnswers = serverTeam.answers;
            reportSnaps = serverTeam.snapshots || [];
          }
        } catch (e) {}
      }
    }

    if (!reportTeam || !reportTeam.name) {
      alert('Cadastre primeiro a sua equipe de pesquisa para emitir o Dossiê Científico Oficial.');
      this.openTeamAccessModal('create');
      return;
    }

    const modal = document.getElementById('report-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    const reportContent = document.getElementById('printable-report-content');
    if (reportContent) {
      const challengeDb = (window.CHALLENGES_DATABASE && window.CHALLENGES_DATABASE[targetChallengeId]) || window.BIO_DATA;
      const ch = (challengeDb && challengeDb.challenge) || {
        title: 'O Mistério do Rio das Palmeiras',
        subtitle: 'Microplásticos, Fontes de Contaminação e Teias Alimentares'
      };

      reportContent.innerHTML = `
        <div class="report-paper">
          <!-- Cabeçalho Oficial -->
          <div class="border-b-2 border-slate-900 pb-4 mb-6 text-center">
            <div class="text-[11px] font-sans font-bold tracking-widest text-slate-500 uppercase mb-1">
              Secretaria de Educação • Programa de Iniciação Científica no Ensino Médio
            </div>
            <h1 class="text-2xl font-black uppercase tracking-wider text-slate-900">Dossiê de Investigação Ambiental</h1>
            <h2 class="text-base text-slate-700 font-sans mt-1 font-semibold">${ch.title} • ${ch.subtitle}</h2>
            
            <div class="flex flex-wrap justify-center gap-6 text-xs text-slate-600 font-sans mt-3 py-2 bg-slate-100 rounded-lg">
              <span><strong>Equipe:</strong> ${reportTeam.name}</span>
              <span><strong>Turma:</strong> ${reportTeam.turma}</span>
              <span><strong>Data de Emissão:</strong> ${reportTeam.date || new Date().toLocaleDateString('pt-BR')}</span>
            </div>

            <div class="text-xs text-slate-600 font-sans mt-2">
              <strong>Pesquisadores Responsáveis:</strong> ${(reportTeam.members && reportTeam.members.length > 0) ? reportTeam.members.map(m => `<u>${m.name}</u> (<em>${m.role}</em>)`).join(' • ') : 'Equipe de Pesquisa'}
            </div>
          </div>

          <!-- 1. Conclusão Científica -->
          <div class="mb-6 font-sans">
            <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2 flex items-center justify-between">
              <span>1. Conclusão Científica Baseada em Evidências</span>
              <span class="text-[10px] text-slate-500">Aula 8 • Ficha 9</span>
            </h3>
            <div class="text-xs text-slate-800 leading-relaxed whitespace-pre-line p-4 bg-slate-50 border border-slate-200 rounded-lg min-h-[70px]">
              ${(reportAnswers['p8_q1'] || reportAnswers['p8_q1_d2']) ? (reportAnswers['p8_q1'] || reportAnswers['p8_q1_d2']) : '<div class="text-slate-400 italic text-center py-3 border border-dashed border-slate-300 rounded">[Espaço em branco: a equipe preenche esta conclusão no Caderno de Investigação ao final das anotações da Aula 8]</div>'}
            </div>
          </div>

          <!-- 2. Dados Quantitativos e Avaliação da Intervenção -->
          <div class="mb-6 font-sans">
            <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2 flex items-center justify-between">
              <span>2. Análise Quantitativa dos Indicadores & Eficácia da Intervenção</span>
              <span class="text-[10px] text-slate-500">Aulas 4 e 7 • Fichas 5 e 8</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-800">
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[70px]">
                <strong class="block text-slate-900 mb-1">📊 Análise e Cálculo de Redução:</strong>
                ${(reportAnswers['p7_q1'] || reportAnswers['p7_q1_d2']) ? (reportAnswers['p7_q1'] || reportAnswers['p7_q1_d2']) : '<div class="text-slate-400 italic py-2 border border-dashed border-slate-300 rounded text-center">[Espaço para o cálculo da equipe na Ficha 8]</div>'}
              </div>
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[70px]">
                <strong class="block text-slate-900 mb-1">⚖️ Análise de Causalidade vs. Múltiplas Fontes:</strong>
                ${(reportAnswers['p7_q3'] || reportAnswers['p7_q3_d2'] || reportAnswers['p7_q2']) ? (reportAnswers['p7_q3'] || reportAnswers['p7_q3_d2'] || reportAnswers['p7_q2']) : '<div class="text-slate-400 italic py-2 border border-dashed border-slate-300 rounded text-center">[Espaço para a justificativa da equipe na Ficha 8]</div>'}
              </div>
            </div>
          </div>

          <!-- 3. Fotomicrografias da Bancada -->
          ${reportSnaps.length > 0 ? `
            <div class="mb-6 font-sans">
              <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2">
                3. Evidências Microscópicas Coletadas pela Equipe (${reportSnaps.length} Registros)
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                ${reportSnaps.map(s => `
                  <div class="p-2 border border-slate-300 rounded-lg text-center bg-slate-50">
                    <img src="${s.dataUrl}" alt="Fotomicrografia" class="w-full aspect-square object-cover rounded border border-slate-200 mb-1">
                    <div class="text-[10px] font-bold text-slate-900">${s.slideCode || 'LÂMINA'} • ${s.objective || '400x'}</div>
                    <div class="text-[9px] text-slate-600 italic">"${s.note || 'Registro de campo'}"</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : `
            <div class="mb-6 font-sans">
              <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2">
                3. Evidências Microscópicas da Bancada
              </h3>
              <div class="p-4 border border-dashed border-slate-300 rounded-lg text-center text-xs text-slate-400 italic bg-slate-50">
                [Espaço reservado para as fotomicrografias capturadas pela equipe durante as observações no Microscópio Virtual]
              </div>
            </div>
          `}

          <!-- 4. Proposta de Intervenção e Mitigação Comunitária -->
          <div class="mb-6 font-sans">
            <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2 flex items-center justify-between">
              <span>4. Proposta de Intervenção Ambiental Cidadã</span>
              <span class="text-[10px] text-slate-500">Aula 8 • Ficha 9</span>
            </h3>
            <div class="text-xs text-slate-800 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 min-h-[70px]">
              ${((reportAnswers['p8_q3'] && reportAnswers['p8_q3'].plan_name) || (reportAnswers['p8_q3_d2'] && reportAnswers['p8_q3_d2'].plan_d2_name)) ? `
                <p><strong>Nome da Ação:</strong> ${reportAnswers['p8_q3']?.plan_name || reportAnswers['p8_q3_d2']?.plan_d2_name || '-'}</p>
                <p><strong>Fontes e Alvos Prioritários:</strong> ${reportAnswers['p8_q3']?.plan_target || reportAnswers['p8_q3_d2']?.plan_d2_target || '-'}</p>
                <p><strong>Mecanismo de Atuação:</strong> ${reportAnswers['p8_q3']?.plan_action || reportAnswers['p8_q3_d2']?.plan_d2_action || '-'}</p>
                <p><strong>Indicador de Eficácia:</strong> ${reportAnswers['p8_q3']?.plan_indicator || reportAnswers['p8_q3_d2']?.plan_d2_indicator || '-'}</p>
              ` : `
                <div class="text-slate-400 italic text-center py-3 border border-dashed border-slate-300 rounded">[Espaço em branco: a proposta de intervenção comunitária será gerada aqui após preenchimento na Ficha 9]</div>
              `}
            </div>
          </div>

          <!-- Assinaturas Formais da Equipe -->
          <div class="mt-10 pt-4 border-t border-slate-400 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-sans">
            ${(reportTeam.members && reportTeam.members.length > 0) ? reportTeam.members.map(m => `
              <div>
                <div class="border-b border-slate-400 mb-1 h-6"></div>
                <div class="text-[10px] font-bold text-slate-900">${m.name}</div>
                <div class="text-[9px] text-slate-500">${m.role}</div>
              </div>
            `).join('') : `
              <div class="col-span-4 text-center text-xs text-slate-500 italic">
                Equipe de Investigação Científica • 1ª Série do Ensino Médio
              </div>
            `}
          </div>
        </div>
      `;
    }
  }

  
  renderInteractiveMapDesafio2() {
    const mapContainer = document.getElementById('interactive-map-container');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-wrapper relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-2xl">
        <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="badge-tag-cyan bg-cyan-950 text-cyan-300 border-cyan-500/40 font-mono text-xs px-2.5 py-0.5 rounded border">AECP • SISTEMA CARTOGRÁFICO NÉBULA-7</span>
              <span class="text-xs font-mono text-emerald-400">Escala: 1:500.000</span>
            </div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Mapa Ecológico & Rotas de Dispersão • Desafio 02 (Projeto ÉDEN)
            </h3>
            <p class="text-xs text-slate-300">
              Clique nos pontos geográficos de Nébula-7 para inspecionar os dossiês ambientais, rotas mineradoras e zonas afetadas.
            </p>
          </div>
          <div class="map-legend flex flex-wrap gap-3 text-xs font-mono">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500 inline-block animate-ping"></span> Zona de Invasão (Floresta)</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Pântano de Veyra (Origem)</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span> Base AECP / Posto Avançado</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-orange-400 inline-block"></span> Rota de Mineração</span>
          </div>
        </div>

        <div class="relative w-full aspect-[16/9] max-h-[500px] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
          <img src="assets/eden/14_mapa_ecologico_nebula7.png" alt="Mapa Ecológico de Nébula-7" class="w-full h-full object-cover opacity-85">
          
          <!-- Hotspot 1: Floresta Cristalina -->
          <button class="absolute top-[35%] left-[28%] -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-rose-600/90 text-white font-bold text-xs hover:scale-110 transition shadow-[0_0_20px_rgba(244,63,94,0.9)] border-2 border-white flex items-center gap-1.5 cursor-pointer z-10"
            onclick="window.app.openMapPopup('floresta_cristalina')" title="Inspecionar Floresta Cristalina">
            <span>🌲</span> Floresta Cristalina (Bioinvasão)
          </button>

          <!-- Hotspot 2: Pântano de Veyra -->
          <button class="absolute top-[68%] left-[72%] -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-amber-600/90 text-white font-bold text-xs hover:scale-110 transition shadow-[0_0_20px_rgba(245,158,11,0.9)] border-2 border-white flex items-center gap-1.5 cursor-pointer z-10"
            onclick="window.app.openMapPopup('pantano_veyra')" title="Inspecionar Pântano de Veyra">
            <span>🌾</span> Pântano de Veyra (Origem)
          </button>

          <!-- Hotspot 3: Rota dos Caminhões -->
          <button class="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl bg-orange-500/90 text-white font-bold text-[11px] hover:scale-110 transition shadow-lg border border-white flex items-center gap-1 cursor-pointer z-10"
            onclick="window.app.openMapPopup('rota_mineracao')" title="Inspecionar Rota de Mineração">
            <span>🚚</span> Rota de Transporte (185 km)
          </button>

          <!-- Hotspot 4: Base da AECP -->
          <button class="absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl bg-cyan-600/90 text-white font-bold text-[11px] hover:scale-110 transition shadow-lg border border-white flex items-center gap-1 cursor-pointer z-10"
            onclick="window.app.openMapPopup('base_aecp')" title="Inspecionar Base Científica AECP">
            <span>🛰️</span> Base Científica ÉDEN
          </button>
        </div>

        <!-- Dossiê do Ponto Clicado -->
        <div id="map-popup-dossier" class="hidden mt-4 p-4 rounded-xl border border-cyan-500/40 bg-slate-900/95 shadow-xl transition-all"></div>
      </div>
    `;
  }

  printReport() {
    window.print();
  }
}

// Inicializar aplicativo no carregamento da página
window.addEventListener('DOMContentLoaded', () => {
  window.app = new BioLabApp();
});
