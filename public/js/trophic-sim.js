// Simulador de Dinâmica Trófica e Bioacumulação de Microplásticos
class TrophicSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Estado da simulação
    this.baseScenario = 'A'; // 'A', 'B' ou 'custom'
    this.emissionRate = 100; // Porcentagem (100% = Cenário A)
    this.eliminationEfficiency = 65; // Taxa de depuração fisiológica pelo organismo (%)
    
    // Níveis tróficos
    this.levels = [
      { id: 'algae', name: 'Algas (Fitoplâncton)', role: 'Produtor Primário', baseA: 10, baseB: 20, color: '#10b981', icon: '🌿' },
      { id: 'zooplankton', name: 'Zooplâncton (Daphnia)', role: 'Consumidor Primário', baseA: 18, baseB: 39, color: '#3b82f6', icon: '🦐' },
      { id: 'small_fish', name: 'Peixe Pequeno (Lambari)', role: 'Consumidor Secundário', baseA: 31, baseB: 74, color: '#f59e0b', icon: '🐟' },
      { id: 'top_predator', name: 'Peixe Predador (Traíra)', role: 'Consumidor Terciário (Topo)', baseA: 57, baseB: 141, color: '#ef4444', icon: '🦈' }
    ];

    this.render();
  }

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
      // Cálculo do índice simulado baseado no modelo didático
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

  render() {
    if (!this.container) return;
    const computed = this.calculateValues();
    const maxVal = Math.max(...computed.map(c => c.currentValue), 150);

    this.container.innerHTML = `
      <div class="trophic-sim-card">
        <div class="trophic-header">
          <div class="trophic-title-group">
            <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span class="icon-chip">📊</span> Modelo Didático de Teia Trófica Fluvial
            </h3>
            <p class="text-xs text-slate-400">
              Simulação de comportamento de partículas ao longo dos níveis alimentares (Cadeia: Algas → Zooplâncton → Peixe Pequeno → Predador).
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
          ${computed.map((item, idx) => {
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
}

window.TrophicSimulator = TrophicSimulator;
