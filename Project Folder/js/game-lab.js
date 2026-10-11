/**
 * CURIO Game 3: Curio's Little Lab
 * Hands-on science discovery games with 5 interactive activities:
 * 1. Grow a Plant (seed -> soil -> water -> sun -> blooming flower)
 * 2. Build the Solar System (Sun + 8 planets in orbital slots)
 * 3. Sort Animals (Land, Water, Air habitats)
 * 4. Healthy Food Basket (Everyday fuel vs sweet treats)
 * 5. Weather Explorer (Sunny, Rainy, Cloudy, Snowy)
 * Fully supports touch, drag & drop, and click-to-place for all devices!
 */

class CuriosLittleLabGame {
  constructor() {
    this.container = null;
    this.currentActivity = 'plant'; // plant, solar, animals, food, weather

    // State for Plant activity
    this.plantStage = 0; // 0: empty pot, 1: seed in soil, 2: watered, 3: sunlit -> blooms!

    // State for Solar system
    this.placedPlanets = {};

    // State for Animal sort
    this.sortedAnimals = { land: [], water: [], air: [] };

    // State for Healthy food
    this.basketFoods = [];

    // State for Weather
    this.currentWeather = 'sunny';
  }

  mount(targetElement) {
    this.container = targetElement;
    this.renderActivity(this.currentActivity);
  }

  renderActivity(activityId) {
    if (!this.container) {
      this.container = document.getElementById('main-app-content');
    }
    if (!this.container) return;
    this.currentActivity = activityId;
    switch (activityId) {
      case 'plant':
        this.renderPlantActivity();
        break;
      case 'solar':
        this.renderSolarActivity();
        break;
      case 'animals':
        this.renderAnimalsActivity();
        break;
      case 'food':
        this.renderFoodActivity();
        break;
      case 'weather':
        this.renderWeatherActivity();
        break;
      default:
        this.renderPlantActivity();
    }
  }

