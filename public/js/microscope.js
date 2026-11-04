// Simulador de Microscópio Óptico Virtual Interativo para Pesquisa Científica
class VirtualMicroscope {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // Estado do Microscópio
    this.currentSlide = null;
    this.image = new Image();
    this.imageLoaded = false;

    // Óptica e Aumento
    this.objectives = {
      '4x': { mag: 4, label: '4x (Varredura)', color: '#ef4444', fov: 4500, blurSens: 0.15 },
      '10x': { mag: 10, label: '10x (Médio Alcance)', color: '#eab308', fov: 1800, blurSens: 0.35 },
      '40x': { mag: 40, label: '40x (Grande Aumento)', color: '#3b82f6', fov: 450, blurSens: 0.8 },
      '100x': { mag: 100, label: '100x (Imersão em Óleo)', color: '#ffffff', fov: 180, blurSens: 1.5 }
    };
    this.currentObjKey = '10x';

    // Foco (Macrométrico de 0 a 100, Micrométrico de 0 a 100)
    this.optimalFocus = 50; // Ponto ótimo de foco da lâmina atual
    this.macroFocus = 50;
    this.microFocus = 50;

    // Platina / Movimentação X e Y
    this.stageX = 0; // offset em pixels na imagem
    this.stageY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    // Iluminação e Filtros
    this.lightIntensity = 85; // 0 a 100
    this.filterMode = 'brightfield'; // 'brightfield', 'phase', 'uv'
    this.showReticle = true;
    this.showRuler = true;

    // Ferramenta de Medição Micrométrica
    this.measuring = false;
    this.measureStart = null;
    this.measureEnd = null;
    this.lastMeasurement = null;

    // Snapshots capturados
    this.snapshots = [];

