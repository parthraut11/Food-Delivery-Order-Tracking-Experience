/**
 * CURIO Main Application Controller
 * Handles client-side routing, global HUD updates, modal dialogues,
 * missions claim triggers, confetti celebrations, and sound controls.
 */

class CurioApp {
  constructor() {
    this.currentView = 'home';
    this.games = {};
    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];
  }

  init() {
    // Initialize games
    this.games.math = new window.MathQuestGame();
    this.games.abc = new window.AbcArtStudioGame();
    this.games.lab = new window.CuriosLittleLabGame();
    this.games.words = new window.WordBuilderAdventureGame();
    this.rewards = new window.CurioRewards();
    this.parent = new window.CurioParentDashboard();
    this.adaptive = new window.CurioAdaptiveEngine();

    // Setup global listeners
    this.setupGlobalHeader();
    this.setupConfetti();

    // Subscribe to state updates
    window.curioState.subscribe(() => {
      this.updateHud();
    });

    // Support browser back/forward and hash links
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '') || 'home';
      if (h !== this.currentView) {
        this.navigate(h);
      }
    });

    // Check initial hash or default to home
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigate(hash);
  }

  setupGlobalHeader() {
    // Nav items
    document.querySelectorAll('.nav-link').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (window.curioAudio) window.curioAudio.playClick();
        this.navigate(view);
      };
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.onclick = () => {
        const isMuted = window.curioAudio.toggleMute();
        soundBtn.innerHTML = isMuted ? '<span>🔇 Sound Off</span>' : '<span>🔊 Sound On</span>';
        soundBtn.classList.toggle('muted', isMuted);
      };
    }

    // Avatar HUD click -> opens wardrobe
    const avatarBadge = document.getElementById('hud-avatar-badge');
    if (avatarBadge) {
      avatarBadge.onclick = () => {
        if (window.curioAudio) window.curioAudio.playPop();
        this.navigate('rewards');
      };
    }

    this.updateHud();
  }

  updateHud() {
    const child = window.curioState.data.child;

    const starsEl = document.getElementById('hud-stars-count');
    if (starsEl) starsEl.textContent = child.stars;

    const streakEl = document.getElementById('hud-streak-count');
    if (streakEl) streakEl.textContent = `${child.streakDays}d`;

    const lvlEl = document.getElementById('hud-level-text');
    if (lvlEl) lvlEl.textContent = `Lvl ${child.level}: ${child.levelTitle}`;

    const xpFillEl = document.getElementById('hud-xp-fill');
    if (xpFillEl) {
      const pct = Math.min(100, Math.round((child.xp / child.xpMax) * 100));
      xpFillEl.style.width = `${pct}%`;
    }

    const xpTextEl = document.getElementById('hud-xp-text');
    if (xpTextEl) xpTextEl.textContent = `${child.xp}/${child.xpMax} XP`;

    const avatarSvgEl = document.getElementById('hud-avatar-svg');
    if (avatarSvgEl) {
      avatarSvgEl.innerHTML = window.CurioCharacters.getHeroById(child.avatar, 36).svg;
    }
  }

  navigate(viewName) {
    this.currentView = viewName;
    window.location.hash = viewName;

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    const main = document.getElementById('main-app-content');
    if (!main) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (viewName) {
      case 'home':
        this.renderHome(main);
        break;
      case 'play':
        this.renderChildDashboard(main);
        break;
      case 'math':
        this.games.math.mount(main);
        break;
      case 'abc':
        this.games.abc.mount(main);
        break;
      case 'lab':
        this.games.lab.mount(main);
        break;
      case 'words':
        this.games.words.mount(main);
        break;
      case 'rewards':
        this.rewards.mount(main);
        break;
      case 'progress':
        this.renderProgressView(main);
        break;
      case 'adaptive':
        this.adaptive.mount(main);
        break;
      case 'parent':
        this.parent.mount(main);
        break;
      default:
        this.renderHome(main);
    }
  }

  // ==========================================
  // VIEW: HOMEPAGE (LANDING & PITCH GATEWAY)
  // ==========================================
  renderHome(container) {
    container.innerHTML = `
      <div class="homepage-container animate-fade-in">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-mascot-greeting animate-bounce-subtle">
              ${window.CurioCharacters.getCurioSvg('happy', 140)}
              <div class="mascot-speech-bubble animate-pop-in">
                <span>Hi, Explorer! Ready to learn & discover? ✨</span>
              </div>
            </div>

            <h1 class="hero-title">
              Welcome to <span class="curio-gradient-text">CURIO!</span>
            </h1>
            <p class="hero-tagline">“Where every question becomes an adventure.”</p>
            <p class="hero-subtext">
              An interactive educational universe where children aged 4–10 learn academic fundamentals through games, original story heroes, and hands-on discovery instead of worksheets.
            </p>

            <div class="hero-cta-group">
              <button class="curio-btn curio-btn-primary curio-btn-hero pulse-subtle" id="btn-hero-explore">
                <span>Start Exploring 🚀</span>
              </button>
              <button class="curio-btn curio-btn-secondary curio-btn-hero" id="btn-hero-meet">
                <span>Meet Curio ✨</span>
              </button>
            </div>

            <!-- Pitch Badges -->
            <div class="hero-pillars-row">
              <span class="pillar-pill">🎮 Play-Based</span>
              <span class="pillar-pill">📈 Adaptive Learning</span>
              <span class="pillar-pill">⭐ Zero-Tears Scaffolding</span>
              <span class="pillar-pill">🛡️ 100% Kid-Safe</span>
            </div>
          </div>
        </section>

        <!-- Four Learning Adventures Section -->
        <section class="adventures-section">
          <div class="section-header-center">
            <h2 class="section-title">Learning Through Play</h2>
            <p class="section-subtitle">Four rich educational worlds crafted for young minds to explore independently:</p>
          </div>

          <div class="adventures-grid">
            <!-- 1. Math Quest -->
            <div class="adventure-card card-math animate-pop-in" data-game="math">
              <div class="adv-top-badge" style="background:#2563EB;">Arithmetic & Logic</div>
              <div class="adv-avatar-preview">
                ${window.CurioCharacters.getHeroById('hero_web', 100).svg}
              </div>
              <h3 class="adv-name">1. Math Quest</h3>
              <p class="adv-desc">Team up with original heroes to defeat challenge monsters, collect crystals, and master addition & subtraction!</p>
              <div class="adv-stats-row">
                <span>⭐ Tier 1 to 5</span>
                <span>✨ 78% Mastery</span>
              </div>
              <button class="curio-btn curio-btn-primary btn-block">Play Math Quest 🎯</button>
            </div>

            <!-- 2. ABC Art Studio -->
            <div class="adventure-card card-abc animate-pop-in" data-game="abc">
              <div class="adv-top-badge" style="background:#06B6D4;">Handwriting & Phonics</div>
              <div class="adv-avatar-preview">
                <span class="adv-giant-icon">🎨</span>
              </div>
              <h3 class="adv-name">2. ABC Art Studio</h3>
              <p class="adv-desc">Trace sparkling letters from A to Z with real phonics sound, colorful glitter trails, and fine-motor handwriting practice!</p>
              <div class="adv-stats-row">
                <span>⭐ 26 Letters</span>
                <span>✨ 92% Mastery</span>
              </div>
              <button class="curio-btn curio-btn-primary btn-block">Open Art Studio 🔤</button>
            </div>

            <!-- 3. Curio's Little Lab -->
            <div class="adventure-card card-lab animate-pop-in" data-game="lab">
              <div class="adv-top-badge" style="background:#10B981;">Science & Discovery</div>
              <div class="adv-avatar-preview">
                <span class="adv-giant-icon">🌱</span>
              </div>
              <h3 class="adv-name">3. Curio's Little Lab</h3>
              <p class="adv-desc">Hands-on experimentation! Grow blooming flowers, assemble the solar system, sort animals, and build healthy meals.</p>
              <div class="adv-stats-row">
                <span>⭐ 5 Interactive Labs</span>
                <span>✨ 65% Mastery</span>
              </div>
              <button class="curio-btn curio-btn-primary btn-block">Enter Little Lab 🔬</button>
            </div>

            <!-- 4. Word Builder Adventure -->
            <div class="adventure-card card-words animate-pop-in" data-game="words">
              <div class="adv-top-badge" style="background:#8B5CF6;">Vocabulary & Reading</div>
              <div class="adv-avatar-preview">
                <span class="adv-giant-icon">📖</span>
              </div>
              <h3 class="adv-name">4. Word Builder Adventure</h3>
              <p class="adv-desc">Unscramble letters, solve picture puzzles, decode phonics blends, and build vocabulary from 2 to 5-letter words!</p>
              <div class="adv-stats-row">
                <span>⭐ 3 Skill Tiers</span>
                <span>✨ 81% Mastery</span>
              </div>
              <button class="curio-btn curio-btn-primary btn-block">Start Word Quest 📚</button>
            </div>
          </div>
        </section>

        <!-- How Curio Works -->
        <section class="how-it-works-section">
          <div class="section-header-center">
            <h2 class="section-title">How Curio Works</h2>
            <p class="section-subtitle">An intuitive 5-step loop designed for independent child discovery:</p>
          </div>

          <div class="steps-pipeline-grid">
            <div class="step-card">
              <div class="step-num-badge">1</div>
              <div class="step-icon">🧭</div>
              <h4>Choose</h4>
              <p>Pick your favorite original hero and learning realm.</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-card">
              <div class="step-num-badge">2</div>
              <div class="step-icon">🎮</div>
              <h4>Play</h4>
              <p>Engage in tactile, interactive mini-games and experiments.</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-card">
              <div class="step-num-badge">3</div>
              <div class="step-icon">💡</div>
              <h4>Learn</h4>
              <p>Master math, phonics, science, and vocabulary concepts.</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-card">
              <div class="step-num-badge">4</div>
              <div class="step-icon">⭐</div>
              <h4>Earn</h4>
              <p>Collect Stars, XP, accessories, and pet companions.</p>
            </div>
            <div class="step-arrow">→</div>
            <div class="step-card">
              <div class="step-num-badge">5</div>
              <div class="step-icon">🚀</div>
              <h4>Progress</h4>
              <p>Curio's adaptive engine dynamically scales the challenge.</p>
            </div>
          </div>
        </section>

        <!-- Why Curio? (Business Pitch Highlights) -->
        <section class="why-curio-section">
          <div class="section-header-center">
            <span class="pitch-badge-tag">PITCH HIGHLIGHTS</span>
            <h2 class="section-title">Why Curio Outperforms Traditional EdTech</h2>
            <p class="section-subtitle">Built from the ground up for engagement, efficacy, and child safety:</p>
          </div>

          <div class="pitch-cards-grid">
            <div class="pitch-feature-card">
              <div class="pf-icon">🎮</div>
              <h4>Play-Based Learning</h4>
              <p>Eliminates intimidating static worksheets. Children solve challenges through interactive visual gameplay.</p>
            </div>

            <div class="pitch-feature-card">
              <div class="pf-icon">📈</div>
              <h4>Adaptive Difficulty</h4>
              <p>Real-time algorithms level up challenge after success and provide visual scaffolding when help is needed.</p>
            </div>

            <div class="pitch-feature-card">
              <div class="pf-icon">🧠</div>
              <h4>Multi-Domain Mastery</h4>
              <p>Seamlessly integrates STEM, literacy, fine motor penmanship, and biological sciences in one connected world.</p>
            </div>

            <div class="pitch-feature-card">
              <div class="pf-icon">🏆</div>
              <h4>Positive Gamification</h4>
              <p>Zero punitive game-overs or dark patterns. Pure intrinsic motivation with collectible pets, badges, and outfits.</p>
            </div>

            <div class="pitch-feature-card">
              <div class="pf-icon">👨‍👩‍👧</div>
              <h4>Parent Insights</h4>
              <p>Transforms screen time into quality learning time with qualitative developmental reports and offline family prompts.</p>
            </div>
          </div>
        </section>

        <!-- Parent-Facing Section -->
        <section class="parent-landing-banner">
          <div class="parent-banner-inner">
            <div class="banner-text">
              <h2>“Curio turns screen time into learning time.”</h2>
              <p>Give your child the confidence to explore, question, and excel in academic fundamentals independently.</p>
              <div class="parent-checklist">
                <span>✓ Skill-based learning</span>
                <span>✓ Adaptive difficulty</span>
                <span>✓ Comprehensive progress tracking</span>
                <span>✓ Positive reinforcement</span>
                <span>✓ 100% child-safe & ad-free</span>
              </div>
            </div>
            <div class="banner-action">
              <button class="curio-btn curio-btn-primary curio-btn-large" id="btn-parent-preview">
                <span>Explore Parent Insights 👨‍👩‍👧</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    // Event listeners
    container.querySelector('#btn-hero-explore').onclick = () => {
      if (window.curioAudio) window.curioAudio.playWhoosh();
      this.navigate('play');
    };

    container.querySelector('#btn-hero-meet').onclick = () => {
      this.showMeetCurioModal();
    };

    container.querySelectorAll('.adventure-card').forEach(card => {
      card.onclick = () => {
        const game = card.dataset.game;
        if (window.curioAudio) window.curioAudio.playWhoosh();
        this.navigate(game);
      };
    });

    container.querySelector('#btn-parent-preview').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      this.navigate('parent');
    };
  }

  // ==========================================
  // VIEW: CHILD DASHBOARD ("EXPLORER HQ")
  // ==========================================
  renderChildDashboard(container) {
    const state = window.curioState.data;
    const child = state.child;
    const activeHero = window.CurioCharacters.getHeroById(child.avatar);
    const xpPercent = Math.min(100, Math.round((child.xp / child.xpMax) * 100));

    container.innerHTML = `
      <div class="child-dashboard-container animate-fade-in">
        <!-- Child Profile Welcome Banner -->
        <div class="dashboard-hero-banner">
          <div class="explorer-avatar-box animate-bounce-subtle">
            ${activeHero.svg}
            <button class="curio-btn curio-btn-secondary btn-sm change-hero-btn" id="btn-change-avatar">
              Change Hero 🎭
            </button>
          </div>

          <div class="explorer-meta-box">
            <div class="welcome-row">
              <h2 class="welcome-heading">Hi, Explorer! 👋</h2>
              <span class="explorer-hero-title">${activeHero.name} • ${activeHero.title}</span>
            </div>

            <div class="hud-stats-cards">
              <div class="hud-stat-chip">
                <span class="chip-icon">🎖️</span>
                <div class="chip-data">
                  <strong>Level ${child.level}</strong>
                  <small>${child.levelTitle}</small>
                </div>
              </div>

              <div class="hud-stat-chip">
                <span class="chip-icon">⭐</span>
                <div class="chip-data">
                  <strong>${child.stars} Stars</strong>
                  <small>Unlocked Items</small>
                </div>
              </div>

              <div class="hud-stat-chip">
                <span class="chip-icon">🔥</span>
                <div class="chip-data">
                  <strong>${child.streakDays} Day Streak</strong>
                  <small>Consistent Learner</small>
                </div>
              </div>
            </div>

            <!-- XP Progress Bar -->
            <div class="xp-level-track-wrapper">
              <div class="xp-label-row">
                <span>XP Progress to Level ${child.level + 1}</span>
                <span>${child.xp} / ${child.xpMax} XP (${xpPercent}%)</span>
              </div>
              <div class="xp-progress-bar">
                <div class="xp-fill-glow" style="width: ${xpPercent}%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Adaptive Learning Live Pill -->
        <div class="adaptive-live-banner" id="adaptive-live-pill">
          <div class="pill-sparkle">✨</div>
          <div class="pill-text-content">
            <span class="adaptive-badge">Curio Smart Engine</span>
            <span class="adaptive-text">Curio is adjusting your adventure to help you learn better! (Adaptive difficulty & visual hints active)</span>
          </div>
          <button class="curio-btn curio-btn-outline btn-sm" id="btn-inspect-adaptive">
            Inspect Engine 🧠
          </button>
        </div>

        <!-- Today's Missions -->
        <div class="dashboard-section-box">
          <div class="section-title-row">
            <h3 class="dash-section-title">Today's Missions 🎯</h3>
            <span class="dash-subtitle">Complete daily missions for bonus Stars & XP!</span>
          </div>

          <div class="missions-grid">
            ${state.missions.map(m => {
              const isDone = m.progress >= m.target;
              return `
                <div class="mission-item-card ${isDone ? 'done' : ''} ${m.claimed ? 'claimed' : ''}">
                  <div class="mission-info">
                    <span class="mission-category-tag">${m.category.toUpperCase()}</span>
                    <h4>${m.title}</h4>
                    <div class="mission-progress-bar">
                      <div class="mission-fill" style="width: ${(m.progress / m.target) * 100}%;"></div>
                    </div>
                    <span class="mission-count">${m.progress} / ${m.target} Completed</span>
                  </div>
                  <div class="mission-reward">
                    <span class="reward-tag">⭐ +${m.rewardStars}</span>
                    ${m.claimed ? `
                      <span class="claimed-badge">✓ Claimed</span>
                    ` : (
                      isDone ? `
                        <button class="curio-btn curio-btn-primary btn-sm btn-claim-mission" data-mission-id="${m.id}">
                          Claim Reward! 🎉
                        </button>
                      ` : `
                        <span class="in-progress-tag">In Progress</span>
                      `
                    )}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Main Four Games Showcase -->
        <div class="dashboard-section-box">
          <div class="section-title-row">
            <h3 class="dash-section-title">What would you like to explore today? 🌟</h3>
            <span class="dash-subtitle">Choose any game below to begin your adventure:</span>
          </div>

          <div class="child-games-grid">
            <!-- Game 1: Math Quest -->
            <div class="child-game-card math-theme" data-route="math">
              <div class="card-art-zone">
                <span class="card-icon-art">🎯</span>
                <span class="skill-pill">Math & Logic</span>
              </div>
              <div class="card-body-zone">
                <h3>Math Quest</h3>
                <p>Addition, subtraction, and friendly monster obstacle challenges!</p>
                <div class="difficulty-rating">Difficulty: ⭐⭐⭐☆☆</div>
                <div class="progress-indicator">
                  <div class="prog-label">Progress: ${state.games.math.mastery}%</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:${state.games.math.mastery}%;"></div></div>
                </div>
                <button class="curio-btn curio-btn-primary curio-btn-large btn-block">Play Math Quest 🚀</button>
              </div>
            </div>

            <!-- Game 2: ABC Art Studio -->
            <div class="child-game-card abc-theme" data-route="abc">
              <div class="card-art-zone">
                <span class="card-icon-art">🎨</span>
                <span class="skill-pill">Handwriting & Phonics</span>
              </div>
              <div class="card-body-zone">
                <h3>ABC Art Studio</h3>
                <p>Trace sparkling glowing letters A-Z with audio phonics guidance!</p>
                <div class="difficulty-rating">Difficulty: ⭐⭐☆☆☆</div>
                <div class="progress-indicator">
                  <div class="prog-label">Progress: ${state.games.abc.mastery}%</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:${state.games.abc.mastery}%;"></div></div>
                </div>
                <button class="curio-btn curio-btn-primary curio-btn-large btn-block">Trace Letters 🔤</button>
              </div>
            </div>

            <!-- Game 3: Little Lab -->
            <div class="child-game-card lab-theme" data-route="lab">
              <div class="card-art-zone">
                <span class="card-icon-art">🔬</span>
                <span class="skill-pill">Science Discovery</span>
              </div>
              <div class="card-body-zone">
                <h3>Curio's Little Lab</h3>
                <p>Grow plants, sort animals, explore weather, and map the planets!</p>
                <div class="difficulty-rating">Difficulty: ⭐⭐☆☆☆</div>
                <div class="progress-indicator">
                  <div class="prog-label">Progress: ${state.games.lab.mastery}%</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:${state.games.lab.mastery}%;"></div></div>
                </div>
                <button class="curio-btn curio-btn-primary curio-btn-large btn-block">Enter Lab 🌱</button>
              </div>
            </div>

            <!-- Game 4: Word Builder -->
            <div class="child-game-card words-theme" data-route="words">
              <div class="card-art-zone">
                <span class="card-icon-art">📖</span>
                <span class="skill-pill">Reading & Spelling</span>
              </div>
              <div class="card-body-zone">
                <h3>Word Builder Adventure</h3>
                <p>Unscramble letters, identify pictures, and master new vocabulary!</p>
                <div class="difficulty-rating">Difficulty: ⭐⭐⭐☆☆</div>
                <div class="progress-indicator">
                  <div class="prog-label">Progress: ${state.games.words.mastery}%</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:${state.games.words.mastery}%;"></div></div>
                </div>
                <button class="curio-btn curio-btn-primary curio-btn-large btn-block">Build Words 📚</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Rewards & Collection Showcase -->
        <div class="dashboard-collection-preview">
          <div class="preview-header">
            <h3>Your Collection & Companion Pets 🐾</h3>
            <button class="curio-btn curio-btn-outline btn-sm" id="btn-open-trophy-room">
              Open Full Trophy Room 🏆
            </button>
          </div>
          <div class="collection-pill-row">
            <div class="badge-mini-chip">🎯 Math Explorer</div>
            <div class="badge-mini-chip">🔤 ABC Master</div>
            <div class="badge-mini-chip">🔬 Science Detective</div>
            <div class="badge-mini-chip">🔥 5-Day Explorer</div>
            <div class="badge-mini-chip">🐾 Sparky Pup</div>
          </div>
        </div>
      </div>
    `;

    // Listeners
    container.querySelector('#btn-change-avatar').onclick = () => {
      this.navigate('rewards');
    };

    container.querySelector('#btn-inspect-adaptive').onclick = () => {
      this.navigate('adaptive');
    };

    container.querySelector('#btn-open-trophy-room').onclick = () => {
      this.navigate('rewards');
    };

    // Mission claiming
    container.querySelectorAll('.btn-claim-mission').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.missionId;
        if (window.curioState.claimMission(id)) {
          this.triggerConfetti();
          this.renderChildDashboard(container);
        }
      };
    });

    // Game card routing
    container.querySelectorAll('.child-game-card').forEach(card => {
      card.onclick = () => {
        const route = card.dataset.route;
        if (window.curioAudio) window.curioAudio.playWhoosh();
        this.navigate(route);
      };
    });
  }

  // ==========================================
  // MASCOT INTERACTION MODAL: "MEET CURIO"
  // ==========================================
  showMeetCurioModal() {
    if (window.curioAudio) {
      window.curioAudio.playStar();
      window.curioAudio.speak("Hi there! I am Curio, your cheerful cosmic learning buddy!");
    }

    const modal = document.createElement('div');
    modal.className = 'curio-modal-backdrop animate-fade-in';
    modal.innerHTML = `
      <div class="curio-modal-dialog animate-pop-in">
        <button class="modal-close-btn" id="btn-close-modal">✕</button>
        <div class="modal-mascot-showcase animate-bounce-subtle">
          ${window.CurioCharacters.getCurioSvg('cheer', 160)}
        </div>
        <h2 class="modal-title">Meet Curio! ✨</h2>
        <p class="modal-bio">
          "I traveled from the Starry Nebula to help curious young minds explore numbers, letters, words, and nature through magical adventures!"
        </p>
        <div class="modal-perks">
          <div class="perk-row">⭐ <strong>Never any frustrating tests</strong> — just playful discovery!</div>
          <div class="perk-row">💡 <strong>I give gentle hints</strong> whenever you need a helping hand.</div>
          <div class="perk-row">🚀 <strong>You earn Stars and Pets</strong> as you explore!</div>
        </div>
        <div class="modal-actions">
          <button class="curio-btn curio-btn-primary curio-btn-large btn-block" id="btn-modal-start">
            Start My Adventure with Curio! 🚀
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#btn-close-modal').onclick = closeModal;
    modal.querySelector('#btn-modal-start').onclick = () => {
      closeModal();
      this.navigate('play');
    };
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // ==========================================
  // VIEW: PROGRESS TRACKER
  // ==========================================
  renderProgressView(container) {
    const state = window.curioState.data;
    const child = state.child;
    const games = state.games;
    const adaptive = state.adaptive;
    const xpPercent = Math.min(100, Math.round((child.xp / child.xpMax) * 100));

    const levels = [
      { lvl: 1, title: 'Curious Beginner', maxXP: 150, icon: '🌱' },
      { lvl: 2, title: 'Little Explorer', maxXP: 300, icon: '🗺️' },
      { lvl: 3, title: 'Smart Adventurer', maxXP: 550, icon: '⚡' },
      { lvl: 4, title: 'Learning Hero', maxXP: 900, icon: '🦸' },
      { lvl: 5, title: 'Curio Champion', maxXP: 1500, icon: '🏆' }
    ];

    const unlockedBadges = state.badges.filter(b => b.unlocked);

    container.innerHTML = `
      <div class="progress-view-container animate-fade-in">
        <div class="progress-hero-banner">
          <div class="progress-hero-left">
            <span class="progress-title-tag">📊 My Learning Journey</span>
            <h2 class="progress-main-title">Explorer ${child.name}'s Progress Map</h2>
            <p class="progress-sub">See how far you've come and where your next adventure leads!</p>
          </div>
          <div class="progress-hero-stats">
            <div class="big-stat-orb">
              <span class="orb-num">⭐ ${child.stars}</span>
              <span class="orb-lbl">Total Stars</span>
            </div>
            <div class="big-stat-orb xp-orb">
              <span class="orb-num">⚡ ${child.xp}</span>
              <span class="orb-lbl">XP Points</span>
            </div>
            <div class="big-stat-orb streak-orb">
              <span class="orb-num">🔥 ${child.streakDays}</span>
              <span class="orb-lbl">Day Streak</span>
            </div>
          </div>
        </div>

        <!-- Level Progression Road -->
        <div class="progress-section-card">
          <h3 class="prog-section-title">Your Level Journey 🚀</h3>
          <div class="level-road-wrapper">
            ${levels.map(l => {
              const isCurrent = l.lvl === child.level;
              const isPast = l.lvl < child.level;
              return `
                <div class="level-road-step ${isCurrent ? 'current' : ''} ${isPast ? 'passed' : ''}">
                  <div class="level-step-icon">${l.icon}</div>
                  <div class="level-step-connector ${isPast || isCurrent ? 'lit' : ''}"></div>
                  <div class="level-step-label">
                    <strong>Lvl ${l.lvl}</strong>
                    <small>${l.title}</small>
                    <small>${l.maxXP} XP</small>
                  </div>
                  ${isCurrent ? '<span class="you-are-here-tag">← You are here!</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>
          <div class="xp-full-bar-wrapper">
            <div class="xp-full-label">Progress to Level ${Math.min(5, child.level + 1)}: ${child.xp} / ${child.xpMax} XP (${xpPercent}%)</div>
            <div class="xp-full-bar">
              <div class="xp-full-fill" style="width: ${xpPercent}%;"></div>
            </div>
          </div>
        </div>

        <!-- Four-Domain Mastery Radials -->
        <div class="four-domain-grid">
          ${[
            { name: 'Math Quest', icon: '🎯', val: games.math.mastery, color: '#3B82F6', key: 'math',
              detail: `${games.math.totalCorrect}/${games.math.totalAnswered} solved • Tier ${adaptive.mathDifficultyTier}/5` },
            { name: 'ABC Art Studio', icon: '🎨', val: games.abc.mastery, color: '#06B6D4', key: 'abc',
              detail: `${games.abc.completedLetters.length}/26 letters traced` },
            { name: "Curio's Little Lab", icon: '🔬', val: games.lab.mastery, color: '#10B981', key: 'lab',
              detail: `${games.lab.completedActivities.length}/5 activities completed` },
            { name: 'Word Builder', icon: '📖', val: games.words.mastery, color: '#8B5CF6', key: 'words',
              detail: `${games.words.completedWords.length} words mastered` }
          ].map(d => `
            <div class="domain-mastery-card" data-route="${d.key}" style="--domain-color: ${d.color};">
              <div class="domain-icon-circle" style="background: ${d.color}22; border: 3px solid ${d.color}44;">
                <span>${d.icon}</span>
              </div>
              <h4 class="domain-name">${d.name}</h4>
              <div class="domain-big-percent" style="color: ${d.color};">${d.val}%</div>
              <div class="domain-radial-wrapper">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" stroke-width="10" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="${d.color}" stroke-width="10"
                    stroke-dasharray="${(2 * Math.PI * 42 * d.val / 100).toFixed(1)} ${(2 * Math.PI * 42 * (1 - d.val/100)).toFixed(1)}"
                    stroke-dashoffset="${(2 * Math.PI * 42 * 0.25).toFixed(1)}"
                    stroke-linecap="round"
                    transform="rotate(-90 50 50)" />
                  <text x="50" y="55" text-anchor="middle" font-size="16" font-weight="700" fill="${d.color}">${d.val}%</text>
                </svg>
              </div>
              <p class="domain-detail-text">${d.detail}</p>
              <button class="curio-btn curio-btn-outline btn-sm domain-play-btn" data-route="${d.key}">
                Play Now →
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Recent Badges Earned -->
        <div class="progress-section-card">
          <div class="prog-section-header">
            <h3 class="prog-section-title">Badges Earned (${unlockedBadges.length} / ${state.badges.length}) 🏅</h3>
            <button class="curio-btn curio-btn-outline btn-sm" id="btn-progress-to-rewards">
              View Full Collection 🏆
            </button>
          </div>
          <div class="recent-badges-row">
            ${unlockedBadges.slice(0, 6).map(b => `
              <div class="recent-badge-chip">
                <span class="badge-chip-icon">${b.icon}</span>
                <div class="badge-chip-text">
                  <strong>${b.title}</strong>
                  <small>${b.unlockedAt}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Adaptive Log Summary -->
        <div class="progress-section-card">
          <h3 class="prog-section-title">Curio's Smart Learning Adjustments 🧠</h3>
          <p class="prog-section-sub">These are the recent ways Curio automatically personalized your adventure:</p>
          <div class="adaptive-events-mini">
            ${adaptive.recentEvents.slice(0, 5).map(ev => `
              <div class="adaptive-mini-event">
                <span class="mini-time">${ev.timestamp}</span>
                <span class="mini-text">${ev.event}</span>
              </div>
            `).join('')}
          </div>
          <button class="curio-btn curio-btn-secondary btn-sm" id="btn-to-adaptive" style="margin-top: 16px;">
            Open Smart Engine Inspector 🧠
          </button>
        </div>
      </div>
    `;

    // Listeners
    container.querySelectorAll('.domain-play-btn, .domain-mastery-card').forEach(el => {
      el.onclick = () => {
        const route = el.dataset.route;
        if (route && window.curioAudio) window.curioAudio.playWhoosh();
        if (route) this.navigate(route);
      };
    });

    const toRewards = container.querySelector('#btn-progress-to-rewards');
    if (toRewards) toRewards.onclick = () => this.navigate('rewards');

    const toAdaptive = container.querySelector('#btn-to-adaptive');
    if (toAdaptive) toAdaptive.onclick = () => this.navigate('adaptive');
  }

  // ==========================================
  // CONFETTI PARTICLE SYSTEM
  // ==========================================
  setupConfetti() {
    this.confettiCanvas = document.getElementById('curio-confetti-canvas');
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.resizeConfetti();
    window.addEventListener('resize', () => this.resizeConfetti());
  }

  resizeConfetti() {
    if (!this.confettiCanvas) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    this.confettiParticles = [];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 4,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    if (!this.confettiRunning) {
      this.confettiRunning = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.rotation += p.rSpeed;
      p.alpha -= 0.012;

      if (p.alpha <= 0 || p.y > window.innerHeight) {
        this.confettiParticles.splice(i, 1);
        continue;
      }

      this.confettiCtx.save();
      this.confettiCtx.globalAlpha = p.alpha;
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.confettiCtx.restore();
    }

    if (this.confettiParticles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.confettiRunning = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// Global App Instance
window.curioApp = new CurioApp();

document.addEventListener('DOMContentLoaded', () => {
  window.curioApp.init();
});
