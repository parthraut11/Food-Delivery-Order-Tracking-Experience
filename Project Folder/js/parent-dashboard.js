/**
 * CURIO Parent Dashboard & Learning Analytics
 * Focuses on deep educational insights, strengths, growth areas,
 * adaptive mastery metrics, screen-time balance, and offline family activities.
 * Protected by an authentic Child-Safe Parent Gate.
 */

class CurioParentDashboard {
  constructor() {
    this.container = null;
    this.isUnlocked = false;
    this.gateChallenge = this.generateGateChallenge();
  }

  generateGateChallenge() {
    const a = Math.floor(Math.random() * 8) + 7; // 7 to 14
    const b = Math.floor(Math.random() * 8) + 6; // 6 to 13
    return { a, b, ans: a + b };
  }

  mount(targetElement) {
    this.container = targetElement;
    if (!this.isUnlocked) {
      this.renderParentGate();
    } else {
      this.renderDashboard();
    }
  }

  renderParentGate() {
    this.gateChallenge = this.generateGateChallenge();

    this.container.innerHTML = `
      <div class="parent-gate-wrapper animate-fade-in">
        <div class="parent-gate-card">
          <div class="gate-lock-icon">🔒</div>
          <h2 class="gate-title">Grown-Ups & Parents Zone</h2>
          <p class="gate-desc">
            To view detailed learning analytics and developmental insights, please solve this quick verification:
          </p>

          <div class="gate-math-box">
            <span class="gate-question">What is <strong>${this.gateChallenge.a} + ${this.gateChallenge.b}</strong>?</span>
            <input type="number" id="gate-answer-input" class="gate-input" placeholder="Answer..." autofocus />
          </div>

          <div class="gate-actions">
            <button class="curio-btn curio-btn-secondary" id="btn-gate-cancel">
              <span>← Back to Play</span>
            </button>
            <button class="curio-btn curio-btn-primary" id="btn-gate-verify">
              <span>Enter Parent Zone 🔑</span>
            </button>
          </div>

          <div id="gate-error-msg" class="gate-error-text"></div>

          <div class="coppa-badge-strip">
            <span>🛡️ 100% Kid-Safe • Zero Ads • COPPA & GDPR-K Compliant</span>
          </div>
        </div>
      </div>
    `;

    const input = this.container.querySelector('#gate-answer-input');
    const verifyBtn = this.container.querySelector('#btn-gate-verify');
    const cancelBtn = this.container.querySelector('#btn-gate-cancel');
    const errorBox = this.container.querySelector('#gate-error-msg');

    const handleVerify = () => {
      const val = parseInt(input.value);
      if (val === this.gateChallenge.ans) {
        this.isUnlocked = true;
        if (window.curioAudio) window.curioAudio.playCorrect();
        this.renderDashboard();
      } else {
        if (window.curioAudio) window.curioAudio.playGentleHint();
        errorBox.textContent = 'Verification incorrect. Please try again.';
        this.gateChallenge = this.generateGateChallenge();
        this.renderParentGate();
      }
    };

    verifyBtn.onclick = handleVerify;
    input.onkeyup = (e) => {
      if (e.key === 'Enter') handleVerify();
    };

    cancelBtn.onclick = () => {
      window.curioApp.navigate('play');
    };
  }