    this.initEventListeners();
  }

  loadSlide(slideObj) {
    if (!slideObj) return;
    this.currentSlide = slideObj;
    this.imageLoaded = false;
    this.image = new Image();
    
    // Sortear ponto de foco ligeiramente desafiador para cada lâmina
    this.optimalFocus = 40 + Math.floor(Math.random() * 21); // entre 40 e 60
    this.macroFocus = 30 + Math.floor(Math.random() * 41);
    this.microFocus = 50;

    this.image.onload = () => {
      this.imageLoaded = true;
      // Centralizar platina
      this.stageX = this.image.width / 2;
      this.stageY = this.image.height / 2;
      this.render();
      this.updateUI();
    };
    this.image.onerror = () => {
      console.warn('Erro ao carregar imagem da lâmina:', slideObj.src);
    };
    this.image.src = slideObj.src;
  }

  setObjective(objKey) {
    if (!this.objectives[objKey]) return;
    this.currentObjKey = objKey;
    this.render();
    this.updateUI();
  }

  setMacroFocus(val) {
    this.macroFocus = Math.max(0, Math.min(100, parseFloat(val)));
    this.render();
    this.updateUI();
  }

  setMicroFocus(val) {
    this.microFocus = Math.max(0, Math.min(100, parseFloat(val)));
    this.render();
    this.updateUI();
  }

  setLight(val) {
    this.lightIntensity = Math.max(10, Math.min(150, parseFloat(val)));
    this.render();
  }

  setFilter(mode) {
    this.filterMode = mode;
    this.render();
    this.updateUI();
  }

  toggleReticle() {
    this.showReticle = !this.showReticle;
    this.render();
  }

  toggleMeasureTool() {
    this.measuring = !this.measuring;
    this.measureStart = null;
    this.measureEnd = null;
    this.render();
    this.updateUI();
  }

  // Cálculo da nitidez óptica (distância do foco ótimo)
  calculateBlur() {
    // Efeito combinado do macro (peso maior) e micro (ajuste fino)
    const currentTotalFocus = this.macroFocus + (this.microFocus - 50) * 0.15;
    const diff = Math.abs(currentTotalFocus - this.optimalFocus);
    const sens = this.objectives[this.currentObjKey].blurSens;
    const blurAmount = diff * sens * 0.45;
    return Math.min(22, Math.max(0, blurAmount));
  }

  isFocused() {
    return this.calculateBlur() < 1.2;
  }

  render() {
    if (!this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const radius = Math.min(w, h) / 2 - 12;
    const cx = w / 2;
    const cy = h / 2;

    // Fundo da ocular
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, w, h);

    if (!this.imageLoaded) {
      // Mensagem de espera
      ctx.fillStyle = '#64748b';
      ctx.font = '16px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Nenhuma lâmina montada na platina...', cx, cy);
      return;
    }

    // Máscara circular da ocular do microscópio
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Fundo do campo iluminado
    const brightness = (this.lightIntensity / 100);
    ctx.fillStyle = this.filterMode === 'uv' ? '#020617' : `rgba(240, 245, 255, ${brightness})`;
    ctx.fillRect(0, 0, w, h);

    // Calcular zoom e enquadramento
    const magData = this.objectives[this.currentObjKey];
    // Zoom base proporcional
    const baseZoom = (magData.mag / 10) * (radius / 250);

    ctx.save();
    // Efeito de desfoque óptico
    const blurPx = this.calculateBlur();
    if (blurPx > 0.4) {
      ctx.filter = `blur(${blurPx.toFixed(1)}px)`;
    }

    // Filtros de Luz Especial
    if (this.filterMode === 'phase') {
      ctx.filter = (ctx.filter ? ctx.filter + ' ' : '') + 'contrast(1.6) saturate(0.2)';
    } else if (this.filterMode === 'uv') {
      ctx.filter = (ctx.filter ? ctx.filter + ' ' : '') + 'contrast(2.2) brightness(1.2) hue-rotate(180deg)';
    }

    // Desenhar imagem da lâmina recortada na platina
    const destW = this.image.width * baseZoom;
    const destH = this.image.height * baseZoom;
    const destX = cx - (this.stageX * baseZoom);
    const destY = cy - (this.stageY * baseZoom);

    ctx.drawImage(this.image, destX, destY, destW, destH);
    ctx.restore();

    // Seletor UV especial: se a lâmina tiver fluorescência de plástico, realçar brilho
    if (this.filterMode === 'uv' && this.currentSlide && this.currentSlide.uvFluorescence) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    // Efeito de vinheta de lente esférica nas bordas
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
    ctx.fillStyle = grad;
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Retículo óptico com mira central e escala micrométrica
    if (this.showReticle) {
      this.drawReticle(ctx, cx, cy, radius);
    }

    // Desenhar linha de medição se usuário estiver usando a régua
    if (this.measuring && this.measureStart && this.measureEnd) {
      this.drawMeasurementLine(ctx);
    }

    ctx.restore(); // Fecha o clip da ocular

    // Borda metálica da ocular com efeito de profundidade
    ctx.save();
    ctx.lineWidth = 14;
    const borderGrad = ctx.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, '#334155');
    borderGrad.addColorStop(0.5, '#0f172a');
    borderGrad.addColorStop(1, '#1e293b');
    ctx.strokeStyle = borderGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
    ctx.stroke();

    // Anel externo sutil
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#38bdf8';
    ctx.stroke();
    ctx.restore();

    // Régua de Escala Micrométrica no canto inferior direito
    this.drawScaleBar(ctx, w, h);
  }

  drawReticle(ctx, cx, cy, radius) {
    ctx.save();
    ctx.strokeStyle = this.filterMode === 'uv' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(15, 23, 42, 0.35)';
    ctx.lineWidth = 1;

    // Cruz de mira central
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy);
    ctx.lineTo(cx + 30, cy);
    ctx.moveTo(cx, cy - 30);
    ctx.lineTo(cx, cy + 30);
    ctx.stroke();

    // Círculos concêntricos de referência
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.stroke();

    // Marcas de calibração micrométrica nos eixos
    const tickLen = 6;
    for (let r = -150; r <= 150; r += 15) {
      if (r === 0) continue;
      // Eixo X
      ctx.beginPath();
      ctx.moveTo(cx + r, cy - tickLen / 2);
      ctx.lineTo(cx + r, cy + tickLen / 2);
      ctx.stroke();
      // Eixo Y
      ctx.beginPath();
      ctx.moveTo(cx - tickLen / 2, cy + r);
      ctx.lineTo(cx + tickLen / 2, cy + r);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawScaleBar(ctx, w, h) {
    const mag = this.objectives[this.currentObjKey].mag;
    // Escala em micrometros correspondente a 100 pixels no canvas
    const baseScale = this.currentSlide ? this.currentSlide.scaleMicronsPerPixel : 0.1;
    const micronsPerPx = (baseScale * 100) / mag;
    const barWidthPx = 120;
    const totalMicrons = Math.round(barWidthPx * micronsPerPx);

    ctx.save();
    const bx = w - 170;
    const by = h - 35;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.fillRect(bx - 10, by - 20, 150, 42);
    ctx.strokeRect(bx - 10, by - 20, 150, 42);

    // Linha da escala
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx, by + 8);
    ctx.lineTo(bx + barWidthPx, by + 8);
    // delimitadores verticais
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + 12);
    ctx.moveTo(bx + barWidthPx, by);
    ctx.lineTo(bx + barWidthPx, by + 12);
    ctx.stroke();

    // Texto da escala
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${totalMicrons} µm`, bx + barWidthPx / 2, by - 4);
    ctx.restore();
  }

  drawMeasurementLine(ctx) {
    ctx.save();
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#f43f5e';

    // Ponto inicial
    ctx.beginPath();
    ctx.arc(this.measureStart.x, this.measureStart.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Linha
    ctx.beginPath();
    ctx.moveTo(this.measureStart.x, this.measureStart.y);
    ctx.lineTo(this.measureEnd.x, this.measureEnd.y);
    ctx.stroke();

    // Ponto final
    ctx.beginPath();
    ctx.arc(this.measureEnd.x, this.measureEnd.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Calcular distância física em micrômetros
    const dx = this.measureEnd.x - this.measureStart.x;
    const dy = this.measureEnd.y - this.measureStart.y;
    const distPx = Math.sqrt(dx * dx + dy * dy);

    const mag = this.objectives[this.currentObjKey].mag;
    const baseScale = this.currentSlide ? this.currentSlide.scaleMicronsPerPixel : 0.1;
    const microns = Math.round((distPx * baseScale * 100) / mag);

    this.lastMeasurement = microns;

    // Etiqueta com valor
    const midX = (this.measureStart.x + this.measureEnd.x) / 2;
    const midY = (this.measureStart.y + this.measureEnd.y) / 2;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(midX - 35, midY - 22, 70, 20);
    ctx.strokeStyle = '#f43f5e';
    ctx.strokeRect(midX - 35, midY - 22, 70, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${microns} µm`, midX, midY - 8);
    ctx.restore();
  }

  initEventListeners() {
    if (!this.canvas) return;

    // Pan / Drag na platina
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.measuring) {
        this.measureStart = { x, y };
        this.measureEnd = { x, y };
        return;
      }

      this.isDragging = true;
      this.dragStartX = x;
      this.dragStartY = y;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.measuring && this.measureStart) {
        this.measureEnd = { x, y };
        this.render();
        return;
      }

      if (!this.isDragging || !this.imageLoaded) return;
      const dx = x - this.dragStartX;
      const dy = y - this.dragStartY;
      this.dragStartX = x;
      this.dragStartY = y;

      const mag = this.objectives[this.currentObjKey].mag;
      const sensitivity = 0.85 / (mag / 10);
      this.stageX -= dx * sensitivity;
      this.stageY -= dy * sensitivity;

      // Limitar aos limites da imagem
      this.stageX = Math.max(0, Math.min(this.image.width, this.stageX));
      this.stageY = Math.max(0, Math.min(this.image.height, this.stageY));

      this.render();
      this.updateCoordinates();
    });

    window.addEventListener('mouseup', () => {
      if (this.measuring && this.measureStart && this.measureEnd) {
        // Concluiu medição
        this.render();
      }
      this.isDragging = false;
      if (this.canvas) {
        this.canvas.style.cursor = this.measuring ? 'crosshair' : 'grab';
      }
    });

    // Zoom por scroll do mouse para conveniência
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      // Scroll ajusta foco micrométrico com grande precisão!
      const delta = e.deltaY > 0 ? -2 : 2;
      this.setMicroFocus(this.microFocus + delta);
    }, { passive: false });
  }

  takeSnapshot(note = '') {
    if (!this.canvas || !this.currentSlide) return null;
    const dataUrl = this.canvas.toDataURL('image/jpeg', 0.92);
    const snapshot = {
      id: 'snap_' + Date.now(),
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      slideTitle: this.currentSlide.title,
      slideCode: this.currentSlide.code,
      objective: this.currentObjKey,
      filter: this.filterMode,
      note: note || `Observação de rotina da lâmina ${this.currentSlide.code}`,
      dataUrl: dataUrl
    };
    this.snapshots.push(snapshot);
    return snapshot;
  }

  updateCoordinates() {
    const el = document.getElementById('micro-coords');
    if (el) {
      el.textContent = `X: ${Math.round(this.stageX)} µm | Y: ${Math.round(this.stageY)} µm`;
    }
  }

  updateUI() {
    // Atualizar indicador de foco
    const focusPill = document.getElementById('micro-focus-status');
    const blurVal = this.calculateBlur();
    if (focusPill) {
      if (blurVal < 1.2) {
        focusPill.innerHTML = '<span class="status-led status-green"></span> Foco Nítido (100%)';
        focusPill.className = 'status-badge badge-success';
      } else if (blurVal < 5) {
        focusPill.innerHTML = '<span class="status-led status-yellow"></span> Quase Nítido (Ajuste Fino)';
        focusPill.className = 'status-badge badge-warning';
      } else {
        focusPill.innerHTML = '<span class="status-led status-red"></span> Desfocado (Gire os Botões)';
        focusPill.className = 'status-badge badge-danger';
      }
    }

    // Atualizar botões de objetivas
    document.querySelectorAll('[data-obj]').forEach(btn => {
      if (btn.getAttribute('data-obj') === this.currentObjKey) {
        btn.classList.add('active-obj');
      } else {
        btn.classList.remove('active-obj');
      }
    });

    this.updateCoordinates();
  }
}

// Exportar globalmente
window.VirtualMicroscope = VirtualMicroscope;
