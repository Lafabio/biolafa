// Leitor Óptico de Microfilmes da Hemeroteca / Biblioteca Municipal
class MicrofilmReader {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentFrameIdx = 0;
    this.isNegative = false;
    this.zoomLevel = 1.0;
    this.brightness = 100;
    this.filmRotation = 0;

    // Rolos de Microfilme do Arquivo Histórico de Vale Verde
    this.frames = [
      {
        id: 'frame-2',
        reel: 'ROLO 01 • BOBINA A-2018',
        newspaper: 'GAZETA REGIONAL',
        date: '17 de Agosto de 2018 • Caderno de Indústria',
        headline: 'Fábrica de tecidos anuncia ampliação da produção próxima ao rio',
        img: 'assets/slides/Gemini_Generated_Image_5b7ta65b7ta65b7t.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 04 • Microficha 18-08-B',
        synopsis: 'Anúncio de expansão de 35% na produção de tecidos sintéticos da Têxtil Aurora.',
        docId: 'doc-2'
      },
      {
        id: 'frame-3',
        reel: 'ROLO 01 • BOBINA B-2018',
        newspaper: 'JORNAL DO VALE',
        date: '3 de Novembro de 2018 • Fiscalização Urbana',
        headline: 'Fiscalização identifica ligação irregular de esgoto residencial',
        img: 'assets/slides/Gemini_Generated_Image_3v7oin3v7oin3v7o.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 04 • Microficha 18-11-A',
        synopsis: 'Flagrante de esgoto clandestino não tratado de 3 mil habitantes conectado ao afluente.',
        docId: 'doc-3'
      },
      {
        id: 'frame-4',
        reel: 'ROLO 02 • BOBINA C-2019',
        newspaper: 'CIÊNCIA HOJE REGIONAL',
        date: 'Volume 14 • Edição Especial 2019',
        headline: 'Fibras de roupas sintéticas alcançam corpos d’água durante a lavagem',
        img: 'assets/slides/Gemini_Generated_Image_atl2c3atl2c3atl2.jfif',
        archiveRef: 'Hemeroteca Universitária • Seção de Periódicos Científicos',
        synopsis: 'Estudo acadêmico comprovando escape de microfibras em lavadoras domésticas.',
        docId: 'doc-4'
      },
      {
        id: 'frame-5',
        reel: 'ROLO 02 • BOBINA D-2020',
        newspaper: 'DIÁRIO AMBIENTAL',
        date: 'Ano 9 • Edição Metropolitana 2020',
        headline: 'Desgaste de pneus automotivos entra na rota da investigação',
        img: 'assets/slides/Gemini_Generated_Image_7zo9hs7zo9hs7zo9.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 05 • Microficha 20-04-A',
        synopsis: 'Relatório sobre drenagem pluvial da Rodovia dos Ipês e fuligem de borracha de pneus.',
        docId: 'doc-5'
      },
      {
        id: 'frame-6',
        reel: 'ROLO 03 • BOBINA E-2021',
        newspaper: 'GAZETA DO VALE',
        date: 'Junho de 2021 • Caderno Ribeirinho',
        headline: 'Pescadores relatam acúmulo de resíduos plásticos próximo ao antigo porto',
        img: 'assets/slides/Gemini_Generated_Image_hqqy4lhqqy4lhqqy.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 05 • Microficha 21-06-B',
        synopsis: 'Deterioração mecânica de petrechos e redes de náilon no leito rochoso.',
        docId: 'doc-6'
      },
      {
        id: 'frame-7',
        reel: 'ROLO 03 • BOBINA F-2021',
        newspaper: 'JORNAL RURAL',
        date: 'Setembro de 2021 • Agropecuária & Meio Ambiente',
        headline: 'Uso de coberturas plásticas (mulching) se expande na horticultura local',
        img: 'assets/slides/Gemini_Generated_Image_djayl3djayl3djay.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 05 • Microficha 21-09-A',
        synopsis: 'Dispersão de lascas de filmes de polietileno agrícola pelo solo e enxurrada.',
        docId: 'doc-7'
      },
      {
        id: 'frame-8',
        reel: 'ROLO 04 • BOBINA G-2023',
        newspaper: 'JORNAL DO VALE',
        date: 'Outubro de 2023 • Edição Científica',
        headline: 'Partículas alcançam o Lago Azul: pesquisadores debatem transporte ambiental',
        img: 'assets/slides/Gemini_Generated_Image_9gnx1r9gnx1r9gnx.jfif',
        archiveRef: 'Biblioteca Pública Municipal • Gaveta 06 • Microficha 23-10-C',
        synopsis: 'Registro das contagens no Lago Azul (28 part/L) e decantação no sedimento límnico.',
        docId: 'doc-11'
      }
    ];

