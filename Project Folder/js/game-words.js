/**
 * CURIO Game 4: Word Builder Adventure
 * Phonics, vocabulary, and early-reading game with two exciting modes:
 * Mode 1: Scrambled Letter Builder (drag or tap letter tiles in sequence)
 * Mode 2: Picture Word Recognition ("Which one is a CAT?")
 * Progressive word length tiers (2-letter, 3-letter, 4-letter, 5-letter words)
 * Real-time SpeechSynthesis phonics feedback!
 */

class WordBuilderAdventureGame {
  constructor() {
    this.container = null;
    this.mode = 'spell'; // 'spell' or 'picture_match'
    this.tier = 1; // 1: 2-3 letters, 2: 4 letters, 3: 5 letters
    this.wordIndex = 0;
    this.placedLetters = []; // user selected letters
    this.isCompleted = false;

    // Database of vocabulary words across progressive tiers
    this.wordsDatabase = {
      1: [
        { word: 'CAT', icon: '🐱', hint: 'A playful furry feline that purrs!' },
        { word: 'DOG', icon: '🐶', hint: 'Man\'s loyal best friend who barks!' },
        { word: 'SUN', icon: '☀️', hint: 'Bright star in the sky that warms the Earth!' },
        { word: 'BAT', icon: '🦇', hint: 'Flies at dusk with wings!' },
        { word: 'AT', icon: '📍', hint: 'Points to where something is located!' },
        { word: 'AN', icon: '🍎', hint: 'An apple, an elephant!' }
      ],
      2: [
        { word: 'FISH', icon: '🐟', hint: 'Swims in lakes and oceans with fins!' },
        { word: 'TREE', icon: '🌳', hint: 'Tall plant with green leaves and a trunk!' },
        { word: 'BOOK', icon: '📖', hint: 'Filled with stories, words, and pictures!' },
        { word: 'STAR', icon: '⭐', hint: 'Twinkles in the night sky!' },
        { word: 'BIRD', icon: '🐦', hint: 'Sings sweet morning songs and flies!' }
      ],
      3: [
        { word: 'APPLE', icon: '🍎', hint: 'Sweet, crisp red fruit that grows on trees!' },
        { word: 'HOUSE', icon: '🏠', hint: 'A warm and cozy place where families live!' },
        { word: 'WATER', icon: '💧', hint: 'Clear liquid that every living thing needs!' },
        { word: 'CLOUD', icon: '☁️', hint: 'Fluffy white vapor floating in the blue sky!' },
        { word: 'TRAIN', icon: '🚂', hint: 'Rolls along the tracks with a whistle!' }
      ]
    };
  }

  mount(targetElement) {
    this.container = targetElement;
    this.tier = 1;
    this.wordIndex = 0;
    this.placedLetters = [];
    this.renderScreen();
  }

  getCurrentWordObj() {
    const list = this.wordsDatabase[this.tier] || this.wordsDatabase[1];
    return list[this.wordIndex % list.length];
  }

  renderScreen() {
    if (this.mode === 'spell') {
      this.renderSpellMode();
    } else {
      this.renderPictureMatchMode();
    }
  }

