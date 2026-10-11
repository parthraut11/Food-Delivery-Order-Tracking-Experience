/**
 * CURIO Game 1: Math Quest
 * Fully functional math adventure with 5 original characters,
 * Hero/Princess themed scenarios, adaptive difficulty, visual counting aids,
 * and zero-punishment positive reinforcement.
 */

class MathQuestGame {
  constructor() {
    this.container = null;
    this.selectedHero = 'hero_web';
    this.level = 1; // 1 to 5
    this.currentQuestionIndex = 0;
    this.questionsPerLevel = 5;
    this.correctCount = 0;
    this.totalAttempts = 0;
    this.currentQuestion = null;
    this.consecutiveCorrect = 0;
    this.consecutiveErrors = 0;
    this.showingHint = false;
    this.isAnsweringLocked = false;
  }

  mount(targetElement) {
    this.container = targetElement;
    this.selectedHero = window.curioState ? window.curioState.data.child.avatar : 'hero_web';
    this.level = window.curioState ? window.curioState.data.adaptive.mathDifficultyTier : 1;
    this.renderHeroSelect();
  }

  renderHeroSelect() {
    const heroes = [
      { id: 'hero_web', name: 'Cobalt Weaver', role: 'Brave Web Hero', icon: '🕸️', color: '#2563EB', desc: 'Shoots neon star-webs to solve riddles!' },
      { id: 'hero_strong', name: 'Jade Titan', role: 'Super Strong Hero', icon: '💪', color: '#10B981', desc: 'Gentle moss giant with nature strength!' },
      { id: 'hero_tech', name: 'Sparky Volt', role: 'Tech Genius', icon: '⚡', color: '#8B5CF6', desc: 'Solves tech gadgets with robo-drone!' },
      { id: 'princess_ice', name: 'Crystal Frostina', role: 'Ice Princess', icon: '❄️', color: '#0284C7', desc: 'Gathers magic snowflake crystals!' },
      { id: 'princess_forest', name: 'Blossom Flora', role: 'Forest Princess', roleDesc: 'Rescues woodland animals with blooms!', icon: '🌸', color: '#EC4899', desc: 'Blooms nature gardens and frees critter friends!' }
    ];

    this.container.innerHTML = `
      <div class="math-quest-container animate-fade-in">
        <div class="game-header-bar">
          <button class="curio-btn curio-btn-secondary btn-sm" id="btn-math-back">
            <span>← Explorer HQ</span>
          </button>
          <div class="game-title-group">
            <h2 class="game-title">🎯 Math Quest</h2>
            <span class="game-subtitle">Choose Your Hero & Level</span>
          </div>
          <div class="level-indicator-pill">
            <span>Level ${this.level}</span>
          </div>
        </div>

        <div class="hero-select-section">
          <h3 class="section-prompt">Choose Your Adventure Hero!</h3>
          <p class="section-subtext">Pick who will lead your math journey today:</p>

          <div class="heroes-card-grid">
            ${heroes.map(h => `
              <div class="hero-pick-card ${this.selectedHero === h.id ? 'selected' : ''}" data-hero-id="${h.id}">
                <div class="hero-preview-avatar">
                  ${window.CurioCharacters.getHeroById(h.id, 90).svg}
                </div>
                <div class="hero-info">
                  <div class="hero-name">${h.name}</div>
                  <div class="hero-badge" style="background:${h.color}22; color:${h.color}; border: 1px solid ${h.color}55;">
                    ${h.icon} ${h.role}
                  </div>
                  <p class="hero-desc">${h.desc}</p>
                </div>
                <button class="curio-btn ${this.selectedHero === h.id ? 'curio-btn-primary' : 'curio-btn-outline'} btn-sm pick-btn">
                  ${this.selectedHero === h.id ? '✓ Selected' : 'Choose Hero'}
                </button>
              </div>
            `).join('')}
          </div>

          <div class="level-select-row">
            <span class="level-label">Quest Tier:</span>
            <div class="level-pills">
              <button class="lvl-btn ${this.level === 1 ? 'active' : ''}" data-lvl="1">Tier 1: 1-Digit Addition</button>
              <button class="lvl-btn ${this.level === 2 ? 'active' : ''}" data-lvl="2">Tier 2: 1-Digit Subtraction</button>
              <button class="lvl-btn ${this.level === 3 ? 'active' : ''}" data-lvl="3">Tier 3: 2-Digit Addition</button>
              <button class="lvl-btn ${this.level === 4 ? 'active' : ''}" data-lvl="4">Tier 4: 2-Digit Subtraction</button>
              <button class="lvl-btn ${this.level === 5 ? 'active' : ''}" data-lvl="5">Tier 5: Mixed Master</button>
            </div>
          </div>

          <div class="hero-start-cta">
            <button class="curio-btn curio-btn-primary curio-btn-large pulse-subtle" id="btn-start-math-quest">
              <span>Start Math Quest! 🚀</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    this.container.querySelector('#btn-math-back').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      window.curioApp.navigate('play');
    };

    this.container.querySelectorAll('.hero-pick-card').forEach(card => {
      card.onclick = () => {
        this.selectedHero = card.dataset.heroId;
        if (window.curioState) window.curioState.selectHero(this.selectedHero);
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderHeroSelect();
      };
    });

    this.container.querySelectorAll('.lvl-btn').forEach(btn => {
      btn.onclick = () => {
        this.level = parseInt(btn.dataset.lvl);
        if (window.curioAudio) window.curioAudio.playClick();
        this.renderHeroSelect();
      };
    });

    this.container.querySelector('#btn-start-math-quest').onclick = () => {
      if (window.curioAudio) window.curioAudio.playWhoosh();
      this.startLevel();
    };
  }

  startLevel() {
    this.currentQuestionIndex = 0;
    this.correctCount = 0;
    this.totalAttempts = 0;
    this.consecutiveCorrect = 0;
    this.consecutiveErrors = 0;
    this.showingHint = false;
    this.nextQuestion();
  }

  generateQuestion() {
    let num1, num2, op, answer;
    const tier = this.level;

    if (tier === 1) {
      // 1-digit addition (e.g., 4 + 3)
      op = '+';
      num1 = Math.floor(Math.random() * 6) + 2; // 2 to 7
      num2 = Math.floor(Math.random() * 6) + 1; // 1 to 6
      answer = num1 + num2;
    } else if (tier === 2) {
      // 1-digit subtraction (e.g., 9 - 4)
      op = '-';
      num1 = Math.floor(Math.random() * 7) + 3; // 3 to 9
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 to num1-1
      answer = num1 - num2;
    } else if (tier === 3) {
      // 2-digit addition (e.g., 14 + 11 or 12 + 7)
      op = '+';
      num1 = Math.floor(Math.random() * 15) + 10; // 10 to 24
      num2 = Math.floor(Math.random() * 12) + 3;  // 3 to 14
      answer = num1 + num2;
    } else if (tier === 4) {
      // 2-digit subtraction (e.g., 25 - 12)
      op = '-';
      num1 = Math.floor(Math.random() * 20) + 15; // 15 to 34
      num2 = Math.floor(Math.random() * 12) + 2;  // 2 to 13
      answer = num1 - num2;
    } else {
      // Mixed master
      op = Math.random() > 0.5 ? '+' : '-';
      if (op === '+') {
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 15) + 5;
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 25) + 15;
        num2 = Math.floor(Math.random() * 14) + 4;
        answer = num1 - num2;
      }
    }

    // Generate 3 clever distractors
    const choices = new Set([answer]);
    while (choices.size < 4) {
      const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const fake = answer + offset;
      if (fake >= 0 && fake !== answer) {
        choices.add(fake);
      }
    }

    const shuffledChoices = Array.from(choices).sort(() => Math.random() - 0.5);

    return {
      num1,
      num2,
      op,
      answer,
      choices: shuffledChoices,
      story: this.getStoryPrompt(num1, op, num2)
    };
  }

  getStoryPrompt(num1, op, num2) {
    const heroInfo = window.CurioCharacters.getHeroById(this.selectedHero);
    if (this.selectedHero === 'princess_ice') {
      return {
        prompt: `Frost-Puff says: "To melt the ice barrier and collect ${num1 + (op === '+' ? num2 : 0)} crystals, solve this equation!"`,
        speaker: 'Frost-Puff',
        theme: 'ice'
      };
    } else if (this.selectedHero === 'princess_forest') {
      return {
        prompt: `Forest Sprig says: "Bramble Bunny needs help! Solve this to gather golden seeds!"`,
        speaker: 'Forest Sprig',
        theme: 'forest'
      };
    } else {
      return {
        prompt: `Giggle-Gargoyle: "ROOOAR! Solve this equation to send me back with party sparkles!"`,
        speaker: 'Giggle-Gargoyle',
        theme: 'hero'
      };
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex >= this.questionsPerLevel) {
      this.renderLevelComplete();
      return;
    }

    this.currentQuestion = this.generateQuestion();
    this.showingHint = false;
    this.isAnsweringLocked = false;
    this.renderQuestionScreen();
  }

  renderQuestionScreen(isTransformed = false) {
    const hero = window.CurioCharacters.getHeroById(this.selectedHero);
    const q = this.currentQuestion;
    const progressPercent = ((this.currentQuestionIndex) / this.questionsPerLevel) * 100;

    // Visual counters (apples or stars)
    let visualCounterHtml = '';
    if (this.showingHint || window.curioState.data.adaptive.scaffoldingActive) {
      const icon = q.op === '+' ? '🍎' : '⭐';
      visualCounterHtml = `
        <div class="visual-scaffolding-box animate-pop-in">
          <div class="scaffolding-label">💡 Curio's Visual Helper: Count along!</div>
          <div class="counters-row">
            <div class="counter-group">
              <span class="count-number">${q.num1}</span>
              <div class="counter-items">${icon.repeat(Math.min(q.num1, 15))}</div>
            </div>
            <span class="counter-op">${q.op}</span>
            <div class="counter-group">
              <span class="count-number">${q.num2}</span>
              <div class="counter-items">${icon.repeat(Math.min(q.num2, 15))}</div>
            </div>
          </div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="math-quest-container animate-fade-in">
        <!-- Top Quest Nav -->
        <div class="game-header-bar">
          <button class="curio-btn curio-btn-secondary btn-sm" id="btn-math-exit">
            <span>← Exit Quest</span>
          </button>
          <div class="quest-progress-center">
            <div class="quest-step-label">Question ${this.currentQuestionIndex + 1} of ${this.questionsPerLevel}</div>
            <div class="quest-progress-track">
              <div class="quest-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
          <div class="score-pill">
            <span>⭐ +${this.correctCount * 10}</span>
          </div>
        </div>

        <!-- Adventure Arena -->
        <div class="quest-arena ${hero.theme}-arena">
          <!-- Left: Hero Side -->
          <div class="arena-side hero-side">
            <div class="hero-character-stage animate-bounce-subtle">
              ${hero.svg}
            </div>
            <div class="hero-tag-badge">${hero.name}</div>
          </div>

          <!-- Middle: Encounter Dialogue -->
          <div class="arena-middle">
            <div class="challenge-speech-bubble animate-pop-in">
              <div class="speech-speaker">${q.story.speaker}</div>
              <div class="speech-text">${q.story.prompt}</div>
            </div>

            <!-- Big Math Equation Board -->
            <div class="math-equation-card">
              <span class="eq-num">${q.num1}</span>
              <span class="eq-op">${q.op}</span>
              <span class="eq-num">${q.num2}</span>
              <span class="eq-equals">=</span>
              <span class="eq-unknown">?</span>
            </div>

            ${visualCounterHtml}

            <!-- Feedback Alert Zone -->
            <div id="math-feedback-zone" class="math-feedback-zone"></div>
          </div>

          <!-- Right: Challenge Side (Monster / Magical Crystal) -->
          <div class="arena-side obstacle-side">
            <div id="obstacle-stage" class="obstacle-stage">
              ${window.CurioCharacters.getMonsterSvg(isTransformed, 130)}
            </div>
            <div class="obstacle-tag-badge">
              ${isTransformed ? 'Party Friend! 🎈' : q.story.speaker}
            </div>
          </div>
        </div>

        <!-- Answer Options Buttons (4 Large Tactile Buttons) -->
        <div class="answer-choices-container">
          <div class="choices-prompt">Tap or click the correct answer:</div>
          <div class="choices-grid">
            ${q.choices.map(choice => `
              <button class="math-choice-btn" data-val="${choice}">
                <span class="choice-text">${choice}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Helpful Assistance Bar -->
        <div class="quest-footer-bar">
          <button class="curio-btn curio-btn-outline btn-sm" id="btn-show-hint">
            <span>💡 Need a Hint?</span>
          </button>
          <div class="adaptive-notice-tag">
            <span>✨ Curio adaptive learning is active</span>
          </div>
        </div>
      </div>
    `;

    // Audio prompt speech
    if (window.curioAudio && !isTransformed) {
      window.curioAudio.speak(`What is ${q.num1} ${q.op === '+' ? 'plus' : 'minus'} ${q.num2}?`);
    }

    // Attach listeners
    this.container.querySelector('#btn-math-exit').onclick = () => {
      this.renderHeroSelect();
    };

    const hintBtn = this.container.querySelector('#btn-show-hint');
    if (hintBtn) {
      hintBtn.onclick = () => {
        this.showingHint = true;
        if (window.curioAudio) window.curioAudio.playGentleHint();
        this.renderQuestionScreen();
      };
    }

    this.container.querySelectorAll('.math-choice-btn').forEach(btn => {
      btn.onclick = () => {
        if (this.isAnsweringLocked) return;
        const val = parseInt(btn.dataset.val);
        this.handleAnswer(val, btn);
      };
    });
  }

  handleAnswer(selectedVal, clickedBtn) {
    const q = this.currentQuestion;
    const isCorrect = selectedVal === q.answer;
    this.totalAttempts += 1;
    const feedbackZone = this.container.querySelector('#math-feedback-zone');

    if (isCorrect) {
      this.isAnsweringLocked = true;
      this.correctCount += 1;
      this.consecutiveCorrect += 1;
      this.consecutiveErrors = 0;

      clickedBtn.classList.add('btn-choice-correct');

      // Update state
      if (window.curioState) {
        window.curioState.addStars(10, 'Math Quest Challenge');
        window.curioState.addXP(15, 'Math Quest Challenge');
        window.curioState.recordMathResult(true, this.level);
      }
      if (window.curioAudio) window.curioAudio.playCorrect();

      // Show transformation of monster into happy celebration
      const obstacleStage = this.container.querySelector('#obstacle-stage');
      if (obstacleStage) {
        obstacleStage.innerHTML = window.CurioCharacters.getMonsterSvg(true, 130);
      }

      feedbackZone.innerHTML = `
        <div class="feedback-msg feedback-correct animate-pop-in">
          <span>🎉 Wonderful! You solved the challenge! ⭐ +10 Stars</span>
        </div>
      `;

      if (window.curioAudio) {
        window.curioAudio.speak('Great job! You solved it!');
      }

      // Next question after dramatic success animation
      setTimeout(() => {
        this.currentQuestionIndex += 1;
        this.nextQuestion();
      }, 1800);

    } else {
      // Gentle, non-punishing feedback
      this.consecutiveErrors += 1;
      this.consecutiveCorrect = 0;
      clickedBtn.classList.add('btn-choice-soft-shake');
      setTimeout(() => clickedBtn.classList.remove('btn-choice-soft-shake'), 600);

      if (window.curioState) {
        window.curioState.recordMathResult(false, this.level);
      }
      if (window.curioAudio) window.curioAudio.playGentleHint();

      this.showingHint = true;
      feedbackZone.innerHTML = `
        <div class="feedback-msg feedback-gentle animate-pop-in">
          <span>Almost! ✨ Try counting the items below and give it another try!</span>
        </div>
      `;

      if (window.curioAudio) {
        window.curioAudio.speak('Almost! Try counting with Curio.');
      }

      // Render hint immediately
      setTimeout(() => {
        this.renderQuestionScreen();
      }, 1200);
    }
  }

  renderLevelComplete() {
    const accuracy = Math.round((this.correctCount / Math.max(1, this.totalAttempts)) * 100);
    const starsEarned = this.correctCount * 10 + 20; // 20 bonus for completion
    const xpEarned = this.correctCount * 15 + 30;

    if (window.curioState) {
      window.curioState.addStars(20, 'Math Level Complete Bonus');
      window.curioState.addXP(30, 'Math Level Complete Bonus');
      window.curioState.unlockBadge('math_explorer');
    }
    if (window.curioAudio) window.curioAudio.playFanfare();

    this.container.innerHTML = `
      <div class="level-complete-card animate-pop-in">
        <div class="trophy-crest">🏆</div>
        <h2 class="complete-title">LEVEL COMPLETE! 🎉</h2>
        <p class="complete-subtitle">You guided your hero through the math realm with flying colors!</p>

        <div class="stats-summary-grid">
          <div class="stat-box">
            <span class="stat-value">5 / 5</span>
            <span class="stat-label">Challenges Cleared</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">${accuracy}%</span>
            <span class="stat-label">Accuracy</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">⭐ +${starsEarned}</span>
            <span class="stat-label">Stars Earned</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">⚡ +${xpEarned}</span>
            <span class="stat-label">XP Gained</span>
          </div>
        </div>

        <div class="complete-actions">
          <button class="curio-btn curio-btn-primary curio-btn-large" id="btn-continue-math">
            <span>Continue Adventure 🚀</span>
          </button>
          <button class="curio-btn curio-btn-secondary" id="btn-replay-math">
            <span>Play Next Tier 🔄</span>
          </button>
        </div>
      </div>
    `;

    // Confetti effect
    if (window.curioApp && window.curioApp.triggerConfetti) {
      window.curioApp.triggerConfetti();
    }

    this.container.querySelector('#btn-continue-math').onclick = () => {
      window.curioApp.navigate('play');
    };

    this.container.querySelector('#btn-replay-math').onclick = () => {
      if (this.level < 5) this.level += 1;
      this.startLevel();
    };
  }
}

window.MathQuestGame = MathQuestGame;