  renderHeader(title, subtitle) {
    const tabs = [
      { id: 'plant', name: '🌱 Grow a Plant', icon: '🌱' },
      { id: 'solar', name: '🪐 Solar System', icon: '🪐' },
      { id: 'animals', name: '🐾 Habitat Sort', icon: '🐾' },
      { id: 'food', name: '🥗 Healthy Food', icon: '🥗' },
      { id: 'weather', name: '⛅ Weather Fun', icon: '⛅' }
    ];

    return `
      <div class="game-header-bar">
        <button class="curio-btn curio-btn-secondary btn-sm" id="btn-lab-back">
          <span>← Explorer HQ</span>
        </button>
        <div class="lab-title-group">
          <h2 class="game-title">🔬 Curio's Little Lab</h2>
          <span class="game-subtitle">${subtitle}</span>
        </div>
        <div class="score-pill">
          <span>⭐ Science Discovery</span>
        </div>
      </div>

      <!-- Activity Navigation Strip -->
      <div class="lab-activities-bar">
        ${tabs.map(tab => `
          <button class="lab-tab-btn ${this.currentActivity === tab.id ? 'active' : ''}" data-act="${tab.id}">
            <span>${tab.name}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  setupBaseListeners() {
    this.container.querySelector('#btn-lab-back').onclick = () => {
      if (window.curioAudio) window.curioAudio.playClick();
      window.curioApp.navigate('play');
    };

    this.container.querySelectorAll('.lab-tab-btn').forEach(btn => {
      btn.onclick = () => {
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderActivity(btn.dataset.act);
      };
    });
  }

  // ==========================================
  // ACTIVITY 1: GROW A PLANT
  // ==========================================
  renderPlantActivity() {
    let instruction = 'Step 1: Put the seed in the soil!';
    let plantVisual = '🪴'; // Pot with soil
    if (this.plantStage === 1) {
      instruction = 'Step 2: Give the plant some refreshing water! 💧';
      plantVisual = '🪴🌱'; // tiny sprout
    } else if (this.plantStage === 2) {
      instruction = 'Step 3: Give it bright warm sunlight! ☀️';
      plantVisual = '🪴🌿'; // leafy stem
    } else if (this.plantStage >= 3) {
      instruction = '🎉 You discovered what plants need to grow! 🌱';
      plantVisual = '🪴🌸🌻'; // blooming flower
    }

    this.container.innerHTML = `
      <div class="lab-container animate-fade-in">
        ${this.renderHeader('Curio\'s Little Lab', 'Help Curio Grow a Plant 🌱')}

        <div class="lab-stage-card plant-lab-bg">
          <div class="lab-mission-instruction animate-pop-in">
            <span class="instruction-icon">💬</span>
            <span class="instruction-text">${instruction}</span>
          </div>

          <div class="plant-scene-wrapper">
            <!-- Growth Chamber -->
            <div class="growth-chamber" id="pot-drop-target">
              <div class="sunbeam-fx ${this.plantStage >= 3 ? 'active' : ''}"></div>
              <div class="plant-pot-stage animate-breathe">
                ${this.renderPlantSvg(this.plantStage)}
              </div>
              <div class="target-label">
                ${this.plantStage < 3 ? 'Drop or tap items here!' : 'Beautiful Flower in Bloom! 🌺'}
              </div>
            </div>

            <!-- Discovery Items Toolbar -->
            <div class="plant-tools-shelf">
              <div class="shelf-title">Curio's Gardening Supplies:</div>
              <div class="tools-row">
                <div class="tool-item ${this.plantStage === 0 ? 'highlight-pulse' : (this.plantStage > 0 ? 'used' : '')}" id="tool-seed" draggable="true" data-type="seed">
                  <div class="tool-icon">🌰</div>
                  <span class="tool-name">Seed</span>
                </div>
                <div class="tool-item ${this.plantStage === 1 ? 'highlight-pulse' : (this.plantStage > 1 ? 'used' : '')}" id="tool-water" draggable="true" data-type="water">
                  <div class="tool-icon">💧</div>
                  <span class="tool-name">Water</span>
                </div>
                <div class="tool-item ${this.plantStage === 2 ? 'highlight-pulse' : (this.plantStage > 2 ? 'used' : '')}" id="tool-sun" draggable="true" data-type="sun">
                  <div class="tool-icon">☀️</div>
                  <span class="tool-name">Sunlight</span>
                </div>
              </div>
              <div class="shelf-hint">Tip: Click or drag each item when it is time!</div>
            </div>
          </div>

          ${this.plantStage >= 3 ? `
            <div class="discovery-badge-banner animate-pop-in">
              <div class="banner-icon">🏆</div>
              <div class="banner-text">
                <h3>Plant Scientist Certificate!</h3>
                <p>Plants need <strong>Soil</strong>, <strong>Water</strong>, and <strong>Sunlight</strong> to blossom!</p>
              </div>
              <button class="curio-btn curio-btn-primary" id="btn-replay-plant">
                <span>Grow Another Plant 🔄</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.setupBaseListeners();

    if (this.plantStage >= 3) {
      this.container.querySelector('#btn-replay-plant').onclick = () => {
        this.plantStage = 0;
        this.renderPlantActivity();
      };
      return;
    }

    // Interactive Drag and Click Handling
    const target = this.container.querySelector('#pot-drop-target');
    const seed = this.container.querySelector('#tool-seed');
    const water = this.container.querySelector('#tool-water');
    const sun = this.container.querySelector('#tool-sun');

    const advancePlant = (type) => {
      if (type === 'seed' && this.plantStage === 0) {
        this.plantStage = 1;
        if (window.curioAudio) window.curioAudio.playPop();
        this.renderPlantActivity();
      } else if (type === 'water' && this.plantStage === 1) {
        this.plantStage = 2;
        if (window.curioAudio) window.curioAudio.playWater();
        this.renderPlantActivity();
      } else if (type === 'sun' && this.plantStage === 2) {
        this.plantStage = 3;
        if (window.curioAudio) window.curioAudio.playSprout();
        if (window.curioState) {
          window.curioState.addStars(20, 'Plant Discovery');
          window.curioState.addXP(30, 'Plant Discovery');
          window.curioState.unlockBadge('eco_hero');
          window.curioState.incrementMission('lab', 1);
        }
        if (window.curioApp && window.curioApp.triggerConfetti) {
          window.curioApp.triggerConfetti();
        }
        this.renderPlantActivity();
      } else {
        if (window.curioAudio) window.curioAudio.playGentleHint();
      }
    };

    [seed, water, sun].forEach(item => {
      if (!item) return;
      item.onclick = () => advancePlant(item.dataset.type);
      item.ondragstart = (e) => e.dataTransfer.setData('text/plain', item.dataset.type);
    });

    target.ondragover = (e) => e.preventDefault();
    target.ondrop = (e) => {
      e.preventDefault();
      const type = e.dataTransfer.getData('text/plain');
      advancePlant(type);
    };
  }

  renderPlantSvg(stage) {
    if (stage === 0) {
      // Just empty pot with rich soil
      return `
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="180" rx="60" ry="12" fill="#000000" opacity="0.1" />
          <path d="M50 120 L65 180 L135 180 L150 120 Z" fill="#D97706" stroke="#92400E" stroke-width="4" />
          <ellipse cx="100" cy="120" rx="50" ry="14" fill="#78350F" />
          <text x="100" y="160" font-size="28" text-anchor="middle">🪴</text>
        </svg>
      `;
    } else if (stage === 1) {
      // Seed planted, tiny sprout peeking
      return `
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="180" rx="60" ry="12" fill="#000000" opacity="0.1" />
          <path d="M50 120 L65 180 L135 180 L150 120 Z" fill="#D97706" stroke="#92400E" stroke-width="4" />
          <ellipse cx="100" cy="120" rx="50" ry="14" fill="#78350F" />
          <!-- Tiny sprout -->
          <path d="M100 120 Q100 95 106 88 Q114 96 100 120" fill="#34D399" stroke="#059669" stroke-width="2" />
          <ellipse cx="94" cy="94" rx="7" ry="4" fill="#6EE7B7" transform="rotate(-30 94 94)" />
        </svg>
      `;
    } else if (stage === 2) {
      // Lush growing leafy stem
      return `
        <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="180" rx="60" ry="12" fill="#000000" opacity="0.1" />
          <path d="M50 120 L65 180 L135 180 L150 120 Z" fill="#D97706" stroke="#92400E" stroke-width="4" />
          <ellipse cx="100" cy="120" rx="50" ry="14" fill="#78350F" />
          <!-- Growing stem with leaves -->
          <path d="M100 120 Q98 70 100 50" stroke="#10B981" stroke-width="8" stroke-linecap="round" fill="none" />
          <ellipse cx="78" cy="84" rx="18" ry="9" fill="#34D399" transform="rotate(-25 78 84)" />
          <ellipse cx="122" cy="72" rx="18" ry="9" fill="#34D399" transform="rotate(25 122 72)" />
          <!-- Flower bud -->
          <circle cx="100" cy="46" r="10" fill="#F472B6" />
        </svg>
      `;
    } else {
      // Magnificent blooming flower with smiling face and butterfly!
      return `
        <svg width="240" height="240" viewBox="0 0 200 200" fill="none" class="animate-bounce-subtle">
          <ellipse cx="100" cy="185" rx="60" ry="12" fill="#000000" opacity="0.1" />
          <path d="M50 130 L65 185 L135 185 L150 130 Z" fill="#D97706" stroke="#92400E" stroke-width="4" />
          <ellipse cx="100" cy="130" rx="50" ry="14" fill="#78350F" />
          <!-- Big vibrant stem -->
          <path d="M100 130 Q96 80 100 50" stroke="#059669" stroke-width="9" stroke-linecap="round" fill="none" />
          <ellipse cx="70" cy="95" rx="22" ry="11" fill="#10B981" transform="rotate(-25 70 95)" />
          <ellipse cx="130" cy="80" rx="22" ry="11" fill="#10B981" transform="rotate(25 130 80)" />
          <!-- Flower Petals -->
          <circle cx="100" cy="24" r="16" fill="#F43F5E" />
          <circle cx="122" cy="34" r="16" fill="#FB7185" />
          <circle cx="122" cy="62" r="16" fill="#F43F5E" />
          <circle cx="100" cy="74" r="16" fill="#FB7185" />
          <circle cx="78" cy="62" r="16" fill="#F43F5E" />
          <circle cx="78" cy="34" r="16" fill="#FB7185" />
          <!-- Golden Center with Smile -->
          <circle cx="100" cy="48" r="19" fill="#FDE047" stroke="#F59E0B" stroke-width="2" />
          <circle cx="94" cy="44" r="2.5" fill="#1E1B4B" />
          <circle cx="106" cy="44" r="2.5" fill="#1E1B4B" />
          <path d="M96 52 Q100 57 104 52" stroke="#1E1B4B" stroke-width="2.5" stroke-linecap="round" fill="none" />
          <!-- Cheerful fluttering butterfly -->
          <text x="145" y="45" font-size="28">🦋</text>
          <text x="35" y="65" font-size="22">✨</text>
        </svg>
      `;
    }
  }

  // ==========================================
  // ACTIVITY 2: SOLAR SYSTEM
  // ==========================================
  renderSolarActivity() {
    const planets = [
      { id: 'mercury', name: 'Mercury', order: 1, icon: '🪨', color: '#94A3B8', desc: 'Closest to the Sun' },
      { id: 'venus', name: 'Venus', order: 2, icon: '🟡', color: '#FBBF24', desc: 'Hottest planet' },
      { id: 'earth', name: 'Earth', order: 3, icon: '🌍', color: '#38BDF8', desc: 'Our home with oceans & life!' },
      { id: 'mars', name: 'Mars', order: 4, icon: '🔴', color: '#EF4444', desc: 'The Red Planet' },
      { id: 'jupiter', name: 'Jupiter', order: 5, icon: '🟠', color: '#F97316', desc: 'Largest planet' },
      { id: 'saturn', name: 'Saturn', order: 6, icon: '🪐', color: '#EAB308', desc: 'Has magnificent rings' },
      { id: 'uranus', name: 'Uranus', order: 7, icon: '🔵', color: '#06B6D4', desc: 'Cold ice giant' },
      { id: 'neptune', name: 'Neptune', order: 8, icon: '🌊', color: '#3B82F6', desc: 'Windiest planet' }
    ];

    const placedCount = Object.keys(this.placedPlanets).length;
    const isAllPlaced = placedCount >= planets.length;

    this.container.innerHTML = `
      <div class="lab-container animate-fade-in">
        ${this.renderHeader('Curio\'s Little Lab', 'Build the Solar System 🪐')}

        <div class="lab-stage-card cosmic-lab-bg">
          <div class="lab-mission-instruction animate-pop-in">
            <span class="instruction-icon">🚀</span>
            <span class="instruction-text">
              ${isAllPlaced ? '🎉 Congratulations! You mapped the entire Solar System!' : 'Drag or tap each planet into its correct orbit slot from the Sun!'}
            </span>
          </div>

          <!-- Solar Orbit Canvas -->
          <div class="solar-orbits-stage">
            <div class="sun-origin">
              <div class="glowing-sun">☀️</div>
              <span class="sun-label">Sun</span>
            </div>

            <div class="orbits-row">
              ${planets.map(p => {
                const placed = this.placedPlanets[p.id];
                return `
                  <div class="orbit-slot ${placed ? 'filled' : 'empty'}" data-slot-id="${p.id}" data-order="${p.order}">
                    <span class="slot-number">#${p.order}</span>
                    ${placed ? `
                      <div class="placed-planet animate-pop-in">
                        <span class="planet-icon">${p.icon}</span>
                        <span class="planet-name">${p.name}</span>
                      </div>
                    ` : `
                      <div class="slot-target-ring">
                        <span class="ring-hint">Drop #${p.order}</span>
                      </div>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Planet Tray -->
          <div class="planet-palette-tray">
            <div class="tray-title">Unplaced Planets (${8 - placedCount} remaining):</div>
            <div class="planets-flex">
              ${planets.filter(p => !this.placedPlanets[p.id]).map(p => `
                <div class="planet-draggable-card" draggable="true" data-planet-id="${p.id}" data-order="${p.order}">
                  <span class="planet-avatar">${p.icon}</span>
                  <div class="planet-meta">
                    <strong>${p.name}</strong>
                    <small>Orbit #${p.order}</small>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${isAllPlaced ? `
            <div class="discovery-badge-banner animate-pop-in">
              <div class="banner-icon">🪐</div>
              <div class="banner-text">
                <h3>Solar Explorer Badge Earned!</h3>
                <p>You know the order of all 8 planets revolving around the Sun!</p>
              </div>
              <button class="curio-btn curio-btn-primary" id="btn-replay-solar">
                <span>Reset Orbits 🔄</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.setupBaseListeners();

    if (isAllPlaced) {
      if (window.curioState) {
        window.curioState.unlockBadge('space_cadet');
        window.curioState.addStars(25, 'Solar System Discovery');
      }
      this.container.querySelector('#btn-replay-solar').onclick = () => {
        this.placedPlanets = {};
        this.renderSolarActivity();
      };
      return;
    }

    // Place handling
    const placePlanet = (planetId) => {
      this.placedPlanets[planetId] = true;
      if (window.curioAudio) window.curioAudio.playStar();
      this.renderSolarActivity();
    };

    this.container.querySelectorAll('.planet-draggable-card').forEach(card => {
      card.onclick = () => placePlanet(card.dataset.planetId);
      card.ondragstart = (e) => e.dataTransfer.setData('text/plain', card.dataset.planetId);
    });

    this.container.querySelectorAll('.orbit-slot.empty').forEach(slot => {
      slot.ondragover = (e) => e.preventDefault();
      slot.ondrop = (e) => {
        e.preventDefault();
        const planetId = e.dataTransfer.getData('text/plain');
        if (planetId === slot.dataset.slotId) {
          placePlanet(planetId);
        } else {
          if (window.curioAudio) window.curioAudio.playGentleHint();
        }
      };
      slot.onclick = () => {
        // Find matching planet
        const matching = planets.find(p => p.id === slot.dataset.slotId);
        if (matching && !this.placedPlanets[matching.id]) {
          placePlanet(matching.id);
        }
      };
    });
  }

  // ==========================================
  // ACTIVITY 3: ANIMAL HABITAT SORT
  // ==========================================
  renderAnimalsActivity() {
    const animalDb = [
      { id: 'lion', name: 'Lion', icon: '🦁', habitat: 'land' },
      { id: 'dolphin', name: 'Dolphin', icon: '🐬', habitat: 'water' },
      { id: 'eagle', name: 'Eagle', icon: '🦅', habitat: 'air' },
      { id: 'camel', name: 'Camel', icon: '🐪', habitat: 'land' },
      { id: 'octopus', name: 'Octopus', icon: '🐙', habitat: 'water' },
      { id: 'parrot', name: 'Parrot', icon: '🦜', habitat: 'air' },
      { id: 'zebra', name: 'Zebra', icon: '🦓', habitat: 'land' },
      { id: 'whale', name: 'Whale', icon: '🐋', habitat: 'water' },
      { id: 'owl', name: 'Owl', icon: '🦉', habitat: 'air' }
    ];

    const allPlacedCount = this.sortedAnimals.land.length + this.sortedAnimals.water.length + this.sortedAnimals.air.length;
    const isComplete = allPlacedCount >= animalDb.length;

    // Remaining animals to sort
    const remaining = animalDb.filter(a =>
      !this.sortedAnimals.land.includes(a.id) &&
      !this.sortedAnimals.water.includes(a.id) &&
      !this.sortedAnimals.air.includes(a.id)
    );

    this.container.innerHTML = `
      <div class="lab-container animate-fade-in">
        ${this.renderHeader('Curio\'s Little Lab', 'Sort Animals by Habitat 🐾')}

        <div class="lab-stage-card habitat-lab-bg">
          <div class="lab-mission-instruction animate-pop-in">
            <span class="instruction-icon">🐾</span>
            <span class="instruction-text">
              ${isComplete ? '🎉 Fantastic! You sorted all animals into their correct habitats!' : 'Drag or click each animal to send them to Land, Water, or Air!'}
            </span>
          </div>

          <!-- Habitat Zones (3 Big Drop Zones) -->
          <div class="habitat-zones-grid">
            <!-- Land -->
            <div class="habitat-box habitat-land" id="zone-land" data-habitat="land">
              <div class="zone-header">
                <span class="zone-icon">🏞️</span>
                <span class="zone-title">Land Habitat</span>
              </div>
              <div class="zone-items-bin">
                ${this.sortedAnimals.land.map(id => {
                  const item = animalDb.find(a => a.id === id);
                  return `<div class="habitat-animal-item animate-pop-in">${item.icon} ${item.name}</div>`;
                }).join('')}
              </div>
            </div>

            <!-- Water -->
            <div class="habitat-box habitat-water" id="zone-water" data-habitat="water">
              <div class="zone-header">
                <span class="zone-icon">🌊</span>
                <span class="zone-title">Water Habitat</span>
              </div>
              <div class="zone-items-bin">
                ${this.sortedAnimals.water.map(id => {
                  const item = animalDb.find(a => a.id === id);
                  return `<div class="habitat-animal-item animate-pop-in">${item.icon} ${item.name}</div>`;
                }).join('')}
              </div>
            </div>

            <!-- Air -->
            <div class="habitat-box habitat-air" id="zone-air" data-habitat="air">
              <div class="zone-header">
                <span class="zone-icon">☁️</span>
                <span class="zone-title">Air Habitat</span>
              </div>
              <div class="zone-items-bin">
                ${this.sortedAnimals.air.map(id => {
                  const item = animalDb.find(a => a.id === id);
                  return `<div class="habitat-animal-item animate-pop-in">${item.icon} ${item.name}</div>`;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Animal Cards Bin -->
          <div class="animals-waiting-bar">
            <div class="tray-title">Animals Waiting to Explore (${remaining.length} left):</div>
            <div class="animals-flex">
              ${remaining.map(a => `
                <div class="animal-pick-pill" draggable="true" data-id="${a.id}" data-habitat="${a.habitat}">
                  <span class="animal-icon">${a.icon}</span>
                  <span class="animal-name">${a.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${isComplete ? `
            <div class="discovery-badge-banner animate-pop-in">
              <div class="banner-icon">🦁</div>
              <div class="banner-text">
                <h3>Zoologist Master Badge!</h3>
                <p>Every animal is happy in its natural biome!</p>
              </div>
              <button class="curio-btn curio-btn-primary" id="btn-replay-animals">
                <span>Play Again 🔄</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.setupBaseListeners();

    if (isComplete) {
      if (window.curioState) {
        window.curioState.addStars(20, 'Habitat Sort');
        window.curioState.addXP(25, 'Habitat Sort');
      }
      this.container.querySelector('#btn-replay-animals').onclick = () => {
        this.sortedAnimals = { land: [], water: [], air: [] };
        this.renderAnimalsActivity();
      };
      return;
    }

    const sortAnimal = (animalId, habitat) => {
      this.sortedAnimals[habitat].push(animalId);
      if (window.curioAudio) window.curioAudio.playCorrect();
      this.renderAnimalsActivity();
    };

    this.container.querySelectorAll('.animal-pick-pill').forEach(pill => {
      pill.onclick = () => {
        // Auto sort with delight or prompt
        sortAnimal(pill.dataset.id, pill.dataset.habitat);
      };
      pill.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: pill.dataset.id, habitat: pill.dataset.habitat }));
      };
    });

    ['land', 'water', 'air'].forEach(zoneName => {
      const zone = this.container.querySelector(`#zone-${zoneName}`);
      zone.ondragover = (e) => e.preventDefault();
      zone.ondrop = (e) => {
        e.preventDefault();
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data.habitat === zoneName) {
            sortAnimal(data.id, zoneName);
          } else {
            if (window.curioAudio) window.curioAudio.playGentleHint();
          }
        } catch (err) {}
      };
    });
  }

