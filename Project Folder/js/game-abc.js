/**
 * CURIO Game 2: ABC Art Studio
 * Interactive alphabet handwriting and tracing canvas with touch & mouse support,
 * sparkling particle brush trails, all 26 letters A-Z with illustrated items,
 * uppercase/lowercase modes, phonics speech synthesis, and completion tracking.
 */

class AbcArtStudioGame {
  constructor() {
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.currentLetterIndex = 0; // 0 to 25
    this.isLowercase = false;
    this.brushColor = '#F59E0B'; // default gold sparkle
    this.isDrawing = false;
    this.drawnPoints = [];
    this.sparkles = [];
    this.isTracingCompleted = false;

    // Full 26 Letters database as specified
    this.alphabetData = [
      { letter: 'A', name: 'Apple', icon: '🍎', phonetic: '/æ/ apple', color: '#EF4444' },
      { letter: 'B', name: 'Ball', icon: '⚽', phonetic: '/b/ ball', color: '#3B82F6' },
      { letter: 'C', name: 'Cat', icon: '🐱', phonetic: '/k/ cat', color: '#F59E0B' },
      { letter: 'D', name: 'Dog', icon: '🐶', phonetic: '/d/ dog', color: '#10B981' },
      { letter: 'E', name: 'Elephant', icon: '🐘', phonetic: '/e/ elephant', color: '#8B5CF6' },
      { letter: 'F', name: 'Fish', icon: '🐟', phonetic: '/f/ fish', color: '#06B6D4' },
      { letter: 'G', name: 'Grapes', icon: '🍇', phonetic: '/g/ grapes', color: '#9333EA' },
      { letter: 'H', name: 'House', icon: '🏠', phonetic: '/h/ house', color: '#F97316' },
      { letter: 'I', name: 'Ice Cream', icon: '🍦', phonetic: '/aɪ/ ice cream', color: '#EC4899' },
      { letter: 'J', name: 'Juice', icon: '🧃', phonetic: '/dʒ/ juice', color: '#EAB308' },
      { letter: 'K', name: 'Kite', icon: '🪁', phonetic: '/k/ kite', color: '#38BDF8' },
      { letter: 'L', name: 'Lion', icon: '🦁', phonetic: '/l/ lion', color: '#F59E0B' },
      { letter: 'M', name: 'Mango', icon: '🥭', phonetic: '/m/ mango', color: '#F97316' },
      { letter: 'N', name: 'Nest', icon: '🪺', phonetic: '/n/ nest', color: '#84CC16' },
      { letter: 'O', name: 'Orange', icon: '🍊', phonetic: '/ɒ/ orange', color: '#EA580C' },
      { letter: 'P', name: 'Penguin', icon: '🐧', phonetic: '/p/ penguin', color: '#0284C7' },
      { letter: 'Q', name: 'Queen', icon: '👑', phonetic: '/kw/ queen', color: '#A855F7' },
      { letter: 'R', name: 'Rabbit', icon: '🐰', phonetic: '/r/ rabbit', color: '#FB7185' },
      { letter: 'S', name: 'Sun', icon: '☀️', phonetic: '/s/ sun', color: '#FBBF24' },
      { letter: 'T', name: 'Tree', icon: '🌳', phonetic: '/t/ tree', color: '#10B981' },
      { letter: 'U', name: 'Umbrella', icon: '☂️', phonetic: '/ʌ/ umbrella', color: '#6366F1' },
      { letter: 'V', name: 'Van', icon: '🚐', phonetic: '/v/ van', color: '#0D9488' },
      { letter: 'W', name: 'Watermelon', icon: '🍉', phonetic: '/w/ watermelon', color: '#F43F5E' },
      { letter: 'X', name: 'Xylophone', icon: '🎼', phonetic: '/z/ xylophone', color: '#8B5CF6' },
      { letter: 'Y', name: 'Yo-yo', icon: '🪀', phonetic: '/j/ yo-yo', color: '#E11D48' },
      { letter: 'Z', name: 'Zebra', icon: '🦓', phonetic: '/z/ zebra', color: '#334155' }
    ];
  }

