// Aplicação Principal: BioLab Explorer - Plataforma de Investigação Científica Escolar
class BioLabApp {
  constructor() {
    this.currentTab = 'desafios'; // 'desafios', 'investigacao', 'microscopio', 'mapa', 'simulador', 'professor'
    this.currentPhaseIndex = 0; // 0 a 8 (9 fases)
    
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

    // Inicializar Sistema de Equipes e Carregar Dados Isolados
    this.initTeamsSystem();

    // Inicializar sub-módulos
    this.initAudio();
    this.initApp();
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
        if (BIO_DATA.slides.length > 0) {
          window.microscope.loadSlide(BIO_DATA.slides[0]); // Começa com a Lâmina 1
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
    }, 150);
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

    if (tabId === 'investigacao') {
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
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderHeader() {
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

    this.updateGlobalProgress();
  }

  updateGlobalProgress() {
    const totalQuestions = BIO_DATA.phases.reduce((acc, p) => acc + p.questions.length, 0);
    const answeredCount = Object.keys(this.studentAnswers).filter(k => {
      const v = this.studentAnswers[k];
      return v && (typeof v === 'string' ? v.trim().length > 0 : Object.keys(v).length > 0);
    }).length;

    const percent = Math.min(100, Math.round((answeredCount / totalQuestions) * 100));

    const barEl = document.getElementById('global-progress-bar');
    const textEl = document.getElementById('global-progress-text');
    if (barEl) barEl.style.width = `${percent}%`;
    if (textEl) textEl.textContent = `${percent}% Concluído (${this.currentPhaseIndex + 1}/9 Aulas)`;
  }

  // ==========================================
  // SEÇÃO: INVESTIGAÇÃO (AS 9 FASES / FICHAS)
  // ==========================================
  renderPhase(phaseIdx) {
    this.currentPhaseIndex = phaseIdx;
    const phase = BIO_DATA.phases[phaseIdx];
    if (!phase) return;

    // Atualizar a régua de fases (timeline)
    const timelineEl = document.getElementById('phases-timeline');
    if (timelineEl) {
      timelineEl.innerHTML = BIO_DATA.phases.map((p, idx) => `
        <button class="phase-step-btn ${idx === phaseIdx ? 'active-phase' : ''} ${idx < phaseIdx ? 'done-phase' : ''}" 
          onclick="window.app.renderPhase(${idx})">
          <div class="phase-step-num">${idx + 1}</div>
          <div class="phase-step-label">Aula ${idx + 1}</div>
        </button>
      `).join('');
    }

    // Documentos da fase
    const docs = BIO_DATA.documents.filter(d => phase.docsInvolved.includes(d.id));

    const contentEl = document.getElementById('phase-content-container');
    if (contentEl) {
      contentEl.innerHTML = `
        <!-- Cabeçalho da Fase -->
        <div class="phase-banner mb-6">
          <div class="flex flex-wrap justify-between items-center gap-4 mb-2">
            <span class="badge-tag-cyan">${phase.badge}</span>
            <div class="flex items-center gap-3 text-xs text-slate-400">
              <span>⏱️ Duração: ${phase.duration}</span>
              <span>📋 ${phase.fichas.join(' e ')}</span>
            </div>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">${phase.lessonTitle}</h2>
          <p class="text-slate-300 text-sm leading-relaxed">${phase.goal}</p>
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
              <span>✍️</span> Registros Científicos da Equipe • ${phase.fichas.join(' / ')}
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
          ${doc.imageSrc ? `
            <div class="lab-report-figure-box">
              <div class="lab-report-img-wrapper">
                <img src="${doc.imageSrc}" alt="${doc.title}" class="lab-report-img">
                <span class="lab-magnification-stamp">EVIDÊNCIA ÓPTICA OFICIAL</span>
              </div>
              <div class="lab-report-caption">
                🔬 <strong>Registro Citomorfológico:</strong> ${doc.imageCaption || 'Partículas retidas na malha de triagem analisadas sob microscópio.'}
              </div>
            </div>
          ` : ''}

          <!-- Conteúdo Analítico do Laudo -->
          <div class="lab-report-text">
            ${doc.fullText.replace(/\n\s+/g, '<br><br>')}
          </div>

          <!-- Rodapé com Assinatura Técnica e Ressalva -->
          <div class="lab-report-footer">
            <div class="lab-footer-meta">
              <strong>Procedimento:</strong> Triagem Óptica Padronizada (Rede 300 µm)<br>
              ${this.teacherMode ? `
                <strong class="text-amber-800">🎓 Análise Pedagógica Docente:</strong> <span class="text-amber-900 font-bold">${doc.sourceHint}</span>
              ` : `
                <strong>Registro Pericial:</strong> Interprete os dados analíticos na Ficha correspondente do Caderno de Campo.
              `}
            </div>
            <div class="lab-signature-box">
              <div class="lab-sign-line"></div>
              <div class="text-[10px] font-bold text-slate-900">Dra. M. V. Sampaio</div>
              <div class="text-[9px] text-slate-600 font-mono">Bióloga Responsável • CRBio 42.119</div>
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

    return '';
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
    if (!shelfEl) return;

    const slidesHtml = BIO_DATA.slides.map(slide => `
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
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const num = BIO_DATA.slides.length + 1;
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

      BIO_DATA.slides.push(newSlide);
      this.saveCustomSlides();
      this.renderSlidesShelf();
      this.loadSlideIntoMicroscope(newSlide.id);
      this.playSound('focus_snap');
      alert(`Lâmina "${title}" montada na platina do microscópio com sucesso!`);
    };
    reader.readAsDataURL(file);
  }

  saveCustomSlides() {
    const customSlides = BIO_DATA.slides.filter(s => s.id.startsWith('slide_custom_'));
    try {
      localStorage.setItem('biolab_custom_slides', JSON.stringify(customSlides));
    } catch(e) {
      console.warn('LocalStorage limit for images:', e);
    }
  }

  loadCustomSlides() {
    try {
      const saved = localStorage.getItem('biolab_custom_slides');
      if (saved) {
        const list = JSON.parse(saved);
        list.forEach(item => {
          if (!BIO_DATA.slides.some(s => s.id === item.id)) {
            BIO_DATA.slides.push(item);
          }
        });
      }
    } catch(e) {}
  }

  async checkServerForNewSlides() {
    try {
      const res = await fetch('/api/slides');
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.slides)) {
        let added = false;
        data.slides.forEach(filename => {
          const slidePath = 'assets/slides/' + filename;
          const exists = BIO_DATA.slides.some(s => s.src.toLowerCase() === slidePath.toLowerCase() || s.src.includes(filename));
          if (!exists) {
            const num = BIO_DATA.slides.length + 1;
            const newSlide = {
              id: 'slide_auto_' + filename.replace(/[^a-zA-Z0-9]/g, '_'),
              code: `LÂMINA 0${num}`,
              title: `Lâmina 0${num}: ${filename}`,
              location: 'Pasta de Arquivos /assets/slides',
              category: 'Lâmina Detectada',
              src: slidePath,
              thumb: slidePath,
              count: 'Arquivo Local',
              typeText: 'Lâmina escaneada adicionada',
              description: `Arquivo ${filename} detectado automaticamente na pasta de lâminas.`,
              scaleMicronsPerPixel: 0.15,
              uvFluorescence: true
            };
            BIO_DATA.slides.push(newSlide);
            added = true;
          }
        });
        if (added) {
          this.renderSlidesShelf();
        }
      }
    } catch(e) {
      // Offline ou estático
    }
  }

  loadSlideIntoMicroscope(slideId) {
    this.playSound('click');
    const slide = BIO_DATA.slides.find(s => s.id === slideId);
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
    const mapContainer = document.getElementById('interactive-map-container');
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-wrapper relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Bacia Hidrográfica do Rio das Palmeiras (Vale Verde)
            </h3>
            <p class="text-xs text-slate-400">
              Clique nos pontos das estações de monitoramento e instalações humanas para inspecionar os dossiês ambientais.
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

        <div id="map-popup-dossier" class="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 hidden">
          <!-- Conteúdo dinâmico do ponto clicado -->
        </div>
      </div>
    `;
  }

  openMapPopup(pointKey) {
    this.playSound('click');
    const dossier = document.getElementById('map-popup-dossier');
    if (!dossier) return;

    const mapData = {
      ponto_a: {
        title: 'Estação de Monitoramento A • Montante (Controle)',
        count: '6 partículas por litro',
        slideId: 'slide_ponto_a',
        text: 'Área com cobertura de mata ciliar nativa preservada. Ausência de descarte industrial ou residencial. Serve como linha de base (controle experimental) da bacia.'
      },
      ponto_b: {
        title: 'Estação de Monitoramento B • Bairro Residencial / Esgoto',
        count: '18 partículas por litro (+12 sobre o controle)',
        slideId: 'slide_ponto_b',
        text: 'Trecho impactado pela ligação clandestina de esgoto não tratado de 3 mil habitantes. Alta presença de microfibras oriundas da lavagem de roupas sintéticas.'
      },
      fabrica: {
        title: 'Fábrica Têxtil Aurora (Unidade Industrial)',
        count: 'Capacidade ampliada em 35%',
        slideId: 'slide_ponto_c',
        text: 'Instalação a 400 m do rio especializada em vestuário esportivo de poliéster e poliamida. Em 2024, instalou sistema de ultrafiltração reduzindo em 53,2% sua carga.'
      },
      ponto_c: {
        title: 'Estação de Monitoramento C • Jusante Imediata da Fábrica',
        count: '47 part/L (Antes do Filtro) → 22 part/L (Depois do Filtro)',
        slideId: 'slide_ponto_c',
        text: 'Ponto com a maior contagem inicial da bacia. A queda expressiva para 22 part/L após os filtros comprovou a contribuição da fábrica, mas os 22 residuais provam que ela não era a única poluidora.'
      },
      ponto_d: {
        title: 'Estação de Monitoramento D • Rodovia dos Ipês',
        count: '39 partículas por litro',
        slideId: 'slide_ponto_d',
        text: 'Receptor das águas de drenagem pluvial da rodovia com fluxo de 15 mil veículos/dia. Dominância morfológica de grânulos pretos angulares de desgaste de borracha de pneus.'
      },
      ponto_e: {
        title: 'Estação de Monitoramento E • Desembocadura no Lago Azul',
        count: '28 partículas por litro',
        slideId: 'slide_ponto_e',
        text: 'Área lêntica onde o escoamento diminui de velocidade. Ocorre diluição pelo volume do lago, sedimentação das partículas no lodo do fundo e ingestão por peixes e plâncton.'
      }
    };

    const item = mapData[pointKey];
    if (!item) return;

    dossier.classList.remove('hidden');
    dossier.innerHTML = `
      <div class="flex justify-between items-start gap-4">
        <div>
          <h4 class="font-bold text-white text-sm mb-1">${item.title}</h4>
          <span class="text-xs text-cyan-400 font-mono block mb-2">📊 Concentração Registrada: ${item.count}</span>
          <p class="text-xs text-slate-300 leading-relaxed">${item.text}</p>
        </div>
        <button class="btn-primary text-xs py-1.5 px-3 whitespace-nowrap" 
          onclick="window.app.switchTab('microscopio'); window.app.loadSlideIntoMicroscope('${item.slideId}')">
          🔬 Ver Lâmina no Microscópio →
        </button>
      </div>
    `;
  }

  // ==========================================
  // SEÇÃO DO PROFESSOR / ORIENTAÇÕES PBL & MONITORAMENTO
  // ==========================================
  renderTeacherSection() {
    const sec = document.getElementById('teacher-guide-container');
    if (!sec) return;

    const g = BIO_DATA.teacherGuide;

    sec.innerHTML = `
      <div class="teacher-dashboard space-y-6">
        <!-- Barra de Status do Professor -->
        <div class="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/40">
          <div class="flex flex-wrap justify-between items-center gap-3 mb-3">
            <span class="badge-tag-amber">🎓 Painel Docente Autenticado (biolafa)</span>
            <div class="flex items-center gap-2">
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
          <h2 class="text-xl font-bold text-white mb-1">${g.title}</h2>
          <p class="text-xs text-amber-200/90 leading-relaxed mb-4">${g.warning}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
              <h4 class="font-bold text-sm text-white mb-2">🎯 Objetivos de Aprendizagem</h4>
              <ul class="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                ${g.pedagogicalGoals.map(o => `<li>${o}</li>`).join('')}
              </ul>
            </div>

            <div class="p-4 bg-slate-900/80 rounded-xl border border-slate-700">
              <h4 class="font-bold text-sm text-white mb-2">📅 Cronograma Sugerido (9 Aulas)</h4>
              <div class="space-y-1.5 text-xs text-slate-300">
                ${g.timelinePacing.map(t => `
                  <div><strong class="text-cyan-400 font-mono">${t.week}:</strong> ${t.focus}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- PAINEL DE MONITORAMENTO DAS EQUIPES DA TURMA -->
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <div class="flex flex-wrap justify-between items-center gap-3 mb-4 border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>👥</span> Monitoramento das Equipes da Turma (${this.teamsRegistry.length} cadastradas)
              </h3>
              <p class="text-xs text-slate-400">Acompanhe o avanço de cada grupo, inspecione cadernos ou recupere PINs esquecidos.</p>
            </div>
            <div class="flex items-center gap-2">
              <button class="btn-primary text-xs py-1.5 px-3" onclick="window.app.openTeamAccessModal('create')">
                + Cadastrar Nova Equipe
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="table-lab">
              <thead>
                <tr>
                  <th>Equipe</th>
                  <th>Turma</th>
                  <th>Integrantes</th>
                  <th>Progresso</th>
                  <th>PIN</th>
                  <th>Último Acesso</th>
                  <th class="text-right">Ações Docentes</th>
                </tr>
              </thead>
              <tbody>
                ${this.teamsRegistry.map(t => {
                  const progress = this.calculateTeamProgress(t.id);
                  const isCurrent = (t.id === this.activeTeamId);
                  const lastFormatted = t.lastActive ? new Date(t.lastActive).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-';

                  return `
                    <tr class="${isCurrent ? 'bg-cyan-950/20' : ''}">
                      <td>
                        <div class="flex items-center gap-2">
                          <span class="text-xl">${t.avatar || '🔬'}</span>
                          <div>
                            <strong class="text-white block">${t.name}</strong>
                            ${isCurrent ? '<span class="text-[10px] text-emerald-400 font-bold">● Ativa Agora</span>' : ''}
                          </div>
                        </div>
                      </td>
                      <td class="text-slate-300">${t.turma}</td>
                      <td class="text-slate-400 text-[11px] max-w-[200px]">
                        ${t.members.map(m => m.name).join(', ')}
                      </td>
                      <td>
                        <div class="flex items-center gap-2">
                          <div class="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div class="bg-cyan-500 h-full rounded-full" style="width: ${progress}%"></div>
                          </div>
                          <span class="font-mono text-cyan-400 font-bold">${progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span class="font-mono text-amber-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                          ${t.pin && t.pin.trim().length > 0 ? t.pin : 'Livre (Sem PIN)'}
                        </span>
                      </td>
                      <td class="text-slate-400 text-[11px]">${lastFormatted}</td>
                      <td class="text-right whitespace-nowrap">
                        <button class="btn-secondary text-[11px] py-1 px-2 text-cyan-300 border-cyan-500/30 mr-1" 
                          onclick="window.app.loginTeam('${t.id}')" title="Alternar e Ver Caderno desta Equipe">
                          👁️ Inspecionar
                        </button>
                        <button class="btn-secondary text-[11px] py-1 px-2 mr-1" 
                          onclick="window.app.exportTeamById('${t.id}')" title="Baixar JSON desta Equipe">
                          📥 Backup
                        </button>
                        ${this.teamsRegistry.length > 1 ? `
                          <button class="btn-secondary text-[11px] py-1 px-2 text-rose-400 border-rose-500/30 hover:bg-rose-950/40" 
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
          </div>
        </div>

        <!-- Gabarito Orientador das Hipóteses -->
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-700">
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span>🔑</span> Gabarito Didático Interpretativo (Não é uma Conclusão Única!)
          </h3>

          <div class="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-cyan-500">
              <strong class="text-cyan-300 block mb-1">1. Responsabilidade Industrial (Têxtil Aurora):</strong>
              ${g.answerKey.industrialResponsibility}
            </div>

            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-amber-500">
              <strong class="text-amber-300 block mb-1">2. Correlação vs Causalidade:</strong>
              ${g.answerKey.correlationVsCausality}
            </div>

            <div class="p-3 bg-slate-800/60 rounded-lg border-l-4 border-emerald-500">
              <strong class="text-emerald-300 block mb-1">3. Ingestão vs Biomagnificação Trófica:</strong>
              ${g.answerKey.biomagnificationDistinction}
            </div>
          </div>
        </div>
      </div>
    `;
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
      const raw = localStorage.getItem(`biolafa_team_${teamId}_data`);
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
      localStorage.setItem(`biolafa_team_${this.activeTeamId}_data`, JSON.stringify(payload));
      
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
  }

  calculateTeamProgress(teamId) {
    try {
      const raw = localStorage.getItem(`biolafa_team_${teamId}_data`);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      const answers = parsed.answers || {};
      const totalQuestions = BIO_DATA.phases.reduce((acc, p) => acc + p.questions.length, 0);
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
    localStorage.setItem(`biolafa_team_${newTeam.id}_data`, JSON.stringify(initialPayload));

    this.loginTeam(newTeam.id);
  }

  deleteTeam(teamId) {
    if (this.teamsRegistry.length <= 1) {
      alert('Não é possível excluir a única equipe cadastrada.');
      return;
    }

    const team = this.teamsRegistry.find(t => t.id === teamId);
    const confirmMsg = `Tem certeza que deseja excluir a equipe "${team.name}" e todas as suas respostas salvas? Esta ação não pode ser desfeita.`;
    if (!confirm(confirmMsg)) return;

    this.teamsRegistry = this.teamsRegistry.filter(t => t.id !== teamId);
    localStorage.setItem('biolafa_teams_registry', JSON.stringify(this.teamsRegistry));
    localStorage.removeItem(`biolafa_team_${teamId}_data`);

    if (this.activeTeamId === teamId) {
      this.loginTeam(this.teamsRegistry[0].id);
    } else {
      if (this.currentTab === 'professor') {
        this.renderTeacherSection();
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
      const raw = localStorage.getItem(`biolafa_team_${teamId}_data`);
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
          const raw = localStorage.getItem(`biolafa_team_${t.id}_data`);
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
        localStorage.setItem(`biolafa_team_${importedTeam.id}_data`, JSON.stringify(payload));

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
      this.switchTab('professor');
      this.playSound('tab');
    } else {
      document.getElementById('teacher-auth-error').classList.remove('hidden');
      this.playSound('click');
    }
  }

  logoutTeacher() {
    this.teacherAuth = false;
    this.teacherMode = false;
    localStorage.removeItem('biolafa_teacher_auth');
    this.renderHeader();
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

  openReportModal() {
    if (!this.team || !this.team.name) {
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
      const snaps = (window.microscope && window.microscope.snapshots) || [];

      reportContent.innerHTML = `
        <div class="report-paper p-8 bg-white text-slate-900 rounded-xl shadow-2xl font-serif max-w-4xl mx-auto">
          <!-- Cabeçalho Oficial -->
          <div class="border-b-2 border-slate-900 pb-4 mb-6 text-center">
            <div class="text-[11px] font-sans font-bold tracking-widest text-slate-500 uppercase mb-1">
              Secretaria de Educação • Programa de Iniciação Científica no Ensino Médio
            </div>
            <h1 class="text-2xl font-black uppercase tracking-wider text-slate-900">Dossiê de Investigação Ambiental</h1>
            <h2 class="text-base text-slate-700 font-sans mt-1">O Mistério do Rio das Palmeiras • Microplásticos & Dinâmica Trófica</h2>
            
            <div class="flex flex-wrap justify-center gap-6 text-xs text-slate-600 font-sans mt-3 py-2 bg-slate-100 rounded-lg">
              <span><strong>Equipe:</strong> ${this.team.name}</span>
              <span><strong>Turma:</strong> ${this.team.turma}</span>
              <span><strong>Data de Emissão:</strong> ${this.team.date || new Date().toLocaleDateString('pt-BR')}</span>
            </div>

            <div class="text-xs text-slate-600 font-sans mt-2">
              <strong>Pesquisadores Responsáveis:</strong> ${(this.team.members && this.team.members.length > 0) ? this.team.members.map(m => `<u>${m.name}</u> (<em>${m.role}</em>)`).join(' • ') : 'Equipe de Pesquisa'}
            </div>
          </div>

          <!-- 1. Conclusão Científica -->
          <div class="mb-6 font-sans">
            <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2 flex items-center justify-between">
              <span>1. Conclusão Científica Baseada em Evidências</span>
              <span class="text-[10px] text-slate-500">Aula 8 • Ficha 9</span>
            </h3>
            <div class="text-xs text-slate-800 leading-relaxed whitespace-pre-line p-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[60px]">
              ${this.studentAnswers['p8_q1'] ? this.studentAnswers['p8_q1'] : '<div class="text-slate-400 italic text-center py-3 border border-dashed border-slate-300 rounded">[Espaço em branco: a equipe preenche esta conclusão no Caderno de Investigação ao final das anotações]</div>'}
            </div>
          </div>

          <!-- 2. Dados Quantitativos e Avaliação da Intervenção -->
          <div class="mb-6 font-sans">
            <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2 flex items-center justify-between">
              <span>2. Análise Quantitativa dos Indicadores & Filtragem Industrial</span>
              <span class="text-[10px] text-slate-500">Aulas 4 e 7 • Fichas 5 e 8</span>
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-800">
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[70px]">
                <strong class="block text-slate-900 mb-1">📊 Análise e Cálculo de Redução no Ponto C:</strong>
                ${this.studentAnswers['p7_q1'] ? this.studentAnswers['p7_q1'] : '<div class="text-slate-400 italic py-2 border border-dashed border-slate-300 rounded text-center">[Espaço para o cálculo da equipe na Ficha 8]</div>'}
              </div>
              <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg min-h-[70px]">
                <strong class="block text-slate-900 mb-1">⚖️ Análise de Causalidade vs. Múltiplas Fontes:</strong>
                ${this.studentAnswers['p7_q2'] ? this.studentAnswers['p7_q2'] : '<div class="text-slate-400 italic py-2 border border-dashed border-slate-300 rounded text-center">[Espaço para a justificativa da equipe na Ficha 8]</div>'}
              </div>
            </div>
          </div>

          <!-- 3. Fotomicrografias da Bancada -->
          ${snaps.length > 0 ? `
            <div class="mb-6 font-sans">
              <h3 class="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-2">
                3. Evidências Microscópicas Coletadas pela Equipe (${snaps.length} Registros)
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                ${snaps.map(s => `
                  <div class="p-2 border border-slate-300 rounded-lg text-center bg-slate-50">
                    <img src="${s.dataUrl}" alt="Fotomicrografia" class="w-full aspect-square object-cover rounded border border-slate-200 mb-1">
                    <div class="text-[10px] font-bold text-slate-900">${s.slideCode} • ${s.objective}</div>
                    <div class="text-[9px] text-slate-600 italic">"${s.note}"</div>
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
              ${(this.studentAnswers['p8_q3'] && this.studentAnswers['p8_q3'].plan_name) ? `
                <p><strong>Nome da Ação:</strong> ${this.studentAnswers['p8_q3'].plan_name}</p>
                <p><strong>Fontes e Alvos Prioritários:</strong> ${this.studentAnswers['p8_q3'].plan_target || '-'}</p>
                <p><strong>Mecanismo de Atuação:</strong> ${this.studentAnswers['p8_q3'].plan_action || '-'}</p>
                <p><strong>Indicador de Eficácia:</strong> ${this.studentAnswers['p8_q3'].plan_indicator || '-'}</p>
              ` : `
                <div class="text-slate-400 italic text-center py-3 border border-dashed border-slate-300 rounded">[Espaço em branco: a proposta de intervenção comunitária será gerada aqui após preenchimento na Ficha 9]</div>
              `}
            </div>
          </div>

          <!-- Assinaturas Formais da Equipe -->
          <div class="mt-10 pt-4 border-t border-slate-400 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-sans">
            ${(this.team.members && this.team.members.length > 0) ? this.team.members.map(m => `
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

  printReport() {
    window.print();
  }
}

// Inicializar aplicativo no carregamento da página
window.addEventListener('DOMContentLoaded', () => {
  window.app = new BioLabApp();
});
