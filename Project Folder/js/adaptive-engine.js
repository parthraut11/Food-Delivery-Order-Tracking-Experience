/**
 * CURIO Adaptive Learning Engine & Live Pitch Inspector
 * Demonstrates real-time Dynamic Difficulty Adjustment (DDA),
 * cognitive mastery tracking, automated scaffolding, and pedagogical event logging.
 * Includes interactive simulation triggers for business-pitch judges!
 */

class CurioAdaptiveEngine {
  constructor() {
    this.container = null;
  }

  mount(targetElement) {
    this.container = targetElement;
    this.render();
  }

  render() {
    const state = window.curioState.data;
    const adaptive = state.adaptive;

    this.container.innerHTML = `
      <div class="adaptive-engine-container animate-fade-in">
        <!-- Pitch Header -->
        <div class="adaptive-header-banner">
          <div class="banner-text-group">
            <span class="pitch-tag">🏆 COMPETITION PITCH DIFFERENTIATOR</span>
            <h2 class="adaptive-title">Curio AI Adaptive Learning Core</h2>
            <p class="adaptive-subtitle">
              How CURIO personalizes every child's path in real time through cognitive scaffolding,
              preventing frustration while accelerating mastery.
            </p>
          </div>
          <div class="engine-status-badge">
            <span class="status-pulse-dot"></span>
            <span>Real-Time Engine Active</span>
          </div>
        </div>

        <!-- 3-Pillar Architecture Diagram -->
        <div class="adaptive-pillars-grid">
          <div class="pillar-card">
            <div class="pillar-icon">📈</div>
            <h4>1. Dynamic Difficulty Adjustment (DDA)</h4>
            <p>Monitors consecutive correct challenges. After 3 unbroken successes, automatically advances number range and tier.</p>
            <div class="pillar-metric">
              <span>Current Math Tier:</span>
              <strong>Tier ${adaptive.mathDifficultyTier} / 5</strong>
            </div>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">💡</div>
            <h4>2. Zero-Frustration Scaffolding</h4>
            <p>If a child experiences 2 consecutive missteps, visual counters (dots/apples) and audio hints unlock without penalty.</p>
            <div class="pillar-metric">
              <span>Scaffolding Status:</span>
              <strong style="color:${adaptive.scaffoldingActive ? '#10B981' : '#64748B'};">
                ${adaptive.scaffoldingActive ? 'Active (Visual Hints Enabled)' : 'Standby (Independent Play)'}
              </strong>
            </div>
          </div>

          <div class="pillar-card">
            <div class="pillar-icon">🔄</div>
            <h4>3. Spaced Phonics Repetition</h4>
            <p>Identifies letters with lower tracing smoothness and naturally weaves them into subsequent Word Builder quests.</p>
            <div class="pillar-metric">
              <span>Next Targeted Phonics:</span>
              <strong>Letter "${state.games.abc.completedLetters[0] || 'A'}" reinforcement</strong>
            </div>
          </div>
        </div>

        <!-- Live Simulation Sandbox for Judges -->
        <div class="simulation-sandbox-card">
          <div class="sandbox-header">
            <h3>🔬 Interactive Judge Sandbox: Test the Adaptive Loop</h3>
            <span class="sandbox-desc">Click either scenario to watch Curio re-calibrate difficulty and scaffolding in real time:</span>
          </div>

          <div class="sandbox-actions-row">
            <button class="curio-btn curio-btn-primary btn-sim" id="btn-sim-excel">
              <span>🚀 Simulate Child Excelling (+3 Correct Streak)</span>
            </button>
            <button class="curio-btn curio-btn-secondary btn-sim" id="btn-sim-struggle">
              <span>💡 Simulate Child Struggling (Trigger Scaffolding)</span>
            </button>
            <button class="curio-btn curio-btn-outline btn-sim" id="btn-sim-reset">
              <span>🔄 Reset Adaptive State</span>
            </button>
          </div>

          <div class="live-prompt-feedback-box">
            <span class="prompt-icon">🤖</span>
            <div class="prompt-text-group">
              <strong>Curio's Active In-Game Adaptation:</strong>
              <p class="current-adj-text">"${adaptive.currentPromptAdjustment}"</p>
            </div>
          </div>
        </div>

        <!-- Real-Time Event Audit Log -->
        <div class="adaptive-log-card">
          <div class="log-header-row">
            <h4>Live Pedagogical Decision Audit Stream</h4>
            <span class="log-count">${adaptive.recentEvents.length} Recent Adaptations</span>
          </div>
          <div class="log-entries-list">
            ${adaptive.recentEvents.map(evt => `
              <div class="log-item animate-pop-in">
                <span class="log-time">${evt.timestamp}</span>
                <span class="log-text">${evt.event}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const simExcel = this.container.querySelector('#btn-sim-excel');
    const simStruggle = this.container.querySelector('#btn-sim-struggle');
    const simReset = this.container.querySelector('#btn-sim-reset');

    if (simExcel) {
      simExcel.onclick = () => {
        if (window.curioAudio) window.curioAudio.playCorrect();
        window.curioState.recordMathResult(true, 1);
        window.curioState.recordMathResult(true, 1);
        window.curioState.recordMathResult(true, 1);
        this.render();
      };
    }

    if (simStruggle) {
      simStruggle.onclick = () => {
        if (window.curioAudio) window.curioAudio.playGentleHint();
        window.curioState.recordMathResult(false, 1);
        window.curioState.recordMathResult(false, 1);
        this.render();
      };
    }

    if (simReset) {
      simReset.onclick = () => {
        if (window.curioAudio) window.curioAudio.playPop();
        window.curioState.data.adaptive.mathDifficultyTier = 1;
        window.curioState.data.adaptive.consecutiveCorrect = 0;
        window.curioState.data.adaptive.consecutiveErrors = 0;
        window.curioState.data.adaptive.scaffoldingActive = false;
        window.curioState.data.adaptive.currentPromptAdjustment = 'Standard single-digit baseline active.';
        window.curioState.recordAdaptiveLog('Reset adaptive parameters to baseline.');
        window.curioState.save();
        this.render();
      };
    }
  }
}

window.CurioAdaptiveEngine = CurioAdaptiveEngine;