  mount(targetElement) {
    this.container = targetElement;
    this.renderScreen();
  }

  getCurrentItem() {
    return this.alphabetData[this.currentLetterIndex];
  }

  renderScreen() {
    const item = this.getCurrentItem();
    const charToDisplay = this.isLowercase ? item.letter.toLowerCase() : item.letter;

    this.container.innerHTML = `
      <div class="abc-studio-container animate-fade-in">
        <!-- Studio Header -->
        <div class="game-header-bar">
          <button class="curio-btn curio-btn-secondary btn-sm" id="btn-abc-back">
            <span>← Explorer HQ</span>
          </button>
          <div class="abc-letter-header">
            <span class="abc-big-tag">${item.letter} ${item.letter.toLowerCase()}</span>
            <span class="abc-phonics-label">${item.letter} is for ${item.name} ${item.icon}</span>
          </div>
          <button class="curio-btn curio-btn-primary btn-sm" id="btn-speak-letter">
            <span>🔊 Phonics Sound</span>
          </button>
        </div>

        <div class="abc-workspace-grid">
          <!-- Left: Big Visual Showcase -->
          <div class="abc-illustration-card" style="border-top: 8px solid ${item.color};">
            <div class="item-giant-icon animate-bounce-subtle">${item.icon}</div>
            <div class="item-name-tag">${item.name}</div>
            <div class="phonics-bubble">
              <span class="phonics-text">Letter ${item.letter} says "${item.phonetic}"</span>
            </div>

            <!-- Case Switcher -->
            <div class="case-switcher-box">
              <button class="case-btn ${!this.isLowercase ? 'active' : ''}" id="btn-case-upper">
                Uppercase (${item.letter})
              </button>
              <button class="case-btn ${this.isLowercase ? 'active' : ''}" id="btn-case-lower">
                Lowercase (${item.letter.toLowerCase()})
              </button>
            </div>

            <!-- Brush Palette -->
            <div class="brush-palette-row">
              <span class="palette-label">Sparkle Color:</span>
              <div class="color-dots">
                <button class="color-dot active" style="background:#F59E0B;" data-color="#F59E0B" title="Sunny Gold"></button>
                <button class="color-dot" style="background:#EC4899;" data-color="#EC4899" title="Berry Pink"></button>
                <button class="color-dot" style="background:#06B6D4;" data-color="#06B6D4" title="Neon Cyan"></button>
                <button class="color-dot" style="background:#10B981;" data-color="#10B981" title="Emerald Green"></button>
                <button class="color-dot" style="background:#8B5CF6;" data-color="#8B5CF6" title="Cosmic Violet"></button>
              </div>
            </div>
          </div>

          <!-- Center: Interactive Tracing Board -->
          <div class="abc-canvas-card">
            <div class="canvas-instruction-bar">
              <span class="start-dot-hint">🟢 Start from the top dot and trace letter <strong>"${charToDisplay}"</strong>!</span>
            </div>

            <div class="canvas-wrapper" id="canvas-wrapper">
              <canvas id="abc-trace-canvas" width="420" height="420"></canvas>
            </div>

            <div class="canvas-tools-row">
              <button class="curio-btn curio-btn-outline btn-sm" id="btn-clear-trace">
                <span>🧹 Clear</span>
              </button>
              <button class="curio-btn curio-btn-secondary btn-sm" id="btn-retry-trace">
                <span>🔄 Try Again</span>
              </button>
              <button class="curio-btn curio-btn-primary" id="btn-next-letter">
                <span>Next Letter ⏭️</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom: Letter Selector Bar (A to Z) -->
        <div class="abc-letter-strip">
          <div class="strip-label">Alphabet Quick Jump:</div>
          <div class="strip-letters-row">
            ${this.alphabetData.map((d, idx) => `
              <button class="strip-letter-btn ${this.currentLetterIndex === idx ? 'current' : ''} ${window.curioState && window.curioState.data.games.abc.completedLetters.includes(d.letter) ? 'done' : ''}" data-idx="${idx}">
                ${d.letter}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.initCanvas(charToDisplay);
    this.attachEventListeners();
    this.speakCurrent();
  }