  renderHeaderBar() {
    return `
      <div class="game-header-bar">
        <button class="curio-btn curio-btn-secondary btn-sm" id="btn-words-back">
          <span>← Explorer HQ</span>
        </button>
        <div class="game-title-group">
          <h2 class="game-title">📖 Word Builder Adventure</h2>
          <span class="game-subtitle">Spelling, Phonics & Picture Recognition</span>
        </div>
        <div class="words-mode-toggle">
          <button class="mode-pill-btn ${this.mode === 'spell' ? 'active' : ''}" id="btn-mode-spell">
            🔤 Spell Letters
          </button>
          <button class="mode-pill-btn ${this.mode === 'picture_match' ? 'active' : ''}" id="btn-mode-match">
            🖼️ Picture Match
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // MODE A: SCRAMBLED LETTER SPELLING
  // ==========================================
  renderSpellMode() {
    const current = this.getCurrentWordObj();
    const wordLetters = current.word.split('');
    const slotsNeeded = wordLetters.length;

    // Scramble letters if not already
    if (!this.scrambledLetters || this.scrambledLetters.word !== current.word) {
      let shuffled = [...wordLetters].sort(() => Math.random() - 0.5);
      // Ensure it's not accidentally identical if length > 2
      if (shuffled.join('') === current.word && shuffled.length > 2) {
        shuffled.reverse();
      }
      this.scrambledLetters = {
        word: current.word,
        tiles: shuffled.map((ch, idx) => ({ id: `${ch}_${idx}`, char: ch, used: false }))
      };
      this.placedLetters = [];
      this.isCompleted = false;
    }

    const isMatch = this.placedLetters.map(t => t.char).join('') === current.word;

    this.container.innerHTML = `
      <div class="word-builder-container animate-fade-in">
        ${this.renderHeaderBar()}

        <div class="word-builder-card">
          <!-- Tier Selector -->
          <div class="word-tier-strip">
            <span class="tier-label">Word Length Tier:</span>
            <div class="tier-pills">
              <button class="tier-btn ${this.tier === 1 ? 'active' : ''}" data-tier="1">Tier 1: 2-3 Letters</button>
              <button class="tier-btn ${this.tier === 2 ? 'active' : ''}" data-tier="2">Tier 2: 4 Letters</button>
              <button class="tier-btn ${this.tier === 3 ? 'active' : ''}" data-tier="3">Tier 3: 5 Letters</button>
            </div>
            <button class="curio-btn curio-btn-outline btn-sm" id="btn-phonics-hear">
              <span>🔊 Hear Phonics</span>
            </button>
          </div>

          <!-- Main Visual Word Showcase -->
          <div class="word-illustration-center">
            <div class="word-icon-display animate-bounce-subtle">${current.icon}</div>
            <div class="word-hint-tag">${current.hint}</div>
          </div>

          <!-- Target Letter Slots -->
          <div class="letter-slots-row">
            ${Array.from({ length: slotsNeeded }).map((_, idx) => {
              const placed = this.placedLetters[idx];
              return `
                <div class="letter-target-slot ${placed ? 'filled' : 'empty'} ${isMatch ? 'slot-correct' : ''}" data-slot-idx="${idx}">
                  ${placed ? `<span class="slot-letter animate-pop-in">${placed.char}</span>` : `<span class="slot-dot">•</span>`}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Scrambled Available Letters -->
          <div class="scrambled-tiles-container">
            <div class="tiles-instruction">
              ${isMatch ? '🎉 Wonderful! Word spelled correctly!' : 'Tap or drag the letters in the correct order:'}
            </div>
            <div class="tiles-flex">
              ${this.scrambledLetters.tiles.map(tile => `
                <button class="letter-tile-btn ${tile.used ? 'tile-used' : ''}" data-tile-id="${tile.id}" data-char="${tile.char}">
                  <span class="tile-char">${tile.char}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Action buttons -->
          <div class="word-actions-row">
            <button class="curio-btn curio-btn-secondary btn-sm" id="btn-reset-letters">
              <span>🔄 Reset Tiles</span>
            </button>
            <button class="curio-btn curio-btn-primary" id="btn-next-word">
              <span>Next Word ⏭️</span>
            </button>
          </div>

          <!-- Spoken Celebration Overlay -->
          ${isMatch ? `
            <div class="spelling-success-banner animate-pop-in">
              <div class="banner-sparkle">✨</div>
              <div class="banner-body">
                <strong>"${current.word}!"</strong>
                <span>${current.word.split('').join('-')} spells ${current.word}! ⭐ +15 Stars</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.attachBaseListeners();

    // Sound button
    this.container.querySelector('#btn-phonics-hear').onclick = () => {
      this.speakWordPhonics(current.word);
    };

    // Reset tiles
    this.container.querySelector('#btn-reset-letters').onclick = () => {
      if (window.curioAudio) window.curioAudio.playPop();
      this.placedLetters = [];
      this.scrambledLetters.tiles.forEach(t => t.used = false);
      this.renderSpellMode();
    };

    // Next word
    this.container.querySelector('#btn-next-word').onclick = () => {
      if (window.curioAudio) window.curioAudio.playWhoosh();
      this.wordIndex += 1;
      this.scrambledLetters = null;
      this.placedLetters = [];
      this.renderSpellMode();
    };

    // Tier buttons
    this.container.querySelectorAll('.tier-btn').forEach(btn => {
      btn.onclick = () => {
        this.tier = parseInt(btn.dataset.tier);
        this.wordIndex = 0;
        this.scrambledLetters = null;
        this.placedLetters = [];
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderSpellMode();
      };
    });

    // Tile clicks
    this.container.querySelectorAll('.letter-tile-btn:not(.tile-used)').forEach(btn => {
      btn.onclick = () => {
        const tileId = btn.dataset.tileId;
        const char = btn.dataset.char;
        const tileObj = this.scrambledLetters.tiles.find(t => t.id === tileId);

        if (tileObj && !tileObj.used) {
          tileObj.used = true;
          this.placedLetters.push(tileObj);
          if (window.curioAudio) {
            window.curioAudio.playPop();
            window.curioAudio.speak(char, { rate: 1.1 });
          }

          // Check if full
          if (this.placedLetters.length === slotsNeeded) {
            this.checkSpelling();
          } else {
            this.renderSpellMode();
          }
        }
      };
    });

    // Slot click to remove last placed
    this.container.querySelectorAll('.letter-target-slot.filled').forEach(slot => {
      slot.onclick = () => {
        const last = this.placedLetters.pop();
        if (last) {
          last.used = false;
          if (window.curioAudio) window.curioAudio.playPop();
          this.renderSpellMode();
        }
      };
    });
  }

  checkSpelling() {
    const current = this.getCurrentWordObj();
    const assembled = this.placedLetters.map(t => t.char).join('');

    if (assembled === current.word) {
      this.isCompleted = true;
      if (window.curioState) {
        window.curioState.addStars(15, `Spelled ${current.word}`);
        window.curioState.addXP(20, `Spelled ${current.word}`);
        if (!window.curioState.data.games.words.completedWords.includes(current.word)) {
          window.curioState.data.games.words.completedWords.push(current.word);
          window.curioState.save();
        }
        if (window.curioState.data.games.words.completedWords.length >= 6) {
          window.curioState.unlockBadge('word_wizard');
        }
      }
      if (window.curioAudio) window.curioAudio.playCorrect();
      this.renderSpellMode();
      this.speakWordPhonics(current.word);
    } else {
      // Gentle incorrect shake
      if (window.curioAudio) window.curioAudio.playGentleHint();
      if (window.curioState) {
        window.curioState.showToast(`Almost! Try arranging the letters again ✨`, 'info');
      }
      setTimeout(() => {
        this.placedLetters = [];
        this.scrambledLetters.tiles.forEach(t => t.used = false);
        this.renderSpellMode();
      }, 1000);
    }
  }

  speakWordPhonics(word) {
    if (window.curioAudio) {
      const lettersSpoken = word.split('').join(' . ');
      window.curioAudio.speak(`${lettersSpoken}. Spells ${word}!`);
    }
  }

  // ==========================================
  // MODE B: PICTURE WORD RECOGNITION
  // ==========================================
  renderPictureMatchMode() {
    const list = this.wordsDatabase[this.tier] || this.wordsDatabase[1];
    const targetObj = list[this.wordIndex % list.length];

    // Pick 2 distractors
    const others = list.filter(w => w.word !== targetObj.word);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [targetObj, ...shuffledOthers].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div class="word-builder-container animate-fade-in">
        ${this.renderHeaderBar()}

        <div class="word-builder-card">
          <div class="picture-match-header">
            <h3 class="match-question">Which picture shows a <strong>"${targetObj.word}"</strong>?</h3>
            <button class="curio-btn curio-btn-outline btn-sm" id="btn-speak-match">
              <span>🔊 Read Word</span>
            </button>
          </div>

          <div class="picture-choices-grid">
            ${options.map(opt => `
              <div class="picture-choice-card" data-word="${opt.word}">
                <div class="choice-big-emoji animate-bounce-subtle">${opt.icon}</div>
                <div class="choice-reveal-label">Tap to Choose</div>
              </div>
            `).join('')}
          </div>

          <div id="match-feedback-box" class="match-feedback-box"></div>
        </div>
      </div>
    `;

    this.attachBaseListeners();

    if (window.curioAudio) {
      window.curioAudio.speak(`Which one is a ${targetObj.word}?`);
    }

    this.container.querySelector('#btn-speak-match').onclick = () => {
      if (window.curioAudio) window.curioAudio.speak(`Find the picture for: ${targetObj.word}`);
    };

    this.container.querySelectorAll('.picture-choice-card').forEach(card => {
      card.onclick = () => {
        const picked = card.dataset.word;
        const feedback = this.container.querySelector('#match-feedback-box');

        if (picked === targetObj.word) {
          card.classList.add('correct-choice');
          if (window.curioState) {
            window.curioState.addStars(15, 'Picture Match');
            window.curioState.addXP(20, 'Picture Match');
          }
          if (window.curioAudio) window.curioAudio.playCorrect();
          feedback.innerHTML = `
            <div class="feedback-msg feedback-correct animate-pop-in">
              <span>🎉 Yes! That is a ${targetObj.word}! ⭐ +15 Stars</span>
            </div>
          `;

          setTimeout(() => {
            this.wordIndex += 1;
            this.renderPictureMatchMode();
          }, 1500);
        } else {
          card.classList.add('soft-wrong');
          if (window.curioAudio) window.curioAudio.playGentleHint();
          feedback.innerHTML = `
            <div class="feedback-msg feedback-gentle animate-pop-in">
              <span>That's a ${picked}! Try finding the ${targetObj.word} ✨</span>
            </div>
          `;
          setTimeout(() => card.classList.remove('soft-wrong'), 800);
        }
      };
    });
  }

  attachBaseListeners() {
    this.container.querySelector('#btn-words-back').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      window.curioApp.navigate('play');
    };

    const spellBtn = this.container.querySelector('#btn-mode-spell');
    const matchBtn = this.container.querySelector('#btn-mode-match');

    if (spellBtn) {
      spellBtn.onclick = () => {
        this.mode = 'spell';
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderScreen();
      };
    }

    if (matchBtn) {
      matchBtn.onclick = () => {
        this.mode = 'picture_match';
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderScreen();
      };
    }
  }
}

window.WordBuilderAdventureGame = WordBuilderAdventureGame;
