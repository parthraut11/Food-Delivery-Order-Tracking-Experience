/**
 * CURIO Central Reactive State Management
 * Handles XP, Stars, Levels, Missions, Unlocked Assets, Gamification,
 * and the Adaptive Difficulty Engine state with session / localStorage persistence.
 */

class CurioState {
  constructor() {
    this.STORAGE_KEY = 'curio_edtech_state_v1';
    this.subscribers = [];
    this.data = this.getDefaultState();
    this.load();
  }

  getDefaultState() {
    return {
      child: {
        name: 'Explorer Leo',
        age: 6,
        avatar: 'hero_web', // hero_web, hero_strong, hero_tech, princess_ice, princess_forest
        accessory: 'star_badge', // star_badge, explorer_hat, crown, wizard_hat, cape
        pet: 'sparky_pup', // sparky_pup, cosmo_bunny, bubbles_otter
        level: 4,
        levelTitle: 'Learning Hero',
        stars: 245,
        xp: 480,
        xpMax: 600,
        streakDays: 5,
        soundEnabled: true,
        reducedMotion: false
      },
      games: {
        math: {
          currentLevel: 1, // 1 to 5
          totalAnswered: 24,
          totalCorrect: 21,
          streak: 2,
          mastery: 78
        },
        abc: {
          currentLetter: 'A',
          completedLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          totalTraced: 12,
          mastery: 92
        },
        lab: {
          currentActivity: 'plant', // plant, solar, animals, food, weather
          completedActivities: ['plant', 'animals'],
          mastery: 65
        },
        words: {
          currentTier: 1,
          completedWords: ['CAT', 'SUN', 'DOG', 'BAT'],
          mastery: 81
        }
      },
      missions: [
        {
          id: 'mission_math',
          title: 'Complete 3 Math Challenges',
          category: 'math',
          progress: 1,
          target: 3,
          rewardStars: 30,
          rewardXP: 50,
          claimed: false
        },
        {
          id: 'mission_abc',
          title: 'Trace 2 Alphabet Letters',
          category: 'abc',
          progress: 1,
          target: 2,
          rewardStars: 20,
          rewardXP: 40,
          claimed: false
        },
        {
          id: 'mission_lab',
          title: 'Help Curio Grow a Plant',
          category: 'lab',
          progress: 0,
          target: 1,
          rewardStars: 25,
          rewardXP: 45,
          claimed: false
        }
      ],
      badges: [
        { id: 'math_explorer', title: 'Math Explorer', desc: 'Solved 10+ arithmetic challenges!', icon: '🎯', unlocked: true, unlockedAt: '2 days ago' },
        { id: 'abc_master', title: 'ABC Master', desc: 'Smooth letter tracing and phonics!', icon: '🔤', unlocked: true, unlockedAt: 'Yesterday' },
        { id: 'science_detective', title: 'Science Detective', desc: 'Explored biology & cosmic wonders!', icon: '🔬', unlocked: true, unlockedAt: '3 days ago' },
        { id: 'word_wizard', title: 'Word Wizard', desc: 'Built phonics words from scratch!', icon: '📖', unlocked: false, unlockedAt: null },
        { id: 'curious_mind', title: 'Curious Mind', desc: 'Played all four learning worlds!', icon: '💡', unlocked: true, unlockedAt: '4 days ago' },
        { id: 'streak_hero', title: '5-Day Explorer', desc: 'Kept learning curiosity alive 5 days!', icon: '🔥', unlocked: true, unlockedAt: 'Today' },
        { id: 'super_learner', title: 'Super Learner', desc: '3 consecutive perfect problem streaks!', icon: '🌟', unlocked: false, unlockedAt: null },
        { id: 'eco_hero', title: 'Plant Whisperer', desc: 'Nurtured a seed into full bloom!', icon: '🌱', unlocked: true, unlockedAt: 'Yesterday' },
        { id: 'space_cadet', title: 'Solar Explorer', desc: 'Mapped the solar system correctly!', icon: '🪐', unlocked: false, unlockedAt: null }
      ],
      wardrobe: {
        accessories: [
          { id: 'star_badge', name: 'Explorer Pin', icon: '⭐', cost: 0, unlocked: true },
          { id: 'explorer_hat', name: 'Safari Cap', icon: '🧢', cost: 50, unlocked: true },
          { id: 'crown', name: 'Golden Tiara', icon: '👑', cost: 100, unlocked: true },
          { id: 'wizard_hat', name: 'Star Sorcerer', icon: '🧙', cost: 150, unlocked: false },
          { id: 'space_helmet', name: 'Cosmo Helmet', icon: '🪖', cost: 200, unlocked: false },
          { id: 'super_cape', name: 'Heroic Cape', icon: '🦸', cost: 250, unlocked: false }
        ],
        pets: [
          { id: 'sparky_pup', name: 'Sparky the Pup', type: 'Puppy', icon: '🐶', unlocked: true },
          { id: 'cosmo_bunny', name: 'Cosmo Bunny', type: 'Bunny', icon: '🐰', unlocked: true },
          { id: 'bubbles_otter', name: 'Bubbles Otter', type: 'Otter', icon: '🦦', unlocked: false, cost: 80 }
        ]
      },
      adaptive: {
        mathDifficultyTier: 1, // 1: 1-digit add, 2: 1-digit sub, 3: 2-digit add, 4: 2-digit sub, 5: mixed
        consecutiveCorrect: 0,
        consecutiveErrors: 0,
        scaffoldingActive: false,
        hintMode: 'visual_counters', // visual_counters, number_line, gentle_hint
        currentPromptAdjustment: 'Starting with friendly single-digit addition.',
        recentEvents: [
          { timestamp: '10:14 AM', event: 'Single-digit addition mastered (100% accuracy)' },
          { timestamp: '10:15 AM', event: 'Adaptive prompt: Increased challenge range to numbers up to 15' },
          { timestamp: '10:16 AM', event: 'Fine-motor tracing smoothness calibrated for touch/mouse' }
        ]
      },
      parentAnalytics: {
        weeklyMinutes: 145,
        dailyTime: [
          { day: 'Mon', mins: 22 },
          { day: 'Tue', mins: 28 },
          { day: 'Wed', mins: 32 },
          { day: 'Thu', mins: 18 },
          { day: 'Fri', mins: 25 },
          { day: 'Sat', mins: 20 },
          { day: 'Sun', mins: 0 }
        ],
        subjectTime: {
          math: 45,
          abc: 40,
          lab: 35,
          words: 25
        },
        strengths: [
          'High phonemic awareness and visual letter identification',
          'Fast mental addition under 10 with 95% accuracy',
          'Enthusiastic engagement in biological sciences'
        ],
        growthAreas: [
          'Double-digit subtraction with regrouping (visual hints active)',
          'Letter tracing curves (S, G, B) fine-motor pathing'
        ],
        offlineActivities: [
          { title: 'Kitchen Math', desc: 'Count apple slices or sort spoons by size during lunch!' },
          { title: 'Nature Scavenger Hunt', desc: 'Find 3 leaves of different shapes to reinforce Little Lab botany!' },
          { title: 'Sound Detective', desc: 'Find 3 household items starting with the "B" sound.' }
        ]
      }
    };
  }

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with default state to ensure schema updates
        this.data = { ...this.data, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      this.notify();
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.data);
      } catch (err) {
        console.error('State subscriber error:', err);
      }
    });
  }

  // Currency & Progress Actions
  addStars(amount, source = '') {
    this.data.child.stars += amount;
    this.recordAdaptiveLog(`Earned +${amount} Stars from ${source || 'activity'}`);
    this.save();
    if (window.curioAudio) window.curioAudio.playStar();
    return this.data.child.stars;
  }

  addXP(amount, source = '') {
    this.data.child.xp += amount;
    // Check level up
    const levels = [
      { lvl: 1, title: 'Curious Beginner', maxXP: 150 },
      { lvl: 2, title: 'Little Explorer', maxXP: 300 },
      { lvl: 3, title: 'Smart Adventurer', maxXP: 550 },
      { lvl: 4, title: 'Learning Hero', maxXP: 900 },
      { lvl: 5, title: 'Curio Champion', maxXP: 1500 }
    ];

    let currentLvlObj = levels.find(l => l.lvl === this.data.child.level) || levels[3];
    if (this.data.child.xp >= currentLvlObj.maxXP && this.data.child.level < 5) {
      this.data.child.level += 1;
      const nextLvlObj = levels.find(l => l.lvl === this.data.child.level);
      this.data.child.levelTitle = nextLvlObj.title;
      this.data.child.xpMax = nextLvlObj.maxXP;
      this.recordAdaptiveLog(`🎉 LEVEL UP! Reached Level ${this.data.child.level}: ${nextLvlObj.title}`);
      if (window.curioAudio) window.curioAudio.playFanfare();
      this.showToast(`🎉 LEVEL UP! You are now a ${nextLvlObj.title}! ⭐ +50 Bonus`, 'success');
      this.addStars(50, 'Level Up Bonus');
    }

    this.save();
    return { xp: this.data.child.xp, level: this.data.child.level };
  }

  // Missions
  incrementMission(category, amount = 1) {
    let changed = false;
    this.data.missions.forEach(m => {
      if (m.category === category && !m.claimed && m.progress < m.target) {
        m.progress = Math.min(m.target, m.progress + amount);
        changed = true;
        if (m.progress >= m.target) {
          this.showToast(`🎯 Mission Complete: "${m.title}"! Claim your reward!`, 'success');
        }
      }
    });
    if (changed) this.save();
  }

  claimMission(missionId) {
    const mission = this.data.missions.find(m => m.id === missionId);
    if (mission && mission.progress >= mission.target && !mission.claimed) {
      mission.claimed = true;
      this.addStars(mission.rewardStars, `Mission: ${mission.title}`);
      this.addXP(mission.rewardXP, `Mission: ${mission.title}`);
      this.showToast(`⭐ +${mission.rewardStars} Stars and ⚡ +${mission.rewardXP} XP claimed!`, 'success');
      this.save();
      return true;
    }
    return false;
  }

  // Badges
  unlockBadge(badgeId) {
    const badge = this.data.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = 'Just now';
      this.addStars(20, `Badge: ${badge.title}`);
      this.addXP(35, `Badge: ${badge.title}`);
      this.showToast(`🏆 NEW BADGE UNLOCKED: ${badge.title}! ⭐ +20`, 'success');
      if (window.curioAudio) window.curioAudio.playFanfare();
      this.save();
      return true;
    }
    return false;
  }

  // Wardrobe & Customization
  selectHero(heroId) {
    this.data.child.avatar = heroId;
    this.save();
  }

  selectAccessory(accId) {
    this.data.child.accessory = accId;
    this.save();
  }

  selectPet(petId) {
    this.data.child.pet = petId;
    this.save();
  }

  unlockAccessory(accId) {
    const acc = this.data.wardrobe.accessories.find(a => a.id === accId);
    if (acc && !acc.unlocked && this.data.child.stars >= acc.cost) {
      this.data.child.stars -= acc.cost;
      acc.unlocked = true;
      this.selectAccessory(accId);
      this.showToast(`✨ Unlocked ${acc.name}!`, 'success');
      this.save();
      return true;
    }
    return false;
  }

  unlockPet(petId) {
    const pet = this.data.wardrobe.pets.find(p => p.id === petId);
    if (pet && !pet.unlocked && this.data.child.stars >= (pet.cost || 80)) {
      this.data.child.stars -= (pet.cost || 80);
      pet.unlocked = true;
      this.selectPet(petId);
      this.showToast(`🐾 Adopted ${pet.name}!`, 'success');
      this.save();
      return true;
    }
    return false;
  }

  // Adaptive Engine Real-Time Handlers
  recordMathResult(isCorrect, difficultyLevel) {
    const g = this.data.games.math;
    g.totalAnswered += 1;

    if (isCorrect) {
      g.totalCorrect += 1;
      this.data.adaptive.consecutiveCorrect += 1;
      this.data.adaptive.consecutiveErrors = 0;
      this.incrementMission('math', 1);

      // Adaptive Rule 1: 3 consecutive correct -> step up difficulty
      if (this.data.adaptive.consecutiveCorrect >= 3) {
        if (this.data.adaptive.mathDifficultyTier < 5) {
          this.data.adaptive.mathDifficultyTier += 1;
          this.data.adaptive.currentPromptAdjustment = `Leveling up! Advancing to Tier ${this.data.adaptive.mathDifficultyTier} challenges.`;
          this.recordAdaptiveLog(`🚀 Adaptive Level-Up: 3 consecutive correct! Advanced to Tier ${this.data.adaptive.mathDifficultyTier}.`);
          this.showAdaptiveNotice('Curio noticed you\'re on fire! 🔥 Challenge increased!');
        }
        this.data.adaptive.scaffoldingActive = false;
        this.data.adaptive.consecutiveCorrect = 0;
      }
    } else {
      this.data.adaptive.consecutiveErrors += 1;
      this.data.adaptive.consecutiveCorrect = 0;

      // Adaptive Rule 2: Struggling (2 errors) -> activate gentle scaffolding
      if (this.data.adaptive.consecutiveErrors >= 2) {
        this.data.adaptive.scaffoldingActive = true;
        this.data.adaptive.hintMode = 'visual_counters';
        this.data.adaptive.currentPromptAdjustment = 'Visual counter scaffolding enabled to make counting intuitive.';
        this.recordAdaptiveLog(`💡 Adaptive Scaffolding: Visual counter aids activated to support learning.`);
        this.showAdaptiveNotice('Curio is adding counting dots to help you see the answer! 🌟');
      }
    }

    // Update mastery score dynamically
    g.mastery = Math.min(100, Math.round((g.totalCorrect / Math.max(1, g.totalAnswered)) * 100));
    this.save();
  }

  recordAdaptiveLog(msg) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.data.adaptive.recentEvents.unshift({ timestamp: time, event: msg });
    if (this.data.adaptive.recentEvents.length > 8) {
      this.data.adaptive.recentEvents.pop();
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('curio-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `curio-toast curio-toast-${type} animate-pop-in`;
    toast.innerHTML = `
      <div class="toast-content">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  showAdaptiveNotice(text) {
    const banner = document.getElementById('adaptive-live-pill');
    if (banner) {
      banner.classList.add('pill-pulse');
      const textSpan = banner.querySelector('.adaptive-text');
      if (textSpan) textSpan.textContent = text;
      setTimeout(() => banner.classList.remove('pill-pulse'), 3000);
    }
  }

  resetAllProgress() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.data = this.getDefaultState();
    this.save();
    this.showToast('Progress reset for demonstration!', 'info');
  }
}

window.curioState = new CurioState();
