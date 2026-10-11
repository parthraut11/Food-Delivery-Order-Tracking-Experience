/**
 * CURIO Rewards & Collection Center
 * Trophy Cabinet, Avatar Customizer, Pet Daycare, and Star Shop!
 */

class CurioRewards {
  constructor() {
    this.container = null;
    this.activeTab = 'trophies'; // 'trophies', 'wardrobe', 'pets'
  }

  mount(targetElement) {
    this.container = targetElement;
    this.render();
  }

  render() {
    const state = window.curioState.data;
    const child = state.child;

    this.container.innerHTML = `
      <div class="rewards-world-container animate-fade-in">
        <!-- Rewards Hero Banner -->
        <div class="rewards-hero-banner">
          <div class="rewards-hero-content">
            <h2 class="rewards-title">🏆 Explorer Trophy Room & Collection</h2>
            <p class="rewards-sub">Celebrate your milestones, customize Curio, and adopt companion pets!</p>
          </div>
          <div class="rewards-currencies">
            <div class="currency-badge star-pill animate-pop-in">
              <span class="curr-icon">⭐</span>
              <div class="curr-details">
                <span class="curr-val">${child.stars}</span>
                <span class="curr-lbl">Stars Collected</span>
              </div>
            </div>
            <div class="currency-badge xp-pill animate-pop-in">
              <span class="curr-icon">⚡</span>
              <div class="curr-details">
                <span class="curr-val">${child.xp}</span>
                <span class="curr-lbl">${child.levelTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Navigation Tabs -->
        <div class="rewards-nav-tabs">
          <button class="rewards-tab-btn ${this.activeTab === 'trophies' ? 'active' : ''}" data-tab="trophies">
            🏅 Trophy Badges (${state.badges.filter(b => b.unlocked).length}/${state.badges.length})
          </button>
          <button class="rewards-tab-btn ${this.activeTab === 'wardrobe' ? 'active' : ''}" data-tab="wardrobe">
            🧢 Curio Wardrobe & Hats
          </button>
          <button class="rewards-tab-btn ${this.activeTab === 'pets' ? 'active' : ''}" data-tab="pets">
            🐾 Companion Pet Daycare
          </button>
        </div>

        <!-- Tab Content -->
        <div class="rewards-tab-body">
          ${this.renderActiveTabContent()}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderActiveTabContent() {
    const state = window.curioState.data;

    if (this.activeTab === 'trophies') {
      return `
        <div class="trophies-grid animate-fade-in">
          ${state.badges.map(b => `
            <div class="trophy-badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
              <div class="badge-icon-wrap">
                <span class="badge-emoji">${b.icon}</span>
                ${b.unlocked ? '<span class="badge-check">✓</span>' : '<span class="badge-lock">🔒</span>'}
              </div>
              <h4 class="badge-title">${b.title}</h4>
              <p class="badge-desc">${b.desc}</p>
              <div class="badge-status-tag">
                ${b.unlocked ? `Unlocked ${b.unlockedAt || 'Recently'}` : 'Keep Exploring to Unlock'}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.activeTab === 'wardrobe') {
      const currentAcc = state.child.accessory;
      return `
        <div class="wardrobe-layout animate-fade-in">
          <!-- Curio Live Preview -->
          <div class="curio-mirror-card">
            <h3 class="mirror-title">Curio's Outfit Preview</h3>
            <div class="mirror-mascot-stage animate-bounce-subtle">
              ${window.CurioCharacters.getCurioSvg('cheer', 150)}
              <div class="mirror-accessory-tag">
                <span>Accessory: ${state.wardrobe.accessories.find(a => a.id === currentAcc)?.name || 'None'}</span>
              </div>
            </div>
            <p class="mirror-tip">Collect Stars in games to unlock exciting outfits!</p>
          </div>

          <!-- Wardrobe Grid -->
          <div class="wardrobe-items-grid">
            ${state.wardrobe.accessories.map(acc => {
              const isEquipped = currentAcc === acc.id;
              const canAfford = state.child.stars >= acc.cost;
              return `
                <div class="wardrobe-item-card ${acc.unlocked ? 'unlocked' : 'locked'} ${isEquipped ? 'equipped' : ''}" data-acc-id="${acc.id}">
                  <span class="acc-icon">${acc.icon}</span>
                  <div class="acc-info">
                    <h4>${acc.name}</h4>
                    <span class="acc-price">${acc.unlocked ? 'Unlocked' : `⭐ ${acc.cost} Stars`}</span>
                  </div>
                  <div class="acc-action">
                    ${acc.unlocked ? (
                      isEquipped ?
                      '<button class="curio-btn curio-btn-primary btn-sm" disabled>Equipped</button>' :
                      `<button class="curio-btn curio-btn-outline btn-sm btn-equip" data-id="${acc.id}">Wear</button>`
                    ) : (
                      `<button class="curio-btn curio-btn-secondary btn-sm btn-buy-acc" data-id="${acc.id}" ${canAfford ? '' : 'disabled'}>
                        Unlock
                      </button>`
                    )}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      // Companion pets
      const currentPet = state.child.pet;
      return `
        <div class="pets-layout animate-fade-in">
          <div class="pets-intro-box">
            <h3>🐾 Curio's Companion Pets</h3>
            <p>Every explorer needs a loyal buddy! Choose which pet will join you on your learning quests.</p>
          </div>

          <div class="pets-card-grid">
            ${state.wardrobe.pets.map(pet => {
              const isEquipped = currentPet === pet.id;
              return `
                <div class="pet-card ${pet.unlocked ? 'unlocked' : 'locked'} ${isEquipped ? 'equipped' : ''}" data-pet-id="${pet.id}">
                  <div class="pet-avatar-circle animate-bounce-subtle">${pet.icon}</div>
                  <h4 class="pet-name">${pet.name}</h4>
                  <span class="pet-type">${pet.type} Companion</span>
                  <div class="pet-action-row">
                    ${pet.unlocked ? (
                      isEquipped ?
                      '<span class="badge-active-pet">Active Buddy</span>' :
                      `<button class="curio-btn curio-btn-outline btn-sm btn-select-pet" data-id="${pet.id}">Choose</button>`
                    ) : (
                      `<button class="curio-btn curio-btn-primary btn-sm btn-adopt-pet" data-id="${pet.id}">
                        Adopt (⭐ ${pet.cost || 80})
                      </button>`
                    )}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
  }

  attachEvents() {
    this.container.querySelectorAll('.rewards-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.activeTab = btn.dataset.tab;
        if (window.curioAudio) window.curioAudio.playPop();
        this.render();
      };
    });

    // Wardrobe equip/buy
    this.container.querySelectorAll('.btn-equip').forEach(btn => {
      btn.onclick = () => {
        window.curioState.selectAccessory(btn.dataset.id);
        if (window.curioAudio) window.curioAudio.playStar();
        this.render();
      };
    });

    this.container.querySelectorAll('.btn-buy-acc').forEach(btn => {
      btn.onclick = () => {
        if (window.curioState.unlockAccessory(btn.dataset.id)) {
          if (window.curioAudio) window.curioAudio.playCorrect();
          this.render();
        }
      };
    });

    // Pet select/adopt
    this.container.querySelectorAll('.btn-select-pet').forEach(btn => {
      btn.onclick = () => {
        window.curioState.selectPet(btn.dataset.id);
        if (window.curioAudio) window.curioAudio.playStar();
        this.render();
      };
    });

    this.container.querySelectorAll('.btn-adopt-pet').forEach(btn => {
      btn.onclick = () => {
        if (window.curioState.unlockPet(btn.dataset.id)) {
          if (window.curioAudio) window.curioAudio.playCorrect();
          this.render();
        }
      };
    });
  }
}

window.CurioRewards = CurioRewards;