    this.render();
  }

  goToFrame(idx) {
    if (idx < 0 || idx >= this.frames.length) return;
    this.currentFrameIdx = idx;
    if (window.app) window.app.playSound('shutter');
    this.render();
  }

  goToDocFrame(docId) {
    const idx = this.frames.findIndex(f => f.docId === docId);
    if (idx !== -1) {
      this.goToFrame(idx);
    }
  }

  toggleNegative() {
    this.isNegative = !this.isNegative;
    if (window.app) window.app.playSound('click');
    this.render();
  }

  adjustZoom(delta) {
    this.zoomLevel = Math.max(0.8, Math.min(2.5, this.zoomLevel + delta));
    this.render();
  }

  render() {
    if (!this.container) return;
    const f = this.frames[this.currentFrameIdx];

    this.container.innerHTML = `
      <div class="microfilm-device-wrapper">
        <!-- Estrutura Externa do Aparelho Leitor de Microfilmes (Gabinete Clássico) -->
        <div class="microfilm-cabinet">
          
          <!-- Painel Superior: Carretéis e Bobinas de Filme 35mm -->
          <div class="microfilm-spools-header">
            <div class="spool-wheel spool-left ${this.currentFrameIdx > 0 ? 'spool-spinning' : ''}">
              <div class="spool-core"></div>
              <span class="spool-label">ROLO ALIMENTADOR</span>
            </div>
            
            <div class="microfilm-model-badge">
              <span class="badge-brand">BELL & HOWELL • HEMEROTECA HISTÓRICA</span>
              <span class="badge-system">LEITOR ÓPTICO DE MICROFICHAS • ARQUIVO PÚBLICO</span>
            </div>

            <div class="spool-wheel spool-right ${this.currentFrameIdx < this.frames.length - 1 ? 'spool-spinning' : ''}">
              <div class="spool-core"></div>
              <span class="spool-label">CARRETEL RECEPTOR</span>
            </div>
          </div>

          <!-- A Tela do Leitor (Visor com Capô e Vidro Fosco Retroiluminado) -->
          <div class="microfilm-hood-visor">
            <div class="microfilm-glass-screen ${this.isNegative ? 'screen-negative' : 'screen-positive'}" 
              style="filter: brightness(${this.brightness}%);">
              
              <!-- Grânulos e Marcas de Filme Antigo -->
              <div class="film-grain-overlay"></div>
              <div class="film-edge-perforations-top">
                ${Array(14).fill('<span class="perf-hole"></span>').join('')}
              </div>

              <!-- Quadro de Microfilme Exibido -->
              <div class="microfilm-frame-projection" style="transform: scale(${this.zoomLevel});">
                <div class="microfilm-clipping-card">
                  <!-- Tarja de Arquivamento do Microfilme -->
                  <div class="film-header-meta">
                    <span>${f.archiveRef}</span>
                    <span class="font-bold">${f.reel} • QUADRO 0${this.currentFrameIdx + 1} DE 0${this.frames.length}</span>
                  </div>

                  <!-- Título e Cabeçalho do Periódico -->
                  <div class="film-masthead">
                    <h1 class="film-newspaper-title">${f.newspaper}</h1>
                    <div class="film-date-line">${f.date}</div>
                  </div>

                  <h2 class="film-headline">${f.headline}</h2>

                  <!-- Foto Escaneada no Microfilme -->
                  <div class="film-image-container">
                    <img src="${f.img}" alt="${f.headline}" class="film-scanned-photo">
                  </div>

                  <!-- Sinopse Histórica Registrada -->
                  <div class="film-summary-box">
                    <strong>REGISTRO DA HEMEROTECA:</strong> ${f.synopsis}
                  </div>
                </div>
              </div>

              <div class="film-edge-perforations-bottom">
                ${Array(14).fill('<span class="perf-hole"></span>').join('')}
              </div>
            </div>
          </div>

          <!-- Painel Inferior de Controles Físicos do Leitor -->
          <div class="microfilm-control-deck">
            <!-- Navegação entre Quadros -->
            <div class="flex items-center gap-2">
              <button class="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5" 
                ${this.currentFrameIdx === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed"' : ''}
                onclick="window.microfilmReader.goToFrame(${this.currentFrameIdx - 1})">
                ◀ Rebobinar Quadro Anterior
              </button>

              <span class="film-counter-display font-mono text-xs px-3 py-1 bg-black rounded border border-slate-700 text-cyan-400">
                QUADRO ${this.currentFrameIdx + 1} / ${this.frames.length}
              </span>

              <button class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5" 
                ${this.currentFrameIdx === this.frames.length - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed"' : ''}
                onclick="window.microfilmReader.goToFrame(${this.currentFrameIdx + 1})">
                Avançar Próximo Quadro ▶
              </button>
            </div>

            <!-- Controles Ópticos (Negativo/Positivo, Lâmpada e Zoom) -->
            <div class="flex items-center gap-3">
              <button class="btn-secondary text-xs py-1 px-2.5 ${this.isNegative ? 'border-amber-500 text-amber-300' : ''}" 
                onclick="window.microfilmReader.toggleNegative()">
                Inverter Negativo / Positivo
              </button>

              <div class="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <span>Zoom:</span>
                <button class="btn-secondary text-xs py-0.5 px-2" onclick="window.microfilmReader.adjustZoom(-0.2)">-</button>
                <span class="text-white">${Math.round(this.zoomLevel * 100)}%</span>
                <button class="btn-secondary text-xs py-0.5 px-2" onclick="window.microfilmReader.adjustZoom(0.2)">+</button>
              </div>

              <button class="btn-secondary text-xs py-1 px-2.5 text-cyan-300 border-cyan-500/40" 
                onclick="window.app.switchTab('investigacao'); alert('Quadro localizado! Retornando ao Caderno de Investigação para responder as perguntas.')">
                📋 Voltar ao Caderno
              </button>
            </div>
          </div>

        </div>

        <!-- Seletor Rápido de Bobinas no Rodapé -->
        <div class="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl">
          <div class="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
            <span>🗄️</span> Fichário de Microfilmes da Hemeroteca Municipal:
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${this.frames.map((fr, idx) => `
              <button class="microfilm-frame-btn ${idx === this.currentFrameIdx ? 'active-frame' : ''}"
                onclick="window.microfilmReader.goToFrame(${idx})">
                <strong class="truncate">${idx + 1}. ${fr.newspaper}</strong>
                <span class="truncate">${fr.date.split('•')[0]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

window.MicrofilmReader = MicrofilmReader;