  // ==========================================
  // ACTIVITY 4: HEALTHY FOOD BASKET
  // ==========================================
  renderFoodActivity() {
    const foods = [
      { id: 'apple', name: 'Crisp Apple', icon: '🍎', healthy: true },
      { id: 'broccoli', name: 'Broccoli', icon: '🥦', healthy: true },
      { id: 'banana', name: 'Sweet Banana', icon: '🍌', healthy: true },
      { id: 'carrot', name: 'Crunchy Carrot', icon: '🥕', healthy: true },
      { id: 'fish', name: 'Fresh Salmon', icon: '🐟', healthy: true },
      { id: 'donut', name: 'Sugar Donut', icon: '🍩', healthy: false, tip: 'Sometimes treat!' },
      { id: 'soda', name: 'Soda Pop', icon: '🥤', healthy: false, tip: 'Lots of sugar!' },
      { id: 'candy', name: 'Candy Bar', icon: '🍫', healthy: false, tip: 'Enjoy in small bites!' }
    ];

    const healthyTotal = foods.filter(f => f.healthy).length;
    const collectedCount = this.basketFoods.length;
    const isComplete = collectedCount >= healthyTotal;

    this.container.innerHTML = `
      <div class="lab-container animate-fade-in">
        ${this.renderHeader('Curio\'s Little Lab', 'Healthy Food Basket 🥗')}

        <div class="lab-stage-card food-lab-bg">
          <div class="lab-mission-instruction animate-pop-in">
            <span class="instruction-icon">🧺</span>
            <span class="instruction-text">
              ${isComplete ? '🎉 Awesome! Curio has a super nutritious picnic basket!' : 'Tap or drag all the nourishing, healthy foods into Curio\'s Picnic Basket!'}
            </span>
          </div>

          <div class="food-picnic-grid">
            <!-- Left: Food Pantry -->
            <div class="food-pantry-box">
              <div class="pantry-title">Market Pantry:</div>
              <div class="pantry-grid">
                ${foods.map(f => {
                  const inBasket = this.basketFoods.includes(f.id);
                  return `
                    <div class="food-item-card ${inBasket ? 'collected' : ''}" data-id="${f.id}" data-healthy="${f.healthy}">
                      <span class="food-icon">${f.icon}</span>
                      <span class="food-name">${f.name}</span>
                      ${inBasket ? '<span class="check-tag">✓ In Basket</span>' : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Right: Curio's Healthy Basket -->
            <div class="basket-drop-zone ${isComplete ? 'complete' : ''}" id="basket-target">
              <div class="basket-header">
                <span class="basket-icon">🧺</span>
                <h3>Curio's Picnic Basket</h3>
                <span class="basket-count">${collectedCount} / ${healthyTotal} Nutritious Foods</span>
              </div>
              <div class="basket-items-display">
                ${this.basketFoods.map(id => {
                  const item = foods.find(f => f.id === id);
                  return `<span class="basket-badge animate-pop-in">${item.icon} ${item.name}</span>`;
                }).join('')}
              </div>
            </div>
          </div>

          ${isComplete ? `
            <div class="discovery-badge-banner animate-pop-in">
              <div class="banner-icon">🥗</div>
              <div class="banner-text">
                <h3>Super Nutrition Champ!</h3>
                <p>Fruits, veggies, and wholesome foods give Curio big energy to learn and play!</p>
              </div>
              <button class="curio-btn curio-btn-primary" id="btn-replay-food">
                <span>Play Again 🔄</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.setupBaseListeners();

    if (isComplete) {
      if (window.curioState) {
        window.curioState.addStars(20, 'Healthy Food');
        window.curioState.addXP(25, 'Healthy Food');
      }
      this.container.querySelector('#btn-replay-food').onclick = () => {
        this.basketFoods = [];
        this.renderFoodActivity();
      };
      return;
    }

    this.container.querySelectorAll('.food-item-card').forEach(card => {
      card.onclick = () => {
        const id = card.dataset.id;
        const isHealthy = card.dataset.healthy === 'true';

        if (isHealthy) {
          if (!this.basketFoods.includes(id)) {
            this.basketFoods.push(id);
            if (window.curioAudio) window.curioAudio.playPop();
            this.renderFoodActivity();
          }
        } else {
          // Gentle tip
          if (window.curioAudio) window.curioAudio.playGentleHint();
          if (window.curioState) {
            window.curioState.showToast('Treats are yummy, but Curio needs daily brain fuel first! 🍎', 'info');
          }
        }
      };
    });
  }

  // ==========================================
  // ACTIVITY 5: WEATHER EXPLORER
  // ==========================================
  renderWeatherActivity() {
    const weathers = [
      { id: 'sunny', title: 'Sunny Day ☀️', icon: '☀️', outfit: 'Sunglasses & Sunhat', bgClass: 'weather-sunny' },
      { id: 'rainy', title: 'Rainy Day 🌧️', icon: '🌧️', outfit: 'Raincoat & Boots', bgClass: 'weather-rainy' },
      { id: 'cloudy', title: 'Cloudy Breeze ⛅', icon: '⛅', outfit: 'Light Windbreaker', bgClass: 'weather-cloudy' },
      { id: 'snowy', title: 'Snowy Frost ❄️', icon: '❄️', outfit: 'Warm Scarf & Mittens', bgClass: 'weather-snowy' }
    ];

    const currentW = weathers.find(w => w.id === this.currentWeather) || weathers[0];

    this.container.innerHTML = `
      <div class="lab-container animate-fade-in">
        ${this.renderHeader('Curio\'s Little Lab', 'Weather Explorer ⛅')}

        <div class="lab-stage-card ${currentW.bgClass}">
          <div class="lab-mission-instruction animate-pop-in">
            <span class="instruction-icon">🌤️</span>
            <span class="instruction-text">Explore different weather wonders and dress Curio for the day!</span>
          </div>

          <div class="weather-interactive-stage">
            <!-- Weather Scene -->
            <div class="weather-scene-window">
              <div class="weather-sky-particles"></div>
              <div class="weather-mascot-dressed">
                ${window.CurioCharacters.getCurioSvg('happy', 140)}
                <div class="mascot-weather-tag animate-pop-in">
                  <span>Wearing: ${currentW.outfit}</span>
                </div>
              </div>
            </div>

            <!-- Weather Buttons -->
            <div class="weather-control-buttons">
              ${weathers.map(w => `
                <button class="weather-btn ${this.currentWeather === w.id ? 'active' : ''}" data-weather="${w.id}">
                  <span class="w-icon">${w.icon}</span>
                  <span class="w-title">${w.title}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupBaseListeners();

    this.container.querySelectorAll('.weather-btn').forEach(btn => {
      btn.onclick = () => {
        this.currentWeather = btn.dataset.weather;
        if (window.curioAudio) window.curioAudio.playWhoosh();
        if (window.curioState) {
          window.curioState.addStars(5, 'Weather Exploration');
        }
        this.renderWeatherActivity();
      };
    });
  }
}

window.CuriosLittleLabGame = CuriosLittleLabGame;