  speakCurrent() {
    const item = this.getCurrentItem();
    if (window.curioAudio) {
      window.curioAudio.speak(`${item.letter}. ${item.letter} is for ${item.name}!`);
    }
  }

  initCanvas(charToDisplay) {
    this.canvas = this.container.querySelector('#abc-trace-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.drawnPoints = [];
    this.isTracingCompleted = false;

    // Handle high DPI
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = 420 * dpr;
    this.canvas.height = 420 * dpr;
    this.ctx.scale(dpr, dpr);

    this.drawBackgroundLetter(charToDisplay);
    this.setupDrawingEvents();
  }

  drawBackgroundLetter(char) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 420, 420);

    // Subtle paper grid lines for penmanship
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);

    // Top guideline
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(390, 80);
    ctx.stroke();

    // Middle guideline
    ctx.strokeStyle = '#CBD5E1';
    ctx.beginPath();
    ctx.moveTo(30, 230);
    ctx.lineTo(390, 230);
    ctx.stroke();

    // Baseline guideline
    ctx.strokeStyle = '#94A3B8';
    ctx.setLineDash([]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 350);
    ctx.lineTo(390, 350);
    ctx.stroke();

    // Draw large dotted / outlined letter guide
    ctx.font = 'bold 280px "Fredoka", "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Faint fill guide
    ctx.fillStyle = '#F1F5F9';
    ctx.fillText(char, 210, 215);

    // Thick dotted outline
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([12, 16]);
    ctx.strokeText(char, 210, 215);

    // Starting guide dot
    ctx.setLineDash([]);
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    // Position start dot near top of letter
    const startX = char === 'A' ? 210 : (char === 'B' ? 140 : 210);
    const startY = 100;
    ctx.arc(startX, startY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('1', startX, startY);
  }

  setupDrawingEvents() {
    const canvas = this.canvas;
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (420 / rect.width),
        y: (clientY - rect.top) * (420 / rect.height)
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      this.isDrawing = true;
      const pos = getPos(e);
      this.drawnPoints.push(pos);
      if (window.curioAudio) window.curioAudio.playPop();
    };

    const drawMove = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      this.drawnPoints.push(pos);

      // Render glowing sparkle stroke
      const ctx = this.ctx;
      ctx.setLineDash([]);
      ctx.strokeStyle = this.brushColor;
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = this.brushColor;
      ctx.shadowBlur = 12;

      const len = this.drawnPoints.length;
      if (len > 1) {
        ctx.beginPath();
        ctx.moveTo(this.drawnPoints[len - 2].x, this.drawnPoints[len - 2].y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      // Check tracing progress
      if (this.drawnPoints.length > 28 && !this.isTracingCompleted) {
        this.checkCompletion();
      }
    };

    const endDraw = (e) => {
      this.isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', drawMove);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', drawMove, { passive: false });
    window.addEventListener('touchend', endDraw);
  }

  checkCompletion() {
    this.isTracingCompleted = true;
    const item = this.getCurrentItem();

    // Reward!
    if (window.curioState) {
      window.curioState.addStars(15, `Traced Letter ${item.letter}`);
      window.curioState.addXP(20, `Traced Letter ${item.letter}`);
      window.curioState.incrementMission('abc', 1);

      if (!window.curioState.data.games.abc.completedLetters.includes(item.letter)) {
        window.curioState.data.games.abc.completedLetters.push(item.letter);
        window.curioState.save();
      }
    }
    if (window.curioAudio) window.curioAudio.playCorrect();

    // Show celebratory banner
    const bar = this.container.querySelector('.canvas-instruction-bar');
    if (bar) {
      bar.innerHTML = `
        <div class="trace-complete-banner animate-pop-in">
          <span>🌟 Wonderful! Letter ${item.letter} mastered! ⭐ +15</span>
        </div>
      `;
    }

    if (window.curioAudio) {
      window.curioAudio.speak(`Wonderful! You traced ${item.letter}!`);
    }

    // Check if finished Z
    if (this.currentLetterIndex === 25) {
      setTimeout(() => this.renderAbcMaster(), 1800);
    }
  }

  renderAbcMaster() {
    if (window.curioState) {
      window.curioState.unlockBadge('abc_master');
      window.curioState.addStars(50, 'ABC Master Completion');
    }
    if (window.curioAudio) window.curioAudio.playFanfare();

    this.container.innerHTML = `
      <div class="level-complete-card animate-pop-in">
        <div class="trophy-crest">🏆</div>
        <h2 class="complete-title">ABC MASTER! 🏆</h2>
        <p class="complete-subtitle">Incredible handwriting! You mastered the entire alphabet from A to Z!</p>

        <div class="stats-summary-grid">
          <div class="stat-box">
            <span class="stat-value">26 / 26</span>
            <span class="stat-label">Letters Completed</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">100%</span>
            <span class="stat-label">Accuracy & Form</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">⭐ +150</span>
            <span class="stat-label">Total Stars Earned</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">⚡ +200</span>
            <span class="stat-label">XP Gained</span>
          </div>
        </div>

        <div class="complete-actions">
          <button class="curio-btn curio-btn-primary curio-btn-large" id="btn-back-hq">
            <span>Explorer HQ 🚀</span>
          </button>
          <button class="curio-btn curio-btn-secondary" id="btn-restart-abc">
            <span>Practice Letters Again 🔤</span>
          </button>
        </div>
      </div>
    `;

    if (window.curioApp && window.curioApp.triggerConfetti) {
      window.curioApp.triggerConfetti();
    }

    this.container.querySelector('#btn-back-hq').onclick = () => window.curioApp.navigate('play');
    this.container.querySelector('#btn-restart-abc').onclick = () => {
      this.currentLetterIndex = 0;
      this.renderScreen();
    };
  }

  attachEventListeners() {
    this.container.querySelector('#btn-abc-back').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      window.curioApp.navigate('play');
    };

    this.container.querySelector('#btn-speak-letter').onclick = () => {
      this.speakCurrent();
    };

    this.container.querySelector('#btn-case-upper').onclick = () => {
      this.isLowercase = false;
      this.renderScreen();
    };

    this.container.querySelector('#btn-case-lower').onclick = () => {
      this.isLowercase = true;
      this.renderScreen();
    };

    this.container.querySelector('#btn-clear-trace').onclick = () => {
      if (window.curioAudio) window.curioAudio.playPop();
      const char = this.isLowercase ? this.getCurrentItem().letter.toLowerCase() : this.getCurrentItem().letter;
      this.initCanvas(char);
    };

    this.container.querySelector('#btn-retry-trace').onclick = () => {
      if (window.curioAudio) window.curioAudio.playPop();
      const char = this.isLowercase ? this.getCurrentItem().letter.toLowerCase() : this.getCurrentItem().letter;
      this.initCanvas(char);
    };

    this.container.querySelector('#btn-next-letter').onclick = () => {
      if (window.curioAudio) window.curioAudio.playWhoosh();
      this.currentLetterIndex = (this.currentLetterIndex + 1) % this.alphabetData.length;
      this.renderScreen();
    };

    // Color picker
    this.container.querySelectorAll('.color-dot').forEach(btn => {
      btn.onclick = () => {
        this.container.querySelectorAll('.color-dot').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.brushColor = btn.dataset.color;
        if (window.curioAudio) window.curioAudio.playPop();
      };
    });

    // Strip buttons
    this.container.querySelectorAll('.strip-letter-btn').forEach(btn => {
      btn.onclick = () => {
        this.currentLetterIndex = parseInt(btn.dataset.idx);
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderScreen();
      };
    });
  }
}

window.AbcArtStudioGame = AbcArtStudioGame;