  renderDashboard() {
    const state = window.curioState.data;
    const analytics = state.parentAnalytics;
    const games = state.games;

    this.container.innerHTML = `
      <div class="parent-dashboard-container animate-fade-in">
        <!-- Top Nav / Back to Child Mode -->
        <div class="parent-top-bar">
          <div class="parent-brand-left">
            <span class="parent-portal-tag">👨‍👩‍👧 PARENT & EDUCATOR INSIGHTS</span>
            <h2>${state.child.name}'s Learning Journey</h2>
          </div>
          <div class="parent-top-actions">
            <button class="curio-btn curio-btn-secondary btn-sm" id="btn-lock-parent">
              <span>🔒 Lock Parent Zone</span>
            </button>
            <button class="curio-btn curio-btn-primary" id="btn-return-child-mode">
              <span>Switch to Child Mode 🎮</span>
            </button>
          </div>
        </div>

        <!-- Weekly Executive Summary Row -->
        <div class="parent-metrics-row">
          <div class="metric-card">
            <span class="metric-icon">⏱️</span>
            <div class="metric-content">
              <span class="metric-num">${analytics.weeklyMinutes} mins</span>
              <span class="metric-label">Learning Time This Week</span>
            </div>
            <span class="metric-status positive">Healthy Pacing (20m/day)</span>
          </div>

          <div class="metric-card">
            <span class="metric-icon">🧠</span>
            <div class="metric-content">
              <span class="metric-num">${state.child.levelTitle}</span>
              <span class="metric-label">Current Cognitive Rank</span>
            </div>
            <span class="metric-status highlight">Level ${state.child.level}</span>
          </div>

          <div class="metric-card">
            <span class="metric-icon">⭐</span>
            <div class="metric-content">
              <span class="metric-num">${state.child.stars} Stars</span>
              <span class="metric-label">Intrinsic Motivation Total</span>
            </div>
            <span class="metric-status">No toxic microtransactions</span>
          </div>

          <div class="metric-card">
            <span class="metric-icon">🔥</span>
            <div class="metric-content">
              <span class="metric-num">${state.child.streakDays} Days</span>
              <span class="metric-label">Active Curiosity Streak</span>
            </div>
            <span class="metric-status positive">Consistent Habit</span>
          </div>
        </div>

        <!-- Main Analytics Grid -->
        <div class="parent-grid-two-col">
          <!-- Left Column: Core Domain Mastery -->
          <div class="parent-card">
            <div class="card-header-row">
              <h3>Academic Fundamentals Mastery</h3>
              <span class="badge-pill">Curriculum Aligned</span>
            </div>
            <p class="card-subtext">Real-time skill proficiency tracked across all 4 learning worlds:</p>

            <div class="mastery-bars-list">
              <!-- Math -->
              <div class="mastery-item">
                <div class="mastery-info">
                  <span class="domain-title">🎯 Math Quest (Arithmetic & Logic)</span>
                  <span class="domain-val">${games.math.mastery}%</span>
                </div>
                <div class="mastery-track">
                  <div class="mastery-fill fill-math" style="width: ${games.math.mastery}%;"></div>
                </div>
                <div class="domain-notes">
                  <small>Strong with single-digit addition. Dynamic hints active for two-digit subtraction.</small>
                </div>
              </div>

              <!-- Alphabet -->
              <div class="mastery-item">
                <div class="mastery-info">
                  <span class="domain-title">🔤 ABC Art Studio (Writing & Phonics)</span>
                  <span class="domain-val">${games.abc.mastery}%</span>
                </div>
                <div class="mastery-track">
                  <div class="mastery-fill fill-abc" style="width: ${games.abc.mastery}%;"></div>
                </div>
                <div class="domain-notes">
                  <small>Outstanding motor penmanship and phonetic letter sound identification.</small>
                </div>
              </div>

              <!-- Science -->
              <div class="mastery-item">
                <div class="mastery-info">
                  <span class="domain-title">🔬 Curio's Little Lab (Inquiry & Nature)</span>
                  <span class="domain-val">${games.lab.mastery}%</span>
                </div>
                <div class="mastery-track">
                  <div class="mastery-fill fill-lab" style="width: ${games.lab.mastery}%;"></div>
                </div>
                <div class="domain-notes">
                  <small>Mastered plant growth cycles. Astronomy & solar orbital mechanics in progress.</small>
                </div>
              </div>

              <!-- Vocabulary -->
              <div class="mastery-item">
                <div class="mastery-info">
                  <span class="domain-title">📖 Word Builder (Early Reading & Vocabulary)</span>
                  <span class="domain-val">${games.words.mastery}%</span>
                </div>
                <div class="mastery-track">
                  <div class="mastery-fill fill-words" style="width: ${games.words.mastery}%;"></div>
                </div>
                <div class="domain-notes">
                  <small>Excellent 3-letter CVC sight-word decoding. Expanding 4-5 letter blends.</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Qualitative Pedagogical Insights -->
          <div class="parent-card">
            <div class="card-header-row">
              <h3>Child Developmental Insights</h3>
              <span class="badge-pill pulse">Curio AI Pedagogical Engine</span>
            </div>

            <!-- Strengths -->
            <div class="insight-block">
              <h4 class="insight-heading strength-heading">🌟 Notable Strengths</h4>
              <ul class="insight-list">
                ${analytics.strengths.map(s => `<li>✓ ${s}</li>`).join('')}
              </ul>
            </div>

            <!-- Areas for Growth -->
            <div class="insight-block">
              <h4 class="insight-heading growth-heading">🌱 Growth Opportunities</h4>
              <ul class="insight-list">
                ${analytics.growthAreas.map(g => `<li>⚡ ${g}</li>`).join('')}
              </ul>
            </div>

            <!-- Offline Activities -->
            <div class="insight-block">
              <h4 class="insight-heading offline-heading">🏡 Screen-Free Activities to Try at Home</h4>
              <div class="offline-cards-list">
                ${analytics.offlineActivities.map(act => `
                  <div class="offline-activity-pill">
                    <strong>${act.title}:</strong>
                    <span>${act.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Activity Distribution Chart -->
        <div class="parent-card full-width-card">
          <div class="card-header-row">
            <h3>Weekly Learning Distribution (Daily Minutes)</h3>
            <span class="badge-pill">Balanced Daily Routine</span>
          </div>
          <div class="bar-chart-container">
            ${analytics.dailyTime.map(d => `
              <div class="chart-col">
                <span class="chart-val">${d.mins > 0 ? `${d.mins}m` : 'Rest'}</span>
                <div class="chart-bar-wrap">
                  <div class="chart-bar-fill" style="height: ${Math.min(100, (d.mins / 40) * 100)}%;"></div>
                </div>
                <span class="chart-day">${d.day}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachDashboardEvents();
  }

  attachDashboardEvents() {
    this.container.querySelector('#btn-return-child-mode').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      window.curioApp.navigate('play');
    };

    this.container.querySelector('#btn-lock-parent').onclick = () => {
      this.isUnlocked = false;
      if (window.curioAudio) window.curioAudio.playClick();
      this.renderParentGate();
    };
  }
}

window.CurioParentDashboard = CurioParentDashboard;
