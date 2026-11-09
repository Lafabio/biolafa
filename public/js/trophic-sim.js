// Simulador Didático de Dinâmica Ambiental:
// - Desafio 01: Dinâmica Trófica e Bioacumulação de Microplásticos (Rio das Palmeiras)
// - Desafio 02: Eutrofização, Cianobactérias Tóxicas e Ciclo Nictemeral de Oxigênio (Lago Azul)
class TrophicSimulator {
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
  setD2Scenario(scen) {
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
    if (isDesafio2) {
      this.renderDesafio2();
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

  renderDesafio2() {
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
            <button class="btn-scen ${this.d2Scenario === 'preservado' ? 'active' : ''}" onclick="window.trophicSim.setD2Scenario('preservado')">
              Lago Preservado (Baixo N&P)
            </button>
            <button class="btn-scen ${this.d2Scenario === 'atual' ? 'active' : ''}" onclick="window.trophicSim.setD2Scenario('atual')">
              Situação Atual (Floração Crítica)
            </button>
            <button class="btn-scen ${this.d2Scenario === 'mitigado' ? 'active' : ''}" onclick="window.trophicSim.setD2Scenario('mitigado')">
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
